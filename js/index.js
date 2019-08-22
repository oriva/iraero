//change dots
// let from = 1;
// let toForListener = 2;
// let disabledEvents = false;
let forListenerVideo = '';

let videoCounterForLoad = 0;
let req = [];
loadFunction = (links)=>{
    console.log(links);
    req[videoCounterForLoad] = new XMLHttpRequest();
    req[videoCounterForLoad].open('GET', links, true);
    req[videoCounterForLoad].responseType = 'blob';

    req[videoCounterForLoad].onload = function() {
        if (this.status === 200) {
            videoCounterForLoad++;
            if(videoCounterForLoad===4) {
                document.querySelector('.preloader').classList.add('hide');
            }
        }
    };
    req[videoCounterForLoad].onerror = function() {
        console.log('Ошибка');
    };
    req[videoCounterForLoad].send();
};
if (window.innerWidth < 1980) {
    ['video/4k/tr1.mp4', 'video/4k/tr2.mp4', 'video/4k/tr3.mp4', 'video/4k/tr4.mp4'].forEach((item)=>{
        loadFunction(item);
    });
} else {
    ['video/fullHD/tr1.mp4', 'video/fullHD/tr2.mp4', 'video/fullHD/tr3.mp4', 'video/fullHD/tr4.mp4'].forEach((item)=>{
        loadFunction(item);
    });
}



if(isPc)
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth < 1980) {
            videoBlock.src = 'video/fullHD/' + getLink('video', 1);
        } else {
            videoBlock.src = 'video/4k/' + getLink('video', 1);
        }
    });

document.querySelector('.panorama').addEventListener('transitionend', () => {
    panorama.monitoring();
});

videoBlock.addEventListener('ended', () => {
    listenerVideoPlay(forListenerVideo);
});

document.addEventListener('click', e => {
    if (!disabledEvents) {
        if (e.target.closest('.footer-dots a')) {
            startChange(e.target.closest('.footer-dots a'));
        }
    }
});

document.addEventListener('keydown', e=>{
    // e.preventDefault();
    let delta = 0;
    switch (e.keyCode) {
        case 37:
            delta = 1;
            break;
        case 38:
            delta = 1;
            break;
        case 39:
            delta = -1;
            break;
        case 40:
            delta = -1;
            break;
    }
    if (!disabledEvents && document.querySelector('.popup').classList.contains('hide')) {
        let batya = document.querySelector('.footer-dots .active').parentNode;
        if (delta > 0) {
            if (batya.previousElementSibling)
                changeDots(batya.previousElementSibling.querySelector('a'));
        } else if (delta < 0) {
            if (batya.nextElementSibling)
                changeDots(batya.nextElementSibling.querySelector('a'));
        }
    }
});




// Только для картинок
const getLink = (type, number) => {
    let link = '';
    if (typeof number !== 'number') {
        number = parseInt(number);
    }
    if (type === 'image') {
        switch (number) {
            case 1:
                link = '1.jpg';
                break;
            case 2:
                link = '2.jpg';
                break;
            case 3:
                link = '3.jpg';
                break;
            case 4:
                link = '4.jpg';
                break;
            case 5:
                link = '5.jpg';
                break;
        }
    } else {
        switch (number) {
            case 1:
                link = 'tr1.mp4';
                break;
            case 2:
                link = 'tr2.mp4';
                break;
            case 3:
                link = 'tr3.mp4';
                break;
            case 4:
                link = 'tr4.mp4';
                break;
            case 5:
                link = 'tr1.mp4';
                break;
        }
    }
    return link;
};

const makeImg = (() => {
    const image = [imageBlock[0], imageBlock[1]];
    return {
        show: () => {
            image[0].classList.remove('hide');
            image[1].classList.remove('hide');
            return true;
        },
        hide: () => {
            image[0].classList.add('hide');
            image[1].classList.add('hide');
            return true;
        },
        change: (number) => {
            imageBlock[0].setAttribute('src', 'img/fullHD/' + getLink('image', parseInt(number)));
            imageBlock[1].setAttribute('src', 'img/4k/' + getLink('image', parseInt(number)));

            return true;
        }
    }
})();

const makeVideo = (() => {
    const source = [videoBlock.querySelectorAll('source')[0], videoBlock.querySelectorAll('source')[1]];
    return {
        play: () => {
            setTimeout(() => {
                videoBlock.play();
            }, 700);
            disabledEvents = false;
        },
        change: number => {
            source[0].src = 'video/fullHD/' + getLink('video', parseInt(number));
            source[1].src = 'video/4k/' + getLink('video', parseInt(number));
            if (window.innerWidth < 1980) {
                videoBlock.src = 'video/fullHD/' + getLink('video', parseInt(number));
            } else {
                videoBlock.src = 'video/4k/' + getLink('video', parseInt(number));
            }
        }
    }
})();

