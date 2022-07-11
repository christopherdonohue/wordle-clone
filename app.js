// WORDLE CLONE
// Chris Donohue

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHEATER CHEATER CHEATER CLOSE THE DEV TOOLS !!!!!!!!!!!!!!!!!!!!!!!!!
const POTENTIAL_WORDS = [
  'SPARK',
  'MANGO',
  'SPLAT',
  'TOUCH',
  'CLOWN',
  'HAPPY',
  'TOWEL',
  'ALPHA',
  'ATONE',
  'BAYOU',
  'MOVIE',
  'MAKES',
  'SKATE',
  'OOZES',
  'SPEAR',
  'BOARD',
  'BORED',
  'CLAMP',
  'NORTH',
  'OPERA',
  'CRATE',
  'GREAT',
  'FAITH',
  'FORTH',
  'LUNCH',
  'MORAL',
  'WATER',
  'ROGUE',
  'GLOOM',
  'SAPPY',
  'ORDER',
  'HARDY',
  'STOUT',
  'EERIE',
  'PURSE',
  'CURSE',
  'CHORD',
  'NAKED',
  'WRATH',
  'KNEEL',
  'GNOME',
  'EXTRA',
  'TOXIC',
  'HEAVE',
  'MOTOR',
  'YEARN',
  'DRAWN',
  'ULTRA',
  'POLAR',
  'LUCKY',
  'JELLY',
  'KOALA',
  'EVENT',
  'DELTA',
];
const POTENTIAL_WORDS_TWO = [
  'HONOR',
  'TIGHT',
  'ABODE',
  'WHARF',
  'SOOTH',
  'CRAMP',
  'SPACE',
  'ROUGH',
  'FIFTH',
  'SIXTH',
  'DROWN',
  'ONION',
  'NOISE',
  'JADED',
  'PANTS',
  'VENUS',
  'GRAPH',
  'MORPH',
  'SWORD',
  'METER',
  'NORSE',
  'UDDER',
  'VOWEL',
  'QUIRK',
  'QUEUE',
  'MAGIC',
  'PANIC',
  'ALTER',
  'BOUTS',
  'NEXUS',
  'GRAPE',
  'MOURN',
  'EPOCH',
  'SCORN',
  'SALAD',
  'COMFY',
  'UNZIP',
  'LOFTY',
  'SCREW',
  'PRUNE',
  'JOYED',
  'LEMON',
  'NOTED',
  'SPOIL',
  'TAXED',
  'MAXED',
  'GRASS',
  'FROTH',
  'LOOPY',
  'EIGHT',
  'LLAMA',
  'CLOSE',
  'FORUM',
  'BURNT',
  'SHIFT',
  'ENTER',
  'SCARE',
  'RESIN',
  'STORM',
  'CREAM',
  'DREAM',
  'TANGO',
  'BULGE',
  'YOUNG',
  'HOTEL',
  'SPANK',
  'AGILE',
  'PUNCH',
  'MILKY',
  'SNAKE',
  'SNAIL',
  'ADORE',
  'SCUBA',
  'POWER',
  'SMOKE',
  'SUNNY',
  'MUMMY',
  'IRONY',
  'IVORY',
  'SOUTH',
  'ANGER',
  'FUZZY',
  'PIZZA',
  'SNACK',
  'HAIRY',
  'CROWN',
];

const SUCCESS_WORDS = [
  'Nice',
  'Excellent',
  'Keep Going',
  'Rock On',
  'Hell Yeah',
  'Amazing',
  'You Got It',
];
const FAIL_WORDS = [
  'OOF',
  'SORRY',
  'NEXT TIME',
  'NOT QUITE',
  "CAN'T WIN EM ALL",
  'YIKES',
  'NOPE',
];

let randomWordArr = [POTENTIAL_WORDS, POTENTIAL_WORDS_TWO];
randomWordArr = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];
let ANSWER = randomWordArr[Math.floor(Math.random() * randomWordArr.length)];

console.log(ANSWER);

const winOrLose = document.querySelector('.win-or-loss-container');
const KEYBOARD = [...document.querySelectorAll('.key')];
const NEWGAME = document.querySelector('.btn-new-game');
let correctWord = document.querySelector('.correct-word');
let streakNodes = [...document.querySelectorAll('.streak')];
let streakAmountNodes = [...document.querySelectorAll('.streak-amount')];
let streakHeader = document.querySelector('.streak-win-or-loss');
let scoreNumber = document.querySelector('.score-number');
let pointsToAdd = document.querySelector('#points-to-add');
let previousScore = document.querySelector('#previous-score');
let newScore = document.querySelector('#new-score');
let scoreLabel = document.querySelector('#current-score-label');
let pointsToAddLabel = document.querySelector('#points-to-add-label');
let previousScoreLabel = document.querySelector('#previous-score-label');
let newScoreLabel = document.querySelector('#new-score-label');
let scoreNumberInner = document.querySelector('.score-number-inner');
let username = document.querySelector('.username');
let usernameFields = [...document.querySelectorAll('.usernameFields')];

