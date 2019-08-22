let disabledEvents = false;
let from = 1;
let toForListener = 2;
const imageBlock = document.querySelectorAll('.main-content__img');
const videoBlock = document.querySelector('.main-content__video');

document.addEventListener('DOMContentLoaded', () => {
    popupDots.showDots();
});

let isPc = (()=>{
    return document.body.clientWidth > 768;
})();

const connectScript = (() => {
    const start = (script)=>{
        let scriptTag = document.createElement('script'), // create a script tag
            firstScriptTag = document.querySelector('.footer__dev'); // find the first script tag in the document
        scriptTag.src = script; // set the source of the script to your script
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); // append the script to the DOM
    };
    return {
        start: () => {
            if (isPc) {
                start('js/index.js');
            } else {
                start('js/mobile.js');
            }
        }
    }
})();

connectScript.start();