var Blazy = require('blazy');

var bLazy = new Blazy({
  success: function(element){
    setTimeout(function(){
      var parent = element.parentNode;
      parent.className = parent.className.replace(/\bloading\b/,'');
    }, 200);
  }
});
