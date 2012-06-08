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
  var isFunctionADT = adt({
    Function: function() { return this._datatype === 'ADT'; },
    _: false
  });

  adt.typecheck.signature = {
    function: function(args, schemaF, f) {
      if (typeof schemaF !== 'function')
        throw "No type signature supplied to `adt.typecheck.signature.function`.";
      if (!f)
        throw "No function supplied to `adt.typecheck.signature.function`.";
      var check = adt.typecheck(function(){ return this.Arguments(schemaF.call(this)); });
      return function() {
        var errors = check(arguments);
        if (errors.length > 0)
          throw adt.typecheck.show(errors).join('\n');
        f.apply(this, arguments);
      };
    },
    chainFunction: function(args, schemaF, f) {
      if (args && Object.prototype.toString(args) !== '[object Arguments]')
        throw "Expected arguments to be passed to `adt.typecheck.signature.chainFunction`.";
      if (typeof schemaF !== 'function')
        throw "No type signature supplied to `adt.typecheck.signature.chainFunction`.";
      if (typeof f !== 'function')
        throw "No node function supplied to `adt.typecheck.signature.chainFunction`.";
      var
        expectedNumArgs,
        check = adt.typecheck(function(){ 
          var s = schemaF.call(this);
          if (s.length < 1)
            throw "Too few arguments in chain function, a callback function is required.";
          if (!isFunctionADT(s[s.length - 1]))
            throw "The last argument in the chain function signature should be a Function.";
          expectedNumArgs = s.length;
          return this.Arguments(s); 
        });
      return function(){
        var 
          errors = check(arguments),
          messages,
          callback;
        // It is not possible to pass along errors if no callback function is supplied
        if (errors.length > 0) {
          messages = adt.typecheck.show(errors);
          if (arguments.length !== expectedNumArgs)
            throw "Expected " + expectedNumArgs + " arguments, but received " + arguments.length + ".\n" + messages;
          if (typeof arguments[arguments.length - 1] !== 'function')
            throw messages;
        }
        callback = arguments[arguments.length - 1];
        if (errors.length > 0)
          callback(messages);
        else
          f.apply(this, [].slice.call(arguments).concat([callback]));
      };
    }
  };
  // Export typecheck signature to a CommonJS module if exports is available
  if (typeof module !== "undefined" && module !== null)
    module.exports = adt.typecheck.signature;
})();
