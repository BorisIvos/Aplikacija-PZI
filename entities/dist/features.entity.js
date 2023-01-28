"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var article_feuters_entity_1 = require("./article-feuters.entity");
var category_entity_1 = require("./category.entity");
var article_entity_1 = require("./article.entity");
var Validator = require("class-validator");
var Feature = /** @class */ (function () {
    function Feature() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "feature_id", unsigned: true })
    ], Feature.prototype, "featureId");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 32 }),
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(3, 32)
    ], Feature.prototype, "name");
    __decorate([
        typeorm_1.Column({ type: "int", name: "category_id", unsigned: true })
    ], Feature.prototype, "categoryId");
    __decorate([
        typeorm_1.OneToMany(function () { return article_feuters_entity_1.ArticleFeature; }, function (articleFeature) { return articleFeature.feature; })
    ], Feature.prototype, "articleFeatures");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return article_entity_1.Article; }, function (article) { return article.features; }),
        typeorm_1.JoinTable({
            name: "article_feature",
            joinColumn: { name: "feature_id", referencedColumnName: "featureId" },
            inverseJoinColumn: { name: "article_id", referencedColumnName: "articleId" }
        })
    ], Feature.prototype, "articles");
    __decorate([
        typeorm_1.ManyToOne(function () { return category_entity_1.Category; }, function (category) { return category.features; }, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
    ], Feature.prototype, "category");
    Feature = __decorate([
        typeorm_1.Index("fk_feature_category_id", ["categoryId"], {}),
        typeorm_1.Index("uq_feature_name_category_id", ["name", "categoryId"], { unique: true }),
        typeorm_1.Entity("feature")
    ], Feature);
    return Feature;
}());
exports.Feature = Feature;

//# sourceMappingURL=features.entity.js.map
