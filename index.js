import ENGLISH_LAYOUT from "./assets/layouts/english-layout.js";
import RUSSIAN_LAYOUT from "./assets/layouts/russian-layout.js";

let defoultLayout = ENGLISH_LAYOUT; 

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

function createInputBox () {
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
    textBox = document.querySelector('.text-box');
    textBox.focus()
  
    //create current layout indicator
  
    let currentLayout = document.createElement('p');
    currentLayout.className = 'current-language';
    if (defoultLayout === ENGLISH_LAYOUT) {
        currentLayout.innerHTML = 'Eng'
    } else {
        currentLayout.innerHTML = 'Rus'
    }
    wrapper.append(currentLayout)
}

createInputBox ()

function createKeyboard(layout) {

    //create keyboard
    let keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    let wrapper = document.querySelector('.wrapper');
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

    let notification = document.createElement('p')
    notification.innerHTML = 'Keyboard created for WindowsOS. To change layout press shift + ctrl';
    notification.classList.add('keyboard__secondary-symbol')
    wrapper.append(notification)

}
  
createKeyboard(defoultLayout);

const keyboardKeys = document.querySelectorAll('.keyboard__button')

document.addEventListener('keydown', (button) => {
    let buttonCode = button.code;
    let currentLayoutIndicator = document.querySelector('.current-language');
    let notification = document.querySelector('body > div > p.keyboard__secondary-symbol');

    keyboardKeys.forEach(key => {
        if (key.getAttribute('code') === buttonCode) {     
            key.classList.add('keyboard__button_active')
        }
    })
    let primarySymbols = document.querySelectorAll('.keyboard__button_common-button > .keyboard__primary-symbol');
    let secondarySymbols = document.querySelectorAll('.keyboard__button_common-button > .keyboard__secondary-symbol');
    let primarySymbolinLayout = []
    let secondarySymbolinLayout = []

    if (button.ctrlKey && button.shiftKey && defoultLayout === ENGLISH_LAYOUT) {
        defoultLayout = RUSSIAN_LAYOUT
        currentLayoutIndicator.innerHTML = 'Rus';
        notification.innerHTML = 'Клавиатура создана для WindowsOS. Чтобы сменить раскладку, нажмите shift + ctrl'
        for (let key in RUSSIAN_LAYOUT) {
            if (RUSSIAN_LAYOUT[key][0] === 'keyboard__button_common-button') {
                primarySymbolinLayout.push(RUSSIAN_LAYOUT[key][1]);
                secondarySymbolinLayout.push(RUSSIAN_LAYOUT[key][2]);
            }
        }
        for (let i = 0; i < primarySymbolinLayout.length; i++) {
            primarySymbols[i].innerHTML = primarySymbolinLayout[i].toUpperCase()
            secondarySymbols[i].innerHTML = secondarySymbolinLayout[i].toUpperCase()
        }
        
    } else if (button.ctrlKey && button.shiftKey && defoultLayout === RUSSIAN_LAYOUT) {
        defoultLayout = ENGLISH_LAYOUT;
        currentLayoutIndicator.innerHTML = 'Eng';
        notification.innerHTML = 'Keyboard created for WindowsOS. To change layout press shift + ctrl';
        primarySymbolinLayout = []
        secondarySymbolinLayout = []
        for (let key in ENGLISH_LAYOUT) {
            if (ENGLISH_LAYOUT[key][0] === 'keyboard__button_common-button') {
                primarySymbolinLayout.push(ENGLISH_LAYOUT[key][1]);
                secondarySymbolinLayout.push(ENGLISH_LAYOUT[key][2]);
            }
        }
        for (let i = 0; i < primarySymbolinLayout.length; i++) {
            primarySymbols[i].innerHTML = primarySymbolinLayout[i].toUpperCase()
            secondarySymbols[i].innerHTML = secondarySymbolinLayout[i].toUpperCase()
        }
    }
})

document.addEventListener('keyup', (button) => {
    let buttonCode = button.code;
    
    keyboardKeys.forEach(key => {
        if (key.getAttribute('code') === buttonCode) {
            key.classList.remove('keyboard__button_active')
        }
    })

})