import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "entities/category.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
    constructor(
        @InjectRepository(Category)
        private readonly category: Repository<Category>//// Cim se spomene neki repozitori mora se evidentirati u osnovno modulu
    ){
        super(category);

    }
}