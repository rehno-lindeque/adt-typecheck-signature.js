/*
 * adt-typecheck-signature.js - Typechecking for JavaScript through adt.js evaluators
 * adt-typecheck-signature.js is free, public domain software (http://creativecommons.org/publicdomain/zero/1.0/)
 * Originally created by Rehno Lindeque of http://www.mischievousmeerkat.com
 * Use it in combination with https://github.com/rehno-lindeque/adt.js and
 * https://github.com/rehno-lindeque/adt-typecheck.js
 */
var adt = adt || (typeof require === 'function'? require('adt.js') : {});
adt.typecheck = adt.typecheck || (typeof require === 'function'? require('adt-typecheck.js') : {});
(function() {
"use strict";
