//change dots
// let from = 1;
// let toForListener = 2;
// let disabledEvents = false;
let forListenerVideo = '';
let videoCounterForLoad = 0;
let req = [];
disabledEvents = true;

if (window.innerWidth < 1980) {
    ['video/4k/tr1.mp4', 'video/4k/tr2.mp4', 'video/4k/tr3.mp4', 'video/4k/tr4.mp4', 'video/4k/tr3(old).mp4', 'video/4k/tr4(old).mp4', 'img/4k/1.jpg', 'img/4k/2.jpg', 'img/4k/3.jpg', 'img/4k/4.jpg', 'img/4k/5.jpg', 'img/popup/1.jpg', 'img/popup/2.jpg'].forEach((item)=>{
        loadFunction(item);
    });
} else {
    ['video/fullHD/tr1.mp4', 'video/fullHD/tr2.mp4', 'video/fullHD/tr3.mp4', 'video/fullHD/tr3(old).mp4', 'video/fullHD/tr4(old).mp4', 'video/fullHD/tr4.mp4', 'img/fullHD/1.jpg', 'img/fullHD/2.jpg', 'img/fullHD/3.jpg', 'img/fullHD/4.jpg', 'img/fullHD/5.jpg', 'img/popup/1.jpg', 'img/popup/2.jpg'].forEach((item)=>{
        loadFunction(item);
    });
}


document.querySelector('.panorama').addEventListener('transitionend', () => {
    panorama.monitoring();
});

videoBlock.addEventListener('ended', () => {
    console.log('Видео закончилось');
    videoBlock.currentTime = videoBlock.duration;
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
            case 6:
                link = '4(old).jpg';
                break;
            case 7:
                link = '4(old).jpg';
                break;
            case 8:
                link = '5.jpg';
                break;
            case 9:
                link = '4.jpg';
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
            case 6:
                link = 'tr3-1.mp4';
                break;
            case 7:
                link = 'tr4(old).mp4';
                break;
            case 8:
                link = 'tr3-2.mp4';
                break;
            case 9:
                link = 'tr3-2.mp4';
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
            setTimeout(()=>{
                if (window.innerWidth < 1980) {
                    imageBlock[0].setAttribute('src', 'img/fullHD/' + getLink('image', parseInt(number)));
                } else {
                    imageBlock[1].setAttribute('src', 'img/4k/' + getLink('image', parseInt(number)));
                }
            },300);

            return true;
        }
    }
})();

const makeVideo = (() => {
    return {
        play: () => {
            setTimeout(() => {
                videoBlock.play();
            }, 700);
            disabledEvents = false;
        },
        change: number => {
            let path = '';
            if (window.innerWidth < 1980) {
                path = 'video/fullHD/';
            } else {
                path = 'video/4k/';
            }
            const whenLoad = () => {
                if (from===5)
                    return false;
                from = 5;
            };
            if (number===9) {
                videoBlock.src = path + getLink('video', 9);
                setTimeout(()=> {
                    videoBlock.addEventListener('loadedmetadata', ()=>{
                        from = 4;
                        changeDots(8);
                    });
                },1);
            }
            if (number===7 || number===8) {
                videoBlock.src = path + getLink('video', number);
                setTimeout(()=> {
                    videoBlock.addEventListener('loadedmetadata', whenLoad());
                },1);
            } else {
                videoBlock.src = path + getLink('video', parseInt(number));
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

//Функция отвечающая за затемнение
const panorama = (() => {
    const pano = document.querySelector('.panorama');
    let listenImageChange = false;
    const showAnimation = number => {
        console.log(number);
        makeVideo.change(parseInt(number));
        makeImg.change(parseInt(number));
        text.change(parseInt(number));
        popupDots.showDots();
    };
    (() => {
        let eventImg = imageBlock[0];
        if (window.innerWidth > 1980) {
            eventImg = imageBlock[1];
        }
        eventImg.addEventListener("load", () => {
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


// функция отвечающая за блок с текстов в левом нижнем углу
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
    if (from===7 || from===8) {
        return 1;
    }
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
    if (target===6) {
        dots.visibleToggle();
        goVideo(target);
    } else if (target===8) {
        isSalon = false;
        from = 8;
        forListenerVideo = from;
        let prevDot = document.querySelector('.footer-dots .active');
        let nextDot = prevDot.parentNode.nextElementSibling.querySelector('a');
        prevDot.classList.remove('active');
        nextDot.classList.add('active');
        dots.visibleToggle();
        goVideo(8);
    } else if (target===9) {
        isSalon = false;
        from = 4;
        dots.visibleToggle();
        setTimeout(()=>{
            goVideo(target);
        });
    } else {
        document.querySelector('.footer-dots .active').classList.remove('active');
        target.classList.add('active');
        dots.visibleToggle();
        goVideo(target);
        from = parseInt(target.dataset.to);
    }
    popupDots.hideDots();
};


const videoSrcChange = clickBut => {
    if (from < 6)
        makeVideo.change(clickBut.dataset.to);
    else
        makeVideo.change(clickBut);
};

const listenerVideoPlay = clickBut => {
    if (forListenerVideo===6) {
        from = 7;
        clickBut = from;
    }

    console.log('listenerVideoPlay');
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
        }, 1);
    }(clickBut));
};

const goVideo = clickBut => {
    let dataClick = 0;
    if (clickBut===6 || clickBut===7 || clickBut===8 || clickBut===9)
        dataClick = clickBut;
    else
        dataClick = parseInt(clickBut.dataset.to);

    if (dataClick===9) {
        dataClick = 4;
    }

    if (canChange(dataClick) === 1 || isSalon) {
        makeImg.hide();
        setTimeout(() => {
            makeImg.change(dataClick);
        }, 200);
        setTimeout(() => {
            videoBlock.play();
            if (!isSalon&&from===6)
                text.change(dataClick);
            else if (clickBut===8) {
                isSalon = false;
                text.change(5);
            } else {
                text.change(parseInt(clickBut.dataset.to));
            }
        }, 700);
        if (clickBut!==8)
            forListenerVideo = clickBut;
    } else if (dataClick===9) {
        panorama.show(4);
    } else {
        toForListener = dataClick;
        panorama.show(dataClick || toForListener);
    }
};


// функция определяющая куда идет скролл
const onWheel = (e => {
    e = e || window.event;
    let delta = e.deltaY || e.detail || e.wheelDelta;
    if (!disabledEvents && document.querySelector('.popup').classList.contains('hide') && !isSalon) {
        let batya = document.querySelector('.footer-dots .active').parentNode;
        if (delta < 0) {
            if (batya.previousElementSibling)
                changeDots(batya.previousElementSibling.querySelector('a'));
        } else if (delta > 0) {
            if (batya.nextElementSibling)
                changeDots(batya.nextElementSibling.querySelector('a'));
        }
    }
    if (!disabledEvents && isSalon) {
        if (delta < 0) {
            changeDots(9);
        } else if (delta > 0) {
            changeDots(8);
        }
    }
});

// проверка совместимости для скролла
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