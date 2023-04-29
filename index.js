import ENGLISH_LAYOUT from './assets/layouts/english-layout.js';
import RUSSIAN_LAYOUT from './assets/layouts/russian-layout.js';
import ALPHABETS from './assets/layouts/alphabet.js';

let defaultLayout;

if (localStorage.getItem('layout') && localStorage.getItem('layout') === 'Rus') {
  defaultLayout = RUSSIAN_LAYOUT;
} else {
  defaultLayout = ENGLISH_LAYOUT;
}

class Key {
  constructor() {
    this.key = document.createElement('div');
  }

  setAttribute(layout) {
    this.key.setAttribute('code', layout[layout.length - 1]);
  }

  addClass(layout) {
    this.key.classList.add('keyboard__button');
    this.key.classList.add(layout[0]);
  }

  addSymbols(layout) {
    const [, primarySymbol, secondarySymbol] = layout;
    let symbol = document.createElement('p');
    if (this.key.classList.contains('keyboard__button_common-button')) {
      symbol.classList.add('keyboard__secondary-symbol');
      symbol.innerHTML = secondarySymbol.toUpperCase();
      this.key.append(symbol);
      symbol = document.createElement('p');
      symbol.classList.add('keyboard__primary-symbol');
      symbol.innerHTML = primarySymbol.toUpperCase();
      this.key.append(symbol);
    } else {
      symbol.classList.add('keyboard__primary-symbol');
      symbol.innerHTML = primarySymbol;
      this.key.append(symbol);
    }
  }
}

function createInputBox() {
  const documentBody = document.querySelector('body');

  // create wrapper

  let wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  documentBody.prepend(wrapper);

  // create text-box
  let textBox = document.createElement('textarea');
  textBox.className = 'text-box';
  textBox.autofocus = true;
  textBox.cols = '30';
  textBox.rows = '5';
  wrapper = document.querySelector('.wrapper');
  wrapper.append(textBox);
  textBox = document.querySelector('.text-box');

  // create current layout indicator

  const currentLayout = document.createElement('p');
  currentLayout.className = 'current-language';
  if (defaultLayout === ENGLISH_LAYOUT) {
    currentLayout.innerHTML = 'Eng';
  } else {
    currentLayout.innerHTML = 'Rus';
  }
  wrapper.append(currentLayout);
}

createInputBox();

function createKeyboard(layout) {
  // create keyboard
  let keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  const wrapper = document.querySelector('.wrapper');
  wrapper.append(keyboard);
  keyboard = document.querySelector('.keyboard');
  keyboard.addEventListener('mousedown', (event) => {
    event.preventDefault();
  });

  Object.keys(layout).forEach((key) => {
    if (layout[key][0] !== 'keyboard__button_arrow-up'
    && layout[key][0] !== 'keyboard__button_arrow-down') {
      const keyboardKey = new Key();
      keyboardKey.addClass(layout[key]);
      keyboardKey.addSymbols(layout[key]);
      keyboardKey.setAttribute(layout[key]);
      keyboard.append(keyboardKey.key);
    } else {
      let keyUpAndDownWrapper = document.createElement('div');
      keyUpAndDownWrapper.classList.add('keyboard__button-arrow-up-and-down-wrapper');
      keyboard.append(keyUpAndDownWrapper);
      keyUpAndDownWrapper = document.querySelector('.keyboard__button-arrow-up-and-down-wrapper');
      const keyboardKey = new Key();
      keyboardKey.addClass(layout[key]);
      keyboardKey.addSymbols(layout[key]);
      keyboardKey.setAttribute(layout[key]);
      keyUpAndDownWrapper.append(keyboardKey.key);
    }
  });

  const notification = document.createElement('p');
  if (defaultLayout === ENGLISH_LAYOUT) {
    notification.innerHTML = 'Keyboard created for WindowsOS. To change layout press shift + ctrl';
  } else {
    notification.innerHTML = 'Клавиатура создана для WindowsOS. Чтобы сменить раскладку, нажмите shift + ctrl';
  }
  notification.classList.add('keyboard__secondary-symbol');
  wrapper.append(notification);
}

createKeyboard(defaultLayout);

const currentLayoutIndicator = document.querySelector('.current-language');

