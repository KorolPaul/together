const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1200

// sliders
const showcaseSlider = document.querySelectorAll('.showcase_slider');
showcaseSlider.forEach(el => {
    const slider = tns({
        container: el,
        items: 1,
        gutter: 0,
        mouseDrag: true,
        autoplay: false,
        nav: true,
        navPosition: 'bottom',
        controls: false,
        loop: false,
        mode: 'gallery',
        responsive: {
            1200: {
                nav: false,
            }
        },
        onInit: () => {
            document.querySelectorAll('.showcase_button').forEach((element) => element.addEventListener('mouseenter', (e) => {
                slider.goTo(Number(e.target.dataset.slide) - 1)
            }))
        }
    });
});

const solutionsSlider = document.querySelectorAll('.solutions-map_slider');
const solutionsSliderButtons = document.querySelectorAll('.solutions-map_slider-button');
solutionsSlider.forEach(sliderElement => {
    const slider = tns({
        container: sliderElement,
        items: 1,
        gutter: 0,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        navPosition: 'bottom',
        controls: false,
        loop: false,
        mode: 'gallery',
        animateIn: 'tns-goBackIn',
        animateOut: 'tns-goBackOut',
        speed: 800,
        responsive: {
            768: {
                nav: false,
            }
        },
        onInit: () => {
            if (isDesktop){
                solutionsSliderButtons.forEach((element) => element.addEventListener('click', (e) => {
                    slider.goTo(Number(e.target.dataset.slide) - 1);
                    solutionsSliderButtons.forEach(el => el.classList.remove('active'));
                    e.target.classList.add('active');
                }));
            }
        }
    });

    const wrapper = sliderElement.parentElement;

    if (wrapper) {
        let isAnimated = false;

        function handleCarouselScroll(isForward) {
            console.log(isAnimated);
            if (isAnimated) {
                return;
            }

            isAnimated = true
            setTimeout(() => {
                isAnimated = false
            }, 700);

            const {slideCount, index} = slider.getInfo();

            if (isForward) {
                if (index >= slideCount - 1 ) {
                    document.removeEventListener(wheelEvent, preventScroll, { passive: false });
                    return;
                }

                slider.goTo('next');
                solutionsSliderButtons.forEach(el => el.classList.remove('active'));
                solutionsSliderButtons[index + 1].classList.add('active');
                wrapper.dataset.slide = index + 2;
            } else {
                if (index === 0) {
                    document.removeEventListener(wheelEvent, preventScroll, { passive: false });
                    return;
                }

                slider.goTo('prev');
                solutionsSliderButtons.forEach(el => el.classList.remove('active'));
                solutionsSliderButtons[index - 1].classList.add('active');
                wrapper.dataset.slide = index;
            }
        }

        function preventScroll(e) {
            e.preventDefault()

            handleCarouselScroll(e.deltaY > 0)
        }

        const observerCallback = function (e) {
            const { boundingClientRect, intersectionRatio } = e[0];
            const ratio = isMobile ? 0.5 : 0.9;

            if (intersectionRatio > 0.9) {
                document.addEventListener(wheelEvent, preventScroll, { passive: false })
            } else {
                document.removeEventListener(wheelEvent, preventScroll, { passive: false })
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '0px 0px 10% 0px',
            threshold: thresholdSteps,
            root: null
        });
        observer.observe(wrapper);
    }
});

const prospectsContainer = document.querySelectorAll('.prospects');

prospectsContainer.forEach(tabContainer => {
    const tabsButtons = tabContainer.querySelectorAll('.prospects_slider-button');
    const tabsBlocks = tabContainer.querySelectorAll('.prospect');

    if (tabsButtons.length) {
        function switchTab(e) {
            e.preventDefault();

            const index = e.target.dataset.tab;
            tabsButtons.forEach(el => el.classList.remove('active'));
            tabsBlocks.forEach(el => el.classList.remove('active'));

            tabsButtons[index - 1].classList.add('active');
            tabsBlocks[index - 1].classList.add('active');
        }

        tabsButtons.forEach(el => el.addEventListener('click', switchTab));
    }
});

