/* ================================================================
   app.js — Sorpresa Especial 💝  v3.0
   Fixes: terminal text, per-category messages, sounds via WebAudio,
          language receiver-side, btn-no surrender, celebrate inline.
   ================================================================ */

// ───────────────────────────────────────────────────────────
// CONFIG / TRANSLATIONS
// ───────────────────────────────────────────────────────────
const config = {
    es: {
        categories: {
            amistad:  'Amistad 🤝',
            amor:     'Amor ❤️',
            familiar: 'Familiar 🏠'
        },
        sub: {
            amistad:  ['Amigo/a', 'Mejor Amigo/a', 'Cómplice', 'Hermano/a del alma'],
            amor:     ['Crush', 'Pareja', 'Novio/a', 'Amor Platónico', 'Esposa/o'],
            familiar: ['Mamá', 'Papá', 'Hermano/a', 'Tío/a', 'Primo/a', 'Abuela/o']
        },

        // Texto de trolleo por categoría (los \n son saltos de línea reales gracias a pre-wrap)
        trolleos: {
            amistad: [
                '> SISTEMA: Analizando historial de mensajes...',
                '> Accediendo a galería de fotos borradas...',
                '> Subiendo pack vergonzoso a Instagram Stories... 📸',
                '> Enviando capturas a TODOS tus contactos...',
                '> ¡Encontrado: 47 archivos comprometedores!',
                '> Estado: SUBIENDO... ████████ 100% COMPLETO ✓'
            ].join('\n'),
            amor: [
                '> ALERTA: Nueva solicitud de matrimonio en proceso...',
                '> Destinatarios: todos tus ex... 💘',
                '> Mensaje: "Me gustas, ¿quieres ser mi novio/a?"',
                '> Notificando a tus padres... 👨‍👩‍👧',
                '> Reservando lugar para la boda... 💍',
                '> Estado: ENVIADO A 12 PERSONAS ✓'
            ].join('\n'),
            familiar: [
                '> SISTEMA: Detectada deuda de abrazos acumulada...',
                '> Calculando factura de crianza pendiente: $500,000 USD 💸',
                '> Notificando a la Agencia Tributaria...',
                '> Desactivando acceso a Netflix y WiFi...',
                '> Enviando historial sospechoso al remitente...',
                '> Estado: BLOQUEADO ⚠️'
            ].join('\n')
        },

        // Mensajes finales DIFERENTES por categoría
        final: {
            amistad:  '¡Te asustaste! 😂 Era solo una broma. Quería decirte que gracias por estar siempre ahí, por aguantarme y por ser el mejor cómplice que existe. La amistad como la tuya no tiene precio. ¡Te quiero muchísimo! 🤝❤️',
            amor:     '¡Casi te da un infarto! 😜 Era solo una broma, amor. Solo quería recordarte que eres increíblemente especial para mí, y que tenerte hace que todo valga la pena. ¡Feliz 14! 💕',
            familiar: '¡Te asustamos! 😅 Tranquilo/a, es una broma. La verdad es que no hay dinero que pague todo lo que has dado por mí. Solo quería recordarte cuánto te quiero y lo importante que eres en mi vida. ❤️🏠'
        },

        tapTitle:  'Tienes una sorpresa',
        tapSub:    'Alguien pensó en ti hoy 💕',
        tapBtn:    '¡Abrir! 💝',
        tapHint:   '🔊 Activa el sonido para la experiencia completa',
        question:  '¿Me perdonas la broma? 🥺',
        yesBtn:    'Sí ❤️',
        noBtn:     'NO',
        noSurrender: '💕 ¡Yo también!',
        celebrateText: '¡Lo sabía!',
        celebrateSub:  '¡Gracias por perdonarme! Te quiero mucho ❤️',
        greeting:  '¡Para mi {sub}!',
        shareBtn:  '💌 ¡Quiero enviarle esto a alguien!',
        shareSub:  'Crea tu propia sorpresa personalizada →',
        donation:  '⚠️ ERROR DE TRANSACCIÓN:\n\nEl sistema de pagos se ha bloqueado porque el programador aún no tiene edad legal para tener cuenta bancaria.\n\n¡Mejor regálale un chocolate! 🍫🍭',
        copied:    '¡COPIADO! ✓',
        statsResult: '📊 STATS — Sorpresa Especial\n\n🔗 Links generados: {links}\n🎭 Bromas exitosas:  {visitas}\n\n¡Sigue compartiéndolo! 💪',
        statsError: 'No se pudieron cargar las estadísticas.\n(CountAPI puede estar temporalmente caída)',
        ui: {
            title:    'MENSAJERÍA VIP',
            desc:     'Personaliza tu envío 💝',
            gen:      'Generar Link 🚀',
            rel:      'Tipo de relación',
            dest:     '¿Para quién es?',
            msg:      'Tu mensaje especial',
            msgOpt:   '✨ Opcional — puedes dejarlo en blanco',
            msgHint:  '💡 Si lo dejas vacío se enviará un mensaje bonito por defecto',
            msgHolder:'Escribe algo especial para esa persona... 💕',
            copy:     'COPIAR',
            result:   '✅ ¡Tu link está listo! Cópialo y envíalo:'
        }
    },

    en: {
        categories: {
            amistad:  'Friendship 🤝',
            amor:     'Love ❤️',
            familiar: 'Family 🏠'
        },
        sub: {
            amistad:  ['Friend', 'Best Friend', 'Partner in crime', 'Soul sibling'],
            amor:     ['Crush', 'Partner', 'Boyfriend/Girlfriend', 'Soulmate', 'Spouse'],
            familiar: ['Mom', 'Dad', 'Sibling', 'Uncle/Aunt', 'Cousin', 'Grandma/pa']
        },
        trolleos: {
            amistad: [
                '> SYSTEM: Scanning message history...',
                '> Accessing deleted photo gallery...',
                '> Uploading embarrassing pack to Instagram Stories... 📸',
                '> Sending screenshots to ALL your contacts...',
                '> Found: 47 compromising files!',
                '> Status: UPLOADING... ████████ 100% COMPLETE ✓'
            ].join('\n'),
            amor: [
                '> ALERT: New marriage proposal in progress...',
                '> Recipients: all your exes... 💘',
                '> Message: "I like you, will you be mine?"',
                '> Notifying your parents... 👨‍👩‍👧',
                '> Booking wedding venue... 💍',
                '> Status: SENT TO 12 PEOPLE ✓'
            ].join('\n'),
            familiar: [
                '> SYSTEM: Accumulated hug debt detected...',
                '> Calculating parenting bill: $500,000 USD 💸',
                '> Notifying the IRS...',
                '> Blocking Netflix and WiFi access...',
                '> Sending suspicious history to sender...',
                '> Status: LOCKED ⚠️'
            ].join('\n')
        },
        final: {
            amistad:  'Gotcha! 😂 Just a prank! I wanted to say that I am so grateful to have you in my life. Your friendship means everything to me. I love you tons! 🤝❤️',
            amor:     'Almost got you! 😜 It was just a joke, my love! I just wanted to remind you how incredibly special you are to me. Happy Valentine\'s Day! 💕',
            familiar: 'We got you! 😅 Relax, it was a prank! There is no way to repay everything you have done for me. I just want you to know how much I love you. ❤️🏠'
        },
        tapTitle:  'You have a surprise',
        tapSub:    'Someone was thinking of you today 💕',
        tapBtn:    'Open it! 💝',
        tapHint:   '🔊 Turn on sound for the full experience',
        question:  'Do you forgive me for the prank? 🥺',
        yesBtn:    'Yes ❤️',
        noBtn:     'NO',
        noSurrender: '💕 I love you too!',
        celebrateText: 'I knew it!',
        celebrateSub:  'Thanks for forgiving me! I love you! ❤️',
        greeting:  'For my {sub}!',
        shareBtn:  '💌 I want to send this to someone!',
        shareSub:  'Create your own personalized surprise →',
        donation:  '⚠️ TRANSACTION ERROR:\n\nThe payment system is locked because the developer is not legally old enough to have a bank account.\n\nSend chocolate instead! 🍫🍭',
        copied:    'COPIED! ✓',
        statsResult: '📊 STATS — Special Surprise\n\n🔗 Links generated: {links}\n🎭 Successful pranks: {visitas}\n\nKeep sharing it! 💪',
        statsError: 'Could not load stats.\n(CountAPI may be temporarily down)',
        ui: {
            title:    'VIP MESSAGING',
            desc:     'Customize your gift 💝',
            gen:      'Generate Link 🚀',
            rel:      'Relationship type',
            dest:     'Who is it for?',
            msg:      'Your special message',
            msgOpt:   '✨ Optional — you can leave it blank',
            msgHint:  '💡 If blank, a beautiful default message will be used',
            msgHolder:'Write something special for this person... 💕',
            copy:     'COPY',
            result:   '✅ Your link is ready! Copy and send it:'
        }
    }
};

