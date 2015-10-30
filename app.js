(function(window, document) {
  document.addEventListener("touchstart", function(){}, true);

  var App = App || {};

  App.button = document.getElementById('lunch');

  App.options = {
    token: window.location.hash.substring(1),
    channel: '#groningen',
    text: '<!here> Lunch!',
    username: 'Bender',
  };

  App.params = Object.keys(App.options).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(App.options[k])
  }).join('&')

  App.button.onclick = function(e) {
    App.button.innerText = 'Posting...';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://slack.com/api/chat.postMessage?' + App.params);
    xhr.onload = function() {
      if (xhr.status === 200) {
        res = JSON.parse(xhr.response);
        if (res.ok == true) {
          App.button.innerText = 'Posted!';
        } else {
          App.button.innerText = res.error;
        }
      } else {
        console.log(xhr.status);
      }
    }
    xhr.send();
    return false;
  }

  return window.App = App;
})(window, document);
