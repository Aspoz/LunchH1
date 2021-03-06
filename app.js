((window, document) => {
  document.addEventListener("touchstart", () => {}, true);

  const App = {};

  var button = document.querySelector('#lunch');

  App.options = {
    token: window.location.hash.substring(1),
    channel: '#groningen',
    text: '<!here> Lunch!',
    username: 'Bender'
  };

  var params = Object.keys(App.options).map(k => {
    return encodeURIComponent(k) + '=' + encodeURIComponent(App.options[k]);
  }).join('&');

  button.onclick = e => {
    button.innerText = 'Posting...';
    fetch(`https://slack.com/api/chat.postMessage?${ params }`, { method: 'POST' }).then(res => {
      if (res.ok == true) {
        button.innerText = 'Posted!';
      } else {
        button.innerText = res.error;
      }
    }).catch(e => alert(e));
    return false;
  };

  window.app = App;
})(window, document);
