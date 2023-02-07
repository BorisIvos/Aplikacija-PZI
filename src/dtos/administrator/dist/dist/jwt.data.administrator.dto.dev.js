"use strict";

exports.__esModule = true;

var JwtDataAdministatorDto =
/** @class */
function () {
  function JwtDataAdministatorDto() {}

  JwtDataAdministatorDto.prototype.toPlainObject = function () {
    return {
      administratorId: this.administratorId,
      username: this.username,
      exp: this.exp,
      ip: this.ip,
      ua: this.ua
    };
  };

  return JwtDataAdministatorDto;
}();

exports.JwtDataAdministatorDto = JwtDataAdministatorDto;