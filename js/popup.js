const popup = document.querySelector('.popup');
const popupBg = document.querySelector('.popup__bg');
const curItem = document.querySelector('.popup__cursor');


const popupContent = (number) => {
    let content = '';
    switch (number) {
        case 1:
            content = '<img src="img/popup/1.jpg" alt="" class="popup-content__img-100">\n' +
                '                <div class="popup-content__padding-v">\n' +
                '                    <span class="popup-content__title">Шасси и тормозная система</span>\n' +
                '                    <p>На всех самолётах семейства RRJ используется убирающиеся шасси, с передней управляемой опорой и тормозными основными опорами.\n' +
                '                        <br><br>Шасси фирмы Safran. Тормозная система фирмы Goodrich.\n' +
                '                        <br>Шасси обеспечивает устойчивое положение самолёта на земле при стоянке и буксировке, маневрирование при рулении, выдерживание направления движения на разбеге и пробеге, поглощение кинетической энергии самолёта при послепосадочном пробеге и при прерванном взлёте, удерживание на месте при работающих двигателях, стояночное торможение.\n' +
                '                        <br><br>Шасси самолёта, убирающееся в полёте, выполнено по трёхопорной схеме с управляемыми колёсами передней опоры шасси. Каждая (левая и правая) основная опора шасси имеет два тормозных колеса. Передняя опора шасси имеет два нетормозных колеса. Колёса основных опор снабжены дисковыми гидравлическими тормозами.\n' +
                '                        <br><br>На колёсах всех опор установлены бескамерные шины радиальной конструкции.\n' +
                '                        <br>Аварийный выпуск шасси происходит под действием собственного веса опоры после механического открытия замков убранного положения.\n' +
                '                        <br><br>Амортизационная стойка обеспечивает восприятие нагрузок при разбегах и пробегах самолёта, поглощение энергии посадочных ударов, буксировку и швартовку самолета.\n' +
                '                        <br><br>LGSCU - Система управления уборкой и основным выпуском шасси — электрогидравлического типа, управляется электронным блоком управления уборкой-выпуском шасси и поворотом передней опоры шасси.В процессе работы блок LGSCU производит контроль и оценку исправности электрических цепей бесконтактных выключателей и контроль работоспособности каналов блока LGSCU.<br>Блок LGSCU — двухканальный. Каждый канал оснащен бесконтактными датчиками положения и обжатия опор шасси.\n' +
                '                    </p>\n' +
                '                </div>';
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
    return content;
};

const popupWindows = (()=>{
    const togglePopup = action=>{
        if(action==='show')
            popup.classList.remove('hide');
        else
            popup.classList.add('hide');
    };
    return {
        show: ()=>{
            togglePopup('show');
        },
        hide: ()=>{
            togglePopup('hide');
        },
        change: num=>{
            num = parseInt(num);
            let domElem = document.createElement('div');
            domElem.className = 'popup-content';
            console.log(num);
            domElem.innerHTML = popupContent(num);
            // popupDotsAnimate.monitoring(domElem);
            document.querySelector('.popup__block-content').innerHTML = '';
            document.querySelector('.popup__block-content').addEventListener('DOMContentLoaded',()=>{
                console.log('123');
            });
            document.querySelector('.popup__block-content').appendChild(domElem);
        },
    }
})();

const popupDots = (() => {
    const dotsContainer = document.querySelector('.dots__container');
    // getPosition left,top(%), dataId
    const getPosition = [[[41, 43, 1], [72, 43, 2], [44, 71, 3]], [[57, 49, 4], [72, 58, 5], [88, 48, 6]], [[48, 22, 7], [53, 53, 8], [82, 18, 9]]];
    const dotElemCreate = leftTop => {
        let duru = document.createElement('div');
        duru.className = 'dots__item-container hide';
        duru.style.left = leftTop[0] + '%';
        duru.style.top = leftTop[1] + '%';
        duru.dataset.id = leftTop[2];
        duru.innerHTML = '<div class="dots__item"><div class="dots__item-circle"></div></div>';
        popupDotsAnimate.monitoring(duru);
        return duru;
    };
    const dotElemRemove = ()=>{
        dotsContainer.innerHTML = '';
    };
    const toggleCycle = action=>{
        let dotsItemContainer = dotsContainer.querySelectorAll('.dots__item-container');
        if(action==='hide'&&dotsItemContainer[2])
            dotsItemContainer[2].addEventListener('transitionend',()=>{
                dotElemRemove();
                if(from<4)
                    createDots(from-1);
            });
        if(action==='hide'&&!dotsItemContainer[2]) {
            if(from<4)
                createDots(from-1);
        }
        dotsItemContainer.forEach(item=>{
            if(action==='show')
                setTimeout(()=>{
                    item.classList.remove('hide');
                }, 600);
            else
                setTimeout(()=>{
                    item.classList.add('hide');
                }, 200);
        });
    };

    const createDots = activeNum => {
        getPosition[activeNum].forEach(item => {
            dotsContainer.appendChild(dotElemCreate(item));
        });
    };
    return {
        createDots: activeNum => {
            if(from<4)
                createDots(activeNum - 1);
        },
        showDots: () => {
            toggleCycle('show');
        },
        hideDots: () => {
            toggleCycle('hide');
        }
    }
})();


const popupDotsAnimate = (()=>{
    let posX = 0;
    let posY = 0;
    const dotsContainer = document.querySelector('.dots__container');
    let normalizeX = (dotsContainer.offsetWidth - document.body.offsetWidth)/2;
    let normalizeY = (dotsContainer.offsetHeight - document.body.offsetHeight)/2;
    let maxScale = (dotsContainer.offsetWidth+dotsContainer.offsetHeight)/3;
    let eventers = [];
    class Elem {
        constructor(item) {
            this.x = item.offsetLeft + item.offsetWidth/2 - normalizeX;
            this.y = item.offsetTop + item.offsetHeight/2 - normalizeY;
            this.item = item.querySelector('.dots__item');
        }
    }
    const listenerHover = ((item)=>{

    });
    document.addEventListener('mousemove', e=>{
        if(!disabledEvents&&eventers.length>0) {
            posX = e.clientX;
            posY = e.clientY;
            eventers.forEach((item)=>{
                let diffX = Math.abs(posX - item.x);
                let diffY = Math.abs(posY - item.y);
                let diffSum = diffX+diffY;
                if (diffSum>maxScale) {
                    item.item.style.transform = 'scale(-0.66)';
                } else if (diffSum<160) {
                    item.item.style.transform = 'scale(-1)';
                } else {
                    item.item.style.transform = 'scale('+ (parseFloat((diffSum/3/maxScale).toFixed(2))-1) +')';
                }
            });
        }
    });
    return {
        monitoring: event=>{
            if (eventers.length>2)
                eventers = [];
            setTimeout(()=>{
                eventers.push(new Elem(event));
            },3);
            listenerHover(event);
        }
    }
})();

popupDots.createDots(from);

document.addEventListener('click', (e) => {
    let event = e.target;
    if (event.closest('.popup__bg')) {
        popupWindows.hide();
    }
    if (event.closest('.dots__item-container')) {
        popupWindows.change(event.closest('.dots__item-container').dataset.id);
        popupWindows.show();
    }
});
popupBg.addEventListener('mouseout', () => {
    curItem.classList.add('hide');
});
popupBg.addEventListener('mouseover', () => {
    curItem.classList.remove('hide');
    curItem.style.top = e.clientY + 'px';
    curItem.style.left = e.clientX + 'px';
});

popupBg.addEventListener('mousemove', (e) => {
    if (!curItem.classList.contains('hide')) {
        curItem.style.top = e.clientY + 'px';
        curItem.style.left = e.clientX + 'px';
    }
});