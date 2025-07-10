let forListenerVideo = '';
let dotsClick = false;
disabledEvents = true;

const preload = window.innerWidth < 1980
  ? [
      'video/4k/tr1.mp4','video/4k/tr2.mp4','video/4k/tr3.mp4','video/4k/tr4.mp4',
      'video/4k/tr3(old).mp4','video/4k/tr4(old).mp4',
      'img/4k/1.jpg','img/4k/2.jpg','img/4k/3.jpg','img/4k/4.jpg','img/4k/5.jpg',
      'img/popup/1.jpg','img/popup/2.jpg'
    ]
  : [
      'video/fullHD/tr1.mp4','video/fullHD/tr2.mp4','video/fullHD/tr3.mp4',
      'video/fullHD/tr3(old).mp4','video/fullHD/tr4(old).mp4','video/fullHD/tr4.mp4',
      'img/fullHD/1.jpg','img/fullHD/2.jpg','img/fullHD/3.jpg','img/fullHD/4.jpg','img/fullHD/5.jpg',
      'img/popup/1.jpg','img/popup/2.jpg'
    ];
preload.forEach(loadFunction);

document.querySelector('.panorama').addEventListener('transitionend', () => {
  panorama.monitoring();
});

videoBlock.addEventListener('ended', () => {
  videoBlock.currentTime = videoBlock.duration;
  listenerVideoPlay(forListenerVideo);
});

document.addEventListener('keydown', e => {
  let delta = 0;
  switch (e.keyCode) {
    case 37:
    case 38:
      delta = 1;
      break;
    case 39:
    case 40:
      delta = -1;
      break;
  }
  if (!disabledEvents && document.querySelector('.popup').classList.contains('hide')) {
    const active = document.querySelector('.footer-dots .active').parentNode;
    if (delta > 0 && active.previousElementSibling) {
      changeDots(active.previousElementSibling.querySelector('a'));
    } else if (delta < 0 && active.nextElementSibling) {
      changeDots(active.nextElementSibling.querySelector('a'));
    }
  }
});

const imgLinks = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','4(old).jpg','4(old).jpg','5.jpg','4.jpg'];
const videoLinks = ['tr1.mp4','tr2.mp4','tr3.mp4','tr4.mp4','tr1.mp4','tr3-1.mp4','tr4(old).mp4','tr3-2.mp4','tr3-2.mp4'];
const getLink = (type,n) => (type==='image' ? imgLinks : videoLinks)[parseInt(n)-1];

const makeImg = (() => {
  const imgs = [imageBlock[0], imageBlock[1]];
  const toggle = hide => imgs.forEach(i => i.classList.toggle('hide', hide));
  const change = n => setTimeout(()=>{
    const base = window.innerWidth < 1980 ? 'fullHD' : '4k';
    const el = base === 'fullHD' ? imgs[0] : imgs[1];
    el.src = `img/${base}/${getLink('image', n)}`;
  },300);
  return { show: () => toggle(false), hide: () => toggle(true), change };
})();

const makeVideo = (() => {
  const play = () => { setTimeout(()=>videoBlock.play(),700); disabledEvents=false; };
  const change = n => {
    const num = parseInt(n);
    const base = window.innerWidth < 1980 ? 'video/fullHD/' : 'video/4k/';
    videoBlock.src = base + getLink('video', num);
    if (num === 7 || num === 8) {
      setTimeout(()=>videoBlock.addEventListener('loadedmetadata',()=>{ if(from!==5)from=5; }),1);
    } else if (num === 9) {
      setTimeout(()=>videoBlock.addEventListener('loadedmetadata',()=>{ from=4; changeDots(8); }),1);
    }
  };
  return { play, change };
})();

const dots = (() => {
  const body = document.body;
  const footer = document.querySelector('.footer');
  const activeTo = () => document.querySelector('.footer-dots .active').dataset.to;
  const visibleToggle = () => {
    if (body.classList.contains('hide')) {
      footer.classList.toggle('not-first', activeTo() !== '1');
      footer.classList.toggle('last', activeTo() === '5');
    }
    setTimeout(()=>body.classList.toggle('hide'),100);
  };
  return { visibleToggle };
})();