const dots = (() => {
    return {
        visibleToggle: () => {
            if (document.querySelector('body').classList.contains('hide')) {
                if (document.querySelector('.footer-dots .active').dataset.to !== '1') {
                    document.querySelector('.footer').classList.add('not-first');
                } else {
                    document.querySelector('.footer').classList.remove('not-first');
                }
                if (document.querySelector('.footer-dots .active').dataset.to === '5') {
                    document.querySelector('.footer').classList.add('last');
                } else {
                    document.querySelector('.footer').classList.remove('last');
                }
            }
            setTimeout(() => {
                document.querySelector('body').classList.toggle('hide');
            }, 100);
        },
    }
})();

const panorama = (() => {
    const pano = document.querySelector('.panorama');
    let listenImageChange = false;
    const showAnimation = number => {
        makeVideo.change(parseInt(number));
        makeImg.change(parseInt(number));
        text.change(parseInt(number));
        popupDots.showDots();
    };
    (() => {
        imageBlock[1].addEventListener("load", () => {
            setTimeout(() => {
                if (listenImageChange) {
                    panorama.hide();
                }
            }, 5);

        })
    })();
    return {
        monitoring: () => {
            if (!disabledEvents) {
                return false;
            }
            if (!pano.classList.contains('hide')) {
                showAnimation(toForListener);
            } else {
                dots.visibleToggle();
                if (listenImageChange)
                    setTimeout(panorama.show(), 400);
                disabledEvents = false;
            }
        },
        show: number => {
            listenImageChange = true;
            toForListener = number;
            setTimeout(() => {
                pano.classList.remove('hide');
            }, 300);
            return true;
        },
        hide: () => {
            pano.classList.add('hide');
            listenImageChange = false;
            return true;
        }
    }
})();

const text = (() => {
    const textArea = [document.querySelector('.footer__content .fn-tb__little'), document.querySelector('.footer__content .fn-tb__big')];
    const textInfo = [
        ['Новый стандарт безопасности', 'Sukhoi Superjet 100'],
        ['Новый стандарт безопасности', 'Единственный в своем роде'],
        ['Новый стандарт безопасности', 'Непревзойденные<br> летные характеристики'],
        ['Интерьер самолета', 'Комфорт и безопасность'],
        ['Забронировать билет', 'Начните летать<br>вместе с нами']
    ];
    return {
        change: number => {
            textArea[0].innerHTML = textInfo[parseInt(number) - 1][0];
            textArea[1].innerHTML = textInfo[parseInt(number) - 1][1];
        }
    }
})();

// Отличается ли кликнутая кнопка от активной?
const canChange = to => {
    if (to !== from) {
        if (to - from === 1) {
            return 1;
        } else {
            return 2;
        }
    } else {
        return 0;
    }
};

//Начало, проверяем куда нажали
const startChange = (clickBut) => {
    if (canChange(parseInt(clickBut.dataset.to))) {
        startAnimation(clickBut);
    }
};

// Дисейблим возможность эвентов, меняем дотс
const startAnimation = to => {
    changeDots(to);
};

// меняем навигационные точки
const changeDots = target => {
    disabledEvents = true;
    document.querySelector('.footer-dots .active').classList.remove('active');
    target.classList.add('active');
    dots.visibleToggle();
    goVideo(target);
    from = parseInt(target.dataset.to);

    if (from === 4) {
        setTimeout(()=>{
            document.body.classList.add('tour-party');
        }, 200);
    } else {
        setTimeout(()=>{
            document.body.classList.remove('tour-party');
        }, 200);
    }
    popupDots.hideDots();
};


const videoSrcChange = clickBut => {
    makeVideo.change(clickBut.dataset.to);
};

const listenerVideoPlay = clickBut => {
    makeImg.show();
    if (document.querySelector('.footer-dots .active').dataset.id !== '1') {
        document.querySelector('.footer').classList.add('not-first');
    } else {
        document.querySelector('.footer').classList.remove('not-first');
    }
    dots.visibleToggle();
    popupDots.showDots();
    (function (clickBut) {
        setTimeout(function () {
            videoSrcChange(clickBut);
            disabledEvents = false;
        }, 1000);
    }(clickBut));
};

const goVideo = clickBut => {
    console.log('123');
    if (canChange(parseInt(clickBut.dataset.to)) === 1) {
        makeImg.hide();
        makeImg.change(clickBut.dataset.to);
        setTimeout(() => {
            videoBlock.play();
            text.change(parseInt(clickBut.dataset.to));
        }, 700);
        forListenerVideo = clickBut;
    } else {
        toForListener = clickBut.dataset.to;
        panorama.show(clickBut.dataset.to || toForListener);
    }
};


//scroll
const onWheel = (e => {
    e = e || window.event;
    let delta = e.deltaY || e.detail || e.wheelDelta;
    if (!disabledEvents && document.querySelector('.popup').classList.contains('hide')) {
        let batya = document.querySelector('.footer-dots .active').parentNode;
        if (delta < 0) {
            if (batya.previousElementSibling)
                changeDots(batya.previousElementSibling.querySelector('a'));
        } else if (delta > 0) {
            if (batya.nextElementSibling)
                changeDots(batya.nextElementSibling.querySelector('a'));
        }
    }
});


let elem = document;
if (elem.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        elem.addEventListener("wheel", onWheel);
    }
    else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
    } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
    }
} else { // IE8-
    elem.attachEvent("onmousewheel", onWheel);
}