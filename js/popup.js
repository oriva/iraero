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
        duru.dataset.relativeInput = 'true';
        duru.innerHTML = '<div class="dots__item" data-depth="1"><div class="dots__item-circle"></div></div>';
        new Parallax(duru, {
            relativeInput: true,
            pointerEvents: true,
            hoverOnly: true,
            invertX: false,
            invertY: false,
            scalarX: 50.0,
            scalarY: 50.0
        });
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