let globalWinOrLoss;

let score = localStorage.getItem('score')
  ? JSON.parse(localStorage.getItem('score'))
  : 0;

let finalScoreTemp = 0;

let attempts = {
  first: {
    attempted: false,
    correct: null,
    wordEntered: '',
    nextAttempt: 'second',
  },
  second: {
    attempted: false,
    correct: null,
    wordEntered: '',
    nextAttempt: 'third',
  },
  third: {
    attempted: false,
    correct: null,
    wordEntered: '',
    nextAttempt: 'fourth',
  },
  fourth: {
    attempted: false,
    correct: null,
    wordEntered: '',
    nextAttempt: 'fifth',
  },
  fifth: {
    attempted: false,
    correct: null,
    wordEntered: '',
    nextAttempt: 'sixth',
  },
  sixth: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
};

let scoreStreak = {
  first: {
    streak: score !== 0 ? score.first.streak : 0,
    pointsToIncrement: 200,
    score: score !== 0 ? score.first.score : 0,
  },

  second: {
    streak: score !== 0 ? score.second.streak : 0,
    pointsToIncrement: 150,
    score: score !== 0 ? score.second.score : 0,
  },

  third: {
    streak: score !== 0 ? score.third.streak : 0,
    pointsToIncrement: 100,
    score: score !== 0 ? score.third.score : 0,
  },

  fourth: {
    streak: score !== 0 ? score.fourth.streak : 0,
    pointsToIncrement: 50,
    score: score !== 0 ? score.fourth.score : 0,
  },

  fifth: {
    streak: score !== 0 ? score.fifth.streak : 0,
    pointsToIncrement: 25,
    score: score !== 0 ? score.fifth.score : 0,
  },

  sixth: {
    streak: score !== 0 ? score.sixth.streak : 0,
    pointsToIncrement: 10,
    score: score !== 0 ? score.sixth.score : 0,
  },
  totalScore: score !== 0 ? score.totalScore : 0,
  prevScore: score !== 0 ? score.totalScore : 0,
  totalGames: score !== 0 ? score.totalGames : 0,
};

let keyboardIndex = 0;

const countLetters = (word) => {
  let arr = [];
  let letterAlreadyExists;
  for (let i = 0; i < word.length; i++) {
    let count = { character: null, amount: 0 };
    letterAlreadyExists = arr.some((obj) => obj.character === word[i]);
    if (!letterAlreadyExists) {
      count.character = word[i];
      for (let j = 0; j < word.length; j++) {
        if (word[i] === word[j]) {
          count.amount++;
        }
      }
      arr.push(count);
    }
  }
  return arr;
};

