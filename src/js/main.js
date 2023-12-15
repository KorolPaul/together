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

document.querySelectorAll('.page_next').forEach(el => el.addEventListener('click', () => {
    fullpage_api.moveSectionDown();
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
    console.log(video.dataset, !isMobile);
    if (video.dataset.src && !isMobile) {
        video.setAttribute('src', video.dataset.src);
    }
});