function switchLayout() {
  const notification = document.querySelector('body > div > p.keyboard__secondary-symbol');
  const primarySymbols = document.querySelectorAll('.keyboard__button_common-button > .keyboard__primary-symbol');
  const secondarySymbols = document.querySelectorAll('.keyboard__button_common-button > .keyboard__secondary-symbol');
  const primarySymbolinLayout = [];
  const secondarySymbolinLayout = [];
  if (defaultLayout === ENGLISH_LAYOUT) {
    defaultLayout = RUSSIAN_LAYOUT;
    currentLayoutIndicator.innerHTML = 'Rus';
    notification.innerHTML = 'Клавиатура создана для WindowsOS. Чтобы сменить раскладку, нажмите shift + ctrl';
  } else {
    defaultLayout = ENGLISH_LAYOUT;
    currentLayoutIndicator.innerHTML = 'Eng';
    notification.innerHTML = 'Keyboard created for WindowsOS. To change layout press shift + ctrl';
  }
  Object.keys(defaultLayout).forEach((key) => {
    if (defaultLayout[key][0] === 'keyboard__button_common-button') {
      primarySymbolinLayout.push(defaultLayout[key][1]);
      secondarySymbolinLayout.push(defaultLayout[key][2]);
    }
  });
  for (let i = 0; i < primarySymbolinLayout.length; i += 1) {
    primarySymbols[i].innerHTML = primarySymbolinLayout[i].toUpperCase();
    secondarySymbols[i].innerHTML = secondarySymbolinLayout[i].toUpperCase();
  }
}

const keyboardKeys = document.querySelectorAll('.keyboard__button');
const textBox = document.querySelector('.text-box');
textBox.addEventListener('blur', () => {
  keyboardKeys.forEach((key) => {
    key.classList.remove('keyboard__button_active');
  });
});

function isShiftPressed() {
  return keyboardKeys[52].classList.contains('keyboard__button_active')
    || keyboardKeys[41].classList.contains('keyboard__button_active');
}

function isCtrlPressed() {
  return keyboardKeys[58].classList.contains('keyboard__button_active')
    || keyboardKeys[53].classList.contains('keyboard__button_active');
}

// events for keydown on physical keyboard
document.addEventListener('keydown', (button) => {
  const buttonCode = button.code;

  if (ALPHABETS.includes(button.key) && (button.key.toUpperCase() !== button.code.slice(3))) {
    defaultLayout = ENGLISH_LAYOUT;
    switchLayout();
  } else if (ALPHABETS.includes(button.key)
  && (button.key.toUpperCase() === button.code.slice(3))) {
    defaultLayout = RUSSIAN_LAYOUT;
    switchLayout();
  }

  keyboardKeys.forEach((key) => {
    // push CapsLock button toggle active class
    if (buttonCode === 'CapsLock' && key.getAttribute('code') === buttonCode) {
      key.classList.toggle('keyboard__button_active');
      // push any other button add active classe
    } else if (key.getAttribute('code') === buttonCode && key.getAttribute('code') !== 'CapsLock') {
      key.classList.add('keyboard__button_active');
    }
  });

  // push shift + ctrl to switch layout
  if ((isCtrlPressed() && isShiftPressed()) || (button.shiftKey && button.ctrlKey)) {
    switchLayout();
    // push Tab button
  } else if (button.code === 'Tab') {
    button.preventDefault();
    textBox.value = `${textBox.value}\t`;
    // push Alt button
  } else if (button.altKey) {
    button.preventDefault();
  }
});
document.addEventListener('keyup', (button) => {
  const buttonCode = button.code;
  // remove active class wheh button realised except CapsLock
  keyboardKeys.forEach((key) => {
    if (key.getAttribute('code') === buttonCode && key.getAttribute('code') !== 'CapsLock') {
      key.classList.remove('keyboard__button_active');
    }
  });
});
let counter = 0;
let startSelection = 0;
textBox.addEventListener('click', () => {
  counter = 0;
  // determine current cursor position
  startSelection = textBox.selectionStart;
});

function pushSymbol(inputString, symbol) {
  const string = inputString;
  // push symbol in the end of the string
  if (string.selectionStart === string.value.length) {
    string.value += symbol;
  } else {
    // push symbol in any place except strings end
    const beforeCursor = string.value.slice(0, string.selectionStart);
    const afterCursor = string.value.slice(string.selectionStart, textBox.value.length);
    let cursorPosition = string.selectionStart;
    string.value = `${beforeCursor}${symbol}${afterCursor}`;
    cursorPosition += 1;
    string.selectionStart = cursorPosition;
    string.selectionEnd = cursorPosition;
  }
}