const updateScore = async (scoreJson) => {
  console.log(scoreJson);
  let res;
  // this is kinda stupid
  let id = JSON.parse(localStorage.getItem('mongoId'));
  //let usernameForPatch = JSON.parse(json).username;
  // let patchBody = { username: usernameForPatch };
  patchBody = JSON.stringify(scoreJson);
  if (id !== 'undefined' && id) {
    res = await fetch(
      `https://chrissyword.netlify.app/.netlify/functions/server/${id}/score`,
      {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: patchBody,
      }
    );
  }
};
const checkWord = () => {
  let letters;
  let wordEntered;
  let nodes;
  let nextAttempt;
  let letterCountAnswer;
  let letterCountAttempt;
  let arr2 = [];
  let tempNodes = [];
  let attemptedLetterToWatch;
  let tempAnswer = [...ANSWER];
  let totalScore = 0;
  let prevScore = 0;
  let incrementer;
  let winOrLoss = 'win';
  let scoreJson = {};
  let userScoreTemp;
  let attemptTemp;
  for (const key in attempts) {
    if (attempts[key].attempted === false) {
      nodes = [...document.querySelectorAll(`.${key}-word`)];
      nextAttempt = attempts[key].nextAttempt;
      nextAttemptNodes = [...document.querySelectorAll(`.${nextAttempt}-word`)];
      letters = nodes
        .map((input) => input.value.toUpperCase())
        .filter((entry) => entry !== '');

      if (letters.length < 5) {
        for (let i = letters.length; i < 5; i++) {
          nodes[i].style.borderColor = 'red';

          setTimeout(() => {
            nodes[i].style.borderColor = 'gray';
          }, 800);
        }

        break;
      }
      wordEntered = letters.join('');
      letterCountAnswer = countLetters([...ANSWER]);
      letterCountAttempt = countLetters(letters);

      letters.forEach((letter, i) => {
        if (tempAnswer.includes(letter)) {
          let obj = { character: null, amount: 0 };
          let letterToWatch = letterCountAnswer.find(
            (element) => element.character === letter
          );

          if (arr2.some((el) => el.character === letter)) {
            arr2[arr2.findIndex((el) => el.character === letter)].amount++;
          } else {
            obj.character = letter;
            obj.amount++;
            arr2.push(obj);
          }

          attemptedLetterToWatch = arr2.find(
            (element) => element.character === letter
          );

          if (attemptedLetterToWatch.amount <= letterToWatch.amount) {
            nodes[i].style.backgroundColor = 'rgb(180, 180, 0)';
            nodes[i].style.borderColor = 'rgb(180, 180, 0)';
            tempNodes.push(nodes[i]);
            KEYBOARD.forEach((key) => {
              if (key.innerHTML === letter) {
                key.style.backgroundColor = 'rgb(180, 180, 0)';
                key.style.borderColor = 'rgb(180, 180, 0)';
              }
            });
          } else {
            nodes[i].style.backgroundColor = '#404040';
            nodes[i].style.borderColor = '#404040';
          }

          if (letter === ANSWER[i]) {
            nodes[i].style.backgroundColor = 'green';
            nodes[i].style.borderColor = 'green';
            if (attemptedLetterToWatch.amount >= letterToWatch.amount) {
              for (let i = 0; i < nodes.length; i++) {
                if (
                  nodes[i].style.backgroundColor === 'rgb(180, 180, 0)' &&
                  nodes[i].value.toUpperCase() ===
                    attemptedLetterToWatch.character &&
                  i !== 3
                ) {
                  nodes[i].style.backgroundColor = '#404040';
                  nodes[i].style.borderColor = '#404040';
                  // attemptedLetterToWatch.amount--;
                  break;
                  // tempNodes.shift();
                }
              }
            }
            KEYBOARD.forEach((key) => {
              if (key.innerHTML === letter) {
                key.style.backgroundColor = 'green';
                key.style.borderColor = 'green';
              }
            });
          }
        } else {
          nodes[i].style.backgroundColor = '#404040';
          nodes[i].style.borderColor = '#404040';
          KEYBOARD.forEach((key) => {
            if (key.innerHTML === letter) {
              key.style.backgroundColor = '#404040';
              key.style.borderColor = '#404040';
              key.style.color = 'rgba(255, 255, 255, 0.6)';
            }
          });
        }
      });

      attempts[key].wordEntered = wordEntered;
      attempts[key].attempted = true;
      nodes.forEach((node) => (node.disabled = true));
      nextAttemptNodes.forEach((node) => (node.disabled = false));
      key !== 'sixth' && nextAttemptNodes[0].focus();
      attempts[key].correct = wordEntered === ANSWER;

      // for (const key in scoreStreak) {
      //   console.log(key);
      //   if (key !== 'totalScore' && key !== 'prevScore') {
      //     console.log(scoreStreak.prevScore);
      //     scoreStreak.prevScore += scoreStreak[key].score;
      //   }
      // }

      // WIN

      if (attempts[key].correct === true) {
        scoreStreak.totalGames++;
        let newDiv = document.createElement('div');
        globalWinOrLoss = 'win';
        winOrLoss = 'win';
        switch (key) {
          case 'first':
            scoreStreak[key].streak++;
            scoreStreak[key].score += scoreStreak[key].pointsToIncrement;
            userScoreTemp = scoreStreak[key].streak;
            incrementer = scoreStreak[key].pointsToIncrement;
            attemptTemp = 'firstAttempts';
            break;
          case 'second':
            scoreStreak[key].streak++;
            scoreStreak[key].score += scoreStreak[key].pointsToIncrement;
            userScoreTemp = scoreStreak[key].streak;
            incrementer = scoreStreak[key].pointsToIncrement;
            attemptTemp = 'secondAttempts';
            break;
          case 'third':
            scoreStreak[key].streak++;
            scoreStreak[key].score += scoreStreak[key].pointsToIncrement;
            userScoreTemp = scoreStreak[key].streak;
            incrementer = scoreStreak[key].pointsToIncrement;
            attemptTemp = 'thirdAttempts';
            break;
          case 'fourth':
            scoreStreak[key].streak++;
            scoreStreak[key].score += scoreStreak[key].pointsToIncrement;
            userScoreTemp = scoreStreak[key].streak;
            incrementer = scoreStreak[key].pointsToIncrement;
            attemptTemp = 'fourthAttempts';
            break;
          case 'fifth':
            scoreStreak[key].streak++;
            scoreStreak[key].score += scoreStreak[key].pointsToIncrement;
            userScoreTemp = scoreStreak[key].streak;
            incrementer = scoreStreak[key].pointsToIncrement;
            attemptTemp = 'fifthAttempts';
            break;
          case 'sixth':
            scoreStreak[key].streak++;
            scoreStreak[key].score += scoreStreak[key].pointsToIncrement;
            userScoreTemp = scoreStreak[key].streak;
            incrementer = scoreStreak[key].pointsToIncrement;
            attemptTemp = 'sixthAttempts';
            break;
        }
        winOrLose.style.display = 'grid';
        winOrLose.style.borderColor = 'green';
        winOrLose.childNodes[1].childNodes[0].innerHTML = `${
          SUCCESS_WORDS[Math.floor(Math.random() * SUCCESS_WORDS.length)]
        }!`;
        winOrLose.style.color = 'green';
        // streakHeader.innerHTML = `Current Streak:`;
        streakHeader.style.fontSize = '2rem';
        NEWGAME.style.borderColor = 'green';
        NEWGAME.style.backgroundColor = 'green';
        correctWord.style.display = 'none';
        // localStorage.setItem('score', JSON.stringify(scoreStreak));
      }
      // OUT OF ATTEMPTS
      if (key === 'sixth' && attempts[key].correct === false) {
        scoreStreak.totalGames++;
        globalWinOrLoss = 'loss';
        winOrLoss = 'loss';
        attemptTemp = 'loss';
        let answer = document.createElement('p');
        let finalScore = document.createElement('p');
        let answerWas = document.createElement('p');
        answerWas.innerHTML = 'Answer Was:';
        answerWas.style.marginBottom = 0;
        answer.style.marginTop = 0;
        answer.classList.add('animation');
        finalScore.style.marginTop = 0;
        finalScore.innerHTML = score.score;
        answer.innerHTML = ANSWER;
        winOrLose.style.display = 'grid';
        winOrLose.style.borderColor = 'red';
        winOrLose.childNodes[1].childNodes[0].innerHTML = `${
          FAIL_WORDS[Math.floor(Math.random() * FAIL_WORDS.length)]
        }...`;
        winOrLose.style.color = 'red';
        // streakHeader.innerHTML = `Current Streak:`;
        // winOrLose.childNodes[3].appendChild(finalScore);
        // winOrLose.childNodes[3].firstChild.style.marginBottom = 0;
        NEWGAME.style.borderColor = 'red';
        NEWGAME.style.backgroundColor = 'red';
        correctWord.appendChild(answerWas);
        correctWord.appendChild(answer);
        finalScoreTemp = scoreStreak.totalScore;
        for (const key in scoreStreak) {
          if (key !== 'totalScore' && key !== 'prevScore') {
            scoreStreak[key].score = 0;
          } else {
            scoreStreak.totalScore = 0;
            scoreStreak.prevScore = 0;
          }
        }
        // localStorage.setItem('score', JSON.stringify(scoreStreak));
      }
      keyboardIndex = 0;
      break;
    }
  }

  streakNodes.forEach((node, i) => {
    let key;
    let streak;
    switch (i) {
      case 0:
        key = 'first';
        streak = 'One Attempt';

        break;
      case 1:
        key = 'second';
        streak = 'Two Attempts';

        break;
      case 2:
        key = 'third';
        streak = 'Three Attempts';

        break;
      case 3:
        key = 'fourth';
        streak = 'Four Attempts';

        break;
      case 4:
        key = 'fifth';
        streak = 'Five Attempts';

        break;
      case 5:
        key = 'sixth';
        streak = 'Six Attempts';

        break;
    }
    node.innerHTML = `${streak}:`;
    streakAmountNodes[i].innerHTML = ` ${scoreStreak[key].streak}`;
  });
  let temp32 = 0;
  for (const key in scoreStreak) {
    if (key !== 'totalScore' && key !== 'prevScore' && key !== 'totalGames') {
      temp32 += scoreStreak[key].score;
    }
  }
  scoreStreak.totalScore = temp32;
  // scoreStreak.totalScore = totalScore;
  localStorage.setItem('score', JSON.stringify(scoreStreak));

  scoreJson = {
    attempt: attemptTemp,
    attemptScore: attemptTemp !== 'loss' ? 1 : 0,
    totalScore: attemptTemp !== 'loss' ? scoreStreak.totalScore : 0,
  };

  if (winOrLoss === 'win') {
    pointsToAdd.innerHTML = `${incrementer ? incrementer : 0}`;
    previousScore.innerHTML = `${scoreStreak.prevScore}`;
    newScore.innerHTML = `${scoreStreak.totalScore}`;
  } else {
    scoreLabel.innerHTML = 'Final Score';
    scoreNumberInner.style.gridTemplateColumns = 'auto';
    pointsToAddLabel.style.display = 'none';
    pointsToAdd.style.display = 'none';
    previousScoreLabel.style.display = 'none';
    previousScore.style.display = 'none';
    newScoreLabel.style.display = 'none';
    newScore.innerHTML = finalScoreTemp;
    newScore.style.fontSize = '2rem';
    newScore.style.color = 'rgb(0, 209, 0)';
  }

  if (globalWinOrLoss === 'win' || globalWinOrLoss === 'loss') {
    updateScore(scoreJson);
  }
};
const disableAttempts = () => {
  for (const key in attempts) {
    if (attempts[key].attempted === false) {
      nodes = [...document.querySelectorAll(`.${key}-word`)];
    }
  }
};

