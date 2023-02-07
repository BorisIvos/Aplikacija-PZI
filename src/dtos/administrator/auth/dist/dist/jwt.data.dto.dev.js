"use strict";

exports.__esModule = true;

var JwtDataDto =
/** @class */
function () {
  function JwtDataDto() {}

  JwtDataDto.prototype.toPlainObject = function () {
    return {
      role: this.role,
      id: this.id,
      identity: this.identity,
      exp: this.exp,
      ip: this.ip,
      ua: this.ua
    };
  };

  return JwtDataDto;
}();

exports.JwtDataDto = JwtDataDto;