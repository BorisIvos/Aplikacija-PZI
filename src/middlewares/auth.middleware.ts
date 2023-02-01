import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from "config/jwt.secret";
import { JwtDataAdministatorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { Injectable } from "@nestjs/common/decorators";

@Injectable()
export class AuthMidleware implements NestMiddleware{
    constructor(private readonly administratorService: AdministratorService){}
    async use(req: Request, res: Response, next: NextFunction) {
        
        if (!req.headers.authorization){
            throw new HttpException('Token not found',HttpStatus.UNAUTHORIZED);
        }
        

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !== 2){
            throw new HttpException('Bad token found1', HttpStatus.UNAUTHORIZED)
        }
        const tokenString = tokenParts[1];
        const jwtData: JwtDataAdministatorDto = jwt.verify(tokenString, jwtSecret) as any ;

        if(!jwtData){
            throw new HttpException('Bad token found2', HttpStatus.UNAUTHORIZED)
        }

        
        const ip = req.ip.toString();

         if(jwtData.ip !== req.ip.toString(
            
         )){
           throw new HttpException('Bad token found3', HttpStatus.UNAUTHORIZED);
        }
        const administrator = await this.administratorService.getById(jwtData.administratorId)
        if(!administrator){
            throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }
        const trenutniTimestamp = new Date().getTime() / 1000;
        if (trenutniTimestamp >= jwtData.ext) {
            throw new HttpException('the token has expired',HttpStatus.UNAUTHORIZED)
        }


        next();
    }
    
}