new fullpage('#fullpage', {
    //options here
    autoScrolling: true,
    scrollHorizontally: true,
    licenseKey: 'N8LA8-9CTZJ-KPK56-J8LJ6-LHXVL',
    menu: '#menu',
    navigation: true,
    navigationPosition: 'bottom',
    easing: 'easeInOutCubic',
    easingcss3: 'cubic-bezier(0.38, 0.005, 0.215, 1)',
});

document.querySelectorAll('.page_next').forEach(el => el.addEventListener('click', (e) => {
    console.log(e.target.dataset.up);
    if (e.target.dataset.up === '') {
        fullpage_api.moveTo(1)
    } else {
        fullpage_api.moveSectionDown();
    }
}));

/* video */
const videoElements = document.querySelectorAll('.page_video');

// if (videoWrapper) {
//     videoWrapper.addEventListener('click', function (e) {
//         if (!e.currentTarget.classList.contains('active')) {
//             e.currentTarget.classList.add('active');
//             e.currentTarget.querySelectorAll('video').forEach((video) => {
//                 video.muted = false;
//                 video.currentTime = 0;
//                 video.controls = true;
//             });
//         }
//     });
// }

const isMobile = window.innerWidth <= 768;
videoElements.forEach(video => {
    if (video.dataset.src && !isMobile) {
        video.setAttribute('src', video.dataset.src);
    }
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


// links hover
document.querySelectorAll('[data-text]').forEach(link=> link.addEventListener('mouseenter', (e) => {
    const initialText = e.target.dataset.text;
    const initialTextArray = e.target.innerText.split('');

    let count = 0;

    const interval = setInterval(() => {

        const newText = shuffle(initialTextArray);

        currentArray = newText;
        e.target.innerText = newText.join('');
        
        count++;

        if (count >= 7) {
            clearInterval(interval);
            e.target.innerText = initialText;
        }
    }, 25);
}));

document.querySelector('.header_video-sound')?.addEventListener('click', function(e) {
    const video = document.querySelector('video');

    if (document.body.classList.contains('with-sound')) {
        document.body.classList.remove('with-sound');
        video.volume = 0;
    } else {
        document.body.classList.add('with-sound');
        video.removeAttribute('muted');
        video.muted = false;
        video.volume = 1;
    }
});

/* title animation */
document.querySelectorAll('h1').forEach(el => {
    const observerCallback = function (e) {
        const { isIntersecting, intersectionRatio , target } = e[0];
        const animationsCount = isMobile ? 10 : 15;

        if (isIntersecting) {
            console.log(target.dataset.text, intersectionRatio);
            const initialText = target.dataset.text;
            const initialTextArray = target.innerText.split('');

            let count = 0;

            const interval = setInterval(() => {
                const newText = shuffle(initialTextArray);

                currentArray = newText;
                target.innerText = newText.join('');
                count++;

                if (count >= animationsCount) {
                    clearInterval(interval);
                    target.innerText = initialText;
                }
            }, 25);
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: `-100px 0px -100px 0px`,
    });
    observer.observe(el);
});


/* button animated */
document.querySelector('.animated-button').addEventListener('click', (e) => {
    if (isMobile && !e.target.classList.contains('active')) {
        e.preventDefault();
        e.target.classList.add('active');
    } else {
        fullpage_api.moveTo(4)
    }
})