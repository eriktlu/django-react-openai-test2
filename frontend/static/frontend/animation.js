function moveBox() {
    gsap.to('.box-up', { duration: 1.5, ease: "elastic.out(1, 0.4)", y: -200 });
}

function textIn() {
    gsap.fromTo('.result', { x: '-100%', opacity: 0, ease: 'power1.out'}, { duration: 1, x: '0', opacity: 1 })
}

function textOut() {
    gsap.to('.result', { duration: 1, x: '100vw', opacity: 0, ease: 'power1.out'})
}

function addLoader() {
    // Javascript
    const app = document.getElementById('main');
    const loading = document.createElement('div');
    loading.setAttribute('id', 'loader')
    loading.style.position = 'absolute';
    loading.style.top = '65%';
    loading.style.left = '50%';
    loading.style.transform = 'translate(-50%, -50%)';
    loading.style.display = 'flex';
    loading.style.flexDirection = 'column';
    loading.style.alignItems = 'center';
    loading.style.width = '320px';
    loading.innerHTML = `
        <h1 style="color: #b4b4b4; line-height: 2rem; text-align: center;">Loading...</h1>
        <div style="width: 50px; height: 50px; background: radial-gradient(#722F37 0%, #8B0000 100%); border-radius: 50%; position: relative;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background-color: #b4b4b4; border-radius: 50%;"></div>
        </div>
    `;
    let topPosition = 0;
    let direction = 'up';
    let cdirection = 'in';
    let colorX = 0;
    let colorY = 100;
    setInterval(() => {
        if (direction === 'up') {
            topPosition += 3;
            loading.children[1].children[0].style.top = `${topPosition}px`;
            if (topPosition >= 45) {
                direction = 'down';
            }
        } else {
            topPosition -= 3;
            loading.children[1].children[0].style.top = `${topPosition}px`;
            if (topPosition <= 5) {
                direction = 'up';
            }
        }

        if (cdirection === 'in') {
            colorX += 1;
            colorY -= 1;
            loading.children[1].style.background = `radial-gradient(#722F37 ${colorX}%, #8B0000 ${colorY}%)`;
            if (colorX >= 100) {
                cdirection = 'out';
            }
        } else {
            colorX -= 1;
            colorY += 1;
            loading.children[1].style.background = `radial-gradient(#722F37 ${colorX}%, #8B0000 ${colorY}%)`;
            if (colorX <= 0) {
                cdirection = 'in';
            }
        }
    }, 50);
    app.prepend(loading);
}

const timeline = gsap.timeline({ defaults: { duration: 1 }})
timeline
    .from('.nav ul a', { opacity: 0, stagger: .5 })
    .from('.form-area', { y: '100vh', ease: 'elastic.out(1, 0.4)', duration: 1.5 })








// addLoader();