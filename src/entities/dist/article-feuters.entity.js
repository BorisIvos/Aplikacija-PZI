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
var ArticleFeature = /** @class */ (function () {
    function ArticleFeature() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: "int",
            name: "article_feature_id",
            unsigned: true
        })
    ], ArticleFeature.prototype, "articleFeatureId");
    __decorate([
        typeorm_1.Column({ type: "int", name: "article_id", unsigned: true })
    ], ArticleFeature.prototype, "articleId");
    __decorate([
        typeorm_1.Column({ type: "int", name: "feature_id", unsigned: true })
    ], ArticleFeature.prototype, "featureId");
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 255 }),
        Validator.IsNotEmpty(),
        Validator.IsString(),
        Validator.Length(1, 255)
    ], ArticleFeature.prototype, "value");
    __decorate([
        typeorm_1.ManyToOne(function () { return article_entity_1.Article; }, function (article) { return article.articleFeatures; }, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
    ], ArticleFeature.prototype, "article");
    __decorate([
        typeorm_1.ManyToOne(function () { return feature_entity_1.Feature; }, function (feature) { return feature.articleFeatures; }, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([{ name: "feature_id", referencedColumnName: "featureId" }])
    ], ArticleFeature.prototype, "feature");
    ArticleFeature = __decorate([
        typeorm_1.Index("fk_article_feature_feature_id", ["featureId"], {}),
        typeorm_1.Index("uq_article_feature_article_id_feature_id", ["articleId", "featureId"], {
            unique: true
        }),
        typeorm_1.Entity("article_feature")
    ], ArticleFeature);
    return ArticleFeature;
}());
exports.ArticleFeature = ArticleFeature;

//# sourceMappingURL=article-feuters.entity.js.map
