async function callFetch(json) {
  const res = await fetch('http://localhost:3000/users', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: json,
  });
  return res.json();
}

function register(event) {
  event.preventDefault();
  let obj = {
    username: event.target[0].value,
    password: event.target[1].value,
  };
  let json = JSON.stringify(obj);
  callFetch(json).then((data) => console.log(data));
}
