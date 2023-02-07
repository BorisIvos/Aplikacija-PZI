"use strict";

exports.__esModule = !0;

var JwtDataDto = function () {
  function t() {}

  return t.prototype.toPlainObject = function () {
    return {
      role: this.role,
      id: this.id,
      identity: this.identity,
      exp: this.exp,
      ip: this.ip,
      ua: this.ua
    };
  }, t;
}();

exports.JwtDataDto = JwtDataDto;