import { Controller } from "@nestjs/common";
import { Category } from "entities/category.entity";
import { Crud } from "@nestjsx/crud";
import { CategoryService } from "src/services/administrator/category/category.service";


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
         }
    })
export class CategoryController {
    constructor(public service: CategoryService) { }
}