function moveCoursorVertically(button) {
  const cursorPosition = textBox.selectionStart;
  const { value } = textBox;
  const lineIndex = value.substr(0, cursorPosition).split('\n').length - 1;
  const lines = value.split('\n');
  if (button.classList.contains('keyboard__button_arrow-up')) {
    if (lineIndex > 0) {
      const newPosition = textBox.selectionStart - lines[lineIndex - 1].length - 1;
      textBox.setSelectionRange(newPosition, newPosition);
    }
  } else if (lineIndex < value.split('\n').length - 1) {
    const newPosition = textBox.selectionStart + lines[lineIndex].length + 1;
    textBox.setSelectionRange(newPosition, newPosition);
  }
}

// events for click on virtual keyboard
keyboardKeys.forEach((key) => {
  key.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (key.classList.contains('keyboard__button_common-button')) { // click on common-button
      if (isShiftPressed() && keyboardKeys[28].classList.contains('keyboard__button_active')) {
        if (ALPHABETS.includes(key.lastChild.innerHTML.toLowerCase())) {
          pushSymbol(textBox, key.lastChild.innerHTML.toLowerCase());
          keyboardKeys[41].classList.remove('keyboard__button_active');
          keyboardKeys[52].classList.remove('keyboard__button_active');
        } else {
          pushSymbol(textBox, key.firstChild.innerHTML);
          keyboardKeys[41].classList.remove('keyboard__button_active');
          keyboardKeys[52].classList.remove('keyboard__button_active');
        }
      } else if (isShiftPressed()) {
        if (ALPHABETS.includes(key.lastChild.innerHTML.toLowerCase())) {
          pushSymbol(textBox, key.lastChild.innerHTML);
          keyboardKeys[41].classList.remove('keyboard__button_active');
          keyboardKeys[52].classList.remove('keyboard__button_active');
        } else {
          pushSymbol(textBox, key.firstChild.innerHTML);
          keyboardKeys[41].classList.remove('keyboard__button_active');
          keyboardKeys[52].classList.remove('keyboard__button_active');
        }
      } else if (keyboardKeys[28].classList.contains('keyboard__button_active')) {
        pushSymbol(textBox, key.lastChild.innerHTML);
      } else {
        pushSymbol(textBox, key.lastChild.innerHTML.toLowerCase());
      }
    } else if (key.classList.contains('keyboard__button_backspace')) { // click on backspace
      if (textBox.selectionStart === textBox.value.length) {
        textBox.value = textBox.value.slice(0, textBox.value.length - 1);
      } else if (textBox.selectionStart !== 0) {
        let beforeCursor = textBox.value.slice(0, textBox.selectionStart);
        const afterCursor = textBox.value.slice(textBox.selectionStart, textBox.value.length);
        let cursorPosition = textBox.selectionStart;
        beforeCursor = beforeCursor.slice(0, beforeCursor.length - 1);
        textBox.value = `${beforeCursor}${afterCursor}`;
        cursorPosition -= 1;
        textBox.selectionStart = cursorPosition;
        textBox.selectionEnd = cursorPosition;
      }
    } else if (key.classList.contains('keyboard__button_tab')) { // click on tab
      pushSymbol(textBox, '\t');
    } else if (key.classList.contains('keyboard__button_enter')) { // click on enter
      pushSymbol(textBox, '\n');
    } else if (key.classList.contains('keyboard__button_space')) { // click on space
      pushSymbol(textBox, ' ');
    } else if (key.classList.contains('keyboard__button_caps-lock')) { // click on caps lock
      key.classList.toggle('keyboard__button_active');
    } else if (key.classList.contains('keyboard__button_left-shift')) { // click on left-shift
      if (isCtrlPressed()) {
        switchLayout();
        keyboardKeys[58].classList.remove('keyboard__button_active');
        keyboardKeys[53].classList.remove('keyboard__button_active');
      } else if (key.classList.contains('keyboard__button_active')) {
        key.classList.remove('keyboard__button_active');
      } else {
        keyboardKeys[52].classList.remove('keyboard__button_active');
        key.classList.add('keyboard__button_active');
      }
    } else if (key.classList.contains('keyboard__button_right-shift')) { // click on right-shift
      if (isCtrlPressed()) {
        switchLayout();
        keyboardKeys[58].classList.remove('keyboard__button_active');
        keyboardKeys[53].classList.remove('keyboard__button_active');
      } else if (key.classList.contains('keyboard__button_active')) {
        key.classList.remove('keyboard__button_active');
      } else {
        keyboardKeys[41].classList.remove('keyboard__button_active');
        key.classList.add('keyboard__button_active');
      }
    } else if (key.classList.contains('keyboard__button_left-ctrl')) { // click on left-ctrl
      if (isShiftPressed()) {
        switchLayout();
        keyboardKeys[52].classList.remove('keyboard__button_active');
        keyboardKeys[41].classList.remove('keyboard__button_active');
      } else if (key.classList.contains('keyboard__button_active')) {
        key.classList.remove('keyboard__button_active');
      } else {
        keyboardKeys[58].classList.remove('keyboard__button_active');
        key.classList.add('keyboard__button_active');
      }
    } else if (key.classList.contains('keyboard__button_right-ctrl')) { // click on right-ctrl
      if (isShiftPressed()) {
        switchLayout();
        keyboardKeys[52].classList.remove('keyboard__button_active');
        keyboardKeys[41].classList.remove('keyboard__button_active');
      } else if (key.classList.contains('keyboard__button_active')) {
        key.classList.remove('keyboard__button_active');
      } else {
        keyboardKeys[53].classList.remove('keyboard__button_active');
        key.classList.add('keyboard__button_active');
      }
    } else if (key.classList.contains('keyboard__button_slash')) { // click on slash
      textBox.value += key.lastChild.innerHTML;
    } else if (key.classList.contains('keyboard__button_left-alt')) { // click on left-alt
      if (key.classList.contains('keyboard__button_active')) {
        key.classList.remove('keyboard__button_active');
      } else {
        keyboardKeys[57].classList.remove('keyboard__button_active');
        key.classList.add('keyboard__button_active');
      }
    } else if (key.classList.contains('keyboard__button_right-alt')) { // click on right-alt
      if (key.classList.contains('keyboard__button_active')) {
        key.classList.remove('keyboard__button_active');
      } else {
        keyboardKeys[55].classList.remove('keyboard__button_active');
        key.classList.add('keyboard__button_active');
      }
    } else if (key.classList.contains('keyboard__button_arrow-left')) { // click on left-arrow
      if (keyboardKeys[52].classList.contains('keyboard__button_active')
              || keyboardKeys[41].classList.contains('keyboard__button_active')) {
        if (textBox.selectionStart === textBox.selectionEnd) {
          textBox.selectionStart -= 1;
          counter -= 1;
        } else if (counter < 0) {
          if (textBox.selectionStart > 0) {
            textBox.selectionStart -= 1;
            counter -= 1;
          }
        } else if (counter > 0) {
          textBox.selectionEnd -= 1;
          counter -= 1;
        } else {
          textBox.selectionStart = startSelection;
          textBox.selectionEnd = startSelection;
        }
      } else if (textBox.selectionStart > 0) {
        textBox.selectionEnd = textBox.selectionStart;
        textBox.selectionStart -= 1;
        textBox.selectionEnd -= 1;
      } else {
        textBox.selectionStart = 0;
        textBox.selectionEnd = 0;
      }
    } else if (key.classList.contains('keyboard__button_arrow-right')) { // click on right-arrow
      if (keyboardKeys[52].classList.contains('keyboard__button_active')
              || keyboardKeys[41].classList.contains('keyboard__button_active')) {
        if (textBox.selectionStart === textBox.selectionEnd) {
          textBox.selectionEnd += 1;
          counter += 1;
        } else if (counter < 0) {
          textBox.selectionStart += 1;
          counter += 1;
        } else if (counter > 0) {
          if (textBox.selectionEnd < textBox.value.length) {
            textBox.selectionEnd += 1;
            counter += 1;
          }
        } else {
          textBox.selectionStart = startSelection;
          textBox.selectionEnd = startSelection;
        }
      } else if (textBox.selectionStart < textBox.value.length) {
        textBox.selectionEnd = textBox.selectionStart;
        textBox.selectionEnd += 1;
        textBox.selectionStart += 1;
      } else {
        textBox.selectionStart = textBox.value.length;
        textBox.selectionEnd = textBox.value.length;
      }
    } else if (key.classList.contains('keyboard__button_arrow-up')) { // click on up-arrow
      moveCoursorVertically(key);
    } else if (key.classList.contains('keyboard__button_arrow-down')) { // click on down-arrow
      moveCoursorVertically(key);
    }
  });
});

function setLocalStorage() {
  localStorage.setItem('layout', currentLayoutIndicator.innerHTML);
}

window.addEventListener('beforeunload', setLocalStorage);