const casesSliders = document.querySelectorAll('.cases_items');
casesSliders.forEach(casesSlider => {
    const slider = tns({
        container: casesSlider,
        items: 1,
        gutter: 16,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        navPosition: 'bottom',
        controls: false,
        controlsPosition: 'bottom',
        loop: true,
        mode: 'gallery',
        animateIn: 'tns-goBackIn',
        animateOut: 'tns-goBackOut',
        speed: 800,
        onInit: function (slider) {
            if (document.querySelector('.cases .tns-counter_total')) {
                document.querySelector('.cases .tns-counter_total').innerText = slider.slideCount < 10 ? `0${slider.slideCount}` : slider.slideCount;
            }
        }
    });

    slider.events.on('transitionStart', function (info) {
        const index = info.displayIndex;
        document.querySelector('.cases .tns-counter_slide').innerText = index < 10 ? `0${index}` : index;
    });

    const prevButtons = casesSlider.querySelectorAll('.tns-controls button:first-child');
    const nextButtons = casesSlider.querySelectorAll('.tns-controls button:last-child');

    prevButtons.forEach(el => el.addEventListener('click', () => slider.goTo('prev')))
    nextButtons.forEach(el => el.addEventListener('click', () => slider.goTo('next')))
});

const clientsMapSlider = document.querySelectorAll('.clients-map_slider');
clientsMapSlider.forEach(el => {
    const slider = tns({
        container: el,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        navPosition: 'bottom',
        controls: true,
        controlsPosition: 'top',
        loop: true,
        mode: 'gallery',
        speed: 800,
        responsive: {
            1200: {
                disable: true,
            }
        },
    });
});

const teamSlider = document.querySelectorAll('.team-slider_items');
teamSlider.forEach(el => {
    const slider = tns({
        container: el,
        items: 1.6,
        gutter: 14,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controls: true,
        controlsPosition: 'bottom',
        loop: false,
        responsive: {
            768: {
                items: 3.5,
                gutter: 24,
                fixedWidth: 282,
            },
            1200: {
                items: 4,
            }
        },
        onInit: function(slider) {
            document.querySelector('.team-slider .tns-counter_total').innerText = slider.slideCount < 10 ? `0${slider.slideCount}` : slider.slideCount;
        }
    });

    slider.events.on('transitionStart', function(info) {
        const index = info.displayIndex;
        document.querySelector('.team-slider .tns-counter_slide').innerText = index < 10 ? `0${index}` : index;
    });
});

const teamGridSlider = document.querySelectorAll('.team-grid_items');
teamGridSlider.forEach(el => {
    tns({
        container: el,
        items: 1.6,
        gutter: 14,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controls: true,
        controlsPosition: 'bottom',
        loop: false,
        responsive: {
            768: {
                disable: true,
            }
        }
    });
});

const partnersSlider = document.querySelectorAll('.partners_slider');
partnersSlider.forEach(el => {
    tns({
        container: el,
        items: 1.6,
        gutter: 24,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controls: true,
        controlsPosition: 'bottom',
        loop: true,
        fixedWidth: 180,
        responsive: {
            768: {
                items: 3.5,
            },
            1024: {
                items: 5.5,
            }
        }
    });
});

const masonrySlider = document.querySelectorAll('.masonry');
masonrySlider.forEach(el => {
    const slider = tns({
        container: el,
        items: 1,
        gutter: 0,
        mouseDrag: true,
        autoplay: false,
        nav: true,
        navPosition: 'bottom',
        controls: false,
        loop: false,
        responsive: {
            1200: {
                disable: true,
            }
        },
    });
});

const positionsSlider = document.querySelectorAll('.positions_list');
positionsSlider.forEach(el => {
    const slider = tns({
        container: el,
        items: 1,
        gutter: 0,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controlsPosition: 'bottom',
        controls: true,
        loop: false,
        responsive: {
            768: {
                disable: true,
            }
        },
        onInit: function (slider) {
            document.querySelector('.positions .tns-counter_total').innerText = slider.slideCount < 10 ? `0${slider.slideCount}` : slider.slideCount;
        }
    });

    slider.events.on('transitionStart', function (info) {
        const index = info.displayIndex;
        document.querySelector('.positions .tns-counter_slide').innerText = index < 10 ? `0${index}` : index;
    });
});


// menu
const menuToggleElements = document.querySelectorAll('.menu-toggle, .menu_item__parent > .menu_link');
menuToggleElements.forEach(el => el.addEventListener('click', () => {
    if (!document.body.classList.contains('menu-opened')) {
        document.body.classList.toggle('menu-opened');
    } else if (document.body.classList.contains('menu-opened')) {
        document.body.classList.remove('menu-opened');
    }
}));

const submenuArrows = document.querySelectorAll('.menu_sublist-item-arrow, .footer_menu-item-arrow');
submenuArrows.forEach(el => el.addEventListener('click', function(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('opened');
}));


function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.body.classList.remove('menu-opened');
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.js-form-popup').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.filters_content').forEach(el => el.classList.remove('opened'));
}

