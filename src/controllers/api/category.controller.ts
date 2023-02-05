import { Controller, UseGuards } from "@nestjs/common";
import { Category } from "src/entities/category.entity";
import { Crud } from "@nestjsx/crud";
import { CategoryService } from "src/services/administrator/category/category.service";
import { RoleCheckGuard } from "src/misc/role.checker.guard";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";


@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params: {
        id: {
            field: 'categoryId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            categories: {
                eager: true
            },
            features: {
                eager: true
            },
            parentCategory: {
                eager: false
            },
            articles: {
                eager: false
            }
        }
         },
         routes: {
            only: [
                "createOneBase",
                "createManyBase",
                "getManyBase",
                "getOneBase",
                "updateOneBase",
            ],
            createOneBase: {
                decorators: [
                    UseGuards(RoleCheckGuard),
                    AllowToRoles('administrator'),
    
                ],
            },
            createManyBase: {
                decorators: [
                    UseGuards(RoleCheckGuard),
                    AllowToRoles('administrator'),
                ],
                
            },
            updateOneBase: {
                decorators: [
                    UseGuards(RoleCheckGuard),
                    AllowToRoles('administrator'),
                ],
    
            },
            getManyBase: {
                decorators: [
                    UseGuards(RoleCheckGuard),
                    AllowToRoles('administrator', 'user',)
                ],
            },
        }
        
    })
export class CategoryController {
    constructor(public service: CategoryService) { }
}


