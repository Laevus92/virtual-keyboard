import ENGLISH_LAYOUT from "./assets/layouts/english-layout.js";
import RUSSIAN_LAYOUT from "./assets/layouts/russian-layout.js";

function createDom(layout) {
  const documentBody = document.querySelector('body');
  
  // create wrapper 

  let wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  documentBody.prepend(wrapper);
  
  //create text-box
  let textBox = document.createElement('textarea');
  textBox.className = 'text-box';
  textBox.cols = '30';
  textBox.rows = '10';
  wrapper = document.querySelector('.wrapper');
  wrapper.append(textBox);

  //create current layout indicator

  let currentLayout = document.createElement('p');
  currentLayout.className = 'current-language';
  currentLayout.innerHTML = 'Eng'
  wrapper.append(currentLayout)

  //create keyboard
  let keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  wrapper.append(keyboard);
  keyboard = document.querySelector('.keyboard')

  for (let key in layout) {
    let keyboardKey = document.createElement('div');
    keyboardKey.className = 'keyboard__button';
    if (layout[key][0] === 'keyboard__button_common-button') {
      keyboardKey.classList.add(layout[key][0])
      keyboard.append(keyboardKey);
      keyboardKey = document.querySelectorAll('.keyboard__button');
      let secondarySymbol = document.createElement('p');
      secondarySymbol.className = 'keyboard__secondary-symbol';
      secondarySymbol.innerHTML = layout[key][2].toUpperCase()
      let primarySymbol = document.createElement('p');
      primarySymbol.className = 'keyboard__primary-symbol';
      primarySymbol.innerHTML = layout[key][1].toUpperCase()
      keyboardKey[parseInt(key) - 1].append(secondarySymbol)
      keyboardKey[parseInt(key) - 1].append(primarySymbol)
    } else if (layout[key][0] === 'keyboard__button-arrow-up-and-down-wrapper' &&
        layout[key][1] === 'keyboard__button_arrow-up') {
      let buttonUpAndDownWrapper = document.createElement('div');
      buttonUpAndDownWrapper.className = 'keyboard__button-arrow-up-and-down-wrapper';
      keyboard.append(buttonUpAndDownWrapper);
      buttonUpAndDownWrapper = document.querySelector('.keyboard__button-arrow-up-and-down-wrapper');
      let keyUp = document.createElement('div');
      keyUp.className = 'keyboard__button';
      keyUp.classList.add(layout[key][1])
      buttonUpAndDownWrapper.append(keyUp)
      let keyboardKey = document.querySelectorAll('.keyboard__button');
      let primarySymbol = document.createElement('p');
      primarySymbol.className = 'keyboard__primary-symbol';
      primarySymbol.innerHTML = layout[key][2];
      keyboardKey[parseInt(key) - 1].append(primarySymbol);
    } else if (layout[key][0] === 'keyboard__button-arrow-up-and-down-wrapper' &&
    layout[key][1] === 'keyboard__button_arrow-down') {
      let buttonUpAndDownWrapper = document.querySelector('.keyboard__button-arrow-up-and-down-wrapper');
      let keyDown = document.createElement('div');
      keyDown.className = 'keyboard__button';
      keyDown.classList.add(layout[key][1]);
      buttonUpAndDownWrapper.append(keyDown);
      let keyboardKey = document.querySelectorAll('.keyboard__button');
      let primarySymbol = document.createElement('p');
      primarySymbol.className = 'keyboard__primary-symbol';
      primarySymbol.innerHTML = layout[key][2];
      keyboardKey[parseInt(key) - 1].append(primarySymbol);
    } else {
      keyboardKey.classList.add(layout[key][0])
      keyboard.append(keyboardKey);
      keyboardKey = document.querySelectorAll('.keyboard__button');
      let primarySymbol = document.createElement('p');
      primarySymbol.className = 'keyboard__primary-symbol';
      primarySymbol.innerHTML = layout[key][1];
      keyboardKey[parseInt(key) - 1].append(primarySymbol)
    }
  }
}

createDom(ENGLISH_LAYOUT)
