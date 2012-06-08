# adt-typecheck-signature.js

Run-time type checking for function signatures using [adt.js](https://github.com/rehno-lindeque/adt.js)
and [adt-typecheck.js](https://github.com/rehno-lindeque/adt-typecheck.js).

## Usage

**adt-typecheck-signature.js** is not included in **adt-typecheck.js** or as an
extra with **adt.js** because its use requires a little bit of care.

Specifically, you should not use function signature with instance methods of a
class because using the double arrow `=>` notation will not work. This is
something that you often want to do in frameworks that use these instance
methods as callbacks (E.g. in [Backbone.js](http://backbonejs.org/)).