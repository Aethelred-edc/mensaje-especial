/* ============================================================
   app.js — Sorpresa Especial 💝
   Versión 2.0 — Todos los bugs corregidos + mejoras completas
   ============================================================ */

// ─── CONFIG & TRANSLATIONS ──────────────────────────────────

const config = {
    es: {
        categories: {
            amistad: "Amistad 🤝",
            amor:    "Amor ❤️",
            familiar: "Familiar 🏠"
        },
        sub: {
            amistad:  ["Amigo/a", "Mejor Amigo/a", "Cómplice", "Hermano/a del alma"],
            amor:     ["Crush", "Pareja", "Novio/a", "Amor Platónico", "Esposa/o"],
            familiar: ["Mamá", "Papá", "Hermano/a", "Tío/a", "Primo/a", "Abuela/o"]
        },
        // TEXTOS DE TROLLEO — con \n para saltos de línea (requiere whitespace-pre-line)
        trolleos: {
            amistad:  "> SISTEMA: Analizando historial de mensajes...\n> Accediendo a galería de fotos borradas...\n> Subiendo pack vergonzoso a Instagram Stories... 📸\n> Enviando capturas a todos tus contactos...\n> ¡Encontrado: 47 archivos comprometedores!\n> Estado: SUBIENDO... 100% COMPLETO ✓",
            amor:     "> ALERTA: Nueva solicitud de matrimonio en proceso...\n> Destinatario: todos tus ex... 💘\n> Mensaje: 'Me gustas, ¿quieres ser mi novio/a?'\n> Notificando a tus padres... 👨‍👩‍👧\n> Reservando lugar para la boda... 💍\n> Estado: ENVIADO A 12 PERSONAS ✓",
            familiar: "> SISTEMA: Detectada deuda de abrazos acumulada...\n> Calculando factura de crianza pendiente: $500,000 USD... 💸\n> Notificando a la Agencia Tributaria...\n> Desactivando acceso a Netflix y WiFi...\n> Enviando historial de búsqueda sospechoso a [Familiar]...\n> Estado: BLOQUEADO ⚠️"
        },
        final: "¡Te asustaste! 😂 Es broma. Solo quería decirte que eres una persona increíble, y que me alegra muchísimo tenerte en mi vida. ¡Te quiero mucho! ❤️",
        tapTitle:  "Tienes una sorpresa",
        tapSub:    "Alguien pensó en ti hoy 💕",
        tapBtn:    "¡Abrir! 💝",
        question:  "¿Me perdonas la broma? 🥺",
        yes:       "Sí ❤️",
        noBtn:     "NO",
        celebrate: "¡Lo sabía! ❤️",
        greeting:  "¡Para mi {sub}!",
        shareBtn:  "💌 ¡Quiero enviarle esto a alguien!",
        shareSub:  "Crea tu propia sorpresa personalizada →",
        donation:  "⚠️ ERROR DE TRANSACCIÓN:\n\nEl sistema de pagos se ha bloqueado porque el programador aún no tiene edad legal para tener cuenta bancaria.\n\n¡Mejor regálale un chocolate! 🍫🍭",
        copied:    "¡COPIADO! ✓",
        statsResult: "📊 STATS — Sorpresa Especial\n\n🔗 Links generados: {links}\n🎭 Bromas exitosas:  {visitas}\n\n¡Sigue compartiéndolo! 💪",
        statsError: "No se pudieron cargar las estadísticas.\n(CountAPI puede estar temporalmente caída)",
        ui: {
            title:       "MENSAJERÍA VIP",
            desc:        "Personaliza tu envío 💝",
            gen:         "Generar Link 🚀",
            relLabel:    "Tipo de relación",
            destLabel:   "¿Para quién es?",
            msgLabel:    "Tu mensaje especial",
            msgHolder:   "Escribe algo especial para esa persona... 💕",
            copy:        "COPIAR",
            resultLabel: "✅ ¡Tu link está listo! Cópialo y envíalo:"
        }
    },
    en: {
        categories: {
            amistad:  "Friendship 🤝",
            amor:     "Love ❤️",
            familiar: "Family 🏠"
        },
        sub: {
            amistad:  ["Friend", "Best Friend", "Partner in crime", "Soul sibling"],
            amor:     ["Crush", "Partner", "Boyfriend/Girlfriend", "Soulmate", "Spouse"],
            familiar: ["Mom", "Dad", "Sibling", "Uncle/Aunt", "Cousin", "Grandma/pa"]
        },
        trolleos: {
            amistad:  "> SYSTEM: Scanning message history...\n> Accessing deleted photo gallery...\n> Uploading embarrassing pack to Instagram Stories... 📸\n> Sending screenshots to all your contacts...\n> Found: 47 compromising files!\n> Status: UPLOADING... 100% COMPLETE ✓",
            amor:     "> ALERT: New marriage proposal in progress...\n> Recipients: all your exes... 💘\n> Message: 'I like you, will you be mine?'\n> Notifying your parents... 👨‍👩‍👧\n> Booking wedding venue... 💍\n> Status: SENT TO 12 PEOPLE ✓",
            familiar: "> SYSTEM: Accumulated hug debt detected...\n> Calculating outstanding parenting bill: $500,000 USD... 💸\n> Notifying the IRS...\n> Blocking Netflix and WiFi access...\n> Sending suspicious search history to [Family member]...\n> Status: LOCKED ⚠️"
        },
        final: "Gotcha! 😂 Just kidding! I just wanted to say you're an amazing person and I'm so glad to have you in my life. I love you! ❤️",
        tapTitle:  "You have a surprise",
        tapSub:    "Someone was thinking of you today 💕",
        tapBtn:    "Open it! 💝",
        question:  "Do you forgive me for the prank? 🥺",
        yes:       "Yes ❤️",
        noBtn:     "NO",
        celebrate: "I knew it! ❤️",
        greeting:  "To my {sub}!",
        shareBtn:  "💌 I want to send this to someone!",
        shareSub:  "Create your own personalized surprise →",
        donation:  "⚠️ TRANSACTION ERROR:\n\nThe payment system is locked because the developer is not legally old enough to have a bank account.\n\nSend chocolate instead! 🍫🍭",
        copied:    "COPIED! ✓",
        statsResult: "📊 STATS — Special Surprise\n\n🔗 Links generated: {links}\n🎭 Successful pranks: {visitas}\n\nKeep sharing it! 💪",
        statsError: "Could not load stats.\n(CountAPI may be temporarily down)",
        ui: {
            title:       "VIP MESSAGING",
            desc:        "Customize your gift 💝",
            gen:         "Generate Link 🚀",
            relLabel:    "Relationship type",
            destLabel:   "Who is it for?",
            msgLabel:    "Your special message",
            msgHolder:   "Write something special for this person... 💕",
            copy:        "COPY",
            resultLabel: "✅ Your link is ready! Copy and send it:"
        }
    }
};

