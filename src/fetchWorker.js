onmessage = function(event) {
  var data = event.data;

  var headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  var req = new Request(data.url, {
    headers,
    body: JSON.stringify(data.payload),
    method: 'POST',
  });

  fetch(req)
    .then(res => res.text())
    .then(postMessage);
};
