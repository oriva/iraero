let disabledEvents = false;
let isSalon = false;
let from = 1;
let toForListener = 2;
const imageBlock = document.querySelectorAll('.main-content__img');
const videoBlock = document.querySelector('.main-content__video');

loadFunction = (links)=>{
    req[videoCounterForLoad] = new XMLHttpRequest();
    req[videoCounterForLoad].open('GET', links, true);
    req[videoCounterForLoad].responseType = 'blob';

    req[videoCounterForLoad].onload = function() {
        if (this.status === 200) {
            videoCounterForLoad++;
            if(videoCounterForLoad===8) {
                document.querySelector('.preloader').classList.add('hide');
                disabledEvents = false;
            }
        }
    };
    req[videoCounterForLoad].onerror = function() {
        console.log('Ошибка');
    };
    req[videoCounterForLoad].send();
};

let isPc = (()=>{
    return document.body.clientWidth > 768;
})();

document.addEventListener('DOMContentLoaded', () => {
    popupDots.showDots();
    if (window.innerWidth < 1980) {
        videoBlock.src = 'video/fullHD/tr1.mp4';
    } else if(window.innerWidth > 768) {
        videoBlock.src = 'video/4k/tr1.mp4';
    }

    if(window.innerWidth < 768) {
        document.querySelector('.preloader').classList.add('hide');
        ['img/popup/avionics/1.jpg', 'img/popup/constructions/1.jpg', 'img/popup/economic/1.jpg', 'img/popup/economic/2.jpg', 'img/popup/economic/1.jpg', 'img/popup/economic/2.jpg', 'img/popup/economic/3.jpg', 'img/popup/economic/4.jpg', 'img/popup/specifications/1.jpg', 'img/popup/specifications/2.jpg', 'img/popup/tour/1.jpg', 'img/popup/tour/2.jpg'].forEach((item)=>{
            loadFunction(item);
        });
    }
});




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