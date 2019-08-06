const popupBg = document.querySelector('.popup__bg');
const curItem = document.querySelector('.popup__cursor');
popupBg.addEventListener('mouseout', (e) => {
    curItem.classList.add('hide');
    console.log(e);
});
popupBg.addEventListener('mouseover', (e) => {
    curItem.classList.remove('hide');
    console.log(e);
});

popupBg.addEventListener('mousemove', (e) => {
    if(!curItem.classList.contains('hide'))

    console.log(e);
});