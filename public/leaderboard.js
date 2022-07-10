async function callFetch(json) {
  const res = await fetch('http://localhost:3000/users', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return res.json();
}

// function register(event) {
//   event.preventDefault();
//   let obj = {
//     username: event.target[0].value,
//     password: Number(event.target[1].value),
//   };
//   let json = JSON.stringify(obj);
//   callFetch(json).then((data) => console.log(data));
// }

let mainContainer = document.querySelector('.main-leaderboard-container');

document.addEventListener('DOMContentLoaded', () => {
  callFetch().then((data) => {
    console.log(data);
    data.forEach((user) => {
      let userContainer = document.createElement('div');
      let usernameH2 = document.createElement('h2');
      let streakContainer = document.createElement('div');
      let attempts = [
        user.firstAttempts,
        user.secondAttempts,
        user.thirdAttempts,
        user.fourthAttempts,
        user.fifthAttempts,
        user.sixthAttempts,
      ];
      console.log(attempts);
      usernameH2.innerHTML = user.username;
      attempts.forEach((attempt, i) => {
        let dynamicAttemptString;
        let dynamicId;
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        switch (i) {
          case (i = 0):
            dynamicAttemptString = 'One Attempt';
            dynamicId = 'first-streak';
            break;
          case (i = 1):
            dynamicAttemptString = 'Two Attempts';
            dynamicId = 'second-streak';
            break;
          case (i = 2):
            dynamicAttemptString = 'Three Attempts';
            dynamicId = 'third-streak';
            break;
          case (i = 3):
            dynamicAttemptString = 'Four Attempts';
            dynamicId = 'fourth-streak';
            break;
          case (i = 4):
            dynamicAttemptString = 'Five Attempts';
            dynamicId = 'fifth-streak';
            break;
          case (i = 5):
            dynamicAttemptString = 'Six Attempts';
            dynamicId = 'sixth-streak';
            break;
        }
        p1.id = dynamicId;
        p1.innerHTML = `${dynamicAttemptString}:`;
        p1.style.marginLeft = '0.25rem';
        p2.innerHTML = attempt;
        p2.style.textAlign = 'center';
        streakContainer.append(p1);
        streakContainer.append(p2);
      });
      streakContainer.classList.add('streakContainerInner');
      userContainer.append(usernameH2);
      userContainer.append(streakContainer);
      userContainer.classList.add('userContainer');
      mainContainer.append(userContainer);
    });
  });
});