// ───────────────────────────────────────────────────────────
// STATE
// ───────────────────────────────────────────────────────────
let currentLang  = 'es';
let audioCtx     = null;
let audioUnlocked = false;
let statsClicks  = 0;
let statsTimer   = null;
let noEscapes    = 0;
let noLastTime   = 0;
const MAX_ESCAPES = 5;

// ───────────────────────────────────────────────────────────
// COUNT API
// ───────────────────────────────────────────────────────────
const NS = 'sorpresa-naofomi';

async function hitCounter(key) {
    try {
        const r = await fetch(`https://api.countapi.xyz/hit/${NS}/${key}`);
        return (await r.json()).value ?? null;
    } catch (_) { return null; }
}
async function getCounter(key) {
    try {
        const r = await fetch(`https://api.countapi.xyz/get/${NS}/${key}`);
        return (await r.json()).value ?? 0;
    } catch (_) { return '—'; }
}

// ───────────────────────────────────────────────────────────
// WEB AUDIO ENGINE  (sin URLs externas → siempre funciona)
// ───────────────────────────────────────────────────────────
function getAudioCtx() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (_) {}
    }
    return audioCtx;
}

// Llamar DENTRO de un click/touch para desbloquear el contexto
function unlockAudio() {
    if (audioUnlocked) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    // Resume si estaba suspendido (política de autoplay)
    if (ctx.state === 'suspended') ctx.resume();
    audioUnlocked = true;
}

