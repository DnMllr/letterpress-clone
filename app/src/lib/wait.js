define(function() {

  return function wait(milliseconds) {
    return new window.Promise(function(resolve) {
      setTimeout(resolve, milliseconds);
    });
  };

});