const fadeElement = document.querySelector('.fade');
if (fadeElement) {
    fadeElement.addEventListener('click', closeAllOpened);
}

const menuLinkElements = document.querySelectorAll('.menu_link, .header .button');
menuLinkElements.forEach(el => el.addEventListener('touchend', () => {
    // if (isMobile) {

        setTimeout(() => {
            document.body.classList.remove('menu-opened')
        }, 75);
    // }
}));

/* Popup */
const popupToggleElements = document.querySelectorAll('button[data-popup]');

function disableScroll(e) {
    const { target } = e
    let isInPopup = false;
    
    function findParentPopup(el) {
        if (!el.parentElement) {
            return
        }
        if (el.className.includes('popup_content')) {
            isInPopup = true
            return
        }

        findParentPopup(el.parentElement)
    }

    findParentPopup(target.parentElement)
    
    if (!isInPopup && !target.className.includes('contact-form')) {
        e.preventDefault();
    }
}

function openPopup(name) {
    const popup = document.querySelector(`div[data-popup="${name}"]`);
    if (popup) {
        popup.classList.add('opened');
        document.body.classList.add('popup-opened');
        //mwindow.addEventListener(wheelEvent, disableScroll, { passive: false });
    }
}
function closePopup(name) {
    document.querySelector('.popup.opened, .video-popup.opened').classList.remove('opened');
    document.body.classList.remove('popup-opened');
    // window.removeEventListener(wheelEvent, disableScroll, { passive: false });
}

popupToggleElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(el.dataset.popup);
}));

const popupCloseElements = document.querySelectorAll('.popup_close, .video-popup_close');
popupCloseElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
}));


/* Tabs */
function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');
    
    tabsContainers.forEach(tabContainer => {
        const tabsButtons = tabContainer.querySelectorAll('.tabs_button');
        const tabsBlocks = tabContainer.querySelectorAll('.tabs_content');
    
        if (tabsButtons.length) {
            function switchTab(e) {
                e.preventDefault();
    
                const index = e.target.dataset.tab;
                tabsButtons.forEach(el => el.classList.remove('active'));
                tabsBlocks.forEach(el => el.classList.remove('active'));
    
                tabsButtons[index - 1].classList.add('active');
                tabsBlocks[index - 1].classList.add('active');
            }
    
            tabsButtons.forEach(el => el.addEventListener('click', switchTab));
        }
    });
}

initTabs();

/* cookies */
if (Cookies) {
    const hasCookies = Cookies.get('CookieNotificationCookie');
    const cookiesBanner = document.querySelector('.cookies');
    const cookiesAcceptButton = document.querySelector('[data-cookies="accept"]');
    const cookiesDenyButton = document.querySelector('[data-cookies="deny"]');
    
    if (cookiesAcceptButton) {
        cookiesAcceptButton.addEventListener('click', function (e) {
            e.preventDefault();
            cookiesBanner.style.display = 'none';
            Cookies.set('CookieNotificationCookie', 'true', { expires: 365 });
        });
    }
    if (cookiesDenyButton) {
        cookiesDenyButton.addEventListener('click', function (e) {
            e.preventDefault();
            cookiesBanner.style.display = 'none';
            Cookies.set('CookieNotificationCookie', 'false', { expires: 365 });
        });
    }

    if (cookiesBanner && !hasCookies) {
        cookiesBanner.style.display = 'flex';
    }
}

/* Accordion */
const accordionElements = document.querySelectorAll('.accordion');

accordionElements.forEach(accordion => {
    const accordionButtons = accordion.querySelectorAll('.accordion_item');
    
    function toggle(e) {
        e.preventDefault();
        
        if (e.target.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
            return;
        }
        
        if (isDesktop) {
            e.currentTarget.classList.add('active');
        } else {
            e.currentTarget.classList.toggle('active');
        }
    }
    
    
    accordionButtons.forEach(el => el.addEventListener('click', toggle));
});

/* appaerance animation */
const animatedElements = document.querySelectorAll('.js-animation');

if (animatedElements.length) {
    animatedElements.forEach(el => {
        let ratio = (isMobile) ? 0.0005 : 0.3;

        const observerCallback = function (e) {
            const { target, intersectionRatio } = e[0];
            if (intersectionRatio > ratio) {
                target.classList.add('animated');
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '0px 0px -15% 0px',
            threshold: thresholdSteps,
            //root: document.body
        });
        observer.observe(el);
    })
}

/* prospects animation */

