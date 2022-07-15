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
        rankDiv.appendChild(rankP);
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
            case 0:
              dynamicAttemptString = 'One Attempt';
              dynamicId = 'first-streak';
              break;
            case 1:
              dynamicAttemptString = 'Two Attempts';
              dynamicId = 'second-streak';
              break;
            case 2:
              dynamicAttemptString = 'Three Attempts';
              dynamicId = 'third-streak';
              break;
            case 3:
              dynamicAttemptString = 'Four Attempts';
              dynamicId = 'fourth-streak';
              break;
            case 4:
              dynamicAttemptString = 'Five Attempts';
              dynamicId = 'fifth-streak';
              break;
            case 5:
              dynamicAttemptString = 'Six Attempts';
              dynamicId = 'sixth-streak';
              break;
          }
          p1.id = dynamicId;
          p1.innerHTML = `${dynamicAttemptString}:`;
          p1.style.marginLeft = '0.25rem';
          p2.innerHTML = attempt;
          p2.style.textAlign = 'center';

          streakContainer.appendChild(p1);
          streakContainer.appendChild(p2);
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
        currentScoreContainer.appendChild(p3);
        currentScoreContainer.appendChild(p5);
        totalGamesContainer.appendChild(p4);
        totalGamesContainer.appendChild(p6);
        scoreContainer.appendChild(currentScoreContainer);
        scoreContainer.appendChild(totalGamesContainer);
        scoreContainer.classList.add('current-score-lb');
        streakContainer.classList.add('streakContainerInner');
        userContainer.appendChild(rankDiv);
        userContainer.appendChild(usernameH2);
        userContainer.appendChild(streakContainer);
        userContainer.appendChild(scoreContainer);
        userContainer.classList.add('userContainer');
        mainContainer.appendChild(userContainer);
      });
  });
});