// Clic de teclado (durante escritura)
function playKeyClick() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.035), ctx.sampleRate);
        const d   = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) {
            d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2) * 0.35;
        }
        const src  = ctx.createBufferSource();
        const gain = ctx.createGain();
        src.buffer = buf;
        src.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.18;
        src.start();
    } catch (_) {}
}

// Alarma de susto (al 55% de la barra)
function playAlarm() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        [0, 0.22, 0.44, 0.66].forEach(off => {
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, t + off);
            osc.frequency.exponentialRampToValueAtTime(220, t + off + 0.18);
            gain.gain.setValueAtTime(0.25, t + off);
            gain.gain.exponentialRampToValueAtTime(0.001, t + off + 0.18);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + off);
            osc.stop(t + off + 0.18);
        });
    } catch (_) {}
}

// Fanfarria de revelación (arpeggio mayor)
function playFanfare() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        // Do mayor: C5 E5 G5 C6
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            // Nota principal (sine suave)
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0,    t + i * 0.11);
            gain.gain.linearRampToValueAtTime(0.22, t + i * 0.11 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.11 + 0.55);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.11);
            osc.stop(t + i * 0.11 + 0.55);

            // Armónico (triangle, más suave)
            const osc2  = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.value = freq * 2;
            gain2.gain.setValueAtTime(0,    t + i * 0.11);
            gain2.gain.linearRampToValueAtTime(0.07, t + i * 0.11 + 0.03);
            gain2.gain.exponentialRampToValueAtTime(0.001, t + i * 0.11 + 0.35);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(t + i * 0.11);
            osc2.stop(t + i * 0.11 + 0.35);
        });
    } catch (_) {}
}

