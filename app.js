// WORDLE CLONE
// Chris Donohue
// prettier-ignore
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHEATER CHEATER CHEATER CLOSE THE DEV TOOLS !!!!!!!!!!!!!!!!!!!!!!!!!
const POTENTIAL_WORDS = ['SPARK','MANGO','SPLAT','TOUCH','CLOWN','HAPPY', 'TOWEL', 'ALPHA', 'ATONE', 'BAYOU',
 'MOVIE', 'MAKES','SKATE','OOZES', 'SPEAR', 'BOARD', 'BORED', 'CLAMP','NORTH', 'OPERA', 'CRATE', 'GREAT', 'FAITH',
'FORTH', 'LUNCH', 'MORAL', 'WATER', 'ROGUE', 'GLOOM', 'SAPPY', 'ORDER', 'HARDY', 'STOUT', 'EERIE', 'PURSE', 'CURSE',
'CHORD', 'NAKED', 'WRATH', 'KNEEL', 'GNOME', 'EXTRA', 'TOXIC', 'HEAVE', 'MOTOR', 'YEARN', 'DRAWN', 'ULTRA', 'POLAR',
'LUCKY', 'JELLY', 'KOALA', 'EVENT', 'DELTA', 'HONOR', 'TIGHT', 'ABODE', 'WHARF', 'SOOTH'];

let ANSWER =
  POTENTIAL_WORDS[Math.floor(Math.random() * POTENTIAL_WORDS.length)];

console.log(ANSWER);

const winOrLose = document.querySelector('.win-or-loss-container');

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
const submitButton = document.querySelector('.submit');

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
            nodes[i].style.backgroundColor = '#CCCC00';
            tempNodes.push(nodes[i]);
          } else {
            nodes[i].style.backgroundColor = '#404040';
          }

          if (letter === ANSWER[i]) {
            nodes[i].style.backgroundColor = 'green';
            if (attemptedLetterToWatch.amount >= letterToWatch.amount) {
              for (let i = 0; i < nodes.length; i++) {
                if (
                  nodes[i].style.backgroundColor === 'rgb(204, 204, 0)' &&
                  nodes[i].value.toUpperCase() ===
                    attemptedLetterToWatch.character &&
                  i !== 3
                ) {
                  nodes[i].style.backgroundColor = '#404040';
                  // attemptedLetterToWatch.amount--;
                  break;
                  // tempNodes.shift();
                }
              }
            }
          }
        } else {
          nodes[i].style.backgroundColor = '#404040';
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
        winOrLose.style.display = 'initial';
        winOrLose.style.borderColor = 'green';
        winOrLose.firstChild.textContent = 'Win!';
        winOrLose.style.color = 'green';
        submitButton.style.pointerEvents = 'none';
        winOrLose.children[1].textContent = '☺';
      }
      // OUT OF ATTEMPTS
      if (key === 'sixth' && attempts[key].correct === false) {
        winOrLose.style.display = 'initial';
        winOrLose.style.borderColor = 'red';
        winOrLose.firstChild.textContent = 'Loss!';
        winOrLose.style.color = 'red';
        submitButton.style.pointerEvents = 'none';
        winOrLose.children[1].textContent = '☹';
      }
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

submitButton.addEventListener('click', checkWord);

document.addEventListener('keydown', (e) => {
  console.log(e);
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