/* appaerance animation */
const prospectsElement = document.querySelector('.prospects');
const prospectsElements = document.querySelectorAll('.prospect');
const prospectsNumbersElement = document.querySelector('.prospects_circle-numbers');
const prospectsNumberElements = document.querySelectorAll('.prospects_circle-number');
const prospectsImageElements = document.querySelectorAll('.prospects_circle-image');

if (!isMobile && prospectsElement) {
    window.addEventListener('scroll', () => {
        const {height, top, bottom} = prospectsElement.getBoundingClientRect();
        const heightWithOffset = height;
        const screenHeight = screen.availHeight;

        const scrollPercent = ((((heightWithOffset - top) / heightWithOffset ) * 100) - 100) + 5;

        const onePercent = 90 * prospectsElements.length / 100;
        const angle = Math.round(scrollPercent * -onePercent) * 1.1;


        if (angle < 100) {
            prospectsNumbersElement.style.transform = `rotate(${angle}deg)`;
        
            prospectsNumberElements.forEach((el, i) => {
                el.style.transform = `rotate(${-angle}deg)`;
            });

            prospectsNumberElements.forEach(el => el.classList.remove('active'));
            prospectsNumberElements.forEach(el => el.classList.remove('preactive'));
            prospectsImageElements.forEach(el => el.classList.remove('active'));

            switch(true) {
                case angle > -90:
                    prospectsElement.dataset.slide = 1;
                    prospectsNumberElements[1].classList.add('preactive');
                    prospectsNumberElements[0].classList.add('active');
                    prospectsImageElements[0].classList.add('active');
                    return;
                case angle > -180:
                    prospectsElement.dataset.slide = 2;
                    prospectsNumberElements[2].classList.add('preactive');
                    prospectsNumberElements[1].classList.add('active');
                    prospectsImageElements[1].classList.add('active');
                    return;
                case angle > -270:
                    prospectsElement.dataset.slide = 3;
                    prospectsNumberElements[3].classList.add('preactive');
                    prospectsNumberElements[2].classList.add('active');
                    prospectsImageElements[2].classList.add('active');
                    return;
                case angle > -360:
                    prospectsElement.dataset.slide = 4;
                    prospectsNumberElements[4].classList.add('preactive');
                    prospectsNumberElements[3].classList.add('active');
                    prospectsImageElements[3].classList.add('active');
                    return;
                case angle > -450:
                    prospectsElement.dataset.slide = 5;
                    prospectsNumberElements[5].classList.add('preactive');
                    prospectsNumberElements[4].classList.add('active');
                    prospectsImageElements[4].classList.add('active');
                    return;
                case angle > -540:
                    prospectsElement.dataset.slide = 6;
                    prospectsNumberElements[5].classList.add('active');
                    prospectsImageElements[5].classList.add('active');
                    return;
            }
        }

    });

}

/* blinks animation */
const blinksElement = document.querySelector('.blinks');
if (blinksElement) {
    document.addEventListener(wheelEvent, (e) => {
        blinksElement.classList.remove('blinks__down');
        blinksElement.classList.remove('blinks__up');

        if (e.deltaY > 0) {
            blinksElement.classList.add('blinks__up');
        } else {
            blinksElement.classList.add('blinks__down');
        }

        setTimeout(() => {
            blinksElement.classList.remove('blinks__down');
            blinksElement.classList.remove('blinks__up');
        }, 1000);
    });
}

/* clients map */
const clientsMapButtons = document.querySelectorAll('.clients-map_item-button');
if (clientsMapButtons.length) {
    let activePlace = 1;

    const clientMapItems = document.querySelectorAll('.clients-map_slider .tns-item:not(.tns-slide-cloned)');
    clientMapItems[activePlace - 1].classList.add('active');
    document.querySelector('.clients-map').dataset.place = activePlace;

    clientsMapButtons.forEach(button => button.addEventListener('click', (e) => {
        activePlace = Number(e.target.dataset.place);

        clientsMapButtons.forEach(el => el.classList.remove('active'));
        clientMapItems.forEach(el => el.classList.remove('active'));

        clientMapItems[activePlace - 1].classList.add('active');
        clientMapItems[activePlace - 1].querySelector('.clients-map_item-button').classList.add('active');

        document.querySelector('.clients-map').dataset.place = activePlace;
    }));
}

const mapMarkers = document.querySelectorAll('.map_place, .map_pin');
mapMarkers.forEach(el => el.addEventListener('click', function(e) {
    mapMarkers.forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
}))

