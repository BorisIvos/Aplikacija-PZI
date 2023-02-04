import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from "config/jwt.secret";
import { Injectable } from "@nestjs/common/decorators";
import { JwtDataDto } from "src/dtos/administrator/auth/jwt.data.dto";
import { UserService } from "src/services/user/user.service";

@Injectable()
export class AuthMidleware implements NestMiddleware{
    constructor(
        public readonly administratorService: AdministratorService,
        public userService: UserService,

        
        ){}
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
        let jwtData: JwtDataDto;
        try{  
        jwtData = jwt.verify(tokenString, jwtSecret) as any ;
         } catch(e) {
            throw new HttpException('Bad token found2', HttpStatus.UNAUTHORIZED)

         }

        if(!jwtData){
            throw new HttpException('Bad token found2', HttpStatus.UNAUTHORIZED)
        }

        
        const ip = req.ip.toString();

         if(jwtData.ip !== req.ip.toString(
            
         )){
           throw new HttpException('Bad token found3', HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.role === "administrator") {  
            const administrator = await this.administratorService.getById(jwtData.id)
            if(!administrator){
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
        }
        } else if (jwtData.role === "user") {
            const user = await this.userService.getById(jwtData.id)
            if(!user){
                throw new HttpException('Account not found', HttpStatus.UNAUTHORIZED);
            }
            
        }
        const trenutniTimestamp = new Date().getTime() / 1000;
        if (trenutniTimestamp >= jwtData.exp) {
            throw new HttpException('the token has expired',HttpStatus.UNAUTHORIZED)
        }
        req.token= jwtData;

        next();
    }
    
}