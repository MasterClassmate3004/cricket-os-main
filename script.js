// --- Team Data ---
const teams = [
    { name: 'Red Bull Racing', primary: '#0600EF', accent: '#CC0000', dark: '#000814' },
    { name: 'Mercedes-AMG', primary: '#C8CCCE', accent: '#00A19B', dark: '#000000' },
    { name: 'Scuderia Ferrari', primary: '#EF1A2D', accent: '#FF2800', dark: '#111111' },
    { name: 'McLaren', primary: '#FF8000', accent: '#474747', dark: '#0F0F0F' },
    { name: 'Aston Martin', primary: '#00665E', accent: '#CEDC00', dark: '#0A1A17' },
    { name: 'Alpine', primary: '#0090FF', accent: '#FD4BC7', dark: '#051220' },
    { name: 'Williams', primary: '#005AFF', accent: '#00A0FF', dark: '#000B20' },
    { name: 'VCARB', primary: '#00293F', accent: '#FFFFFF', dark: '#00111A' },
    { name: 'Kick Sauber', primary: '#00E701', accent: '#000000', dark: '#050505' },
    { name: 'Haas', primary: '#FFFFFF', accent: '#E6002B', dark: '#111111' }
];

// --- Boot Sequence ---
window.addEventListener('load', () => {
    const leds = document.querySelectorAll('.led');
    const tl = gsap.timeline();

    // Turn off styling initially
    gsap.set(leds, { opacity: 0.1 });

    // Light up LEDs sequentially
    leds.forEach((led, i) => {
        tl.to(led, { opacity: 1, duration: 0.05, ease: 'power1.inOut' }, i * 0.05);
    });

    // Flash all, then hide boot screen
    tl.to(leds, { opacity: 0.1, duration: 0.1, yoyo: true, repeat: 5 })
      .to('#boot-screen', { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => {
          document.getElementById('boot-screen').style.display = 'none';
          initAnimations(); // Start main animations after boot
      }});
});

// --- Main GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    // Hero Car entry
    gsap.from('#hero-car', {
        y: 100,
        opacity: 0,
        rotationX: -20,
        duration: 1.5,
        ease: 'power4.out'
    });

    // Parallax Exploded View for Telemetry
    gsap.to('#telemetry-img', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -100,
        rotationZ: 5,
        scale: 1.1
    });

    gsap.from('.feature-block.left', {
        scrollTrigger: { trigger: '.features-section', start: 'top 80%' },
        x: -100, opacity: 0, duration: 1
    });

    gsap.from('.feature-block.right', {
        scrollTrigger: { trigger: '.features-section', start: 'top 80%' },
        x: 100, opacity: 0, duration: 1
    });
}

// --- Team Selection Logic ---
const teamGrid = document.getElementById('team-grid');

teams.forEach(team => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
        <div class="team-color-swatch" style="background: ${team.primary}; border-color: ${team.accent}"></div>
        <h3>${team.name}</h3>
    `;
    card.addEventListener('click', () => applyTheme(team));
    teamGrid.appendChild(card);
});

function applyTheme(team) {
    document.documentElement.style.setProperty('--primary-color', team.primary);
    document.documentElement.style.setProperty('--accent-color', team.accent);
    document.documentElement.style.setProperty('--bg-dark', team.dark);
    
    showRadioMessage(`Settings updated to ${team.name} configuration.`);
}

// --- Easter Eggs ---

// 1. Radio Message
function showRadioMessage(msg) {
    const radioEl = document.getElementById('radio-message');
    document.getElementById('radio-content').innerText = msg;
    radioEl.classList.add('show');
    
    setTimeout(() => {
        radioEl.classList.remove('show');
    }, 4000);
}

// 2. DRS Mode (Spacebar)
let drsActive = false;
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (!drsActive) {
            drsActive = true;
            document.body.classList.add('drs-active');
            gsap.globalTimeline.timeScale(2.5); // Speed up all GSAP animations
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        drsActive = false;
        document.body.classList.remove('drs-active');
        gsap.globalTimeline.timeScale(1);
    }
});

// 3. Speed Limiter
const limiter = document.getElementById('limiter-toggle');
limiter.addEventListener('change', (e) => {
    if(e.target.checked) {
        showRadioMessage('Pit lane speed limiter engaged. Conserving resources.');
        document.body.style.backgroundImage = 'none'; // remove expensive gradient bg
    } else {
        showRadioMessage('Speed limiter off. Full power restored.');
        document.body.style.backgroundImage = ''; // restore
    }
});
