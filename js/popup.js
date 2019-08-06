const popup = document.querySelector('.popup');
const popupBg = document.querySelector('.popup__bg');
const curItem = document.querySelector('.popup__cursor');

document.addEventListener('click', (e)=>{
    let event = e.target;
    if(event.closest('.popup__bg')) {
        popup.classList.add('hide');
    }
    if(event.closest('.dots__item-container')) {
        popup.classList.remove('hide');
    }
});
popupBg.addEventListener('mouseout', () => {
    curItem.classList.add('hide');
});
popupBg.addEventListener('mouseover', () => {
    curItem.classList.remove('hide');
    curItem.style.top = e.clientY+'px';
    curItem.style.left = e.clientX+'px';
});

popupBg.addEventListener('mousemove', (e) => {
    if(!curItem.classList.contains('hide')) {
        curItem.style.top = e.clientY+'px';
        curItem.style.left = e.clientX+'px';
    }
});