document.addEventListener('keydown', (e) => {
  if (e.target.id !== 'usernameField') {
    if (e.key === 'Enter') checkWord();
    else if (e.key !== 'Backspace') {
      if (e.target.value) {
        e.target.nextElementSibling.focus();
      }
    } else if (e.key === 'Backspace') {
      if (!e.target.value) {
        e.target.previousElementSibling.focus();
      }
    }
  }
});

KEYBOARD.forEach((key) => {
  key.addEventListener('click', (e) => {
    const ALLINPUTS = [...document.getElementsByTagName('input')];
    ALLINPUTS.forEach((input) => {
      input.readOnly = true;
    });
    for (const attr in attempts) {
      if (attempts[attr].attempted === false) {
        nodes = [...document.querySelectorAll(`.${attr}-word`)];
        if (key.innerHTML === 'Enter') {
          checkWord();
          break;
        } else if (key.id === 'backspace-key') {
          nodes[keyboardIndex - 1].value = '';
          nodes[keyboardIndex - 1].focus();
          keyboardIndex--;
          break;
        } else {
          nodes[keyboardIndex].value = key.innerHTML;
          nodes[keyboardIndex].nextElementSibling.focus();
          keyboardIndex++;
          break;
        }
      }
    }
  });
});

NEWGAME.addEventListener('click', () => history.go(0));