const panorama = (() => {
  const pano = document.querySelector('.panorama');
  let listen = false;
  const showAnimation = n => {
    n = parseInt(n);
    makeVideo.change(n);
    makeImg.change(n);
    text.change(n);
    popupDots.showDots();
  };
  (() => {
    const img = window.innerWidth > 1980 ? imageBlock[1] : imageBlock[0];
    img.addEventListener('load', ()=> setTimeout(()=>{ if(listen) panorama.hide(); },5));
  })();
  return {
    monitoring() {
      if (!disabledEvents) return;
      if (!pano.classList.contains('hide')) {
        showAnimation(toForListener);
      } else {
        dots.visibleToggle();
        if (listen) setTimeout(panorama.show, 400);
        disabledEvents = false;
      }
    },
    show(n) {
      listen = true;
      toForListener = n;
      setTimeout(()=> pano.classList.remove('hide'), 300);
      return true;
    },
    hide() {
      pano.classList.add('hide');
      listen = false;
      return true;
    }
  };
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
    change: n => {
      textArea[0].innerHTML = textInfo[parseInt(n)-1][0];
      textArea[1].innerHTML = textInfo[parseInt(n)-1][1];
    }
  };
})();

const canChange = to => {
  if (dotsClick && isSalon) {
    if (from === 5) {
      if (to === 5) return 1;
      if (to <= 3) return 2;
    }
    return 0;
  }
  if (from === 7 || from === 8) return 1;
  if (to === from) return 0;
  return to - from === 1 ? 1 : 2;
};

const startChange = clickBut => {
  if (canChange(parseInt(clickBut.dataset.to))) changeDots(clickBut);
};

const changeDots = target => {
  disabledEvents = true;
  if (target === 6) {
    dots.visibleToggle();
    goVideo(target);
  } else if (target === 8) {
    isSalon = false;
    from = forListenerVideo = 8;
    const prev = document.querySelector('.footer-dots .active');
    const next = prev.parentNode.nextElementSibling.querySelector('a');
    prev.classList.remove('active');
    next.classList.add('active');
    dots.visibleToggle();
    goVideo(8);
  } else if (target === 9) {
    isSalon = false;
    from = 4;
    dots.visibleToggle();
    setTimeout(()=> goVideo(target));
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
  makeVideo.change(from < 6 ? clickBut.dataset.to : clickBut);
};

const listenerVideoPlay = clickBut => {
  if (forListenerVideo === 6) {
    from = 7;
    clickBut = from;
  }
  makeImg.show();
  const footer = document.querySelector('.footer');
  footer.classList.toggle('not-first', document.querySelector('.footer-dots .active').dataset.id !== '1');
  dots.visibleToggle();
  popupDots.showDots();
  setTimeout(() => {
    videoSrcChange(clickBut);
    disabledEvents = false;
  }, 1);
};

const goVideo = clickBut => {
  let dataClick = [6,7,8,9].includes(clickBut) ? clickBut : parseInt(clickBut.dataset.to);
  if (dataClick === 9) dataClick = 4;
  if (isSalon && dataClick <= 3) isSalon = false;

  if (canChange(dataClick) === 1 || isSalon) {
    makeImg.hide();
    setTimeout(() => makeImg.change(dataClick), 200);
    setTimeout(() => {
      videoBlock.play();
      dotsClick = false;
      if (!isSalon && from === 6) text.change(dataClick);
      else if (clickBut === 8) { isSalon = false; text.change(5); }
      else { text.change(parseInt(clickBut.dataset.to)); isSalon = false; }
    }, 700);
    if (clickBut !== 8) forListenerVideo = clickBut;
  } else if (dataClick === 9) {
    panorama.show(4);
  } else {
    toForListener = dataClick;
    panorama.show(dataClick || toForListener);
  }
};

document.addEventListener('click', e => {
  if (!disabledEvents && e.target.closest('.footer-dots a')) {
    if (isSalon) dotsClick = true;
    startChange(e.target.closest('.footer-dots a'));
  }
});

const onWheel = e => {
  e = e || window.event;
  const delta = e.deltaY || e.detail || e.wheelDelta;
  if (!disabledEvents && document.querySelector('.popup').classList.contains('hide') && !isSalon) {
    const parent = document.querySelector('.footer-dots .active').parentNode;
    if (delta < 0 && parent.previousElementSibling) {
      changeDots(parent.previousElementSibling.querySelector('a'));
    } else if (delta > 0 && parent.nextElementSibling) {
      changeDots(parent.nextElementSibling.querySelector('a'));
    }
  }
  if (!disabledEvents && isSalon) {
    if (delta < 0) {
      changeDots(9);
    } else if (delta > 0) {
      changeDots(8);
    }
  }
};

let elem = document;
if (elem.addEventListener) {
  if ('onwheel' in document) {
    elem.addEventListener('wheel', onWheel);
  } else if ('onmousewheel' in document) {
    elem.addEventListener('mousewheel', onWheel);
  } else {
    elem.addEventListener('MozMousePixelScroll', onWheel);
  }
} else {
  elem.attachEvent('onmousewheel', onWheel);
}
