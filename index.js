var scrollTo = require('./scroll-to');

function calculateScrollPosition(elem, container, options) {
  var elemRect = elem.getBoundingClientRect();
  var offsetHeight;
  var scrollHeight;
  var currentScroll;

  if (container) {
    offsetHeight = container.offsetHeight;
    scrollHeight = container.scrollHeight;
    currentScroll = container.scrollTop;
  } else {
    var body = document.body;
    var html = document.documentElement;

    offsetHeight = html.clientHeight;
    scrollHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    currentScroll = Math.max(body.scrollTop, html.scrollTop);
  }

  additionalOffset = options.offset || 0;

  var scrollPosition = elemRect.top;
  if (options.align === 'bottom') {
    scrollPosition = elemRect.bottom - offsetHeight;
  } else if (options.align === 'middle') {
    scrollPosition = elemRect.bottom - offsetHeight / 2 - elemRect.height / 2;
  }

  var maxScrollPosition = scrollHeight;
  var position = Math.min(scrollPosition + additionalOffset + window.pageYOffset,
    maxScrollPosition);

  return currentScroll + position;
}

module.exports = function (elem, container, options) {
  options = options || {};
  container = container || null;

  if (typeof elem === 'string') {
    elem = document.querySelector(elem);
  }

  if (elem) {
    var y = calculateScrollPosition(elem, container, options);
    return scrollTo(y, container, options);
  }

  throw(new Error('elem property is required'))
};
