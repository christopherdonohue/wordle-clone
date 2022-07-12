async function callFetch(json) {
  const res = await fetch(
    'https://chrissyword.netlify.app/.netlify/functions/server',
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }
  );
  return res.json();
}

let mainContainer = document.querySelector('.main-leaderboard-container');

document.addEventListener('DOMContentLoaded', () => {
  callFetch().then((data) => {
    data
      .sort((a, b) => b.currentScore - a.currentScore)
      .forEach((user, index) => {
        let userContainer = document.createElement('div');
        let usernameH2 = document.createElement('h2');
        let streakContainer = document.createElement('div');
        let scoreContainer = document.createElement('div');
        let currentScoreContainer = document.createElement('div');
        let totalGamesContainer = document.createElement('div');
        let rankDiv = document.createElement('div');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        let p5 = document.createElement('p');
        let p6 = document.createElement('p');
        let rankP = document.createElement('p');
        rankP.innerHTML = `${index + 1}`;
        rankDiv.classList.add('rank-div');
        rankDiv.append(rankP);
        let attempts = [
          user.firstAttempts,
          user.secondAttempts,
          user.thirdAttempts,
          user.fourthAttempts,
          user.fifthAttempts,
          user.sixthAttempts,
        ];
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
        // this is kinda stupid
        p3.innerHTML = `Current Score`;
        p4.innerHTML = `Total Games`;
        p3.style.marginBottom = `0`;
        p3.style.textDecoration = 'underline';
        p4.style.textDecoration = 'underline';
        p4.style.marginBottom = `0`;
        p4.style.marginTop = `0`;
        p5.style.color = 'rgb(0, 209, 0)';
        p5.style.fontSize = '1.8rem';
        p5.style.marginTop = `0`;
        p5.style.marginBottom = `0.25rem`;
        p6.style.marginTop = `0`;
        p6.style.marginBottom = `0`;
        p6.style.fontSize = '1.8rem';
        p6.style.color = 'rgb(0, 107, 247)';
        p5.innerHTML = user.currentScore;
        p6.innerHTML = user.totalGames;
        currentScoreContainer.append(p3);
        currentScoreContainer.append(p5);
        totalGamesContainer.append(p4);
        totalGamesContainer.append(p6);
        scoreContainer.append(currentScoreContainer);
        scoreContainer.append(totalGamesContainer);
        scoreContainer.classList.add('current-score-lb');
        streakContainer.classList.add('streakContainerInner');
        userContainer.append(rankDiv);
        userContainer.append(usernameH2);
        userContainer.append(streakContainer);
        userContainer.append(scoreContainer);
        userContainer.classList.add('userContainer');
        mainContainer.append(userContainer);
      });
  });
});