username.addEventListener('click', () => {
  usernameFields.forEach((field) => {
    if (field.classList.contains('usernameFields')) {
      field.classList.remove('usernameFields');
      field.classList.add('usernameFields-show');
    } else {
      field.classList.add('usernameFields');
      field.classList.remove('usernameFields-show');
    }
  });
});

const callFetch = async (json) => {
  let res;
  // this is kinda stupid
  let id = JSON.parse(localStorage.getItem('mongoId'));
  let usernameForPatch = JSON.parse(json).username;
  let patchBody = { username: usernameForPatch };
  patchBody = JSON.stringify(patchBody);
  if (id !== 'undefined' && id) {
    res = await fetch(
      `https://chrissyword.netlify.app/.netlify/functions/server/${id}`,
      {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: patchBody,
      }
    );
  } else {
    res = await fetch(
      'https://chrissyword.netlify.app/.netlify/functions/server',
      {
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
      }
    );
  }
  return res.json();
};

const submitUsername = (event) => {
  event.preventDefault();
  localStorage.setItem('username', event.target[0].value);
  let obj = {
    username: event.target[0].value,
    firstAttempts: scoreStreak.first.streak,
    secondAttempts: scoreStreak.second.streak,
    thirdAttempts: scoreStreak.third.streak,
    fourthAttempts: scoreStreak.fourth.streak,
    fiveAttempts: scoreStreak.fifth.streak,
    sixAttempts: scoreStreak.sixth.streak,
    currentScore: scoreStreak.totalScore,
    totalGames: scoreStreak.totalGames,
  };
  let json = JSON.stringify(obj);
  callFetch(json).then((data) => {
    console.log(data);
    if (data._id) {
      localStorage.setItem('mongoId', JSON.stringify(data._id));
    }
  });
};
