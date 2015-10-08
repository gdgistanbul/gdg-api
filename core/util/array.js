exports.getArguments = function () {
  //.length is just an integer, this doesn't leak
  //the arguments object itself
  var args = new Array(arguments.length);
  for (var i = 0; i < args.length; ++i) {
    //i is always valid index in the arguments object
    args[i] = arguments[i];
  }
  return args;
};