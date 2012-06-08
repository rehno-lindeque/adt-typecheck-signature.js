console.log("-- Test 1 (Function signature) --");
(function(){
  var checkedFunc = adt.typecheck.signature.function(
    function(){ return [ this.Number(), this.String(), this.Array() ] },
    function(num,str,arr) {
      console.log("...a number: ", num);
      console.log("...a string: ", str);
      console.log("...an array: ", arr);
    }
  );

  console.log("Correct function call passing 3 arguments...")
  checkedFunc(5, "Hello", [2,3]);

  console.log("Incorrect function call...")
  try { checkedFunc("", {}, 5); }
  catch(e) { console.log("Type errors in checked function:\n", e); }
})();

console.log("-- Test 2 (Chain function signature) --");
(function(){
  var checkedChainFunc = adt.typecheck.signature.chainFunction(
    function(){ return [ this.Number(), this.String(), this.Array(), this.Function() ] },
    function(num,str,arr, callback) {
      console.log("...a number: ", num);
      console.log("...a string: ", str);
      console.log("...an array: ", arr);
      console.log("...the callback: ", callback);
      callback();
    }
  );

  console.log("Correct chained function call passing 3 arguments and a callback...")
  checkedChainFunc(5, "Hello", [], function(errors) { console.log("...returned errors: ", errors); })

  console.log("Incorrect chained function call passing 3 arguments and a callback...")
  checkedChainFunc({}, 22.4, "**", function(errors) { console.log("...returned errors: ", errors); })

  console.log("Incorrect chained function call passing too few arguments...")
  try { checkedChainFunc("**", function(errors) { console.log("...returned errors: ", errors); }) }
  catch(e) { console.log("Type errors in checked chain function:\n", e); }
})();
