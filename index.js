import ENGLISH_LAYOUT from "./assets/layouts/english-layout.js";
import RUSSIAN_LAYOUT from "./assets/layouts/russian-layout.js";

class Key {
    constructor () {
        this.key = document.createElement('div');
    }

    setAttribute(layout){
        this.key.setAttribute('code', layout[layout.length-1])
    }

    addClass(layoout) {
        this.key.classList.add('keyboard__button')
        this.key.classList.add(layoout[0])
    }

    addSymbols(layout) {
        let symbol = document.createElement('p');
        if (this.key.classList.contains('keyboard__button_common-button')){
            symbol.classList.add('keyboard__secondary-symbol')
            symbol.innerHTML = layout[2].toUpperCase()
            this.key.append(symbol)
            symbol = document.createElement('p');
            symbol.classList.add('keyboard__primary-symbol')
            symbol.innerHTML = layout[1].toUpperCase()
            this.key.append(symbol)
        }else {
            symbol.classList.add('keyboard__primary-symbol')
            symbol.innerHTML = layout[1]
            this.key.append(symbol)
        }    
    } 
}

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
    textBox.rows = '5';
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
    keyboard = document.querySelector('.keyboard');
  
    for (let key in layout) {
        if (layout[key][0] !== 'keyboard__button_arrow-up' && 
            layout[key][0] !== 'keyboard__button_arrow-down') {
            let keyboardKey = new Key;
            keyboardKey.addClass(layout[key]);
            keyboardKey.addSymbols(layout[key]);
            keyboardKey.setAttribute(layout[key])
            keyboard.append(keyboardKey.key)
        } else {
            let keyUpAndDownWrapper = document.createElement('div');
            keyUpAndDownWrapper.classList.add('keyboard__button-arrow-up-and-down-wrapper');
            keyboard.append(keyUpAndDownWrapper)
            keyUpAndDownWrapper = document.querySelector('.keyboard__button-arrow-up-and-down-wrapper');
            let keyboardKey = new Key;
            keyboardKey.addClass(layout[key]);
            keyboardKey.addSymbols(layout[key]);
            keyboardKey.setAttribute(layout[key])
            keyUpAndDownWrapper.append(keyboardKey.key)
        }
    }
}
  
createDom(ENGLISH_LAYOUT)