// ─── STATE ──────────────────────────────────────────────────

let currentLang    = 'es';
let audioError     = null;
let audioSuccess   = null;
let audioReady     = false;
let statsClicks    = 0;
let statsTimer     = null;

// ─── COUNT API ──────────────────────────────────────────────
// Namespace: sorpresa-naofomi | Keys: visitas-prank, links-generados

const NS = 'sorpresa-naofomi';

async function hitCounter(key) {
    try {
        const res = await fetch(`https://api.countapi.xyz/hit/${NS}/${key}`);
        const data = await res.json();
        return data.value ?? null;
    } catch (_) { return null; }
}

async function getCounter(key) {
    try {
        const res = await fetch(`https://api.countapi.xyz/get/${NS}/${key}`);
        const data = await res.json();
        return data.value ?? 0;
    } catch (_) { return '—'; }
}

// ─── AUDIO ──────────────────────────────────────────────────

function initAudio() {
    if (audioReady) return;
    try {
        // Sonido de error para el susto
        audioError = new Audio('https://www.myinstants.com/media/sounds/erro.mp3');
        audioError.volume = 0.55;
        // Sonido de revelación
        audioSuccess = new Audio('https://www.myinstants.com/media/sounds/ta-da.mp3');
        audioSuccess.volume = 0.6;
        // Pre-cargar en silencio (necesita interacción del usuario primero)
        audioError.load();
        audioSuccess.load();
        audioReady = true;
    } catch (e) {
        console.warn('Audio init failed:', e);
    }
}

function safePlay(audio) {
    if (!audio || !audioReady) return;
    try {
        audio.currentTime = 0;
        const promise = audio.play();
        if (promise !== undefined) {
            promise.catch(() => { /* autoplay bloqueado — silencioso */ });
        }
    } catch (_) {}
}

// ─── LANGUAGE ───────────────────────────────────────────────

