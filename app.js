// WORDLE CLONE
// Chris Donohue
// prettier-ignore
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHEATER CHEATER CHEATER CLOSE THE DEV TOOLS !!!!!!!!!!!!!!!!!!!!!!!!!
const POTENTIAL_WORDS = ['SPARK','MANGO','SPLAT','TOUCH','CLOWN','HAPPY', 'TOWEL', 'ALPHA', 'ATONE', 'BAYOU',
 'MOVIE', 'MAKES','SKATE','OOZES', 'SPEAR', 'BOARD', 'BORED', 'CLAMP','NORTH', 'OPERA', 'CRATE', 'GREAT', 'FAITH',
'FORTH', 'LUNCH', 'MORAL', 'WATER', 'ROGUE', 'GLOOM', 'SAPPY', 'ORDER', 'HARDY', 'STOUT', 'EERIE', 'PURSE', 'CURSE',
'CHORD', 'NAKED', 'WRATH', 'KNEEL', 'GNOME', 'EXTRA', 'TOXIC', 'HEAVE', 'MOTOR', 'YEARN', 'DRAWN', 'ULTRA', 'POLAR',
'LUCKY', 'JELLY', 'KOALA', 'EVENT', 'DELTA', 'HONOR', 'TIGHT', 'ABODE', 'WHARF', 'SOOTH'];

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

let ANSWER =
  POTENTIAL_WORDS[Math.floor(Math.random() * POTENTIAL_WORDS.length)];

console.log(ANSWER);

const winOrLose = document.querySelector('.win-or-loss-container');
const KEYBOARD = [...document.querySelectorAll('.key')];
const NEWGAME = document.querySelector('.btn-new-game');

let score = localStorage.getItem('score') ? +localStorage.getItem('score') : 0;

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
                  nodes[i].style.backgroundColor === 'rgb(204, 204, 0)' &&
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
      // WIN
      if (attempts[key].correct === true) {
        switch (key) {
          case 'first':
            score += 150;
            break;
          case 'second':
            score += 125;
            break;
          case 'third':
            score += 100;
            break;
          case 'fourth':
            score += 50;
            break;
          case 'fifth':
            score += 25;
            break;
          case 'sixth':
            score += 10;
            break;
        }
        winOrLose.style.display = 'grid';
        winOrLose.style.borderColor = 'green';
        winOrLose.childNodes[1].childNodes[0].innerHTML = `${
          SUCCESS_WORDS[Math.floor(Math.random() * SUCCESS_WORDS.length)]
        }!`;
        winOrLose.style.color = 'green';
        winOrLose.childNodes[3].childNodes[0].innerHTML = `Current Score: \n${score}`;
        winOrLose.childNodes[3].childNodes[0].style.fontSize = '2.6rem';
        NEWGAME.style.borderColor = 'green';
        NEWGAME.style.backgroundColor = 'green';

        localStorage.setItem('score', score);
      }
      // OUT OF ATTEMPTS
      if (key === 'sixth' && attempts[key].correct === false) {
        winOrLose.style.display = 'grid';
        winOrLose.style.borderColor = 'red';
        winOrLose.childNodes[1].childNodes[0].innerHTML = `${
          FAIL_WORDS[Math.floor(Math.random() * FAIL_WORDS.length)]
        }...`;
        winOrLose.style.color = 'red';
        winOrLose.childNodes[3].childNodes[0].innerHTML = `Final Score: \n${score}`;
        winOrLose.childNodes[3].childNodes[0].style.fontSize = '2.6rem';
        NEWGAME.style.borderColor = 'red';
        NEWGAME.style.backgroundColor = 'red';
        score = 0;
        localStorage.setItem('score', score);
      }
      keyboardIndex = 0;
      break;
    }
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
        console.log(key.innerHTML);
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
