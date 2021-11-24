// const anchors = document.querySelectorAll('a[href*="#"]')

// for (let anchor of anchors) {
//     anchor.addEventListener("click", function(e) {
//         e.preventDefault();
//         const blockID = anchor.getAttribute('href')
//         document.querySelector('' + blockID).scrollIntoView({
//             behavior: "smooth",
//             block: "start"
//         })
//     })
// }

const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 20;

anchors.forEach(function(item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function(e) {
        // убираем стандартное поведение
        e.preventDefault();

        // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

        // запускаем интервал, в котором
        let scroller = setInterval(function() {
            // считаем на сколько скроллить за 1 такт
            let scrollBy = coordY / framesCount;

            // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
            // и дно страницы не достигнуто
            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                // то скроллим на к-во пикселей, которое соответствует одному такту
                window.scrollBy(0, scrollBy);
            } else {
                // иначе добираемся до элемента и выходим из интервала
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            // время интервала равняется частному от времени анимации и к-ва кадров
        }, animationTime / framesCount);
    });
});



// fixed header
window.onscroll = function(ev) {
    let element = document.querySelector('.header');
    element.style.height = 95 + 'px';
    let elem = document.querySelector('.photo');
    let name = document.querySelector('.intro__name');
    let titl = document.querySelector('.job__title');

    if (window.scrollY > element.scrollHeight) {
        element.classList.add('fixed');
        elem.classList.add('fix__photo');
        name.classList.add('fix__name');
        titl.classList.add('fix__jobtitle');
    } else {
        element.classList.remove('fixed');
        elem.classList.remove('fix__photo');
        name.classList.remove('fix__name');
        titl.classList.remove('fix__jobtitle');
    }
};