// alphabet cards
if (document.querySelector('.alphabet')) {
    const letters = document.querySelectorAll('.alphabet_letter');
    const cardsLetters = document.querySelectorAll('.alphabet_item-letter');

    function handleLetterClick(e) {
        e.preventDefault();
        const className = e.type === 'click' ? 'active' : 'hovered';

        const content = e.target.innerText;
        letters.forEach(el => el.classList.remove(className));
        cardsLetters.forEach(el => {
            if (el.innerText === content) {
                el.parentElement.classList.add(className);
            } else {
                el.parentElement.classList.remove(className);
            }
        });

        e.target.classList.add(className);
    }

    function handleCardClick(e) {
        e.preventDefault();
        const className = e.type === 'click' ? 'active' : 'hovered';

        const content = e.target.querySelector('.alphabet_item-letter').innerText;
        cardsLetters.forEach(el => el.parentElement.classList.remove(className));
        letters.forEach(el => {
            if (el.innerText === content) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        });

        e.target.classList.add(className);
    }

    function handleMouseLeave(e) {
        e.preventDefault();
        const className = 'hovered';

        cardsLetters.forEach(el => el.parentElement.classList.remove(className));
        letters.forEach(el => el.classList.remove(className));  
    }

    letters.forEach(letter => letter.addEventListener('click', handleLetterClick));
    letters.forEach(letter => letter.addEventListener('mouseenter', handleLetterClick));
    letters.forEach(letter => letter.addEventListener('mouseleave', handleMouseLeave));

    cardsLetters.forEach(cardLetter => cardLetter.parentElement.addEventListener('click', handleCardClick));
    cardsLetters.forEach(cardLetter => cardLetter.parentElement.addEventListener('mouseenter', handleCardClick));
    cardsLetters.forEach(cardLetter => cardLetter.parentElement.addEventListener('mouseleave', handleMouseLeave));
};

const comparisonElement = document.querySelector('#image-compare');
if (comparisonElement) {
    const compareViewer = new ImageCompare(comparisonElement, {
        hoverStart: true
    }).mount();

    const comparisonTabsContainer = document.querySelectorAll('.comparison_tabs');
    
    comparisonTabsContainer.forEach(tabContainer => {
        const tabsButtons = tabContainer.querySelectorAll('.comparison_tabs-button');
        const tabsBlocks = tabContainer.querySelectorAll('.comparison_tabs-item');
    
        if (tabsButtons.length) {
            function switchTab(e) {
                e.preventDefault();
    
                const index = e.target.dataset.tab;
                tabsButtons.forEach(el => el.classList.remove('active'));
                tabsBlocks.forEach(el => el.classList.remove('active'));
    
                tabsButtons[index - 1].classList.add('active');
                tabsBlocks[index - 1].classList.add('active');
            }
    
            tabsButtons.forEach(el => el.addEventListener('click', switchTab));
        }
    });
}


/* custom select input */
if ('NiceSelect' in window && document.querySelector('select')) {
    NiceSelect.bind(document.querySelector('select'));
}

/* changable background */
const strategyElement = document.querySelector('.strategy');
if (strategyElement && !isMobile) {
    const bgElement = strategyElement.querySelector('.strategy_bg');
    const items = strategyElement.querySelectorAll('.strategy_item');

    items.forEach(el => {
        let ratio = .7;

        const observerCallback = function (e) {
            const {target, intersectionRatio} = e[0];
            const color = target.style.backgroundColor;

            if (intersectionRatio > ratio) {
                bgElement.style.backgroundColor = color;
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '0px 0px 0px 0px',
            threshold: thresholdSteps,
            //root: document.body
        });
        observer.observe(el);
    })
}

/* reviews change */
const reviewElements = document.querySelectorAll('.review');
if (reviewElements.length) {
    const reviewsCount = reviewElements.length;
    let activeIndex = 0;

    setInterval(() => {
        reviewElements[activeIndex]?.classList.toggle('active');
        reviewElements[activeIndex]?.nextElementSibling?.classList.toggle('active');
        reviewElements[activeIndex]?.previousElementSibling?.classList.toggle('active');

        if (activeIndex < reviewsCount - reviewsCount / 3) {
            activeIndex += reviewsCount / 3;
        } else {
            activeIndex = 0;
        }

    }, 3000);
}

/* words change */
const wordsElements = document.querySelectorAll('.words span');
if (wordsElements.length) {
    wordsElements[0].classList.add('active');
    const wordsCount = wordsElements.length;
    let activeIndex = 0;

    setInterval(() => {
        wordsElements.forEach(el => el.classList.remove('active'));
        wordsElements[activeIndex].classList.add('active');

        if (activeIndex < wordsCount - 1) {
            activeIndex++;
        } else {
            activeIndex = 0;
        }
    }, 2000);
}
