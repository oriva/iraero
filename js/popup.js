const popup = document.querySelector('.popup');
let popupBg = document.querySelector('.popup__bg');
let curItem = document.querySelector('.popup__cursor');

// анимация крестика при открытом popup
const listenerPopup = ()=>{
    curItem = popupBg.querySelector('.popup__cursor');
    popupBg.addEventListener('mouseout', () => {
        curItem.classList.add('hide');
    });
    popupBg.addEventListener('mouseover', (e) => {
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
};


const popupContent = (number) => {
    let content = '';
    switch (number) {
        case 1:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/1.jpg" alt="" class="popup-content__img-100">' +
                '                <div class="popup-content__padding-v">' +
                '                    <span class="popup-content__title">Sukhoi Superjet 100</span>' +
                '                    <p>Новый стандарт безопасности ваших полетов. <br>Российским инженерам-конструкторам удалось добиться невероятных успехов в сфере пассажирских авиационных перевозок. <br><br>Новая модель российского авиастроения получила название Sukhoi Superjet 100 и заслужила признание во всем мире среди конструкторов и пилотов, как надежный и безопасный самолет. <br><br>Ведущие компании мира, такие как ArabicAirlines, Norway, Boieng включили данную модель самолета в свои парки, а компания ИрАэро и вовсе сделала SSJ-100 одним из своих основных самолетов.</p>' +
                '                </div>';
            break;
        case 4:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/economic/1.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">Экономика</span>' +
                '<p><strong>Вместимость пассажиров:</strong> 97 кресел (с учетом бизнес класса) и 100 кресел в одноклассной компоновке' +
                '<br><br><strong>Дальность полета:</strong> 4,878 км' +
                '<br><br><strong>Максимальный взлетный вес:</strong> 49450 кг</p>' +
                '<img src="img/popup/economic/2.jpg" alt="" class="popup-content__img-100">' +
                '</div>';
            break;
        case 5:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/engine/1.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">Двигатели</span>' +
                '<strong>Производители:</strong><img src="img/popup/engine/creators.jpg" alt="" class="popup-content__img-100">' +
                '<p>Два турбовентиляторных воздушно-реактивных двигателя нового поколения SM-146, разработанного совместно французской фирмой Snecma Moteurs и российским научно- производственным объединением «Сатурн» (PowerJet ), вспомогательной силовой установки (ВСУ) фирмы Honeywell RE-220 (США), унифицированных мотогондол, топливной и масляной систем, системы управления двигателями, включая комплексную систему контроля и диагностики, а также устройств стыковки и взаимодействия силовой установки с планером и другими бортовыми системами самолёта.</p>' +
                '</div>' +
                '<img src="img/popup/engine/2.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__super-block popup-content__padding-l">' +
                '   <img src="img/popup/engine/3.jpg" alt="" class="popup-content__img-100">' +
                '   <img src="img/popup/engine/4.jpg" alt="" class="popup-content__img-100">' +
                '   <img src="img/popup/engine/4-mob.jpg" alt="" class="popup-content__mob-image">' +
                '</div>' +
                '<div class="popup-content__padding-v">' +
                '<p><br><br>Система управления двигателями состоит из системы управления режимом работы двигателей, электронной системы управления двигателями и электрической системы управления остановом двигателей.' +
                '<br><br>На центральном пульте пилотов расположен пульт управления двигателями' +
                '<br>Режим работы двигателя контролируется по показаниям индикаторов комплексной системы электронной индикации и сигнализации.<br><br>Автоматическое управление двигателями осуществляется вычислительной системой автомата управления тягой.<br><br>В рукоятках РУД вмонтированы микровыключатели, которые предназначены для переключения автоматического управления двигателями на ручное.<br><br>Система фиксаторов обеспечивает исключение самопроизвольного включения режимов работы двигателей.<br><br>Электронная система управления двигателем представляет собой электронную систему с полной ответственностью (FADEC).<br><br>FADEC, взаимодействуя с самолетными системами, обеспечивает оптимальное регулирование режимами двигателя во всех условиях эксплуатации, а также контроль над датчиками и устройствами двигателя с выдачей необходимой информации для индикации в кабине экипажа, выдачу необходимой информации в системы регистрации и технического обслуживания.</p>' +
                '<div class="popup-content__line"></div>' +
                '<p><strong>Основные функции электронной системы управления двигателей</strong><br><br>Блок электронного управления двигателем - двухканальный с использованием второго канала в качестве «горячего резерва», а случае обнаружения неисправности в обоих каналах выбирается «наиболее работоспособный» на основе анализа «работоспособности». Блок имеет независимое электропитание от автономного генератора переменного тока. Блок получает необходимую информацию для выполнения своих функций от дублированных датчиков и сигнализаторов двигателя (каждый канал отдельно) и систем самолета, проверяет ее на достоверность и формирует управляющие команды и сигналы в соответствии с заданными законами регулирования.' +
                '<br><br>На всех этапах полета предусмотрена возможность автоматического управления двигателями от вычислительной системы автомата управления тягой.</p>' +
                '</div>';
            break;
        case 6:
            content =  '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/2.jpg" alt="" class="popup-content__img-100">' +
                '                <div class="popup-content__padding-v">' +
                '                    <span class="popup-content__title">Шасси и тормозная система</span>' +
                '                    <p>На всех самолётах семейства RRJ используется убирающиеся шасси, с передней управляемой опорой и тормозными основными опорами.' +
                '                        <br><br><strong>Шасси фирмы Safran. Тормозная система фирмы Goodrich.</strong>' +
                '                        <br>Шасси обеспечивает устойчивое положение самолёта на земле при стоянке и буксировке, маневрирование при рулении, выдерживание направления движения на разбеге и пробеге, поглощение кинетической энергии самолёта при послепосадочном пробеге и при прерванном взлёте, удерживание на месте при работающих двигателях, стояночное торможение.' +
                '                        <br><br>Шасси самолёта, убирающееся в полёте, выполнено по трёхопорной схеме с управляемыми колёсами передней опоры шасси. Каждая (левая и правая) основная опора шасси имеет два тормозных колеса. Передняя опора шасси имеет два нетормозных колеса. Колёса основных опор снабжены дисковыми гидравлическими тормозами.' +
                '                        <br><br>На колёсах всех опор установлены бескамерные шины радиальной конструкции.' +
                '                        <br>Аварийный выпуск шасси происходит под действием собственного веса опоры после механического открытия замков убранного положения.' +
                '                        <br><br>Амортизационная стойка обеспечивает восприятие нагрузок при разбегах и пробегах самолёта, поглощение энергии посадочных ударов, буксировку и швартовку самолета.' +
                '                        <br><br>LGSCU - Система управления уборкой и основным выпуском шасси — электрогидравлического типа, управляется электронным блоком управления уборкой-выпуском шасси и поворотом передней опоры шасси.В процессе работы блок LGSCU производит контроль и оценку исправности электрических цепей бесконтактных выключателей и контроль работоспособности каналов блока LGSCU.<br>Блок LGSCU — двухканальный. Каждый канал оснащен бесконтактными датчиками положения и обжатия опор шасси.' +
                '                    </p>' +
                '                </div>';
            break;
        case 9:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/avionics/1.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">Авионика</span>' +
                '<p><strong>Система раннего предупреждения о столкновении T2CAS (разработчик и производитель — компания ACSS, США)</strong><br>' +
                '<br>Функция TAWS системы T2CAS соответствует самым жёстким и современным требованиям (TSO-C151b класс A). Система компании ACSS является на сегодняшний день одной из самых передовых в своей области.<br>' +
                '<br>Функции TCAS и TAWS используют независимые процессоры и модули ввода/вывода. Программное обеспечение TCAS и TAWS также не связано друг с другом. Система T2CAS включается автоматически при подаче электропитания на самолёт. <br>' +
                '<br>В систему T2CAS загружена актуальная база данных рельефа местности и взлетно – посадочных полос по всему земному шару. Рельеф местности представлен в виде ячеек. Высота каждой ячейки отражает значение максимальной высоты рельефа в данной местности и расстояния безопасного полёта над препятствием.<br>' +
                '<br>Принцип работы системы T2CAS заключается в сопоставлении данных базы рельефа (БД) с учётом расстояния безопасного полёта над препятствием и актуальной траектории движения, основанной на показаниях различных датчиков положения и движения самолета.<br>' +
                '<br>Система отслеживает не только вертикальные, но и горизонтальные составляющие полёта. Это позволяет производить оценку пространства не только впереди, по траектории полёта, но и по сторонам. Ширина зоны срабатывания при поворотах составляет 60°. Это, даже при резких маневрах, позволяет информировать экипаж о наличии опасности столкновения в направлении поворота ещё до того, как траектория полёта пересечет опасный рельеф.<br>' +
                '<br>Звуковая и визуальная сигнализация срабатывает за две минуты до возможного столкновения с землей. Этого времени достаточно для того, чтобы увести самолёт от столкновения. <br>' +
                '<br><br><strong>Система спутниковой навигации GPS состоит из многорежимного приёмника («Thales Avionics», Франция) и антенны GPS (Chelton, США).</strong><br>Система спутниковой навигации GPS включается при подаче питания на борт. <br>' +
                '<br><br><strong>Система измерения радиовысоты на SSJ 100 («Thales Avionics», Франция)</strong> состоит из двух комплектов, которые работают для выдачи данных для левого и правого пилотов. Система измерения радиовысоты включается при подаче питания на борт и не может быть выключена из кабины экипажа.<br>Радиовысотомер предназначен для точного измерения радиовысоты самолета до земли. Он является разновидностью радара, т.е. использует эффект распространения электромагнитных волн в воздухе с постоянной скоростью.<br>' +
                '</p>' +
                '</div>' +
                '<img src="img/popup/avionics/last.jpg" alt="" class="popup-content__img-100">';
            break;
        case 8:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/constructions/1.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">особенности конструкции</span>' +
                '<p>Конструкция самолёта отвечает специфике требований авиакомпаний России, СНГ, западных стран и соответствует требованиям АП-25, FAR-25, JAR-25. Самолеты семейства Superjet 100 удовлетворяют требованиям по уровню шума, создаваемого самолетом на местности по Главе 4 стандарта ICAO и FAR 36 части 4, вступившим в силу в 2006 году. Самолёты SSJ удовлетворяют требованиям 99% аэродромов класса А, Б и В России и СНГ.<br>' +
                '<br>' +
                'При проектировании Superjet 100 использовались результаты испытаний в аэродинамической трубе, которая была разработана в ЦАГИ. Это позволило минимизировать сопротивление воздуха и оптимизировать расход топлива. Так же высокой рентабельности способствуют новый двигатель, использование цифровой электродистанционной системы управления полетом fly-by-wire и применение энергосберегающих технологий.<br>' +
                '<br>' +
                'Сам подход к созданию семейства SSJ уникален своей нацеленностью на нужды авиакомпаний. В его основе лежит глубокий анализ требований к конфигурации самолета и оценка перспективных потребностей рынка. За счет увеличенных возможностей по дальности полета SSJ может использоваться на более широкой сети маршрутов, включая ряд магистральных, причем с большей эффективностью и высоким уровнем комфорта. <br>' +
                '<br>' +
                'С увеличением дальности растет экономическая эффективность. Великолепная аэродинамика самолёта Superjet 100 дает большие преимущества на крейсерской скорости. Улучшенные взлетные и посадочные характеристики наряду с возможностью всепогодной эксплуатации делают самолет «разработчиком маршрутов». Авиакомпании, таким образом, получат возможность открывать новые маршруты, на которых другие самолеты менее эффективны или менее комфортабельны</p>' +
                '</div>';
            break;
        case 7:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/specifications/1.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">Технические характеристики</span>' +
                '<p><img src="img/popup/specifications/2.jpg" alt="" class="popup-content__img-100"></p>' +
                '</div>' +
                '<img src="img/popup/specifications/last.jpg" alt="" class="popup-content__img-100">';
            break;
        case 11:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div></div>' +
                '<img src="img/popup/tour/pre1.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">Общие характеристики</span>' +
                '<img src="img/popup/tour/table1.jpg" alt="" class="popup-content__img-100">' +
                '</div>';
            break;
        case 12:
            content = '<div class="popup-content__mob">' +
                '<img src="img/iraero-logo_blue.png" alt="">' +
                '<div class="popup-content__mob-closed"></div>' +
                '</div>' +
                '<img src="img/popup/tour/2.jpg" alt="" class="popup-content__img-100">' +
                '<div class="popup-content__padding-v">' +
                '<span class="popup-content__title">Салон</span>' +
                '<p><strong>Более широкие проходы</strong>' +
                '<br><br>SSJ100 является единственным самолетов в своем классе с проходами более полуметра, что позволяет ускорить посадку и высадку пассажиров. Летный персонал может с легкостью передвигаться по салону, при этом остается достаточно пространства для обеспечения комфорта пассажиров.</p>' +
                '<img src="img/popup/tour/pre1.jpg" alt="" class="popup-content__img-100">' +
                '<p><strong>Впервые - пятиместный ряд</strong>' +
                '<br><br>SSJ100 - первый самолет в своем классе с пятью креслами в ряду. Данная конфигурация позволяет обеспечить еще больше пространства в салоне по сравнению с конкурентами. Независимо от того, где именно сидят пассажиры- посередине или с краю - все они могут насладиться комфортным индивидуальным пространством.</p>' +
                '<br><p><strong>Легкодоступные вместительные полки</strong>' +
                '<br><br>SSJ100 в отличие от конкурентов предлагает больший объем багажных полок для каждого пассажира.' +
                '<br><br>Они становятся важным элементом салона в случае, если эксплуатационная среда ставит приоритетом ручную кладь.</p>' +
                '<img src="img/popup/tour/pre1.jpg" alt="" class="popup-content__img-100">' +
                '</div>';
            break;
    }
    if(number===7 || number===9) {
        content = '<div class="popup-content popup-content_no-padding">' + content + '</div>';
    } else {
        content = '<div class="popup-content">' + content + '</div>';
    }
    return content;
};

const popupWindows = (() => {
    const tourBlock = document.querySelector('.tour-3d');

    // функция физического создания Тура
    const createTour = () => {
        // tourBlock.querySelector('.tour-3d__content').innerHTML = '<iframe src="http://irk3d.ru/vt/ssj100/ssj100.html" frameborder="0"></iframe>';
        tourBlock.querySelector('.tour-3d__content').innerHTML = '<iframe src="3dtour/ssj100.html" frameborder="0"></iframe>';
        tourBlock.classList.remove('hide');
        tourBlock.addEventListener('click', e => {
            if (e.target.closest('.tour-3d__close')) {
                tourBlock.addEventListener('transitionend', removeTourBlock(tourBlock.querySelector('.tour-3d__content')));
                tourBlock.classList.add('hide');
            }
        });
    };

    // функция физического удаления Тура и скрытия блока
    const removeTourBlock = (item) => {
        disabledEvents = false;
        item.innerHTML = '';
        item.removeEventListener('transitionend', removeTourBlock);
    };

    // функция физического создания popup
    const createPopup = num => {
        disabledEvents = true;
        let bg = document.createElement('div');
        bg.className = 'popup__bg';
        bg.innerHTML = '<div class="popup__cursor hide" style=""></div>';
        let domElem = document.createElement('div');
        domElem.className = 'popup__block-content';
        domElem.innerHTML = popupContent(num);
        // popupDotsAnimate.monitoring(domElem);
        document.querySelector('.popup').innerHTML = '';
        document.querySelector('.popup').appendChild(bg);
        document.querySelector('.popup').appendChild(domElem);
        popupBg = document.querySelector('.popup__bg');
        listenerPopup();
        setTimeout(() => {
            popupWindows.show()
        }, 10);
    };
    const createGallery = () => {
        disabledEvents = true;
        tourBlock.querySelector('.tour-3d__content').innerHTML = '<div class="owl-carousel owl-gallery">\n' +
            '  <div><img src="img/popup/gallery/10.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/2.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/1.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/3.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/5.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/6.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/7.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/9.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/11.jpg" alt=""></div>\n' +
            '  <div><img src="img/popup/gallery/12.jpg" alt=""></div>\n' +
            '</div>';
        setTimeout(()=>{
            $(".owl-gallery").owlCarousel({
                items: 1,
                dots: false,
                nav: true,
                loop: true
            });
            $(".owl-gallery .owl-prev").html('<div class="owl-gallery__arrow-block"><img src="img/popup/arrow-left.svg" alt=""></div>');
            $(".owl-gallery .owl-next").html('<div class="owl-gallery__arrow-block"><img src="img/popup/arrow-right.svg" alt=""></div>');

        },1);
        tourBlock.classList.remove('hide');
        tourBlock.addEventListener('click', e => {
            if (e.target.closest('.tour-3d__close')) {
                tourBlock.classList.add('hide');
                setTimeout(()=>{
                    tourBlock.addEventListener('transitionend', removeTourBlock(tourBlock.querySelector('.tour-3d__content')));
                },800);
            }
        });
    };
    const createVideo = () => {
        disabledEvents = true;
        tourBlock.querySelector('.tour-3d__content').innerHTML = '<video src="video/popup-video.mp4" controls></video>';
        tourBlock.classList.remove('hide');
        tourBlock.addEventListener('click', e => {
            if (e.target.closest('.tour-3d__close')) {
                tourBlock.classList.add('hide');
                setTimeout(()=>{
                    tourBlock.addEventListener('transitionend', removeTourBlock(tourBlock.querySelector('.tour-3d__content')));
                },800);
            }
        });
    };
    const togglePopup = action => {
        if (action === 'show') {
            disabledEvents = true;
            popup.classList.remove('hide');
        } else {
            disabledEvents = false;
            popup.classList.add('hide');
        }
    };

    const inSalon = (number) => {
        const whenLoaded = ()=>{
            console.log('imInHere');
            if (!isSalon)
                return false;
            if (from!==6)
                isSalon = false;
            changeDots(from);
        };
        isSalon = true;
        disabledEvents = true;
        from = number;
        if(number===6) {
            makeVideo.change(number);
            videoBlock.addEventListener('load', whenLoaded());
        }
    };
    return {
        show: () => {
            togglePopup('show');
        },
        hide: () => {
            togglePopup('hide');
        },
        change: num => {
            num = parseInt(num);
            switch (num) {
                case 2:
                    createVideo();
                    break;
                case 3:
                    createGallery();
                    break;
                case 10:
                    createTour();
                    break;
                case 15:
                    inSalon(6);
                    break;
                default:
                    createPopup(num);
                    break;
            }
        },
    }
})();

const popupDots = (() => {
    const dotsContainer = document.querySelector('.dots__container');
    // getPosition left,top(%), dataId
    const getPosition = [[[41, 43, 1], [72, 43, 2], [44, 71, 3]], [[57, 49, 4], [72, 58, 5], [88, 48, 6]], [[48, 22, 7], [53, 53, 8], [82, 18, 9]], [[50, 58, 15], [94, 48, 14], [26, 24, 13]], [[47, 69, 10], [63, 42, 11], [30, 42, 12]]];
    const dotElemCreate = leftTop => {
        let duru = document.createElement('div');
        duru.className = 'dots__item-container hide';
        duru.style.left = leftTop[0] + '%';
        duru.style.top = leftTop[1] + '%';
        duru.dataset.id = leftTop[2];
        if (leftTop[2] === 2)
            duru.innerHTML = '<div class="dots__item"><div class="dots__item-circle"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '            <path d="M50 25L12.5 46.6506V3.34937L50 25Z" fill="#C4C4C4"/>\n' +
                '            </svg></div></div>';
        else if (leftTop[2] === 10)
            duru.innerHTML = '<div class="dots__item"><div class="dots__item-circle">360</div></div>';
        else if (leftTop[2] === 15)
            duru.innerHTML = '<div class="dots__item"><div class="dots__item-circle"><svg width="55" height="60" viewBox="0 0 55 60" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path d="M26.4949 55.9366H11.0186C6.81263 55.9366 3.40002 52.5114 3.40002 48.318V11.0186C3.40002 6.81263 6.82522 3.40002 11.0186 3.40002H26.7468C27.6912 3.40002 28.4468 2.64446 28.4468 1.70001C28.4468 0.755559 27.6912 0 26.7468 0H11.0186C4.93632 0 0 4.94891 0 11.0186V48.318C0 54.4003 4.94891 59.3366 11.0186 59.3366H26.4949C27.4394 59.3366 28.195 58.581 28.195 57.6366C28.195 56.6921 27.4268 55.9366 26.4949 55.9366Z" fill="#2246C0"/>\n' +
                '<path d="M54.5006 28.472L43.6961 17.6676C43.0287 17.0001 41.9583 17.0001 41.2909 17.6676C40.6235 18.335 40.6235 19.4053 41.2909 20.0727L49.1991 27.9809H14.7078C13.7634 27.9809 13.0078 28.7365 13.0078 29.6809C13.0078 30.6254 13.7634 31.3809 14.7078 31.3809H49.1991L41.2909 39.2891C40.6235 39.9565 40.6235 41.0269 41.2909 41.6943C41.6183 42.0217 42.0591 42.198 42.4872 42.198C42.9154 42.198 43.3561 42.0343 43.6835 41.6943L54.488 30.8898C55.168 30.2098 55.168 29.1269 54.5006 28.472Z" fill="#2246C0"/>\n' +
                '</svg></div></div>';
        else
            duru.innerHTML = '<div class="dots__item"><div class="dots__item-circle"></div></div>';
        popupDotsAnimate.monitoring(duru);
        return duru;
    };
    const dotElemRemove = () => {
        dotsContainer.innerHTML = '';
    };
    const toggleCycle = action => {
        let dotsItemContainer = dotsContainer.querySelectorAll('.dots__item-container');
        if (action === 'hide' && dotsItemContainer[2])
            dotsItemContainer[2].addEventListener('transitionend', () => {
                // if(isSalon)
                //     return false;
                dotElemRemove();
                if (from < 5)
                    createDots(from - 1);
                else if (from > 5 && from < 8)
                    createDots(4);
                else
                    return false;
            });
        if (action === 'hide' && !dotsItemContainer[2]) {
            if (from < 5)
                createDots(from - 1);
            else if (from > 5 && from < 8)
                createDots(4);
        }
        dotsItemContainer.forEach(item => {
            if (action === 'show')
                setTimeout(() => {
                    item.classList.remove('hide');
                }, 600);
            else
                setTimeout(() => {
                    item.classList.add('hide');
                }, 200);
        });
    };

    const createDots = activeNum => {
        if (from===6)
            activeNum = 4;
        if (from===8)
            activeNum = 5;
        console.log(activeNum);
        getPosition[activeNum].forEach(item => {
            dotsContainer.appendChild(dotElemCreate(item));
        });
    };
    return {
        createDots: activeNum => {
            if (from < 5)
                createDots(activeNum - 1);
            else if (from > 5)
                createDots(8);
            if (from > 5)
                createDots(6);
        },
        showDots: () => {
            toggleCycle('show');
        },
        hideDots: () => {
            toggleCycle('hide');
        }
    }
})();


const popupDotsAnimate = (() => {
    let posX = 0;
    let posY = 0;
    const dotsContainer = document.querySelector('.dots__container');
    let normalizeX = (dotsContainer.offsetWidth - document.body.offsetWidth) / 2;
    let normalizeY = (dotsContainer.offsetHeight - document.body.offsetHeight) / 2;
    let maxScale = (dotsContainer.offsetWidth + dotsContainer.offsetHeight) / 3;
    let eventers = [];

    class Elem {
        constructor(item) {
            this.x = item.offsetLeft + item.offsetWidth / 2 - normalizeX;
            this.y = item.offsetTop + item.offsetHeight / 2 - normalizeY;
            this.item = item.querySelector('.dots__item');
        }
    }

    // Изменение размера навигационных кругов в зависимости от позиции курсора
    if (isPc)
        document.addEventListener('mousemove', e => {
            if (!disabledEvents && eventers.length > 0) {
                posX = e.clientX;
                posY = e.clientY;
                eventers.forEach((item) => {
                    let diffX = Math.abs(posX - item.x);
                    let diffY = Math.abs(posY - item.y);
                    let diffSum = diffX + diffY;
                    if (diffSum > maxScale) {
                        item.item.style.transform = 'scale(-0.66)';
                    } else if (diffSum < 160) {
                        item.item.style.transform = 'scale(-1)';
                    } else {
                        item.item.style.transform = 'scale(' + (parseFloat((diffSum / 3 / maxScale).toFixed(2)) - 1) + ')';
                    }
                });
            }
        });
    return {
        monitoring: event => {
            if (eventers.length > 2)
                eventers = [];
            setTimeout(() => {
                eventers.push(new Elem(event));
            }, 3);
        }
    }
})();

if(isPc)
    popupDots.createDots(from);

document.addEventListener('click', (e) => {
    let event = e.target;
    // закрытие popup
    if (event.closest('.popup__bg')||e.target.closest('.popup-content__mob-closed')) {
        popupWindows.hide();
    }
    if (event.closest('.dots__item-container')) {
        popupWindows.change(event.closest('.dots__item-container').dataset.id);
    }
});
