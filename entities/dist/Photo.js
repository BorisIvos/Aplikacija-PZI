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
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
    ], Photo.prototype, "photoId");
    __decorate([
        typeorm_1.Column("int", { name: "article_id", unsigned: true, "default": function () { return "'0'"; } })
    ], Photo.prototype, "articleId");
    __decorate([
        typeorm_1.Column("varchar", {
            name: "image_path",
            unique: true,
            length: 128,
            "default": function () { return "'0'"; }
        })
    ], Photo.prototype, "imagePath");
    __decorate([
        typeorm_1.ManyToOne(function () { return article_entity_1.Article; }, function (article) { return article.photos; }, {
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
    ], Photo.prototype, "article");
    Photo = __decorate([
        typeorm_1.Index("fk_photo_article_id", ["articleId"], {}),
        typeorm_1.Index("uq_photo_image_path", ["imagePath"], { unique: true }),
        typeorm_1.Entity("photo", { schema: "aplikacija" })
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;

//# sourceMappingURL=Photo.js.map
