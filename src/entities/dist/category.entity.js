"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var article_entity_1 = require("./article.entity");
var feature_entity_1 = require("./feature.entity");
var Validator = require("class-validator");
var Category = /** @class */ (function () {
    function Category() {
    }
    Category_1 = Category;
    var Category_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
    ], Category.prototype, "categoryId");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            unique: true,
            length: 32
        }),
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(5, 32)
    ], Category.prototype, "name");
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            name: "image_path",
            unique: true,
            length: 128
        }),
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(1, 128)
    ], Category.prototype, "imagePath");
    __decorate([
        typeorm_1.Column({
            type: "int",
            name: "parent_category_id",
            nullable: true,
            unsigned: true
        })
    ], Category.prototype, "parentCategoryId");
    __decorate([
        typeorm_1.OneToMany(function () { return article_entity_1.Article; }, function (article) { return article.category; })
    ], Category.prototype, "articles");
    __decorate([
        typeorm_1.ManyToOne(function () { return Category_1; }, function (category) { return category.categories; }, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([
            { name: "parent_category_id", referencedColumnName: "categoryId" }
        ])
    ], Category.prototype, "parentCategory");
    __decorate([
        typeorm_1.OneToMany(function () { return Category_1; }, function (category) { return category.parentCategory; })
    ], Category.prototype, "categories");
    __decorate([
        typeorm_1.OneToMany(function () { return feature_entity_1.Feature; }, function (feature) { return feature.category; })
    ], Category.prototype, "features");
    Category = Category_1 = __decorate([
        typeorm_1.Index("fk_category_parent__category_id", ["parentCategoryId"], {}),
        typeorm_1.Index("uq_category_image_path", ["imagePath"], { unique: true }),
        typeorm_1.Index("uq_category_name", ["name"], { unique: true }),
        typeorm_1.Entity("category")
    ], Category);
    return Category;
}());
exports.Category = Category;

//# sourceMappingURL=category.entity.js.map
