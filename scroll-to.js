var Tween = require('./tween');
var raf = require('raf');

function getInitialScrollPosition(container) {
  var x,y;

  if (container) {
    y = container.scrollTop;
    x = container.scrollLeft;
  } else {
    y = window.pageYOffset || document.documentElement.scrollTop;
    x = window.pageXOffset || document.documentElement.scrollLeft;
  }
  
  return { top: y, left: x };
}

function scrollTo(y, container, options) {
  options = options || {};
  container = container || null;

  // start position
  var start = getInitialScrollPosition(container);

  // setup tween
  var tween = Tween(start)
    .ease(options.ease || 'out-circ')
    .to({ top: y, left: 0 })
    .duration(options.duration || 1000);

  // scroll
  tween.update(function(o){
    if (container) {
      container.scrollTo(o.left | 0, o.top | 0);
    } else {
      window.scrollTo(o.left | 0, o.top | 0);
    }
  });

  // handle end
  tween.on('end', function(){
    animate = function(){};
  });

  // animate
  function animate() {
    raf(animate);
    tween.update();
  }

  animate();

  return tween;
}

module.exports = scrollTo;
