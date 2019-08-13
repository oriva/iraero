const popup = document.querySelector('.popup');
const popupBg = document.querySelector('.popup__bg');
const curItem = document.querySelector('.popup__cursor');




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
        change: ()=>{

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
    console.log(maxScale);
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
            // let item = eventers[0];
            eventers.forEach((item)=>{
                let diffX = Math.abs(posX - item.x);
                let diffY = Math.abs(posY - item.y);
                let diffSum = diffX+diffY;
                // console.log(diffSum);
                if (diffSum>maxScale) {
                    item.item.style.transform = 'scale(-0.66)';
                } else if (diffSum<50) {
                    item.item.style.transform = 'scale(-1)';
                } else {
                    console.log(parseFloat((diffSum/3/maxScale).toFixed(2))-1);
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