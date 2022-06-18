// WORDLE CLONE
// Chris Donohue - June 18th, 2022
// TODO: Implement ability to check for potential words, find some way to get words from dictionary api?

// prettier-ignore
const POTENTIAL_WORDS = ['SPARK','MANGO','SPLAT','TOUCH','CLOWN','HAPPY', 'TOWEL', 'ALPHA', 'ATONE', 'BAYOU',
 'RAFTS', 'MAKES','SKATE','OOZES', 'SPEAR', 'BOARD', 'BORED', 'CLAMP','LAMPS', 'OPERA', 'CRATE', 'GREAT', 'FAITH',
'LOFTS', 'BOMBS', 'OVALS', 'WATER', 'ROGUE', 'GLOOM', 'SAPPY', 'ORDER', 'HARDY', 'STOUT', 'EERIE', 'PURSE', 'CURSE'];

const ANSWER =
  POTENTIAL_WORDS[Math.floor(Math.random() * POTENTIAL_WORDS.length)];
console.log(ANSWER);
const winOrLose = document.querySelector('.win-or-loss-container');
let attempts = {
  first: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
  second: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
  third: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
  fourth: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
  fifth: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
  sixth: {
    attempted: false,
    correct: null,
    wordEntered: '',
  },
};
const submitButton = document.querySelector('.submit');

const checkWord = () => {
  let letters;
  let wordEntered;
  let nodes;

  for (const key in attempts) {
    if (attempts[key].attempted === false) {
      nodes = [...document.querySelectorAll(`.${key}-word`)];
      console.log(nodes);
      letters = nodes.map((input) => input.value.toUpperCase());
      wordEntered = letters.join('');
      letters.forEach((letter, i) => {
        if (ANSWER.includes(letter)) {
          nodes[i].style.backgroundColor = '#CCCC00';
          if (letter === ANSWER[i]) {
            nodes[i].style.backgroundColor = 'green';
          }
        } else {
          nodes[i].style.backgroundColor = '#404040';
        }
      });

      attempts[key].wordEntered = wordEntered;
      attempts[key].attempted = true;
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

submitButton.addEventListener('click', checkWord);