function changeLang(lang) {
    currentLang = lang;
    const t  = config[lang];
    const ui = t.ui;

    // Actualizar clases de botones de idioma
    document.getElementById('btn-lang-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

    // Textos del creator
    document.getElementById('ui-title').innerText = ui.title;
    document.getElementById('ui-desc').innerText  = ui.desc;
    document.getElementById('lbl-rel').innerText  = ui.relLabel;
    document.getElementById('lbl-dest').innerText = ui.destLabel;
    document.getElementById('lbl-msg').innerText  = ui.msgLabel;
    document.getElementById('custom-message').placeholder = ui.msgHolder;
    document.getElementById('btn-generate').innerText = ui.gen;

    // Reconstruir select de categorías
    const catSel = document.getElementById('main-category');
    catSel.innerHTML = '';
    for (const key in t.categories) {
        catSel.add(new Option(t.categories[key], key));
    }

    updateSubCats();
}

function updateSubCats() {
    const cat    = document.getElementById('main-category').value;
    const subSel = document.getElementById('sub-category');
    subSel.innerHTML = '';
    config[currentLang].sub[cat].forEach(s => subSel.add(new Option(s, s)));
}

// ─── LINK GENERATOR ─────────────────────────────────────────

function generateLink() {
    const c   = document.getElementById('main-category').value;
    const s   = document.getElementById('sub-category').value;
    const raw = document.getElementById('custom-message').value.trim();
    const m   = btoa(unescape(encodeURIComponent(raw)));
    const url = `${window.location.origin}${window.location.pathname}?c=${c}&s=${encodeURIComponent(s)}&m=${m}&l=${currentLang}`;

    document.getElementById('final-url').value = url;

    const resultArea = document.getElementById('result-area');
    resultArea.classList.remove('hidden');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Contar links generados
    hitCounter('links-generados');
}

async function copyLink() {
    const input = document.getElementById('final-url');
    const btnCopy = document.getElementById('btn-copy');
    const text = input.value;

    try {
        await navigator.clipboard.writeText(text);
    } catch (_) {
        // Fallback
        input.select();
        input.setSelectionRange(0, 99999);
        try { document.execCommand('copy'); } catch (e2) {}
    }

    // Feedback visual
    const original = btnCopy.innerText;
    btnCopy.innerText = config[currentLang].copied || '✓';
    btnCopy.classList.add('bg-green-700');
    setTimeout(() => {
        btnCopy.innerText = original;
        btnCopy.classList.remove('bg-green-700');
    }, 2000);
}

// ─── RECEIVER FLOW ──────────────────────────────────────────

function beginPrank() {
    // PASO 1: Inicializar audio (se llama desde click → usuario interactuó)
    initAudio();

    // Ocultar overlay, mostrar pantalla de trolleo
    document.getElementById('tap-overlay').classList.add('hidden');
    const prankScreen = document.getElementById('prank-screen');
    prankScreen.classList.remove('hidden');
    prankScreen.classList.add('fade-in');

    // Iniciar animación de escritura
    const p = new URLSearchParams(window.location.search);
    startTyping(p);
}

function startTyping(p) {
    const lang = p.get('l') || 'es';
    const cat  = p.get('c') || 'amistad';
    const msg  = config[lang].trolleos[cat] || config[lang].trolleos.amistad;

    const el = document.getElementById('prank-text');
    el.innerText = '';
    // Quitar cursor mientras escribe para reposicionarlo al final
    el.classList.remove('terminal-cursor');

    let i = 0;
    const speed = 28; // ms por carácter

    const typer = setInterval(() => {
        el.innerText += msg.charAt(i);
        i++;
        if (i >= msg.length) {
            clearInterval(typer);
            el.classList.add('terminal-cursor');
            setTimeout(() => fillBar(p), 600);
        }
    }, speed);
}

function fillBar(p) {
    const bar      = document.getElementById('progress-bar');
    const container = document.getElementById('main-container');
    let width = 0;

    // Quitar cursor al iniciar barra
    document.getElementById('prank-text').classList.remove('terminal-cursor');

    const interval = setInterval(() => {
        width += 1;
        bar.style.width = width + '%';

        // Sonido de error al 55%
        if (width === 55) safePlay(audioError);

        // Vibración intensa al 80%
        if (width === 80) container.classList.add('shake-heavy');

        // Cuando llega al 100% → revelar
        if (width >= 100) {
            clearInterval(interval);
            container.classList.remove('shake-heavy');
            setTimeout(() => showFinal(p), 400);
        }
    }, 45);
}

function showFinal(p) {
    safePlay(audioSuccess);

    // Cambiar pantallas
    document.getElementById('prank-screen').classList.add('hidden');
    const finalScreen = document.getElementById('final-screen');
    finalScreen.classList.remove('hidden');
    finalScreen.classList.add('fade-in');

    const lang      = p.get('l') || 'es';
    const t         = config[lang];
    const sub       = decodeURIComponent(p.get('s') || '');
    const rawB64    = p.get('m');
    let customMsg   = t.final;

    // Decodificar mensaje personalizado
    if (rawB64) {
        try {
            customMsg = decodeURIComponent(escape(atob(rawB64)));
        } catch (_) { customMsg = t.final; }
    }

    // Si el mensaje está vacío usar el default
    if (!customMsg.trim()) customMsg = t.final;

    // Saludo y texto
    document.getElementById('final-greeting').innerText = t.greeting.replace('{sub}', sub);
    document.getElementById('final-text').innerText     = customMsg;

    // Botón compartir y subtexto
    document.querySelector('[onclick="goToCreator()"]').innerText = t.shareBtn;
    document.getElementById('share-sub').innerText = t.shareSub;

    // Mostrar pregunta solo en categoría amor
    if (p.get('c') === 'amor') {
        const qArea = document.getElementById('question-area');
        qArea.classList.remove('hidden');
        document.getElementById('question-text').innerText = t.question;
        document.getElementById('btn-yes').innerText       = t.yes;
        document.getElementById('btn-no').innerText        = t.noBtn;
    }

    // ★ Confeti
    launchConfetti();
}

function launchConfetti() {
    // Primera oleada
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#ff4d6d','#ff85a1','#ffd6e0','#ff0054','#ffccd5'] });
    // Segunda oleada con delay
    setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#ffd6e0','#ffb3c1','#ff0054'] });
        confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#ffd6e0','#ffb3c1','#ff0054'] });
    }, 400);
}

