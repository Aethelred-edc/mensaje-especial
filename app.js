const config = {
    es: {
        categories: { amistad: "Amistad 🤝", amor: "Amor ❤️", familiar: "Familiar 🏠" },
        sub: {
            amistad: ["Amigo/a", "Mejor Amigo/a", "Cómplice"],
            amor: ["Crush", "Pareja", "Novio/a", "Amor Platónico", "Esposa/o"],
            familiar: ["Mamá", "Papá", "Hermano/a", "Tío/a", "Primo/a"]
        },
        trolleos: {
            amistad: "> ERROR: Accediendo a archivos privados... \n> Enviando capturas de pantalla a tus contactos... 📸\n> Estado: 100% COMPLETO.",
            amor: "> ALERTA: Detectada falta de atención. \n> Enviando mensaje 'Tenemos que hablar' a tus ex... 😱\n> Estado: PROCESANDO...",
            familiar: "> SYSTEM: Se ha detectado una deuda de abrazos acumulada. \n> Bloqueando este teléfono hasta que vayas a saludar... 🏠\n> Estado: BLOQUEADO."
        },
        final: "¡Te asustaste! 😂 Es broma. Solo quería decirte que eres una persona increíble y te quiero mucho.",
        donation: "⚠️ ERROR DE TRANSACCIÓN:\n\nEl sistema de pagos se ha bloqueado porque el programador aún no tiene edad legal para tener cuenta bancaria.\n\n¡Mejor regálale un chocolate! 🍫🍭",
        ui: { title: "MENSAJERÍA VIP", desc: "Personaliza tu envío", gen: "Generar Link 🚀", status: "Hackeando..." }
    },
    en: {
        categories: { amistad: "Friendship 🤝", amor: "Love ❤️", familiar: "Family 🏠" },
        sub: {
            amistad: ["Friend", "Bestie", "Partner in crime"],
            amor: ["Crush", "Partner", "Boyfriend/Girlfriend", "Soulmate"],
            familiar: ["Mom", "Dad", "Sibling", "Uncle/Aunt", "Cousin"]
        },
        trolleos: {
            amistad: "> ERROR: Accessing private files... \n> Sending screenshots to all your contacts... 📸\n> Status: 100% COMPLETE.",
            amor: "> ALERT: Lack of attention detected. \n> Sending 'We need to talk' message to all your exes... 😱\n> Status: PROCESSING...",
            familiar: "> SYSTEM: Hug debt detected. \n> Locking phone until you go say hi to your family... 🏠\n> Status: LOCKED."
        },
        final: "Gotcha! 😂 It's just a joke. I just wanted to say you're an amazing person and I love you!",
        donation: "⚠️ TRANSACTION ERROR:\n\nThe payment system is locked because the developer is not legally old enough to have a bank account.\n\nSend chocolate instead! 🍫🍭",
        ui: { title: "VIP MESSAGING", desc: "Customize your gift", gen: "Generate Link 🚀", status: "Hacking..." }
    }
};

let currentLang = 'es';
const audioError = new Audio('https://www.myinstants.com/media/sounds/discord-notification.mp3');
const audioSuccess = new Audio('https://www.myinstants.com/media/sounds/ta-da.mp3');

function updateSubCats() {
    const cat = document.getElementById('main-category').value;
    const subSelect = document.getElementById('sub-category');
    subSelect.innerHTML = '';
    config[currentLang].sub[cat].forEach(s => {
        let opt = new Option(s, s);
        subSelect.add(opt);
    });
}

function changeLang(lang) {
    currentLang = lang;
    const catSelect = document.getElementById('main-category');
    catSelect.innerHTML = '';
    for (let key in config[lang].categories) {
        let opt = new Option(config[lang].categories[key], key);
        catSelect.add(opt);
    }
    document.getElementById('ui-title').innerText = config[lang].ui.title;
    document.getElementById('ui-desc').innerText = config[lang].ui.desc;
    updateSubCats();
}

function generateLink() {
    const c = document.getElementById('main-category').value;
    const s = document.getElementById('sub-category').value;
    const m = btoa(unescape(encodeURIComponent(document.getElementById('custom-message').value)));
    const url = `${window.location.origin}${window.location.pathname}?c=${c}&s=${s}&m=${m}&l=${currentLang}`;
    document.getElementById('final-url').value = url;
    document.getElementById('result-area').classList.remove('hidden');
}

function copyLink() {
    const input = document.getElementById('final-url');
    input.select();
    document.execCommand('copy');
    alert("¡Enlace copiado! Pégalo en el chat de esa persona 🚀");
}

window.onload = () => {
    const p = new URLSearchParams(window.location.search);
    if (p.has('c')) {
        document.getElementById('creator-view').classList.add('hidden');
        document.getElementById('receiver-view').classList.remove('hidden');
        startPrank(p);
    } else {
        changeLang('es');
    }
};

function startPrank(p) {
    const lang = p.get('l') || 'es';
    const msg = config[lang].trolleos[p.get('c')];
    const prankTextEl = document.getElementById('prank-text');
    let i = 0;
    
    const typer = setInterval(() => {
        prankTextEl.innerText += msg.charAt(i);
        i++;
        if (i >= msg.length) {
            clearInterval(typer);
            setTimeout(fillBar, 500);
        }
    }, 40);
}

function fillBar() {
    let bar = document.getElementById('progress-bar');
    let width = 0;
    const interval = setInterval(() => {
        width += 1;
        bar.style.width = width + '%';
        if (width === 50) audioError.play();
        if (width > 80) document.getElementById('main-container').classList.add('shake-heavy');
        if (width >= 100) {
            clearInterval(interval);
            showFinal();
        }
    }, 50);
}

function showFinal() {
    audioSuccess.play();
    document.getElementById('main-container').classList.remove('shake-heavy');
    document.getElementById('prank-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    
    const p = new URLSearchParams(window.location.search);
    const lang = p.get('l') || 'es';
    const customMsg = p.get('m') ? decodeURIComponent(escape(atob(p.get('m')))) : config[lang].final;
    
    document.getElementById('final-greeting').innerText = `¡Para mi ${p.get('s')}!`;
    document.getElementById('final-text').innerText = customMsg;
    
    if(p.get('c') === 'amor') document.getElementById('question-area').classList.remove('hidden');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

function showDonationJoke() {
    alert(config[currentLang].donation);
}

// Botón No Fugitivo
const btnNo = document.getElementById('btn-no');
btnNo.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    btnNo.style.left = `${Math.random() * 80 - 40}%`;
    btnNo.style.top = `${Math.random() * 40 - 20}px`;
});

function celebrate() {
    alert("¡Lo sabía! ❤️");
    confetti({ particleCount: 300, spread: 100 });
}