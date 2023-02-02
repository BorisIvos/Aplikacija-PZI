import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Feature } from "src/entities/feature.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class FeatureService extends TypeOrmCrudService<Feature> {
    constructor(
        @InjectRepository(Feature)
        private readonly feature: Repository<Feature>//// Cim se spomene neki repozitori mora se evidentirati u osnovno modulu
    ){
        super(feature);

    }
}