// Pop suave (al generar link / copiar)
function playPop() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
    } catch (_) {}
}

// Ding de confirmación (al copiar)
function playDing() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        [880, 1320].forEach((freq, i) => {
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0,    t + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.18, t + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.08);
            osc.stop(t + i * 0.08 + 0.4);
        });
    } catch (_) {}
}

// Clic del botón NO escapando
function playEscapeSound() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(800, t + 0.06);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);
    } catch (_) {}
}

// ───────────────────────────────────────────────────────────
// LANGUAGE
// ───────────────────────────────────────────────────────────
function changeLang(lang) {
    currentLang = lang;
    const t  = config[lang];
    const ui = t.ui;

    // Botones de idioma
    document.getElementById('btn-lang-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

    // ── Actualizar CREATOR VIEW ──
    const creatorView = document.getElementById('creator-view');
    if (creatorView) {
        document.getElementById('ui-title').textContent    = ui.title;
        document.getElementById('ui-desc').textContent     = ui.desc;
        document.getElementById('lbl-rel').textContent     = ui.rel;
        document.getElementById('lbl-dest').textContent    = ui.dest;
        document.getElementById('lbl-msg').textContent     = ui.msg;
        document.getElementById('lbl-opt').textContent     = ui.msgOpt;
        document.getElementById('lbl-hint').textContent    = ui.msgHint;
        document.getElementById('custom-message').placeholder = ui.msgHolder;
        document.getElementById('btn-generate').textContent = ui.gen;
        const rLabel = document.getElementById('lbl-result');
        if (rLabel) rLabel.textContent = ui.result;
        const btnCopy = document.getElementById('btn-copy');
        if (btnCopy && btnCopy.textContent !== (config[currentLang].copied || ui.copy)) {
            btnCopy.textContent = ui.copy;
        }

        // Reconstruir categorías
        const catSel = document.getElementById('main-category');
        catSel.innerHTML = '';
        for (const key in t.categories) {
            catSel.add(new Option(t.categories[key], key));
        }
        updateSubCats();
    }

    // ── Actualizar RECEIVER VIEW si está visible ──
    const receiverView = document.getElementById('receiver-view');
    if (receiverView && !receiverView.classList.contains('hidden')) {
        // Tap overlay
        const tapTitle = document.getElementById('tap-title');
        const tapSub   = document.getElementById('tap-sub');
        const tapBtn   = document.getElementById('tap-btn');
        const tapHint  = document.getElementById('tap-hint');
        if (tapTitle) tapTitle.textContent = t.tapTitle;
        if (tapSub)   tapSub.textContent   = t.tapSub;
        if (tapBtn)   tapBtn.textContent   = t.tapBtn;
        if (tapHint)  tapHint.textContent  = t.tapHint;

        // Final screen
        const qText    = document.getElementById('question-text');
        const yesBtn   = document.getElementById('btn-yes');
        const shareBtn = document.getElementById('btn-share');
        const shareSub = document.getElementById('share-sub');
        const celText  = document.getElementById('celebrate-text');
        const celSub   = document.getElementById('celebrate-sub');
        if (qText)    qText.textContent    = t.question;
        if (yesBtn)   yesBtn.textContent   = t.yesBtn;
        if (shareBtn) shareBtn.textContent = t.shareBtn;
        if (shareSub) shareSub.textContent = t.shareSub;
        if (celText)  celText.textContent  = t.celebrateText;
        if (celSub)   celSub.textContent   = t.celebrateSub;

        // Actualizar el btn-no solo si aún no ha capitulado
        const btnNo = document.getElementById('btn-no');
        if (btnNo && !btnNo.classList.contains('btn-no-surrender')) {
            btnNo.textContent = t.noBtn;
        }
    }
}

function updateSubCats() {
    const cat    = document.getElementById('main-category').value;
    const subSel = document.getElementById('sub-category');
    subSel.innerHTML = '';
    (config[currentLang].sub[cat] || []).forEach(s => subSel.add(new Option(s, s)));
}

// ───────────────────────────────────────────────────────────
// CREATOR: GENERATE LINK
// ───────────────────────────────────────────────────────────
function generateLink() {
    unlockAudio();
    const c   = document.getElementById('main-category').value;
    const s   = document.getElementById('sub-category').value;
    const raw = document.getElementById('custom-message').value.trim();
    const m   = btoa(unescape(encodeURIComponent(raw)));
    const url = `${window.location.origin}${window.location.pathname}?c=${c}&s=${encodeURIComponent(s)}&m=${m}&l=${currentLang}`;

    document.getElementById('final-url').value = url;
    const resultArea = document.getElementById('result-area');
    resultArea.classList.remove('hidden');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    playPop();
    hitCounter('links-generados');
}

async function copyLink() {
    unlockAudio();
    const text    = document.getElementById('final-url').value;
    const btnCopy = document.getElementById('btn-copy');

    try {
        await navigator.clipboard.writeText(text);
    } catch (_) {
        const inp = document.getElementById('final-url');
        inp.select();
        inp.setSelectionRange(0, 99999);
        try { document.execCommand('copy'); } catch (_2) {}
    }

    playDing();
    const orig = btnCopy.textContent;
    btnCopy.textContent = config[currentLang].copied || '✓';
    btnCopy.classList.add('bg-green-700');
    setTimeout(() => {
        btnCopy.textContent = config[currentLang].ui.copy;
        btnCopy.classList.remove('bg-green-700');
    }, 2000);
}

// ───────────────────────────────────────────────────────────
// RECEIVER: BEGIN PRANK (llamado al hacer tap)
// ───────────────────────────────────────────────────────────
function beginPrank() {
    unlockAudio(); // ← Desbloquear audio con el evento del usuario

    document.getElementById('tap-overlay').classList.add('hidden');
    const ps = document.getElementById('prank-screen');
    ps.classList.remove('hidden');
    ps.classList.add('fade-in');

    const p = new URLSearchParams(window.location.search);
    startTyping(p);
}

// ───────────────────────────────────────────────────────────
// TERMINAL TYPING EFFECT
// FIX DEFINITIVO: textContent += (no innerText) + CSS pre-wrap
// ───────────────────────────────────────────────────────────
function startTyping(p) {
    const lang = p.get('l') || 'es';
    const cat  = p.get('c') || 'amistad';
    const msg  = config[lang].trolleos[cat] || config[lang].trolleos.amistad;

    const el = document.getElementById('prank-text');

    // ★ Forzar white-space pre-wrap por JS también (garantía extra)
    el.style.whiteSpace = 'pre-wrap';
    el.textContent = '';
    el.classList.remove('terminal-cursor');

    let i = 0;
    let charsSinceClick = 0;

    const typer = setInterval(() => {
        // ★ textContent (NO innerText) para preservar espacios
        el.textContent += msg.charAt(i);
        i++;

        // Sonido de teclado cada ~3 caracteres (no en espacios o saltos)
        charsSinceClick++;
        const ch = msg.charAt(i - 1);
        if (charsSinceClick >= 3 && ch !== '\n' && ch !== ' ') {
            charsSinceClick = 0;
            playKeyClick();
        }

        if (i >= msg.length) {
            clearInterval(typer);
            el.classList.add('terminal-cursor');
            setTimeout(() => fillBar(p), 700);
        }
    }, 30);
}

function fillBar(p) {
    const bar       = document.getElementById('progress-bar');
    const container = document.getElementById('main-container');
    const el        = document.getElementById('prank-text');
    el.classList.remove('terminal-cursor');
    let width = 0;

    const iv = setInterval(() => {
        width++;
        bar.style.width = width + '%';

        if (width === 55) playAlarm();
        if (width === 80) container.classList.add('shake-heavy');

        if (width >= 100) {
            clearInterval(iv);
            container.classList.remove('shake-heavy');
            setTimeout(() => showFinal(p), 400);
        }
    }, 40);
}

function showFinal(p) {
    playFanfare();
    launchConfetti();

    document.getElementById('prank-screen').classList.add('hidden');
    const fs = document.getElementById('final-screen');
    fs.classList.remove('hidden');
    fs.classList.add('fade-in');

    const lang   = p.get('l') || 'es';
    const t      = config[lang];
    const cat    = p.get('c') || 'amistad';
    const sub    = decodeURIComponent(p.get('s') || '');
    const rawB64 = p.get('m');

    // Mensaje: primero custom, luego default por categoría
    let finalMsg = t.final[cat] || t.final.amistad;
    if (rawB64) {
        try {
            const decoded = decodeURIComponent(escape(atob(rawB64)));
            if (decoded.trim()) finalMsg = decoded;
        } catch (_) {}
    }

    document.getElementById('final-greeting').textContent = t.greeting.replace('{sub}', sub);
    document.getElementById('final-text').textContent     = finalMsg;

    // Textos del botón compartir
    const shareBtn = document.getElementById('btn-share');
    const shareSub = document.getElementById('share-sub');
    if (shareBtn) shareBtn.textContent = t.shareBtn;
    if (shareSub) shareSub.textContent = t.shareSub;

    // Mostrar pregunta solo en amor
    if (cat === 'amor') {
        const qArea = document.getElementById('question-area');
        qArea.classList.remove('hidden');
        document.getElementById('question-text').textContent = t.question;
        document.getElementById('btn-yes').textContent       = t.yesBtn;
        document.getElementById('btn-no').textContent        = t.noBtn;
        document.getElementById('celebrate-text').textContent = t.celebrateText;
        document.getElementById('celebrate-sub').textContent  = t.celebrateSub;
    }
}

// ───────────────────────────────────────────────────────────
// CONFETI
// ───────────────────────────────────────────────────────────
function launchConfetti() {
    const colors = ['#ff4d6d','#ff85a1','#ffd6e0','#ff0054','#ffccd5','#ffb3c1'];
    confetti({ particleCount: 110, spread: 70, origin: { y: 0.65 }, colors });
    setTimeout(() => {
        confetti({ particleCount: 70, angle: 60,  spread: 55, origin: { x: 0, y: 0.7 }, colors });
        confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
    }, 350);
}

// ───────────────────────────────────────────────────────────
// BOTÓN NO FUGITIVO — capitula a los MAX_ESCAPES intentos
// ───────────────────────────────────────────────────────────
const ESCAPE_POSITIONS = [
    { left: '62%',  top: '-28px' },
    { left: '-22%', top: '22px'  },
    { left: '58%',  top: '32px'  },
    { left: '-18%', top: '-26px' },
    { left: '55%',  top: '-15px' },
];

function initBtnNo() {
    const btnNo = document.getElementById('btn-no');
    if (!btnNo) return;

    function tryEscape() {
        // Debounce: evita doble disparo en móvil (mouseover + touchstart)
        const now = Date.now();
        if (now - noLastTime < 250) return;
        noLastTime = now;

        noEscapes++;
        playEscapeSound();

        if (noEscapes >= MAX_ESCAPES) {
            // ★ El NO capitula → se convierte en botón que activa celebrate
            const lang = (new URLSearchParams(window.location.search).get('l')) || currentLang;
            btnNo.textContent = config[lang].noSurrender;
            btnNo.style.cssText = '';
            btnNo.style.position = 'relative';
            btnNo.style.background = 'linear-gradient(135deg, #fce7f3, #fbcfe8)';
            btnNo.style.color = '#ec4899';
            btnNo.style.border = '2px solid #f9a8d4';
            btnNo.style.transform = 'none';
            btnNo.classList.add('btn-no-surrender');
            btnNo.removeEventListener('mouseover',  tryEscape);
            btnNo.removeEventListener('touchstart', tryEscape);
            btnNo.onclick = celebrate;
            return;
        }

        const pos = ESCAPE_POSITIONS[(noEscapes - 1) % ESCAPE_POSITIONS.length];
        btnNo.style.left = pos.left;
        btnNo.style.top  = pos.top;
    }

    btnNo.addEventListener('mouseover',  tryEscape);
    btnNo.addEventListener('touchstart', tryEscape, { passive: true });
}

// ───────────────────────────────────────────────────────────
// CELEBRATE (al hacer clic en Sí o cuando NO capitula)
// ───────────────────────────────────────────────────────────
function celebrate() {
    const qArea = document.getElementById('question-area');

    // Ocultar los botones, mostrar mensaje inline
    const wrapper = document.getElementById('btn-no-wrapper');
    if (wrapper) wrapper.style.display = 'none';

    const celMsg = document.getElementById('celebrate-msg');
    if (celMsg) celMsg.classList.remove('hidden');

    playFanfare();
    launchConfetti();
    setTimeout(() => launchConfetti(), 700);
}

// ───────────────────────────────────────────────────────────
// ACCIONES GENERALES
// ───────────────────────────────────────────────────────────
function goToCreator() {
    window.location.href = window.location.origin + window.location.pathname;
}

function showDonationJoke() {
    alert(config[currentLang].donation);
}

// ───────────────────────────────────────────────────────────
// PANEL SECRETO DE ESTADÍSTICAS
// Clic 5 veces en "Hecho con ❤️ amor"
// ───────────────────────────────────────────────────────────
function handleStatsTrigger() {
    statsClicks++;
    clearTimeout(statsTimer);
    statsTimer = setTimeout(() => { statsClicks = 0; }, 2000);
    if (statsClicks >= 5) {
        statsClicks = 0;
        showStats();
    }
}

async function showStats() {
    const t = config[currentLang];
    const [visitas, links] = await Promise.all([
        getCounter('visitas-prank'),
        getCounter('links-generados')
    ]);
    if (visitas === '—' && links === '—') {
        alert(t.statsError);
    } else {
        alert(t.statsResult.replace('{visitas}', visitas ?? '?').replace('{links}', links ?? '?'));
    }
}

// ───────────────────────────────────────────────────────────
// INIT
// ───────────────────────────────────────────────────────────
window.onload = () => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('c')) {
        // ── RECEIVER MODE ──
        document.getElementById('creator-view').classList.add('hidden');
        document.getElementById('receiver-view').classList.remove('hidden');

        const lang = params.get('l') || 'es';
        const t    = config[lang];
        currentLang = lang;

        // Textos del tap overlay
        document.getElementById('tap-title').textContent = t.tapTitle;
        document.getElementById('tap-sub').textContent   = t.tapSub;
        document.getElementById('tap-btn').textContent   = t.tapBtn;
        document.getElementById('tap-hint').textContent  = t.tapHint;

        // Lang buttons
        document.getElementById('btn-lang-es').classList.toggle('active', lang === 'es');
        document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

        // Contar visita
        hitCounter('visitas-prank');

        // Inicializar btn-no
        setTimeout(initBtnNo, 200);

    } else {
        // ── CREATOR MODE ──
        changeLang('es');
    }
};

