import ENGLISH_LAYOUT from "./assets/layouts/english-layout.js";
import RUSSIAN_LAYOUT from "./assets/layouts/russian-layout.js";
import ALPHABETS from "./assets/layouts/alphabet.js";

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

function switchLayout() {
    let currentLayoutIndicator = document.querySelector('.current-language');
    let notification = document.querySelector('body > div > p.keyboard__secondary-symbol');
    let primarySymbols = document.querySelectorAll('.keyboard__button_common-button > .keyboard__primary-symbol');
    let secondarySymbols = document.querySelectorAll('.keyboard__button_common-button > .keyboard__secondary-symbol');
    let primarySymbolinLayout = []
    let secondarySymbolinLayout = []
    if (defoultLayout === ENGLISH_LAYOUT) {
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
    } else {
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
}

const keyboardKeys = document.querySelectorAll('.keyboard__button')
const textBox = document.querySelector('.text-box')

//events for keydown on physical keyboard
document.addEventListener('keydown', (button) => {
    let buttonCode = button.code;

    keyboardKeys.forEach(key => {
        if (key.getAttribute('code') === buttonCode) {     
            key.classList.add('keyboard__button_active')
        }
    })

    if (button.ctrlKey && button.shiftKey) {
        switchLayout()
    } else if (button.code === 'Tab') {
        button.preventDefault()
        textBox.value = textBox.value + '\t'
    }
})

//events for keyup on physical keyboard
document.addEventListener('keyup', (button) => {
    let buttonCode = button.code;
    
    keyboardKeys.forEach(key => {
        if (key.getAttribute('code') === buttonCode) {
            key.classList.remove('keyboard__button_active')
        }
    })

})

//events for click on virtual keyboard
keyboardKeys.forEach(key => {
    key.addEventListener('click', (click) => {
        textBox.focus()
        if (key.classList.contains('keyboard__button_common-button')) {         //click on common-button
            if (keyboardKeys[28].classList.contains('keyboard__button_active')) {
                textBox.value = textBox.value + key.lastChild.innerHTML
            } else if (keyboardKeys[41].classList.contains('keyboard__button_active') ||
              keyboardKeys[52].classList.contains('keyboard__button_active')) {
               if (ALPHABETS.includes(key.lastChild.innerHTML.toLowerCase())) {
                textBox.value = textBox.value + key.lastChild.innerHTML
                keyboardKeys[41].classList.remove('keyboard__button_active')
                keyboardKeys[52].classList.remove('keyboard__button_active')
               } else {
                textBox.value = textBox.value + key.firstChild.innerHTML
                keyboardKeys[41].classList.remove('keyboard__button_active')
                keyboardKeys[52].classList.remove('keyboard__button_active')
               }
            } else {
                textBox.value = textBox.value + key.lastChild.innerHTML.toLowerCase()
            }
        } else if (key.classList.contains('keyboard__button_backspace')) {      // click on backspace
            textBox.value = textBox.value.slice(0, textBox.value.length - 1)
            
        } else if (key.classList.contains('keyboard__button_tab')) {            //click on tab
            textBox.value = textBox.value + '\t'
        } else if (key.classList.contains('keyboard__button_enter')) {          //click on enter
            textBox.value = textBox.value + '\n'
        } else if (key.classList.contains('keyboard__button_space')) {          //click on space
            textBox.value = textBox.value + ' '
        } else if (key.classList.contains('keyboard__button_caps-lock')) {      //click on caps lock
            key.classList.toggle('keyboard__button_active')
        } else if (key.classList.contains('keyboard__button_left-shift')) {     //click on left-shift
            if (keyboardKeys[58].classList.contains('keyboard__button_active') ||
              keyboardKeys[53].classList.contains('keyboard__button_active')) {
                switchLayout()
                keyboardKeys[58].classList.remove('keyboard__button_active')
                keyboardKeys[53].classList.remove('keyboard__button_active')
            } else if (key.classList.contains('keyboard__button_active')) {
                key.classList.remove('keyboard__button_active')
            } else {
                keyboardKeys[52].classList.remove('keyboard__button_active')
                key.classList.add('keyboard__button_active')
            }
        } else if (key.classList.contains('keyboard__button_right-shift')) {    //click on right-shift
            if (keyboardKeys[58].classList.contains('keyboard__button_active') ||
              keyboardKeys[53].classList.contains('keyboard__button_active')) {
                switchLayout()
                keyboardKeys[58].classList.remove('keyboard__button_active')
                keyboardKeys[53].classList.remove('keyboard__button_active')
            } else if (key.classList.contains('keyboard__button_active')) {
                key.classList.remove('keyboard__button_active')
            } else {
                keyboardKeys[41].classList.remove('keyboard__button_active')
                key.classList.add('keyboard__button_active')
            }
        } else if (key.classList.contains('keyboard__button_left-ctrl')) {      //click on left-ctrl
            if (keyboardKeys[52].classList.contains('keyboard__button_active') ||
              keyboardKeys[41].classList.contains('keyboard__button_active')) {
                switchLayout()
                keyboardKeys[52].classList.remove('keyboard__button_active')
                keyboardKeys[41].classList.remove('keyboard__button_active')
            } else if (key.classList.contains('keyboard__button_active')) {
                key.classList.remove('keyboard__button_active')
            } else {
                keyboardKeys[58].classList.remove('keyboard__button_active')
                key.classList.add('keyboard__button_active')
            }
        } else if (key.classList.contains('keyboard__button_right-ctrl')) {     //click on right-ctrl
            if (keyboardKeys[52].classList.contains('keyboard__button_active') ||
              keyboardKeys[41].classList.contains('keyboard__button_active')) {
                switchLayout()
                keyboardKeys[52].classList.remove('keyboard__button_active')
                keyboardKeys[41].classList.remove('keyboard__button_active')
            } else if (key.classList.contains('keyboard__button_active')) {
                key.classList.remove('keyboard__button_active')
            } else {
                keyboardKeys[53].classList.remove('keyboard__button_active')
                key.classList.add('keyboard__button_active')
            }
        } else if (key.classList.contains('keyboard__button_slash')) {          //click on slash
            textBox.value = textBox.value + key.lastChild.innerHTML
        } else if (key.classList.contains('keyboard__button_left-alt')) {       //click on left-alt
            if (key.classList.contains('keyboard__button_active')) {
                key.classList.remove('keyboard__button_active')
            } else {
                keyboardKeys[57].classList.remove('keyboard__button_active')
                key.classList.add('keyboard__button_active');
            }
        } else if (key.classList.contains('keyboard__button_right-alt')) {      //click on right-alt
            if (key.classList.contains('keyboard__button_active')) {
                key.classList.remove('keyboard__button_active')
            } else {
                keyboardKeys[55].classList.remove('keyboard__button_active')
                key.classList.add('keyboard__button_active');
            }
        } else if (key.classList.contains('keyboard__button_arrow-left')) {      //click on left-arrow
            if (textBox.selectionStart > 0){
                textBox.selectionStart -= 1
                textBox.selectionEnd -= 1                
            } else {
                textBox.selectionStart = 0
                textBox.selectionEnd =  0 
            }
        } else if (key.classList.contains('keyboard__button_arrow-right')) {      //click on right-arrow
            if (textBox.selectionStart < textBox.value.length){
                textBox.selectionEnd += 1
                textBox.selectionStart += 1                
            } else {
                textBox.selectionStart = textBox.value.length
                textBox.selectionEnd = textBox.value.length
            }
        } else if (key.classList.contains('keyboard__button_arrow-up')) {      //click on up-arrow
            if (textBox.selectionStart - 91 > 0){
                textBox.selectionStart -= 91
                textBox.selectionEnd -= 91                
            }
        } else if (key.classList.contains('keyboard__button_arrow-down')) {      //click on down-arrow
            if (textBox.selectionStart + 91 < textBox.value.length){
                textBox.selectionEnd += 91
                textBox.selectionStart += 91                
            }
        }
    })
})
