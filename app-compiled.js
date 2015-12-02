'use strict';

(function (window, document) {
  document.addEventListener("touchstart", function () {}, true);

  var App = App || {};

  var button = document.querySelector('#lunch');

  App.options = {
    token: window.location.hash.substring(1),
    channel: '#groningen',
    text: '<!here> Lunch!',
    username: 'Bender'
  };

  var params = Object.keys(App.options).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(App.options[k]);
  }).join('&');

  button.onclick = function (e) {
    button.innerText = 'Posting...';
    fetch('https://slack.com/api/chat.postMessage?' + params, { method: 'POST' }).then(function (res) {
      if (res.ok == true) {
        button.innerText = 'Posted!';
      } else {
        button.innerText = res.error;
      }
    })['catch'](function (e) {
      return alert(e);
    });
    return false;
  };

  window.app = App;
})(window, document);