// ─── BOTÓN NO FUGITIVO ───────────────────────────────────────

const escapedPositions = [
    { left: '60%',  top: '-30px' },
    { left: '-10%', top: '20px'  },
    { left: '55%',  top: '30px'  },
    { left: '-15%', top: '-20px' },
    { left: '50%',  top: '40px'  },
    { left: '-5%',  top: '-35px' },
];
let escapePosIndex = 0;

function initBtnNo() {
    const btnNo = document.getElementById('btn-no');
    if (!btnNo) return;

    function escape() {
        const pos = escapedPositions[escapePosIndex % escapedPositions.length];
        btnNo.style.left = pos.left;
        btnNo.style.top  = pos.top;
        escapePosIndex++;
    }

    btnNo.addEventListener('mouseover',    escape);
    btnNo.addEventListener('touchstart',   escape, { passive: true });
    btnNo.addEventListener('touchmove',    escape, { passive: true });
}

// ─── ACTIONS ────────────────────────────────────────────────

function celebrate() {
    const lang = (new URLSearchParams(window.location.search).get('l')) || currentLang;
    alert(config[lang].celebrate || '¡Lo sabía! ❤️');
    launchConfetti();
    setTimeout(() => launchConfetti(), 800);
}

function goToCreator() {
    // Llevar al creador limpiando todos los parámetros URL
    window.location.href = window.location.origin + window.location.pathname;
}

function showDonationJoke() {
    alert(config[currentLang].donation);
}

// ─── PANEL SECRETO DE ESTADÍSTICAS ──────────────────────────
// Clic 5 veces en "Hecho con ❤️ · naofomi" para ver stats

function handleStatsTrigger() {
    statsClicks++;

    // Resetear contador si pasan más de 2 segundos entre clics
    clearTimeout(statsTimer);
    statsTimer = setTimeout(() => { statsClicks = 0; }, 2000);

    if (statsClicks >= 5) {
        statsClicks = 0;
        showStats();
    }
}

async function showStats() {
    const lang  = currentLang;
    const t     = config[lang];
    const [visitas, links] = await Promise.all([
        getCounter('visitas-prank'),
        getCounter('links-generados')
    ]);

    if (visitas === '—' && links === '—') {
        alert(t.statsError);
    } else {
        const msg = t.statsResult
            .replace('{visitas}', visitas ?? '?')
            .replace('{links}',   links   ?? '?');
        alert(msg);
    }
}

// ─── INIT ────────────────────────────────────────────────────

window.onload = () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('c')) {
        // ── RECEIVER MODE ──
        document.getElementById('creator-view').classList.add('hidden');
        document.getElementById('receiver-view').classList.remove('hidden');

        const lang = params.get('l') || 'es';
        const t    = config[lang];

        // Aplicar idioma al overlay de apertura
        document.getElementById('tap-title').innerText = t.tapTitle;
        document.getElementById('tap-sub').innerText   = t.tapSub;
        document.getElementById('tap-btn').innerText   = t.tapBtn;

        // Actualizar lang buttons
        document.getElementById('btn-lang-es').classList.toggle('active', lang === 'es');
        document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');
        currentLang = lang;

        // ★ Contar visita al prank
        hitCounter('visitas-prank');

        // Inicializar botón NO fugitivo (esperamos a que esté en el DOM)
        setTimeout(initBtnNo, 100);

    } else {
        // ── CREATOR MODE ──
        changeLang('es');
    }
};
