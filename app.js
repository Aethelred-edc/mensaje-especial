/* ================================================================
   app.js — Sorpresa Especial 💝  v5.0 + Firebase + Multiidioma
   ✅ TODO LO ORIGINAL INTACTO
   ✅ + Firebase Realtime Database
   ✅ + 3 idiomas adicionales (EN, FR, PT)
   ✅ + Dashboard de estadísticas
   ================================================================ */

// ═══════════════════════════════════════════════════════════════
// ★ FIREBASE INIT (NUEVO)
// ═══════════════════════════════════════════════════════════════
const firebaseConfig = {
    apiKey: "AIzaSyCN2hc4fiJelP7CxG_-I266t3Vaz91onTk",
    authDomain: "webapp-5efaa.firebaseapp.com",
    databaseURL: "https://webapp-5efaa-default-rtdb.firebaseio.com",
    projectId: "webapp-5efaa",
    storageBucket: "webapp-5efaa.firebasestorage.app",
    messagingSenderId: "183660405644",
    appId: "1:183660405644:web:d62e94bf4e512ee03f2ca9",
    measurementId: "G-F828QCEKG7"
};

let database;
try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
} catch(e) {
    console.warn('Firebase no disponible:', e);
}

// Funciones Firebase
function saveToFirebase(category, subCategory, lang, hasCustomMessage) {
    if (!database) return;
    try {
        const timestamp = Date.now();
        const messageData = { category, subCategory, lang, hasCustomMessage, timestamp, date: new Date().toISOString() };
        database.ref('messages').push(messageData);
        database.ref('stats/totalMessages').transaction((current) => (current || 0) + 1);
        database.ref(`stats/categories/${category}`).transaction((current) => (current || 0) + 1);
        database.ref(`stats/languages/${lang}`).transaction((current) => (current || 0) + 1);
    } catch(e) {}
}

function recordViewFirebase() {
    if (!database) return;
    try {
        database.ref('stats/totalViews').transaction((current) => (current || 0) + 1);
        database.ref('views').push({ timestamp: Date.now(), date: new Date().toISOString() });
    } catch(e) {}
}

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
const config = {

// ─── ESPAÑOL ──────────────────────────────────────────────────
es: {
  categories: { amistad:'Amistad 🤝', amor:'Amor ❤️', familiar:'Familiar 🏠' },
  sub: {
    amistad:  ['Amigo/a','Mejor Amigo/a','Cómplice','Hermano/a del alma'],
    amor:     ['Crush','Pareja','Novio/a','Amor Platónico','Esposa/o'],
    familiar: ['Mamá','Papá','Hermano/a','Tío/a','Primo/a','Abuela/o']
  },

  // Categorías cuyo saludo NO debe revelar al remitente
  privateGreeting: ['Crush','Amor Platónico'],
  privateGreetingText: '¡Para ti! De: Alguien especial 💌',

  trolleos: {
    amistad: {
      'Amigo/a':            '> ACCESO: Escaneando historial compartido...\n> Encontrado: 47 fotos vergonzosas de 2023... 📸\n> Subiendo a Instagram Stories automáticamente...\n> Enviando capturas a TODOS tus contactos...\n> ¡Proceso completado en todos los dispositivos!\n> Estado: PUBLICADO — 100% COMPLETO ✓',
      'Mejor Amigo/a':      '> MODO TRAICIÓN: Nivel MÁXIMO activado...\n> Accediendo a secretos compartidos... 🤫\n> Recopilando: "lo que me dijiste que no le dijera a nadie"\n> Exportando al grupo de WhatsApp familiar...\n> Adjuntando: audios + fotos sin filtro + confesiones...\n> Estado: ENVIADO A 23 PERSONAS ✓',
      'Cómplice':           '> INVESTIGACIÓN ACTIVA: Expediente N°4829...\n> Recuperando: todas las aventuras compartidas... 🕵️\n> Listando: excusas dadas a los padres = 47\n> Compilando: evidencia de cada travesura registrada...\n> Enviando reporte a [Autoridad competente]...\n> Estado: EXPEDIENTE COMPLETO ⚠️',
      'Hermano/a del alma': '> ANÁLISIS DE VÍNCULO EMOCIONAL...\n> Crisis existenciales resueltas juntos = 847 📊\n> Calculando: horas de llamadas nocturnas = 2,400 hrs\n> Contando: "¿sigues despierto/a?" enviados = 1,203\n> Presentando factura emocional acumulada... 💸\n> Estado: DEUDA EMOCIONAL — IMPAGABLE ❤️'
    },
    amor: {
      'Crush':          '> ALERTA MÁXIMA: Confesión en progreso...\n> Redactando: "Me gustas muchísimo desde hace tiempo" 💌\n> Destinatarios: [nombre] + toda su clase + sus padres 😱\n> Adjuntando: capturas de stalkeos 2023-2024...\n> Notificando: amigos, familia y ex novios/as...\n> Estado: ENVIADO — SIN POSIBILIDAD DE RETRACTO ✓',
      'Pareja':         '> ALERTA: Actualizando estado civil en TODAS las redes...\n> Publicando: las 47 fotos sin filtro de los dos... 📸\n> Activando: modo "leer en voz alta" tus notas de voz...\n> Enviando historial de ubicaciones a su ex... 📍\n> Organizando: reunión urgente con ambas familias...\n> Estado: RELACIÓN EXPUESTA AL 100% ✓',
      'Novio/a':        '> PROCESANDO: Propuesta de matrimonio masiva...\n> Redactando: "¿Te casas conmigo?" a todos tus ex... 💍\n> Reservando: salón de bodas + iglesia + catering...\n> Notificando: suegros, cuñados y familia extendida...\n> Fecha publicada en redes: 14 Feb — No cancelable\n> Estado: BODA CONFIRMADA PÚBLICAMENTE ✓',
      'Amor Platónico':  '> MODO CONFESIÓN SILENCIOSA ACTIVADO...\n> Recopilando: 847 veces que revisaste su perfil... 👀\n> Compilando: "me gusta" en fotos de 2018 y anteriores...\n> Exportando: screenshots de sus stories privadas...\n> Enviando a: la persona + su grupo de mejores amigos/as\n> Estado: STALKEO OFICIALMENTE CONFIRMADO ✓',
      'Esposa/o':       '> AUDITORÍA DOMÉSTICA EN CURSO...\n> Calculando: veces que no pusiste el plato en el fregadero 🍽️\n> Listando: "lo que iba a decir pero no dije" = 1,847\n> Detectado: 3,847 "¿en qué piensas?" sin respuesta...\n> Factura emocional: $12,500 en palabras nunca dichas 💸\n> Estado: DEUDA EMOCIONAL SIN PRECEDENTES ⚠️'
    },
    familiar: {
      'Mamá':     '> SISTEMA: Detectada deuda de abrazos acumulada...\n> Auditando: llamadas no contestadas este mes = 47... 📞\n> Contabilizando: "ya comí" siendo mentira = 203 veces\n> Bloqueando: acceso a ropa limpia + comida casera...\n> Enviando reporte a: papá + abuelos + grupo familiar...\n> Estado: SIN SUBSIDIO MATERNO — BLOQUEADO ⚠️',
      'Papá':     '> PROCESANDO: Factura de crianza pendiente...\n> Calculando: lecciones de vida ignoradas = $15,000 USD 🚗\n> Sumando: consejos no seguidos × años = 2,400 💡\n> Detectando: veces que dijiste "ahora voy" y tardaste horas\n> Activando: recordatorio "cuando yo tenía tu edad..."\n> Estado: FACTURA DE CRIANZA — IMPAGABLE 💸',
      'Hermano/a':'> MODO DELACIÓN FAMILIAR ACTIVADO...\n> Accediendo: secretos que me confiaste... 🤫\n> Preparando: la vez que llegaste tarde + excusas inventadas\n> Compilando: fotos de infancia más vergonzosas del álbum...\n> Enviando al grupo familiar + al grupo de tus amigos...\n> Estado: DELATADO/A EN TIEMPO REAL ✓',
      'Tío/a':    '> ANALIZANDO: Árbol genealógico familiar...\n> Calculando: el/la favorito/a entre todos los sobrinos... 🏆\n> Resultado: NO ERES EL/LA FAVORITO/A 🫢\n> Preparando: discurso para la próxima reunión navideña\n> Listando: logros impresionantes de los otros sobrinos...\n> Estado: FAVORITO/A OFICIAL — IDENTIFICADO/A ✓',
      'Primo/a':  '> ESCANEANDO: Álbum familiar compartido en la nube...\n> Encontrado: foto de cumpleaños con pastel en la cara 🎂\n> Recuperado: el video de la actuación escolar de 2009...\n> Subiendo a: Instagram + Facebook + grupos WhatsApp...\n> Etiquetando: a toda la familia extendida + amigos...\n> Estado: VERGÜENZA FAMILIAR — AHORA VIRAL ✓',
      'Abuela/o': '> ALERTA: Nieto/a en situación crítica de nutrición...\n> Detectado: lleva 3 días sin comer sopa de pollo... 🍲\n> Midiendo: horas sin abrazo abuelx = 72 horas exactas\n> Calculando: besos en mejilla pendientes = 15 🥰\n> Activando: protocolo de cuidado abuelx urgente...\n> Estado: NIETO/A NECESITA ATENCIÓN — LLAMADA EN CAMINO ❤️'
    }
  },

  final: {
    amistad: {
      'Amigo/a':            '¡Era una broma! 😂 Solo quería recordarte que eres un amigo/a increíble. Gracias por estar ahí siempre, por el apoyo y por aguantarme en mis días difíciles. ¡Te quiero mucho! 🤝❤️',
      'Mejor Amigo/a':      '¡Jamás traicionaría nuestros secretos! 😂 Tú eres esa persona que elegí y me alegra haber elegido tan bien. Eres mi mejor amigo/a y eso no tiene precio. ¡Te quiero cantidad! 💙',
      'Cómplice':           '¡Era solo una broma, cómplice! 😂 Gracias por ser mi aliado/a en la vida. Por todas las aventuras compartidas, las excusas inventadas y los momentos que solo nosotros entendemos. ¡Eres irreemplazable! 🕵️❤️',
      'Hermano/a del alma': '¡Asustón/a! 😂 No hay factura que pague lo que significas para mí. Elegimos ser familia aunque la sangre no nos una, y eso lo hace más especial aún. Eres mi hermano/a del alma. ❤️✨'
    },
    amor: {
      'Crush':          '¡Casi te da algo! 😜 Era solo una broma de alguien que te admira en silencio. Eres una persona increíblemente especial y el mundo es mejor contigo en él. ¡Feliz 14! 💕',
      'Pareja':         '¡Te pillé! 😂 Era solo una broma, amor. Todo lo que compartimos es nuestro y solo nuestro. Gracias por ser mi persona favorita en este mundo tan grande. ¡Te amo! 💕',
      'Novio/a':        '¡Respira! 😂 No hay boda sorpresa (todavía 😏). Solo quería recordarte que eres la persona más importante en mi vida y que cada día contigo vale mil. ¡Feliz San Valentín! ❤️',
      'Amor Platónico':  '¡Tranquilidad! 😅 Era una broma de alguien que piensa que eres increíble. Tienes una energía única y especial, y ojalá que ese alguien algún día se atreva a decírtelo. ✨💕',
      'Esposa/o':       '¡Asustona/o! 😂 Sabes que jamás haría eso. Solo quería recordarte que eres mi persona favorita, mi hogar y mi aventura más bonita. Gracias por elegirme cada día. ¡Te amo! 💕🏠'
    },
    familiar: {
      'Mamá':     '¡Te asustamos! 😅 Perdón, era una broma. Solo quería recordarte que no hay palabras para agradecerte todo lo que has dado por mí. Eres la persona más increíble que conozco. ¡Te quiero con todo mi corazón, mamá! ❤️',
      'Papá':     '¡Te pillamos! 😂 Era una broma. Pero en serio, no hay forma de pagarte todo lo que has enseñado. Gracias por ser mi guía, mi referente y mi ejemplo a seguir. ¡Te quiero muchísimo, papá! 💙',
      'Hermano/a':'¡Era solo una broma! 😂 Aunque te tenga ganas, no haría eso. Eres de lo mejor que tengo en mi vida. Gracias por ser mi cómplice, mi ejemplo y mi apoyo. ¡Te quiero mucho! 🤝❤️',
      'Tío/a':    '¡Te asustaste! 😂 Era una broma. Eres sin duda el/la tío/a favorito/a (¡no se lo cuentes a los demás!). Gracias por los consejos y por siempre estar. ¡Te quiero! ❤️',
      'Primo/a':  '¡Era solo una broma! 😂 Las fotos están a salvo, lo juro. Gracias por ser parte de los mejores recuerdos de la infancia y por seguir siendo importante en mi vida. ¡Te quiero, primo/a! 🎉❤️',
      'Abuela/o': '¡Descansa, todo está bien! 😊 Era una broma. Eres de las personas más importantes en mi vida. Gracias por tanto amor, sabiduría y sopa de pollo. ¡Te quiero infinito! ❤️'
    }
  },

  // ── JUEGOS únicos por sub-categoría ──
  games: {
    amor: {
      'Crush':          { question:'¿Te gustó la sorpresa? 🌟', yesBtn:'¡Sí! ✨', noBtn:'Nop', noSurrender:'💫 ¡Me alegra!', celebrateText:'¡Qué bien! 🥰', celebrateSub:'¡Alguien especial pensó en ti hoy! 💝' },
      'Pareja':         { question:'¿Me perdonas la broma? 🥺', yesBtn:'Sí ❤️',   noBtn:'NO',   noSurrender:'💕 ¡Igual te quiero!', celebrateText:'¡Lo sabía! 🥰', celebrateSub:'¡Gracias por perdonarme! Te quiero mucho ❤️' },
      'Novio/a':        { question:'¿Me perdonas? ¿Todavía me quieres? 🥺', yesBtn:'¡Siempre! ❤️', noBtn:'Hmm...', noSurrender:'💕 ¡No puedes dejar de quererme!', celebrateText:'¡Sabía que sí! 🥰', celebrateSub:'¡Eres el/la mejor! Te amo ❤️' },
      'Amor Platónico':  { question:'¿Valió la pena abrir la sorpresa? 🌸', yesBtn:'¡Sí! 💕', noBtn:'No sé', noSurrender:'💫 ¡A que sí!', celebrateText:'¡Perfecto! 🥰', celebrateSub:'¡Que alguien piensa en ti hoy! ✨💕' },
      'Esposa/o':       { question:'¿Me perdonas, mi amor? 🥺', yesBtn:'Esta vez sí ❤️', noBtn:'A ver...', noSurrender:'💕 ¡Claro que sí!', celebrateText:'¡Qué alivio! 🥰', celebrateSub:'¡Gracias por seguir eligiéndome! ❤️' }
    },
    amistad: {
      'Amigo/a':            { title:'¡Demuestra que somos amigos/as! 🤝', emoji:'🤜', target:7,  progress:'Apretones: {n} / {total}',         done:'¡Amistad confirmada! ¡Los mejores! 🤝💕' },
      'Mejor Amigo/a':      { title:'¡Los mejores se aprietan más fuerte! 💪', emoji:'🤜', target:10, progress:'Mega-apretones: {n} / {total}', done:'¡Imbatibles! ¡El dúo perfecto! 💙🤜' },
      'Cómplice':           { title:'¡El apretón secreto de los cómplices! 🤫', emoji:'🤫', target:5,  progress:'Apretones secretos: {n} / {total}', done:'¡Misión cumplida, cómplice! 🕵️✅' },
      'Hermano/a del alma': { title:'¡Los hermanos del alma siempre conectan! ❤️', emoji:'🤝', target:8,  progress:'Conexiones: {n} / {total}',   done:'¡Vínculo eterno confirmado! ❤️✨' }
    },
    familiar: {
      'Mamá':     { title:'¡Paga tu deuda de abrazos, mami! 🤗', emoji:'🤗', target:7, progress:'Abrazos a mamá: {n} / {total}',    done:'¡Deuda con mamá saldada! La quiero mucho ❤️' },
      'Papá':     { title:'¡Chócala con papá! 👊', emoji:'👊',  target:5, progress:'Choques con papá: {n} / {total}', done:'¡Eso es papá! ¡Los mejores! 💙👊' },
      'Hermano/a':{ title:'¡El clásico entre hermanos! 👈', emoji:'👈', target:4, progress:'Jaloneos: {n} / {total}',        done:'¡Hermanos inseparables! 🤝❤️' },
      'Tío/a':    { title:'¡El abrazo del tío/a favorito/a! 🤗', emoji:'🤗', target:3, progress:'Abrazos: {n} / {total}',        done:'¡Tío/a favorito/a confirmado/a! 🏆❤️' },
      'Primo/a':  { title:'¡El apretón de primos! ✊', emoji:'✊',  target:6, progress:'Apretones de primo/a: {n} / {total}', done:'¡Los mejores primos del mundo! 🎉❤️' },
      'Abuela/o': { title:'¡Un abrazo virtual para la abuela/o! 🥰', emoji:'🥰', target:6, progress:'Mimos: {n} / {total}',      done:'¡La abuela/o ya siente el amor! 💝' }
    }
  },

  tapTitle:'Tienes una sorpresa', tapSub:'Alguien pensó en ti hoy 💕', tapBtn:'¡Abrir! 💝', tapHint:'🔊 Activa el sonido para la experiencia completa',
  greeting:'¡Para mi {sub}!',
  shareBtn:'💌 ¡Quiero enviarle esto a alguien!', shareSub:'Crea tu propia sorpresa personalizada →',
  donationBtn:'☕ Invitar un café al creador',
  donation:'⚠️ ERROR DE TRANSACCIÓN:\n\nEl sistema de pagos se ha bloqueado porque el programador aún no tiene edad legal para tener cuenta bancaria.\n\n¡Mejor regálale un chocolate! 🍫🍭',
  copied:'✓ COPIADO',
  statsResult:'📊 ESTADÍSTICAS (desde este dispositivo)\n\n🆔 Tu ID: {did}\n👆 Tus visitas: {myvisits}\n🔗 Links que generaste: {mylinks}\n\n💡 Tus propias aperturas no afectan a las métricas del mañana si filtras por tu ID.',
  statsError:'No se pudieron cargar las estadísticas.',
  trivia: {
    question: '🤔 ¿Por qué se celebra el 14 de febrero?',
    options: ['❤️ Por San Valentín, mártir romano', '❄️ Porque es el día más frío del año', '🎁 Lo inventó Hallmark en los años 20'],
    correct: 0,
    right: '¡Correcto! 🎉 San Valentín fue un sacerdote romano que casaba parejas en secreto en el siglo III. ¡Por eso celebramos el amor hoy! ❤️',
    wrong:  '¡Casi! 😅 La respuesta correcta es: San Valentín, un mártir romano del siglo III que casaba parejas en secreto. ¡Ya sabes para la próxima! 💪'
  },
  ui: {
    title:'MENSAJERÍA VIP', desc:'Personaliza tu envío 💝', gen:'Generar Link 🚀',
    rel:'Tipo de relación', dest:'¿Para quién es?', msg:'Tu mensaje especial',
    msgOpt:'✨ Opcional', msgHint:'💡 Si lo dejas vacío se usará un mensaje bonito por defecto',
    msgHolder:'Escribe algo especial para esa persona... 💕', copy:'COPIAR', result:'✅ ¡Tu link está listo! Cópialo y envíalo:'
  }
},

// ─── ENGLISH ──────────────────────────────────────────────────
en: {
  categories: { amistad:'Friendship 🤝', amor:'Love ❤️', familiar:'Family 🏠' },
  sub: {
    amistad:  ['Friend','Best Friend','Partner in crime','Soul sibling'],
    amor:     ['Crush','Partner','Boyfriend/Girlfriend','Platonic love','Spouse'],
    familiar: ['Mom','Dad','Sibling','Uncle/Aunt','Cousin','Grandma/pa']
  },
  privateGreeting: ['Crush','Platonic love'],
  privateGreetingText: 'For you! From: Someone special 💌',
  trolleos: {
    amistad: {
      'Friend':           '> ACCESS: Scanning shared history...\n> Found: 47 embarrassing photos from 2023... 📸\n> Uploading to Instagram Stories automatically...\n> Sending screenshots to ALL your contacts...\n> Process completed on all devices!\n> Status: PUBLISHED — 100% COMPLETE ✓',
      'Best Friend':      '> BETRAYAL MODE: MAXIMUM level activated...\n> Accessing shared secrets... 🤫\n> Gathering: "what you told me not to tell anyone"\n> Exporting to family WhatsApp group...\n> Attaching: voice notes + unfiltered photos + confessions...\n> Status: SENT TO 23 PEOPLE ✓',
      'Partner in crime': '> ACTIVE INVESTIGATION: File No. 4829...\n> Recovering: all shared adventures... 🕵️\n> Listing: lies told to parents = 47\n> Compiling: evidence of every recorded prank...\n> Sending report to [Competent Authority]...\n> Status: FILE COMPLETED ⚠️',
      'Soul sibling':     '> EMOTIONAL BOND ANALYSIS...\n> Existential crises solved together = 847 📊\n> Calculating: hours of late-night calls = 2,400 hrs\n> Counting: "are you still awake?" messages sent = 1,203\n> Presenting accumulated emotional bill... 💸\n> Status: EMOTIONAL DEBT — UNPAYABLE ❤️'
    },
    amor: {
      'Crush':            '> MAXIMUM ALERT: Confession in progress...\n> Drafting: "I really like you, like a lot" 💌\n> Recipients: [name] + entire school + their parents 😱\n> Attaching: screenshots of your stalk sessions 2023-2024...\n> Notifying: their friends, family and exes...\n> Status: SENT — NO TAKE-BACKS POSSIBLE ✓',
      'Partner':          '> ALERT: Updating relationship status on ALL platforms...\n> Publishing: 47 unfiltered photos of you two... 📸\n> Activating: "read aloud" mode for your voice messages...\n> Sending location history to their ex... 📍\n> Organizing: urgent family meeting for both sides...\n> Status: RELATIONSHIP 100% EXPOSED ✓',
      'Boyfriend/Girlfriend': '> PROCESSING: Mass marriage proposal...\n> Drafting: "Will you marry me?" to all your exes... 💍\n> Booking: wedding venue + church + catering...\n> Notifying: in-laws, siblings and extended family...\n> Date published on social media: Feb 14 — Non-refundable\n> Status: WEDDING PUBLICLY CONFIRMED ✓',
      'Platonic love':    '> SILENT CONFESSION MODE ACTIVATED...\n> Collecting: 847 times you checked their profile... 👀\n> Compiling: likes on photos from 2018 and earlier...\n> Exporting: screenshots of their private stories...\n> Sending to: them + their closest friends group\n> Status: STALKING OFFICIALLY CONFIRMED ✓',
      'Spouse':           '> HOUSEHOLD AUDIT IN PROGRESS...\n> Counting: times you left dishes in the sink 🍽️\n> Listing: "was going to say but didn\'t" = 1,847\n> Detected: 3,847 "what are you thinking?" unanswered...\n> Emotional bill: $12,500 in words never said 💸\n> Status: UNPRECEDENTED EMOTIONAL DEBT ⚠️'
    },
    familiar: {
      'Mom':       '> SYSTEM: Accumulated hug debt detected...\n> Auditing: unanswered calls this month = 47... 📞\n> Counting: "I already ate" while lying = 203 times\n> Blocking: access to clean clothes + home food...\n> Sending report to: dad + grandparents + family group...\n> Status: NO MATERNAL SUPPORT — BLOCKED ⚠️',
      'Dad':       '> PROCESSING: Outstanding parenting bill...\n> Calculating: ignored life lessons = $15,000 USD 🚗\n> Adding up: unheeded advice × years = 2,400 💡\n> Detecting: times you said "I\'m coming" then took hours\n> Activating: "back in my day..." auto-reminder\n> Status: PARENTING BILL — UNPAYABLE 💸',
      'Sibling':   '> FAMILY SNITCH MODE ACTIVATED...\n> Accessing: secrets you confided in me... 🤫\n> Preparing: the time you came home late + your excuses\n> Compiling: most embarrassing childhood album photos...\n> Sending to: family group + your friends group...\n> Status: RATTED OUT IN REAL TIME ✓',
      'Uncle/Aunt':'> ANALYZING: Family tree...\n> Calculating: favorite among all nieces/nephews... 🏆\n> System result: YOU ARE NOT THE FAVORITE 🫢\n> Preparing: announcement for next family gathering\n> Listing: other nieces/nephews impressive achievements...\n> Status: OFFICIAL FAVORITE — IDENTIFIED ✓',
      'Cousin':    '> SCANNING: Shared family album on the cloud...\n> Found: birthday photo with cake on your face 🎂\n> Recovered: the school play video from 2009...\n> Uploading to: Instagram + Facebook + WhatsApp groups...\n> Tagging: all extended family + friends...\n> Status: FAMILY EMBARRASSMENT — NOW VIRAL ✓',
      'Grandma/pa':'> ALERT: Grandchild in critical nutrition situation...\n> Detected: 3 days without homemade food... 🍲\n> Measuring: hours without grandparent hug = 72 hours\n> Calculating: pending cheek kisses = 15 🥰\n> Activating: grandparent care protocol...\n> Status: GRANDCHILD NEEDS ATTENTION — CALL INCOMING ❤️'
    }
  },
  final: {
    amistad: {
      'Friend':           'Just a prank! 😂 I just wanted to remind you that you\'re an incredible friend. Thanks for always being there, for the support and for putting up with me. Love you tons! 🤝❤️',
      'Best Friend':      'I would NEVER betray our secrets! 😂 You\'re the person I chose and I\'m so glad I chose so well. You are my best friend and that is priceless. Love you! 💙',
      'Partner in crime': 'Just a prank, partner! 😂 Thanks for being my partner in crime. For all the shared adventures, invented excuses and moments only we understand. You are irreplaceable! 🕵️❤️',
      'Soul sibling':     'Gotcha! 😂 No invoice can pay for what you mean to me. We chose to be family even though blood doesn\'t bind us, and that makes it even more special. You are my soul sibling. ❤️✨'
    },
    amor: {
      'Crush':            'Almost got you! 😜 Just a prank from someone who admires you in silence. You\'re an incredibly special person and the world is better with you in it. Happy Feb 14! 💕',
      'Partner':          'Got you! 😂 Just a prank, love. Everything we share is ours and ours alone. Thank you for being my favorite person in this whole wide world. Love you so much! 💕',
      'Boyfriend/Girlfriend': 'Breathe! 😂 No surprise wedding (yet 😏). I just wanted to remind you that you\'re the most important person in my life. Happy Valentine\'s Day! ❤️',
      'Platonic love':    'Take it easy! 😅 Just a prank from someone who thinks you\'re amazing. You have unique energy and hopefully that someone will find the courage to tell you someday. ✨💕',
      'Spouse':           'Scaredy-cat! 😂 You know I\'d never do that. I just wanted to remind you that you\'re my favorite person, my home and my favorite adventure. Love you! 💕🏠'
    },
    familiar: {
      'Mom':       'We got you! 😅 Just a prank. There are no words to thank you for everything you\'ve given me. You\'re the most incredible person I know. Love you with all my heart, Mom! ❤️',
      'Dad':       'Got you! 😂 Just a prank. There\'s no way to repay everything you\'ve taught me. Thanks for being my guide, my reference and my example. Love you so much, Dad! 💙',
      'Sibling':   'Just a prank! 😂 Even if I tease you, I\'d never actually do that. You\'re one of the best things in my life. Thanks for being my partner in crime and my support. Love you! 🤝❤️',
      'Uncle/Aunt':'Got you! 😂 Just a prank. You\'re definitely the favorite (don\'t tell the others!). Thanks for the advice and for always being there when I need you. Love you! ❤️',
      'Cousin':    'Just a prank! 😂 The photos are safe, I promise. Thanks for being part of the best childhood memories and for still being important in my life. Love you, cuz! 🎉❤️',
      'Grandma/pa':'Everything\'s fine, relax! 😊 Just a prank. You\'re one of the most important people in my life. Thanks for so much love, wisdom and home cooking. Love you infinitely! ❤️'
    }
  },
  games: {
    amor: {
      'Crush':            { question:'Did you like the surprise? 🌟', yesBtn:'Yes! ✨', noBtn:'Nope', noSurrender:'💫 Glad you liked it!', celebrateText:'Wonderful! 🥰', celebrateSub:'Someone special was thinking of you today! 💝' },
      'Partner':          { question:'Do you forgive me for the prank? 🥺', yesBtn:'Yes ❤️', noBtn:'NO', noSurrender:'💕 I love you anyway!', celebrateText:'I knew it! 🥰', celebrateSub:'Thanks for forgiving me! Love you! ❤️' },
      'Boyfriend/Girlfriend': { question:'Do you forgive me? Do you still love me? 🥺', yesBtn:'Always! ❤️', noBtn:'Hmm...', noSurrender:'💕 You can\'t stop loving me!', celebrateText:'I knew you would! 🥰', celebrateSub:'You\'re the best! Love you ❤️' },
      'Platonic love':    { question:'Was the surprise worth opening? 🌸', yesBtn:'Yes! 💕', noBtn:'Not sure', noSurrender:'💫 You know it was!', celebrateText:'Perfect! 🥰', celebrateSub:'Someone was thinking of you today! ✨💕' },
      'Spouse':           { question:'Do you forgive me, my love? 🥺', yesBtn:'This time, yes ❤️', noBtn:'Hmm...', noSurrender:'💕 Of course you do!', celebrateText:'What a relief! 🥰', celebrateSub:'Thanks for still choosing me! ❤️' }
    },
    amistad: {
      'Friend':           { title:'Prove we\'re real friends! 🤝', emoji:'🤜', target:7,  progress:'Handshakes: {n} / {total}',       done:'Friendship confirmed! The best! 🤝💕' },
      'Best Friend':      { title:'Best friends shake harder! 💪', emoji:'🤜', target:10, progress:'Power handshakes: {n} / {total}', done:'Unbeatable! The perfect duo! 💙🤜' },
      'Partner in crime': { title:'The secret partners handshake! 🤫', emoji:'🤫', target:5, progress:'Secret shakes: {n} / {total}',  done:'Mission accomplished, partner! 🕵️✅' },
      'Soul sibling':     { title:'Soul siblings always connect! ❤️', emoji:'🤝', target:8,  progress:'Connections: {n} / {total}',   done:'Eternal bond confirmed! ❤️✨' }
    },
    familiar: {
      'Mom':       { title:'Pay your hug debt, Mom! 🤗', emoji:'🤗', target:7, progress:'Hugs for Mom: {n} / {total}', done:'Mom\'s hug debt cleared! Love you ❤️' },
      'Dad':       { title:'High five with Dad! 👊', emoji:'👊',  target:5, progress:'High fives with Dad: {n} / {total}', done:'That\'s my Dad! The best! 💙👊' },
      'Sibling':   { title:'Classic sibling stuff! 👈', emoji:'👈', target:4, progress:'Sibling pokes: {n} / {total}', done:'Inseparable siblings! 🤝❤️' },
      'Uncle/Aunt':{ title:'A hug from the favorite uncle/aunt! 🤗', emoji:'🤗', target:3, progress:'Hugs: {n} / {total}', done:'Favorite uncle/aunt confirmed! 🏆❤️' },
      'Cousin':    { title:'The cousin handshake! ✊', emoji:'✊',  target:6, progress:'Cousin fist bumps: {n} / {total}', done:'Best cousins in the world! 🎉❤️' },
      'Grandma/pa':{ title:'A virtual hug for grandma/pa! 🥰', emoji:'🥰', target:6, progress:'Warm fuzzies: {n} / {total}', done:'Grandma/pa feels all the love! 💝' }
    }
  },
  tapTitle:'You have a surprise', tapSub:'Someone was thinking of you today 💕', tapBtn:'Open it! 💝', tapHint:'🔊 Turn on sound for the full experience',
  greeting:'For my {sub}!',
  shareBtn:'💌 I want to send this to someone!', shareSub:'Create your own personalized surprise →',
  donationBtn:'☕ Buy the creator a coffee',
  donation:'⚠️ TRANSACTION ERROR:\n\nPayment system is locked because the developer is not legally old enough to have a bank account.\n\nSend chocolate instead! 🍫🍭',
  copied:'✓ COPIED',
  statsResult:'📊 STATS (this device)\n\n🆔 Your ID: {did}\n👆 Your visits: {myvisits}\n🔗 Links you generated: {mylinks}\n\n💡 Your own opens won\'t affect tomorrow\'s metrics if you filter by your ID.',
  statsError:'Could not load statistics.',
  trivia: {
    question: '🤔 Why is February 14th celebrated?',
    options: ['❤️ For Saint Valentine, a Roman martyr', '❄️ Because it\'s the coldest day of the year', '🎁 Hallmark invented it in the 1920s'],
    correct: 0,
    right: 'Correct! 🎉 Saint Valentine was a Roman priest who secretly married couples in the 3rd century. That\'s why we celebrate love today! ❤️',
    wrong:  'Almost! 😅 The correct answer is: Saint Valentine, a Roman martyr from the 3rd century who married couples in secret. Now you know! 💪'

// ─── ENGLISH (NUEVO) ──────────────────────────────────────────
en: {
  categories: { amistad:'Friendship 🤝', amor:'Love ❤️', familiar:'Family 🏠' },
  sub: {
    amistad:  ['Friend','Best Friend','Partner in Crime','Soul Sibling'],
    amor:     ['Crush','Partner','Boyfriend/Girlfriend','Secret Love','Spouse'],
    familiar: ['Mom','Dad','Sibling','Uncle/Aunt','Cousin','Grandparent']
  },
  privateGreeting: ['Crush','Secret Love'],
  privateGreetingText: 'For you! From: Someone special 💌',
  trolleos: {
    amistad: {
      'Friend':            '> ACCESS: Scanning shared history...\n> Found: 47 embarrassing photos from 2023... 📸\n> Uploading to Instagram Stories automatically...\n> Sending screenshots to ALL your contacts...\n> Process completed on all devices!\n> Status: PUBLISHED — 100% COMPLETE ✓',
      'Best Friend':       '> BETRAYAL MODE: MAXIMUM level activated...\n> Accessing shared secrets... 🤫\n> Collecting: "what you told me not to tell anyone"\n> Exporting to family WhatsApp group...\n> Attaching: voice messages + unfiltered photos + confessions...\n> Status: SENT TO 23 PEOPLE ✓',
      'Partner in Crime':  '> ACTIVE INVESTIGATION: File N°4829...\n> Recovering: all shared adventures... 🕵️\n> Listing: excuses given to parents = 47\n> Compiling: evidence of every recorded mischief...\n> Sending report to [Competent Authority]...\n> Status: FILE COMPLETE ⚠️',
      'Soul Sibling':      '> EMOTIONAL BOND ANALYSIS...\n> Existential crises solved together = 847 📊\n> Calculating: hours of late-night calls = 2,400 hrs\n> Counting: "are you still awake?" sent = 1,203\n> Presenting accumulated emotional invoice... 💸\n> Status: EMOTIONAL DEBT — UNPAYABLE ❤️'
    },
    amor: {
      'Crush':          '> MAXIMUM ALERT: Confession in progress...\n> Drafting: "I really like you so much" 💌\n> Recipients: [name] + entire class + their parents 😱\n> Attaching: stalking screenshots 2023-2024...\n> Notifying: friends, family and ex-boyfriends/girlfriends...\n> Status: SENT — NO POSSIBILITY OF RETRACTION ✓',
      'Partner':        '> ALERT: Updating relationship status on ALL networks...\n> Publishing: 47 unfiltered photos of both... 📸\n> Activating: "read aloud" mode for your voice notes...\n> Sending location history to their ex... 📍\n> Organizing: urgent meeting with both families...\n> Status: RELATIONSHIP 100% EXPOSED ✓',
      'Boyfriend/Girlfriend': '> PROCESSING: Mass marriage proposal...\n> Drafting: "Will you marry me?" to all your exes... 💍\n> Booking: wedding hall + church + catering...\n> Notifying: in-laws, siblings-in-law and extended family...\n> Date posted on networks: Feb 14 — Non-cancellable\n> Status: WEDDING PUBLICLY CONFIRMED ✓',
      'Secret Love':    '> SILENT CONFESSION MODE ACTIVATED...\n> Collecting: 847 times you checked their profile... 👀\n> Compiling: "likes" on photos from 2018 and earlier...\n> Exporting: screenshots of their private stories...\n> Sending to: the person + their group of best friends\n> Status: STALKING OFFICIALLY CONFIRMED ✓',
      'Spouse':         '> DOMESTIC AUDIT IN PROGRESS...\n> Calculating: times you didn\'t put the dish in the sink 🍽️\n> Listing: "what I was going to say but didn\'t" = 1,847\n> Detected: 3,847 "what are you thinking?" unanswered...\n> Emotional invoice: $12,500 in unspoken words 💸\n> Status: UNPRECEDENTED EMOTIONAL DEBT ⚠️'
    },
    familiar: {
      'Mom':      '> SYSTEM: Accumulated hug debt detected...\n> Auditing: unanswered calls this month = 47... 📞\n> Counting: "I already ate" being a lie = 203 times\n> Blocking: access to clean clothes + homemade food...\n> Sending report to: dad + grandparents + family group...\n> Status: NO MATERNAL SUBSIDY — BLOCKED ⚠️',
      'Dad':      '> PROCESSING: Pending parenting invoice...\n> Calculating: ignored life lessons = $15,000 USD 🚗\n> Adding: unfollowed advice × years = 2,400 💡\n> Detecting: times you said "I\'m coming" and took hours\n> Activating: "when I was your age..." reminder\n> Status: PARENTING INVOICE — UNPAYABLE 💸',
      'Sibling':  '> FAMILY SNITCH MODE ACTIVATED...\n> Accessing: secrets you confided in me... 🤫\n> Preparing: the time you were late + invented excuses\n> Compiling: most embarrassing childhood photos from album...\n> Sending to family group + your friends group...\n> Status: RATTED OUT IN REAL TIME ✓',
      'Uncle/Aunt':'> ANALYZING: Family tree...\n> Calculating: the favorite among all nephews/nieces... 🏆\n> Result: YOU ARE NOT THE FAVORITE 🫢\n> Preparing: speech for next Christmas gathering\n> Listing: impressive achievements of other nephews/nieces...\n> Status: OFFICIAL FAVORITE — IDENTIFIED ✓',
      'Cousin':   '> SCANNING: Shared family album in the cloud...\n> Found: birthday photo with cake on face 🎂\n> Recovered: video of 2009 school performance...\n> Uploading to: Instagram + Facebook + WhatsApp groups...\n> Tagging: entire extended family + friends...\n> Status: FAMILY EMBARRASSMENT — NOW VIRAL ✓',
      'Grandparent':'> ALERT: Grandchild in critical nutritional situation...\n> Detected: 3 days without chicken soup... 🍲\n> Measuring: hours without grandparent hug = exactly 72 hours\n> Calculating: pending cheek kisses = 15 🥰\n> Activating: urgent grandparent care protocol...\n> Status: GRANDCHILD NEEDS ATTENTION — CALL ON THE WAY ❤️'
    }
  },
  final: {
    amistad: {
      'Friend':            'It was a joke! 😂 I just wanted to remind you that you\'re an amazing friend. Thanks for always being there, for the support and for putting up with me on my difficult days. I love you so much! 🤝❤️',
      'Best Friend':       'I would never betray our secrets! 😂 You\'re that person I chose and I\'m glad I chose so well. You\'re my best friend and that\'s priceless. I love you so much! 💙',
      'Partner in Crime':  'It was just a joke, partner! 😂 Thanks for being my ally in life. For all the shared adventures, invented excuses and moments only we understand. You\'re irreplaceable! 🕵️❤️',
      'Soul Sibling':      'Scared you! 😂 There\'s no invoice that pays what you mean to me. We chose to be family even though blood doesn\'t unite us, and that makes it even more special. You\'re my soul sibling. ❤️✨'
    },
    amor: {
      'Crush':          'Almost got you! 😜 It was just a joke from someone who admires you in silence. You\'re an incredibly special person and the world is better with you in it. Happy 14th! 💕',
      'Partner':        'Got you! 😂 It was just a joke, love. Everything we share is ours and only ours. Thanks for being my favorite person in this big world. I love you! 💕',
      'Boyfriend/Girlfriend': 'Breathe! 😂 There\'s no surprise wedding (yet 😏). I just wanted to remind you that you\'re the most important person in my life and that every day with you is worth a thousand. Happy Valentine\'s! ❤️',
      'Secret Love':    'Relax! 😅 It was a joke from someone who thinks you\'re incredible. You have a unique and special energy, and hopefully that someone will dare to tell you someday. ✨💕',
      'Spouse':         'Scared you! 😂 You know I would never do that. I just wanted to remind you that you\'re my favorite person, my home and my most beautiful adventure. Thanks for choosing me every day. I love you! 💕🏠'
    },
    familiar: {
      'Mom':      'We scared you! 😅 Sorry, it was a joke. I just wanted to remind you that there are no words to thank you for everything you\'ve given for me. You\'re the most amazing person I know. I love you with all my heart, mom! ❤️',
      'Dad':      'Got you! 😂 It was a joke. But seriously, there\'s no way to repay you for everything you\'ve taught. Thanks for being my guide, my reference and my example to follow. I love you so much, dad! 💙',
      'Sibling':  'It was just a joke! 😂 Although I have it in for you, I wouldn\'t do that. You\'re the best thing I have in my life. Thanks for being my accomplice, my example and my support. I love you so much! 🤝❤️',
      'Uncle/Aunt':'You got scared! 😂 It was a joke. You\'re definitely the favorite uncle/aunt (don\'t tell the others!). Thanks for the advice and for always being there. I love you! ❤️',
      'Cousin':   'It was just a joke! 😂 The photos are safe, I swear. Thanks for being part of the best childhood memories and for continuing to be important in my life. I love you, cousin! 🎉❤️',
      'Grandparent':'Rest easy, everything is fine! 😊 It was a joke. You\'re one of the most important people in my life. Thanks for so much love, wisdom and chicken soup. I love you infinitely! ❤️'
    }
  },
  games: {
    amor: {
      'Crush':          { question:'Did you like the surprise? 🌟', yesBtn:'Yes! ✨', noBtn:'Nope', noSurrender:'💫 I\'m glad!', celebrateText:'So nice! 🥰', celebrateSub:'Someone special thought of you today! 💝' },
      'Partner':        { question:'Do you forgive me for the joke? 🥺', yesBtn:'Yes ❤️', noBtn:'NO', noSurrender:'💕 I love you anyway!', celebrateText:'I knew it! 🥰', celebrateSub:'Thanks for forgiving me! I love you so much ❤️' },
      'Boyfriend/Girlfriend': { question:'Do you forgive me? Do you still love me? 🥺', yesBtn:'Always! ❤️', noBtn:'Hmm...', noSurrender:'💕 You can\'t stop loving me!', celebrateText:'I knew it! 🥰', celebrateSub:'You\'re the best! I love you ❤️' },
      'Secret Love':    { question:'Was it worth opening the surprise? 🌸', yesBtn:'Yes! 💕', noBtn:'Don\'t know', noSurrender:'💫 Bet it was!', celebrateText:'Perfect! 🥰', celebrateSub:'Someone thinks of you today! ✨💕' },
      'Spouse':         { question:'Do you forgive me, my love? 🥺', yesBtn:'This time yes ❤️', noBtn:'Let\'s see...', noSurrender:'💕 Of course!', celebrateText:'What a relief! 🥰', celebrateSub:'Thanks for still choosing me! ❤️' }
    },
    amistad: {
      'Friend':            { title:'Prove we\'re friends! 🤝', emoji:'🤜', target:7, progress:'Fist bumps: {n} / {total}', done:'Friendship confirmed! The best! 🤝💕' },
      'Best Friend':       { title:'Best friends bump harder! 💪', emoji:'🤜', target:10, progress:'Mega-bumps: {n} / {total}', done:'Unbeatable! The perfect duo! 💙🤜' },
      'Partner in Crime':  { title:'The secret handshake of accomplices! 🤫', emoji:'🤫', target:5, progress:'Secret bumps: {n} / {total}', done:'Mission accomplished, partner! 🕵️✅' },
      'Soul Sibling':      { title:'Soul siblings always connect! ❤️', emoji:'🤝', target:8, progress:'Connections: {n} / {total}', done:'Eternal bond confirmed! ❤️✨' }
    },
    familiar: {
      'Mom':        { title:'Pay your hug debt, mom! 🤗', emoji:'🤗', target:7, progress:'Hugs to mom: {n} / {total}', done:'Debt to mom paid! Love you so much ❤️' },
      'Dad':        { title:'High five with dad! 👊', emoji:'👊', target:5, progress:'Bumps with dad: {n} / {total}', done:'That\'s dad! The best! 💙👊' },
      'Sibling':    { title:'Virtual pillow fight! 🥊', emoji:'🥊', target:6, progress:'Pillow hits: {n} / {total}', done:'Victory! Siblings are forever! 🎉' },
      'Uncle/Aunt': { title:'High five with your favorite uncle/aunt! 🙌', emoji:'🙌', target:5, progress:'High fives: {n} / {total}', done:'You\'re the best! 🙌✨' },
      'Cousin':     { title:'Clapping game with your cousin! 👏', emoji:'👏', target:8, progress:'Claps: {n} / {total}', done:'Cousins forever! 🎊👏' },
      'Grandparent':{ title:'Send kisses to grandma/grandpa! 😘', emoji:'😘', target:10, progress:'Kisses sent: {n} / {total}', done:'Virtual hugs received! 🥰❤️' }
    }
  },
  trivia: { question: '🤔 Why is February 14th celebrated?', options: ['❤️ For St. Valentine, Roman martyr', '❄️ Because it\'s the coldest day of the year', '🎁 Hallmark invented it in the 20s'], right: 'Correct! 🎉 St. Valentine was a Roman priest who married couples in secret.', wrong: 'Not exactly! 😅 It\'s celebrated for St. Valentine, a 3rd century Roman martyr.' },
  ui: {
    title:'VIP MESSAGING', desc:'Customize your send 💕', gen:'Generate Link 🚀',
    rel:'Relationship type', dest:'Who is it for?', msg:'Your special message',
    msgOpt:'✨ Optional', msgHint:'💡 If you leave it empty, a nice default message will be used',
    msgHolder:'Write something special for this person... 💕', copy:'COPY', result:'✅ Your link is ready! Copy and send it:'
  },
  copied: 'Copied! ✅',
  donation: '😂 I\'d love a coffee! But seriously, what makes me happiest is that you liked it. Share it with whoever you want! ❤️',
  statsResult: '📊 STATISTICS\n\n🆔 Your ID: {did}\n📥 Your visits: {myvisits}\n📤 Your created links: {mylinks}\n\n💡 This is saved only on your device.'
},

// ─── FRANÇAIS (NUEVO) ──────────────────────────────────────────
fr: {
  categories: { amistad:'Amitié 🤝', amor:'Amour ❤️', familiar:'Famille 🏠' },
  sub: {
    amistad:  ['Ami(e)','Meilleur(e) Ami(e)','Complice','Frère/Sœur d\'âme'],
    amor:     ['Crush','Partenaire','Petit(e) Ami(e)','Amour Platonique','Époux/Épouse'],
    familiar: ['Maman','Papa','Frère/Sœur','Oncle/Tante','Cousin(e)','Grand-parent']
  },
  privateGreeting: ['Crush','Amour Platonique'],
  privateGreetingText: 'Pour toi! De: Quelqu\'un de spécial 💌',
  trolleos: {
    amistad: {
      'Ami(e)':            '> ACCÈS: Scan de l\'historique partagé...\n> Trouvé: 47 photos embarrassantes de 2023... 📸\n> Téléchargement automatique sur Instagram Stories...\n> Envoi de captures à TOUS vos contacts...\n> Processus terminé sur tous les appareils!\n> Statut: PUBLIÉ — 100% TERMINÉ ✓',
      'Meilleur(e) Ami(e)':'> MODE TRAHISON: Niveau MAXIMUM activé...\n> Accès aux secrets partagés... 🤫\n> Collecte: "ce que tu m\'as dit de ne dire à personne"\n> Export vers le groupe WhatsApp familial...\n> Pièces jointes: audios + photos sans filtre + confessions...\n> Statut: ENVOYÉ À 23 PERSONNES ✓',
      'Complice':          '> ENQUÊTE ACTIVE: Dossier N°4829...\n> Récupération: toutes les aventures partagées... 🕵️\n> Liste: excuses données aux parents = 47\n> Compilation: preuves de chaque bêtise enregistrée...\n> Envoi du rapport à [Autorité compétente]...\n> Statut: DOSSIER COMPLET ⚠️',
      'Frère/Sœur d\'âme': '> ANALYSE DU LIEN ÉMOTIONNEL...\n> Crises existentielles résolues ensemble = 847 📊\n> Calcul: heures d\'appels nocturnes = 2 400 h\n> Comptage: "tu dors encore?" envoyés = 1 203\n> Présentation de la facture émotionnelle accumulée... 💸\n> Statut: DETTE ÉMOTIONNELLE — IMPAYABLE ❤️'
    },
    amor: {
      'Crush':          '> ALERTE MAXIMALE: Confession en cours...\n> Rédaction: "Je t\'aime vraiment beaucoup" 💌\n> Destinataires: [nom] + toute sa classe + ses parents 😱\n> Pièces jointes: captures de stalking 2023-2024...\n> Notification: amis, famille et ex petit(e)s ami(e)s...\n> Statut: ENVOYÉ — SANS POSSIBILITÉ DE RÉTRACTATION ✓',
      'Partenaire':     '> ALERTE: Mise à jour du statut relationnel sur TOUS les réseaux...\n> Publication: 47 photos sans filtre de vous deux... 📸\n> Activation: mode "lecture à haute voix" de vos notes vocales...\n> Envoi de l\'historique de localisation à son ex... 📍\n> Organisation: réunion urgente avec les deux familles...\n> Statut: RELATION EXPOSÉE À 100% ✓',
      'Petit(e) Ami(e)':'> TRAITEMENT: Proposition de mariage massive...\n> Rédaction: "Veux-tu m\'épouser?" à tous vos ex... 💍\n> Réservation: salle de mariage + église + traiteur...\n> Notification: beaux-parents, beaux-frères/sœurs et famille élargie...\n> Date publiée sur les réseaux: 14 fév — Non annulable\n> Statut: MARIAGE CONFIRMÉ PUBLIQUEMENT ✓',
      'Amour Platonique':'> MODE CONFESSION SILENCIEUSE ACTIVÉ...\n> Collecte: 847 fois que tu as consulté son profil... 👀\n> Compilation: "j\'aime" sur les photos de 2018 et avant...\n> Export: captures d\'écran de ses stories privées...\n> Envoi à: la personne + son groupe de meilleur(e)s ami(e)s\n> Statut: STALKING OFFICIELLEMENT CONFIRMÉ ✓',
      'Époux/Épouse':   '> AUDIT DOMESTIQUE EN COURS...\n> Calcul: fois où tu n\'as pas mis l\'assiette dans l\'évier 🍽️\n> Liste: "ce que j\'allais dire mais que je n\'ai pas dit" = 1 847\n> Détecté: 3 847 "à quoi penses-tu?" sans réponse...\n> Facture émotionnelle: 12 500$ en mots non dits 💸\n> Statut: DETTE ÉMOTIONNELLE SANS PRÉCÉDENT ⚠️'
    },
    familiar: {
      'Maman':    '> SYSTÈME: Dette de câlins accumulée détectée...\n> Audit: appels non répondus ce mois = 47... 📞\n> Comptage: "j\'ai déjà mangé" étant un mensonge = 203 fois\n> Blocage: accès aux vêtements propres + nourriture maison...\n> Envoi du rapport à: papa + grands-parents + groupe familial...\n> Statut: SANS SUBVENTION MATERNELLE — BLOQUÉ ⚠️',
      'Papa':     '> TRAITEMENT: Facture d\'éducation en attente...\n> Calcul: leçons de vie ignorées = 15 000$ USD 🚗\n> Addition: conseils non suivis × années = 2 400 💡\n> Détection: fois où tu as dit "j\'arrive" et as pris des heures\n> Activation: rappel "quand j\'avais ton âge..."\n> Statut: FACTURE D\'ÉDUCATION — IMPAYABLE 💸',
      'Frère/Sœur':'> MODE DÉLATEUR FAMILIAL ACTIVÉ...\n> Accès: secrets que tu m\'as confiés... 🤫\n> Préparation: la fois où tu es arrivé en retard + excuses inventées\n> Compilation: photos d\'enfance les plus embarrassantes de l\'album...\n> Envoi au groupe familial + au groupe de tes amis...\n> Statut: DÉNONCÉ EN TEMPS RÉEL ✓',
      'Oncle/Tante':'> ANALYSE: Arbre généalogique familial...\n> Calcul: le/la préféré(e) parmi tous les neveux/nièces... 🏆\n> Résultat: TU N\'ES PAS LE/LA PRÉFÉRÉ(E) 🫢\n> Préparation: discours pour la prochaine réunion de Noël\n> Liste: réalisations impressionnantes des autres neveux/nièces...\n> Statut: PRÉFÉRÉ(E) OFFICIEL(LE) — IDENTIFIÉ(E) ✓',
      'Cousin(e)':'> SCAN: Album familial partagé dans le cloud...\n> Trouvé: photo d\'anniversaire avec gâteau sur le visage 🎂\n> Récupéré: vidéo de la performance scolaire de 2009...\n> Téléchargement sur: Instagram + Facebook + groupes WhatsApp...\n> Taggage: toute la famille élargie + amis...\n> Statut: EMBARRAS FAMILIAL — MAINTENANT VIRAL ✓',
      'Grand-parent':'> ALERTE: Petit-enfant en situation nutritionnelle critique...\n> Détecté: 3 jours sans soupe au poulet... 🍲\n> Mesure: heures sans câlin de grand-parent = exactement 72 heures\n> Calcul: bisous sur la joue en attente = 15 🥰\n> Activation: protocole de soins urgents grands-parents...\n> Statut: PETIT-ENFANT A BESOIN D\'ATTENTION — APPEL EN CHEMIN ❤️'
    }
  },
  final: {
    amistad: {
      'Ami(e)':            'C\'était une blague! 😂 Je voulais juste te rappeler que tu es un(e) ami(e) incroyable. Merci d\'être toujours là, pour le soutien et de me supporter dans mes jours difficiles. Je t\'aime beaucoup! 🤝❤️',
      'Meilleur(e) Ami(e)':'Je ne trahirais jamais nos secrets! 😂 Tu es cette personne que j\'ai choisie et je suis content(e) d\'avoir si bien choisi. Tu es mon/ma meilleur(e) ami(e) et ça n\'a pas de prix. Je t\'aime énormément! 💙',
      'Complice':          'Ce n\'était qu\'une blague, complice! 😂 Merci d\'être mon allié(e) dans la vie. Pour toutes les aventures partagées, les excuses inventées et les moments que seuls nous comprenons. Tu es irremplaçable! 🕵️❤️',
      'Frère/Sœur d\'âme': 'Tu as eu peur! 😂 Il n\'y a pas de facture qui paie ce que tu signifies pour moi. Nous avons choisi d\'être une famille même si le sang ne nous unit pas, et cela rend tout encore plus spécial. Tu es mon frère/ma sœur d\'âme. ❤️✨'
    },
    amor: {
      'Crush':          'Tu l\'as échappé belle! 😜 C\'était juste une blague de quelqu\'un qui t\'admire en silence. Tu es une personne incroyablement spéciale et le monde est meilleur avec toi dedans. Joyeux 14! 💕',
      'Partenaire':     'Je t\'ai eu! 😂 C\'était juste une blague, mon amour. Tout ce que nous partageons est à nous et seulement à nous. Merci d\'être ma personne préférée dans ce grand monde. Je t\'aime! 💕',
      'Petit(e) Ami(e)':'Respire! 😂 Il n\'y a pas de mariage surprise (pour l\'instant 😏). Je voulais juste te rappeler que tu es la personne la plus importante dans ma vie et que chaque jour avec toi en vaut mille. Joyeuse Saint-Valentin! ❤️',
      'Amour Platonique':'Calme-toi! 😅 C\'était une blague de quelqu\'un qui pense que tu es incroyable. Tu as une énergie unique et spéciale, et j\'espère que cette personne osera te le dire un jour. ✨💕',
      'Époux/Épouse':   'Tu as eu peur! 😂 Tu sais que je ne ferais jamais ça. Je voulais juste te rappeler que tu es ma personne préférée, mon foyer et ma plus belle aventure. Merci de me choisir chaque jour. Je t\'aime! 💕🏠'
    },
    familiar: {
      'Maman':    'On t\'a fait peur! 😅 Désolé(e), c\'était une blague. Je voulais juste te rappeler qu\'il n\'y a pas de mots pour te remercier de tout ce que tu as donné pour moi. Tu es la personne la plus incroyable que je connaisse. Je t\'aime de tout mon cœur, maman! ❤️',
      'Papa':     'On t\'a eu! 😂 C\'était une blague. Mais sérieusement, il n\'y a aucun moyen de te rembourser pour tout ce que tu as enseigné. Merci d\'être mon guide, ma référence et mon exemple à suivre. Je t\'aime énormément, papa! 💙',
      'Frère/Sœur':'Ce n\'était qu\'une blague! 😂 Même si je t\'en veux, je ne ferais pas ça. Tu es le meilleur que j\'ai dans ma vie. Merci d\'être mon complice, mon exemple et mon soutien. Je t\'aime beaucoup! 🤝❤️',
      'Oncle/Tante':'Tu as eu peur! 😂 C\'était une blague. Tu es sans doute l\'oncle/tante préféré(e) (ne le dis pas aux autres!). Merci pour les conseils et d\'être toujours là. Je t\'aime! ❤️',
      'Cousin(e)':'Ce n\'était qu\'une blague! 😂 Les photos sont en sécurité, je le jure. Merci de faire partie des meilleurs souvenirs d\'enfance et de continuer à être important(e) dans ma vie. Je t\'aime, cousin(e)! 🎉❤️',
      'Grand-parent':'Repose-toi, tout va bien! 😊 C\'était une blague. Tu es l\'une des personnes les plus importantes de ma vie. Merci pour tant d\'amour, de sagesse et de soupe au poulet. Je t\'aime infiniment! ❤️'
    }
  },
  games: {
    amor: {
      'Crush':          { question:'Tu as aimé la surprise? 🌟', yesBtn:'Oui! ✨', noBtn:'Non', noSurrender:'💫 Je suis content(e)!', celebrateText:'Que c\'est bien! 🥰', celebrateSub:'Quelqu\'un de spécial a pensé à toi aujourd\'hui! 💝' },
      'Partenaire':     { question:'Tu me pardonnes la blague? 🥺', yesBtn:'Oui ❤️', noBtn:'NON', noSurrender:'💕 Je t\'aime quand même!', celebrateText:'Je le savais! 🥰', celebrateSub:'Merci de me pardonner! Je t\'aime beaucoup ❤️' },
      'Petit(e) Ami(e)':{ question:'Tu me pardonnes? Tu m\'aimes encore? 🥺', yesBtn:'Toujours! ❤️', noBtn:'Hmm...', noSurrender:'💕 Tu ne peux pas arrêter de m\'aimer!', celebrateText:'Je le savais! 🥰', celebrateSub:'Tu es le/la meilleur(e)! Je t\'aime ❤️' },
      'Amour Platonique':{ question:'Ça valait la peine d\'ouvrir la surprise? 🌸', yesBtn:'Oui! 💕', noBtn:'Je ne sais pas', noSurrender:'💫 Parie que oui!', celebrateText:'Parfait! 🥰', celebrateSub:'Quelqu\'un pense à toi aujourd\'hui! ✨💕' },
      'Époux/Épouse':   { question:'Tu me pardonnes, mon amour? 🥺', yesBtn:'Cette fois oui ❤️', noBtn:'On verra...', noSurrender:'💕 Bien sûr!', celebrateText:'Quel soulagement! 🥰', celebrateSub:'Merci de continuer à me choisir! ❤️' }
    },
    amistad: {
      'Ami(e)':            { title:'Prouve qu\'on est ami(e)s! 🤝', emoji:'🤜', target:7, progress:'Check: {n} / {total}', done:'Amitié confirmée! Les meilleurs! 🤝💕' },
      'Meilleur(e) Ami(e)':{ title:'Les meilleurs frappent plus fort! 💪', emoji:'🤜', target:10, progress:'Méga-check: {n} / {total}', done:'Imbattables! Le duo parfait! 💙🤜' },
      'Complice':          { title:'Le check secret des complices! 🤫', emoji:'🤫', target:5, progress:'Check secrets: {n} / {total}', done:'Mission accomplie, complice! 🕵️✅' },
      'Frère/Sœur d\'âme': { title:'Les frères/sœurs d\'âme se connectent toujours! ❤️', emoji:'🤝', target:8, progress:'Connexions: {n} / {total}', done:'Lien éternel confirmé! ❤️✨' }
    },
    familiar: {
      'Maman':      { title:'Paye ta dette de câlins, maman! 🤗', emoji:'🤗', target:7, progress:'Câlins à maman: {n} / {total}', done:'Dette à maman payée! Je t\'aime beaucoup ❤️' },
      'Papa':       { title:'Tope là avec papa! 👊', emoji:'👊', target:5, progress:'Tope avec papa: {n} / {total}', done:'C\'est ça papa! Les meilleurs! 💙👊' },
      'Frère/Sœur': { title:'Bataille d\'oreillers virtuelle! 🥊', emoji:'🥊', target:6, progress:'Coups d\'oreiller: {n} / {total}', done:'Victoire! Les frères/sœurs c\'est pour toujours! 🎉' },
      'Oncle/Tante':{ title:'Tope là avec ton oncle/tante préféré(e)! 🙌', emoji:'🙌', target:5, progress:'Tope là: {n} / {total}', done:'Tu es le/la meilleur(e)! 🙌✨' },
      'Cousin(e)':  { title:'Jeu de mains avec ton cousin/ta cousine! 👏', emoji:'👏', target:8, progress:'Tapes: {n} / {total}', done:'Cousins pour toujours! 🎊👏' },
      'Grand-parent':{ title:'Envoie des bisous à grand-mère/père! 😘', emoji:'😘', target:10, progress:'Bisous envoyés: {n} / {total}', done:'Câlins virtuels reçus! 🥰❤️' }
    }
  },
  trivia: { question: '🤔 Pourquoi le 14 février est-il célébré?', options: ['❤️ Pour Saint-Valentin, martyr romain', '❄️ Parce que c\'est le jour le plus froid de l\'année', '🎁 Hallmark l\'a inventé dans les années 20'], right: 'Correct! 🎉 Saint-Valentin était un prêtre romain qui mariait des couples en secret.', wrong: 'Pas exactement! 😅 Il est célébré pour Saint-Valentin, un martyr romain du IIIe siècle.' },
  ui: {
    title:'MESSAGERIE VIP', desc:'Personnalise ton envoi 💕', gen:'Générer le lien 🚀',
    rel:'Type de relation', dest:'Pour qui est-ce?', msg:'Ton message spécial',
    msgOpt:'✨ Optionnel', msgHint:'💡 Si tu le laisses vide, un joli message par défaut sera utilisé',
    msgHolder:'Écris quelque chose de spécial pour cette personne... 💕', copy:'COPIER', result:'✅ Ton lien est prêt! Copie-le et envoie-le:'
  },
  copied: 'Copié! ✅',
  donation: '😂 J\'adorerais un café! Mais sérieusement, ce qui me rend le plus heureux c\'est que ça t\'a plu. Partage-le avec qui tu veux! ❤️',
  statsResult: '📊 STATISTIQUES\n\n🆔 Ton ID: {did}\n📥 Tes visites: {myvisits}\n📤 Tes liens créés: {mylinks}\n\n💡 Ceci est sauvegardé uniquement sur ton appareil.'
},

// ─── PORTUGUÊS (NUEVO) ────────────────────────────────────────
pt: {
  categories: { amistad:'Amizade 🤝', amor:'Amor ❤️', familiar:'Família 🏠' },
  sub: {
    amistad:  ['Amigo/a','Melhor Amigo/a','Cúmplice','Irmão/ã de alma'],
    amor:     ['Paquera','Parceiro/a','Namorado/a','Amor Platônico','Esposo/a'],
    familiar: ['Mãe','Pai','Irmão/ã','Tio/a','Primo/a','Avô/ó']
  },
  privateGreeting: ['Paquera','Amor Platônico'],
  privateGreetingText: 'Para você! De: Alguém especial 💌',
  trolleos: {
    amistad: {
      'Amigo/a':            '> ACESSO: Escaneando histórico compartilhado...\n> Encontrado: 47 fotos constrangedoras de 2023... 📸\n> Carregando nos Stories do Instagram automaticamente...\n> Enviando capturas para TODOS os seus contatos...\n> Processo concluído em todos os dispositivos!\n> Status: PUBLICADO — 100% COMPLETO ✓',
      'Melhor Amigo/a':     '> MODO TRAIÇÃO: Nível MÁXIMO ativado...\n> Acessando segredos compartilhados... 🤫\n> Coletando: "o que você me disse para não contar a ninguém"\n> Exportando para o grupo familiar do WhatsApp...\n> Anexando: áudios + fotos sem filtro + confissões...\n> Status: ENVIADO PARA 23 PESSOAS ✓',
      'Cúmplice':           '> INVESTIGAÇÃO ATIVA: Processo Nº4829...\n> Recuperando: todas as aventuras compartilhadas... 🕵️\n> Listando: desculpas dadas aos pais = 47\n> Compilando: evidência de cada travessura registrada...\n> Enviando relatório para [Autoridade competente]...\n> Status: PROCESSO COMPLETO ⚠️',
      'Irmão/ã de alma':    '> ANÁLISE DE VÍNCULO EMOCIONAL...\n> Crises existenciais resolvidas juntos = 847 📊\n> Calculando: horas de ligações noturnas = 2.400 hrs\n> Contando: "você ainda está acordado/a?" enviados = 1.203\n> Apresentando fatura emocional acumulada... 💸\n> Status: DÍVIDA EMOCIONAL — IMPAGÁVEL ❤️'
    },
    amor: {
      'Paquera':        '> ALERTA MÁXIMO: Confissão em andamento...\n> Redigindo: "Eu gosto muito de você há muito tempo" 💌\n> Destinatários: [nome] + toda a turma + pais dele/dela 😱\n> Anexando: capturas de stalking 2023-2024...\n> Notificando: amigos, família e ex-namorados/as...\n> Status: ENVIADO — SEM POSSIBILIDADE DE RETRATAÇÃO ✓',
      'Parceiro/a':     '> ALERTA: Atualizando status de relacionamento em TODAS as redes...\n> Publicando: 47 fotos sem filtro dos dois... 📸\n> Ativando: modo "ler em voz alta" suas notas de voz...\n> Enviando histórico de localizações para o/a ex dele/dela... 📍\n> Organizando: reunião urgente com ambas as famílias...\n> Status: RELACIONAMENTO 100% EXPOSTO ✓',
      'Namorado/a':     '> PROCESSANDO: Proposta de casamento em massa...\n> Redigindo: "Quer casar comigo?" para todos os seus ex... 💍\n> Reservando: salão de festas + igreja + buffet...\n> Notificando: sogros, cunhados e família estendida...\n> Data publicada nas redes: 14 Fev — Não cancelável\n> Status: CASAMENTO CONFIRMADO PUBLICAMENTE ✓',
      'Amor Platônico': '> MODO CONFISSÃO SILENCIOSA ATIVADO...\n> Coletando: 847 vezes que você checou o perfil dele/dela... 👀\n> Compilando: "curtidas" em fotos de 2018 e anteriores...\n> Exportando: screenshots dos stories privados dele/dela...\n> Enviando para: a pessoa + grupo de melhores amigos/as\n> Status: STALKING OFICIALMENTE CONFIRMADO ✓',
      'Esposo/a':       '> AUDITORIA DOMÉSTICA EM ANDAMENTO...\n> Calculando: vezes que não colocou o prato na pia 🍽️\n> Listando: "o que ia dizer mas não disse" = 1.847\n> Detectado: 3.847 "no que você está pensando?" sem resposta...\n> Fatura emocional: R$12.500 em palavras não ditas 💸\n> Status: DÍVIDA EMOCIONAL SEM PRECEDENTES ⚠️'
    },
    familiar: {
      'Mãe':      '> SISTEMA: Dívida de abraços acumulada detectada...\n> Auditando: ligações não atendidas este mês = 47... 📞\n> Contabilizando: "já comi" sendo mentira = 203 vezes\n> Bloqueando: acesso a roupas limpas + comida caseira...\n> Enviando relatório para: pai + avós + grupo familiar...\n> Status: SEM SUBSÍDIO MATERNO — BLOQUEADO ⚠️',
      'Pai':      '> PROCESSANDO: Fatura de criação pendente...\n> Calculando: lições de vida ignoradas = R$15.000 🚗\n> Somando: conselhos não seguidos × anos = 2.400 💡\n> Detectando: vezes que disse "já vou" e demorou horas\n> Ativando: lembrete "quando eu tinha sua idade..."\n> Status: FATURA DE CRIAÇÃO — IMPAGÁVEL 💸',
      'Irmão/ã':  '> MODO DELAÇÃO FAMILIAR ATIVADO...\n> Acessando: segredos que você me confiou... 🤫\n> Preparando: a vez que você chegou tarde + desculpas inventadas\n> Compilando: fotos de infância mais constrangedoras do álbum...\n> Enviando para o grupo familiar + grupo dos seus amigos...\n> Status: DENUNCIADO/A EM TEMPO REAL ✓',
      'Tio/a':    '> ANALISANDO: Árvore genealógica familiar...\n> Calculando: o/a favorito/a entre todos os sobrinhos/as... 🏆\n> Resultado: VOCÊ NÃO É O/A FAVORITO/A 🫢\n> Preparando: discurso para a próxima reunião de Natal\n> Listando: conquistas impressionantes dos outros sobrinhos/as...\n> Status: FAVORITO/A OFICIAL — IDENTIFICADO/A ✓',
      'Primo/a':  '> ESCANEANDO: Álbum familiar compartilhado na nuvem...\n> Encontrado: foto de aniversário com bolo no rosto 🎂\n> Recuperado: vídeo da apresentação escolar de 2009...\n> Carregando em: Instagram + Facebook + grupos WhatsApp...\n> Marcando: toda a família estendida + amigos...\n> Status: VERGONHA FAMILIAR — AGORA VIRAL ✓',
      'Avô/ó':    '> ALERTA: Neto/a em situação nutricional crítica...\n> Detectado: 3 dias sem comer sopa de frango... 🍲\n> Medindo: horas sem abraço de avô/ó = exatamente 72 horas\n> Calculando: beijos na bochecha pendentes = 15 🥰\n> Ativando: protocolo de cuidado urgente de avós...\n> Status: NETO/A PRECISA DE ATENÇÃO — LIGAÇÃO A CAMINHO ❤️'
    }
  },
  final: {
    amistad: {
      'Amigo/a':            'Era uma brincadeira! 😂 Só queria te lembrar que você é um/a amigo/a incrível. Obrigado por estar sempre lá, pelo apoio e por me aguentar nos meus dias difíceis. Te amo muito! 🤝❤️',
      'Melhor Amigo/a':     'Jamais trairia nossos segredos! 😂 Você é aquela pessoa que eu escolhi e estou feliz por ter escolhido tão bem. Você é meu/minha melhor amigo/a e isso não tem preço. Te amo demais! 💙',
      'Cúmplice':           'Era só uma brincadeira, cúmplice! 😂 Obrigado por ser meu/minha aliado/a na vida. Por todas as aventuras compartilhadas, desculpas inventadas e momentos que só nós entendemos. Você é insubstituível! 🕵️❤️',
      'Irmão/ã de alma':    'Te assustei! 😂 Não há fatura que pague o que você significa para mim. Escolhemos ser família mesmo que o sangue não nos una, e isso torna tudo ainda mais especial. Você é meu irmão/minha irmã de alma. ❤️✨'
    },
    amor: {
      'Paquera':        'Quase te pegou! 😜 Era só uma brincadeira de alguém que te admira em silêncio. Você é uma pessoa incrivelmente especial e o mundo é melhor com você nele. Feliz dia 14! 💕',
      'Parceiro/a':     'Te peguei! 😂 Era só uma brincadeira, amor. Tudo que compartilhamos é nosso e só nosso. Obrigado por ser minha pessoa favorita neste mundo tão grande. Te amo! 💕',
      'Namorado/a':     'Respira! 😂 Não há casamento surpresa (ainda 😏). Só queria te lembrar que você é a pessoa mais importante da minha vida e que cada dia contigo vale mil. Feliz Dia dos Namorados! ❤️',
      'Amor Platônico': 'Calma! 😅 Era uma brincadeira de alguém que acha você incrível. Você tem uma energia única e especial, e tomara que esse alguém um dia se atreva a te dizer. ✨💕',
      'Esposo/a':       'Te assustei! 😂 Você sabe que eu jamais faria isso. Só queria te lembrar que você é minha pessoa favorita, meu lar e minha aventura mais bonita. Obrigado por me escolher todos os dias. Te amo! 💕🏠'
    },
    familiar: {
      'Mãe':      'Te assustamos! 😅 Desculpa, era uma brincadeira. Só queria te lembrar que não há palavras para agradecer tudo que você deu por mim. Você é a pessoa mais incrível que eu conheço. Te amo de todo meu coração, mãe! ❤️',
      'Pai':      'Te pegamos! 😂 Era uma brincadeira. Mas sério, não há como te pagar por tudo que você ensinou. Obrigado por ser meu guia, minha referência e meu exemplo a seguir. Te amo muito, pai! 💙',
      'Irmão/ã':  'Era só uma brincadeira! 😂 Mesmo eu tendo raiva de você, não faria isso. Você é o melhor que tenho na minha vida. Obrigado por ser meu cúmplice, meu exemplo e meu apoio. Te amo muito! 🤝❤️',
      'Tio/a':    'Você se assustou! 😂 Era uma brincadeira. Você é sem dúvida o/a tio/a favorito/a (não conte para os outros!). Obrigado pelos conselhos e por sempre estar lá. Te amo! ❤️',
      'Primo/a':  'Era só uma brincadeira! 😂 As fotos estão seguras, eu juro. Obrigado por fazer parte das melhores memórias da infância e por continuar sendo importante na minha vida. Te amo, primo/a! 🎉❤️',
      'Avô/ó':    'Descanse, está tudo bem! 😊 Era uma brincadeira. Você é uma das pessoas mais importantes da minha vida. Obrigado por tanto amor, sabedoria e sopa de frango. Te amo infinitamente! ❤️'
    }
  },
  games: {
    amor: {
      'Paquera':        { question:'Gostou da surpresa? 🌟', yesBtn:'Sim! ✨', noBtn:'Não', noSurrender:'💫 Que bom!', celebrateText:'Que legal! 🥰', celebrateSub:'Alguém especial pensou em você hoje! 💝' },
      'Parceiro/a':     { question:'Me perdoa a brincadeira? 🥺', yesBtn:'Sim ❤️', noBtn:'NÃO', noSurrender:'💕 Te amo mesmo assim!', celebrateText:'Eu sabia! 🥰', celebrateSub:'Obrigado por me perdoar! Te amo muito ❤️' },
      'Namorado/a':     { question:'Me perdoa? Ainda me ama? 🥺', yesBtn:'Sempre! ❤️', noBtn:'Hmm...', noSurrender:'💕 Você não pode parar de me amar!', celebrateText:'Eu sabia! 🥰', celebrateSub:'Você é o/a melhor! Te amo ❤️' },
      'Amor Platônico': { question:'Valeu a pena abrir a surpresa? 🌸', yesBtn:'Sim! 💕', noBtn:'Não sei', noSurrender:'💫 Aposto que sim!', celebrateText:'Perfeito! 🥰', celebrateSub:'Alguém pensa em você hoje! ✨💕' },
      'Esposo/a':       { question:'Me perdoa, meu amor? 🥺', yesBtn:'Desta vez sim ❤️', noBtn:'Vamos ver...', noSurrender:'💕 Claro que sim!', celebrateText:'Que alívio! 🥰', celebrateSub:'Obrigado por continuar me escolhendo! ❤️' }
    },
    amistad: {
      'Amigo/a':            { title:'Prove que somos amigos/as! 🤝', emoji:'🤜', target:7, progress:'Socos: {n} / {total}', done:'Amizade confirmada! Os melhores! 🤝💕' },
      'Melhor Amigo/a':     { title:'Os melhores batem mais forte! 💪', emoji:'🤜', target:10, progress:'Mega-socos: {n} / {total}', done:'Imbatíveis! A dupla perfeita! 💙🤜' },
      'Cúmplice':           { title:'O aperto secreto dos cúmplices! 🤫', emoji:'🤫', target:5, progress:'Apertos secretos: {n} / {total}', done:'Missão cumprida, cúmplice! 🕵️✅' },
      'Irmão/ã de alma':    { title:'Irmãos/ãs de alma sempre se conectam! ❤️', emoji:'🤝', target:8, progress:'Conexões: {n} / {total}', done:'Vínculo eterno confirmado! ❤️✨' }
    },
    familiar: {
      'Mãe':      { title:'Pague sua dívida de abraços, mãe! 🤗', emoji:'🤗', target:7, progress:'Abraços para mãe: {n} / {total}', done:'Dívida com a mãe quitada! Te amo muito ❤️' },
      'Pai':      { title:'Toca aqui com o pai! 👊', emoji:'👊', target:5, progress:'Toques com pai: {n} / {total}', done:'Isso é pai! Os melhores! 💙👊' },
      'Irmão/ã':  { title:'Guerra de travesseiros virtual! 🥊', emoji:'🥊', target:6, progress:'Travesseiradas: {n} / {total}', done:'Vitória! Irmãos são para sempre! 🎉' },
      'Tio/a':    { title:'Toca aqui com seu tio/a favorito/a! 🙌', emoji:'🙌', target:5, progress:'Toques: {n} / {total}', done:'Você é o/a melhor! 🙌✨' },
      'Primo/a':  { title:'Jogo de palmas com seu primo/a! 👏', emoji:'👏', target:8, progress:'Palmas: {n} / {total}', done:'Primos para sempre! 🎊👏' },
      'Avô/ó':    { title:'Envie beijos para o avô/avó! 😘', emoji:'😘', target:10, progress:'Beijos enviados: {n} / {total}', done:'Abraços virtuais recebidos! 🥰❤️' }
    }
  },
  trivia: { question: '🤔 Por que o dia 14 de fevereiro é celebrado?', options: ['❤️ Por São Valentim, mártir romano', '❄️ Porque é o dia mais frio do ano', '🎁 A Hallmark inventou nos anos 20'], right: 'Correto! 🎉 São Valentim era um padre romano que casava casais em segredo.', wrong: 'Não exatamente! 😅 É celebrado por São Valentim, um mártir romano do século III.' },
  ui: {
    title:'MENSAGERIA VIP', desc:'Personalize seu envio 💕', gen:'Gerar Link 🚀',
    rel:'Tipo de relacionamento', dest:'Para quem é?', msg:'Sua mensagem especial',
    msgOpt:'✨ Opcional', msgHint:'💡 Se deixar vazio, será usada uma mensagem bonita padrão',
    msgHolder:'Escreva algo especial para esta pessoa... 💕', copy:'COPIAR', result:'✅ Seu link está pronto! Copie e envie:'
  },
  copied: 'Copiado! ✅',
  donation: '😂 Adoraria um café! Mas sério, o que me deixa mais feliz é que você gostou. Compartilhe com quem quiser! ❤️',
  statsResult: '📊 ESTATÍSTICAS\n\n🆔 Seu ID: {did}\n📥 Suas visitas: {myvisits}\n📤 Seus links criados: {mylinks}\n\n💡 Isso é salvo apenas no seu dispositivo.'
}

}; // END CONFIG

  },
  ui: {
    title:'VIP MESSAGING', desc:'Customize your gift 💝', gen:'Generate Link 🚀',
    rel:'Relationship type', dest:'Who is it for?', msg:'Your special message',
    msgOpt:'✨ Optional', msgHint:'💡 If left blank a beautiful default message will be used',
    msgHolder:'Write something special for this person... 💕', copy:'COPY', result:'✅ Your link is ready! Copy and send it:'
  }
}

}; // end config

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let currentLang    = 'es';
let audioCtx       = null;
let audioUnlocked  = false;
let musicMode      = 'none';
let musicNodes     = [];
let chordTimer     = null;
let chordIdx       = 0;
let chaosTimer     = null;
let chaosOscNodes  = [];
let melodyTimer    = null;
let melodyNoteIdx  = 0;
let firstClickDone = false;
let currentTyper   = null;   // intervalo del tipeo en prank

let statsClicks    = 0, statsTimer = null;
let noEscapes      = 0, noLastTime = 0;
let tapCount       = 0, hugCount   = 0;
let triviaAnswered = false;
const MAX_ESCAPES  = 6;

// ── Sub-categoría actual (para lookup de juego) ────────────
let currentCat = 'amistad';
let currentSub = '';

// ═══════════════════════════════════════════════════════════════
// DEVICE TRACKING — localStorage (100% confiable, sin backend)
// ═══════════════════════════════════════════════════════════════
function getDeviceId() {
    let id = localStorage.getItem('sp_did');
    if (!id) {
        id = 'D' + Math.random().toString(36).slice(2,6).toUpperCase()
             + Date.now().toString(36).slice(-4).toUpperCase();
        localStorage.setItem('sp_did', id);
    }
    return id;
}
function getMyVisits()  { return parseInt(localStorage.getItem('sp_v')  || '0', 10); }
function getMyLinks()   { return parseInt(localStorage.getItem('sp_l')  || '0', 10); }
function incMyVisits()  { localStorage.setItem('sp_v',  String(getMyVisits() + 1)); }
function incMyLinks()   { localStorage.setItem('sp_l',  String(getMyLinks() + 1)); }

// CountAPI (bonus, puede fallar)
const NS = 'sorpresa-naofomi-v5';
async function hitCounter(key) {
    try { await fetch(`https://api.countapi.xyz/hit/${NS}/${key}`); } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════
// AUDIO ENGINE
// ═══════════════════════════════════════════════════════════════
function getAudioCtx() {
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {} }
    return audioCtx;
}
function unlockAudio() {
    if (audioUnlocked) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    audioUnlocked = true;
}

// ── FX ──────────────────────────────────────────────────────
function playKeyClick() {
    const ctx = getAudioCtx(); if (!ctx || !audioUnlocked) return;
    try {
        const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate*0.03), ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2)*0.28;
        const src=ctx.createBufferSource(), g=ctx.createGain();
        src.buffer=buf; g.gain.value=0.12;
        src.connect(g); g.connect(ctx.destination); src.start();
    } catch (_) {}
}
function playAlarm() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        [0,.18,.36,.54,.72].forEach(off=>{
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='sawtooth'; o.frequency.setValueAtTime(1050,t+off);
            o.frequency.exponentialRampToValueAtTime(200,t+off+.16);
            g.gain.setValueAtTime(0.22,t+off); g.gain.exponentialRampToValueAtTime(0.001,t+off+.16);
            o.connect(g); g.connect(ctx.destination); o.start(t+off); o.stop(t+off+.16);
        });
    } catch (_) {}
}
function playGlitch() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        for (let i=0;i<8;i++){
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='square'; o.frequency.value=80+Math.random()*3000;
            g.gain.setValueAtTime(0.06,t+i*.035); g.gain.exponentialRampToValueAtTime(0.001,t+i*.035+.03);
            o.connect(g); g.connect(ctx.destination); o.start(t+i*.035); o.stop(t+i*.035+.04);
        }
    } catch (_) {}
}
function playFanfare() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        [523.25,659.25,783.99,1046.5,1318.5].forEach((freq,i)=>{
            const o=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain();
            o.type='sine'; o.frequency.value=freq;
            o2.type='triangle'; o2.frequency.value=freq*2;
            g.gain.setValueAtTime(0,t+i*.10); g.gain.linearRampToValueAtTime(0.20,t+i*.10+.04);
            g.gain.exponentialRampToValueAtTime(0.001,t+i*.10+.65);
            o.connect(g); o2.connect(g); g.connect(ctx.destination);
            o.start(t+i*.10); o.stop(t+i*.10+.65);
            o2.start(t+i*.10); o2.stop(t+i*.10+.65);
        });
    } catch (_) {}
}
function playPop() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.type='sine'; o.frequency.setValueAtTime(700,t); o.frequency.exponentialRampToValueAtTime(200,t+.12);
        g.gain.setValueAtTime(0.18,t); g.gain.exponentialRampToValueAtTime(0.001,t+.12);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+.12);
    } catch (_) {}
}
function playDing(f1=880,f2=1320) {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        [f1,f2].forEach((f,i)=>{
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='sine'; o.frequency.value=f;
            g.gain.setValueAtTime(0,t+i*.09); g.gain.linearRampToValueAtTime(0.15,t+i*.09+.02);
            g.gain.exponentialRampToValueAtTime(0.001,t+i*.09+.45);
            o.connect(g); g.connect(ctx.destination); o.start(t+i*.09); o.stop(t+i*.09+.5);
        });
    } catch (_) {}
}
function playEscape() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.type='square'; o.frequency.setValueAtTime(300,t); o.frequency.exponentialRampToValueAtTime(900,t+.07);
        g.gain.setValueAtTime(0.06,t); g.gain.exponentialRampToValueAtTime(0.001,t+.07);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+.07);
    } catch (_) {}
}
function playCheer() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    try {
        const t=ctx.currentTime;
        [523.25,659.25,783.99,1046.5].forEach((f,i)=>{
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='sine'; o.frequency.value=f;
            g.gain.setValueAtTime(0,t+i*.08); g.gain.linearRampToValueAtTime(0.13,t+i*.08+.03);
            g.gain.exponentialRampToValueAtTime(0.001,t+i*.08+.5);
            o.connect(g); g.connect(ctx.destination); o.start(t+i*.08); o.stop(t+i*.08+.5);
        });
    } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════
// ★ MÚSICA — 4 modos
// ═══════════════════════════════════════════════════════════════
function stopAllMusic() {
    clearTimeout(chordTimer); clearTimeout(chaosTimer); clearTimeout(melodyTimer);
    musicNodes.forEach(n => {
        try { if (n.stop)       n.stop();       } catch (_) {}
        try { if (n.disconnect) n.disconnect(); } catch (_) {}
    });
    musicNodes = []; chaosOscNodes = [];
    musicMode = 'none'; updateMusicBtn();
}

// ── MODO 1: AMBIENT (creator) ─────────────────────────────────
const AMBIENT_CHORDS = [
    [174.61,220.00,261.63,329.63],[146.83,196.00,220.00,293.66],
    [116.54,174.61,220.00,261.63],[130.81,196.00,261.63,329.63]
];
function playAmbientChord() {
    if (musicMode!=='ambient') return;
    const ctx=getAudioCtx(); if (!ctx) return;
    const chord=AMBIENT_CHORDS[chordIdx%AMBIENT_CHORDS.length]; chordIdx++;
    chord.forEach(freq=>{
        try {
            const o=ctx.createOscillator(),g=ctx.createGain(),lfo=ctx.createOscillator(),lg=ctx.createGain();
            o.type='triangle'; o.frequency.value=freq;
            lfo.frequency.value=4; lg.gain.value=1.2; lfo.connect(lg); lg.connect(o.frequency); lfo.start();
            g.gain.setValueAtTime(0,ctx.currentTime); g.gain.linearRampToValueAtTime(0.018,ctx.currentTime+1.2);
            g.gain.setValueAtTime(0.018,ctx.currentTime+3.0); g.gain.linearRampToValueAtTime(0,ctx.currentTime+4.2);
            o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+4.5);
            musicNodes.push(o,g,lfo,lg);
        } catch (_) {}
    });
    chordTimer=setTimeout(playAmbientChord,4000);
}
function startAmbientMusic() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    if (musicMode==='ambient') return;
    stopAllMusic(); musicMode='ambient'; chordIdx=0; playAmbientChord(); updateMusicBtn();
}

// ── MODO 2: CHAOS (prank) ────────────────────────────────────
const CHAOS_FREQS=[
    [130.81,185.00,246.94,369.99],[138.59,185.00,207.65,311.13],
    [123.47,164.81,184.99,246.94],[130.81,155.56,196.00,261.63]
];
function stopChaosNodes(){
    chaosOscNodes.forEach(({o,g})=>{
        try{const ctx=getAudioCtx();g.gain.setTargetAtTime(0,ctx.currentTime,0.3);setTimeout(()=>{try{o.stop();}catch(_){}},1200);}catch(_){}
    }); chaosOscNodes=[];
}
function playChaosChord() {
    if (musicMode!=='chaos') return;
    const ctx=getAudioCtx(); if (!ctx) return;
    stopChaosNodes();
    const chord=CHAOS_FREQS[Math.floor(Math.random()*CHAOS_FREQS.length)];
    const det=()=>(Math.random()-.5)*28;
    chord.forEach(freq=>{
        try {
            const o=ctx.createOscillator(),g=ctx.createGain(),tl=ctx.createOscillator(),tg=ctx.createGain();
            o.type=Math.random()>.5?'sawtooth':'square'; o.frequency.value=freq+det(); o.detune.value=det()*2;
            tl.frequency.value=8+Math.random()*12; tg.gain.value=0.015;
            tl.connect(tg); tg.connect(g.gain); tl.start();
            g.gain.setValueAtTime(0,ctx.currentTime); g.gain.linearRampToValueAtTime(0.011,ctx.currentTime+.08);
            o.connect(g); g.connect(ctx.destination); o.start();
            musicNodes.push(o,g,tl,tg); chaosOscNodes.push({o,g});
        } catch (_) {}
    });
    if (Math.random()>.6) {
        try {
            const buf=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.04),ctx.sampleRate);
            const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*.035;
            const ns=ctx.createBufferSource(),ng=ctx.createGain();
            ns.buffer=buf; ng.gain.value=0.07;
            ns.connect(ng); ng.connect(ctx.destination); ns.start();
            musicNodes.push(ns,ng);
        } catch (_) {}
    }
    chaosTimer=setTimeout(playChaosChord,1100+Math.random()*400);
}
function startChaosMusic() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    stopAllMusic(); musicMode='chaos'; playChaosChord(); updateMusicBtn();
}

// ── MODO 3: ROMÁNTICA (reveal) — melodía real ─────────────────
// Melodía en Do mayor: C5-E5-G5-A5-G5-F5-E5-D5 (loop)
const ROMANTIC_MELODY = [523.25,659.25,783.99,880.00,783.99,698.46,659.25,587.33];
const ROMANTIC_BACKING = [
    [261.63,329.63,392.00],[220.00,261.63,329.63],
    [174.61,220.00,261.63],[196.00,261.63,329.63]
];
let romantBackIdx=0;
function playRomanticNote() {
    if (musicMode!=='romantic') return;
    const ctx=getAudioCtx(); if (!ctx) return;
    const t=ctx.currentTime;
    const freq=ROMANTIC_MELODY[melodyNoteIdx%ROMANTIC_MELODY.length]; melodyNoteIdx++;
    try {
        // Nota principal (sine suave, levemente reverberada)
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.type='sine'; o.frequency.value=freq;
        g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.11,t+.06);
        g.gain.setValueAtTime(0.11,t+.28); g.gain.exponentialRampToValueAtTime(0.001,t+.5);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+.5);
        musicNodes.push(o,g);
        // Armónico (flute-like)
        const o2=ctx.createOscillator(),g2=ctx.createGain();
        o2.type='triangle'; o2.frequency.value=freq*2;
        g2.gain.setValueAtTime(0,t); g2.gain.linearRampToValueAtTime(0.04,t+.06);
        g2.gain.exponentialRampToValueAtTime(0.001,t+.4);
        o2.connect(g2); g2.connect(ctx.destination); o2.start(t); o2.stop(t+.4);
        musicNodes.push(o2,g2);
    } catch (_) {}
    // Acordes de acompañamiento cada 4 notas
    if (melodyNoteIdx%4===0) {
        const chord=ROMANTIC_BACKING[romantBackIdx%ROMANTIC_BACKING.length]; romantBackIdx++;
        chord.forEach(f=>{
            try {
                const o=ctx.createOscillator(),g=ctx.createGain();
                o.type='triangle'; o.frequency.value=f;
                g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.015,t+.5);
                g.gain.setValueAtTime(0.015,t+1.5); g.gain.linearRampToValueAtTime(0,t+2.2);
                o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+2.2);
                musicNodes.push(o,g);
            } catch (_) {}
        });
    }
    melodyTimer=setTimeout(playRomanticNote,480); // ~125 BPM
}
function startRomanticMusic() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    if (musicMode==='romantic') return;
    stopAllMusic(); musicMode='romantic'; melodyNoteIdx=0; romantBackIdx=0; playRomanticNote(); updateMusicBtn();
}

// ── MODO 4: PHONK (trivia celebration) ───────────────────────
// Características: 140BPM, bajo pesado, hi-hat, kick
let phonkTimer=null;
let phonkBeat=0;
function playPhonkBeat() {
    if (musicMode!=='phonk') return;
    const ctx=getAudioCtx(); if (!ctx) return;
    const t=ctx.currentTime;
    const beat60=60/140; // 1 beat a 140BPM = 0.428s
    const e=beat60/2;    // 1/8 note

    // KICK (cada beat par)
    if (phonkBeat%2===0) {
        try {
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='sine'; o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(40,t+.15);
            g.gain.setValueAtTime(0.55,t); g.gain.exponentialRampToValueAtTime(0.001,t+.2);
            o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+.25);
            musicNodes.push(o,g);
        } catch (_) {}
    }
    // HI-HAT (cada 1/8 note)
    try {
        const buf=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.022),ctx.sampleRate);
        const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*.5;
        const ns=ctx.createBufferSource(),ng=ctx.createGain();
        ns.buffer=buf; ng.gain.value=0.18;
        ns.connect(ng); ng.connect(ctx.destination); ns.start(t);
        musicNodes.push(ns,ng);
    } catch (_) {}
    // BASS (cada beat)
    if (phonkBeat%2===0) {
        try {
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='square'; o.frequency.value=phonkBeat%4===0?65:75;
            g.gain.setValueAtTime(0.20,t); g.gain.exponentialRampToValueAtTime(0.001,t+beat60*.9);
            o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+beat60);
            musicNodes.push(o,g);
        } catch (_) {}
    }
    // LEAD MELODÍA (beats 3-4 del compás)
    if (phonkBeat%8>=4) {
        const leads=[698.46,783.99,880.00,783.99];
        const lFreq=leads[(phonkBeat%8)-4]||698.46;
        try {
            const o=ctx.createOscillator(),g=ctx.createGain();
            o.type='sawtooth'; o.frequency.value=lFreq;
            const d=ctx.createWaveShaper(); d.curve=makeDistortionCurve(80); d.oversample='4x';
            o.connect(d); d.connect(g); g.connect(ctx.destination);
            g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.12,t+.02);
            g.gain.exponentialRampToValueAtTime(0.001,t+beat60*.85);
            o.start(t); o.stop(t+beat60);
            musicNodes.push(o,g,d);
        } catch (_) {}
    }
    phonkBeat++;
    phonkTimer=setTimeout(playPhonkBeat,e*1000);
}
function makeDistortionCurve(amount){
    const n=256,curve=new Float32Array(n);
    for(let i=0;i<n;i++){const x=i*2/n-1;curve[i]=x===0?0:(x/Math.abs(x))*(1-Math.exp(-Math.abs(x)*amount/20));}
    return curve;
}
function startPhonkMusic() {
    const ctx=getAudioCtx(); if (!ctx||!audioUnlocked) return;
    if (musicMode==='phonk') return;
    stopAllMusic(); musicMode='phonk'; phonkBeat=0; playPhonkBeat(); updateMusicBtn();
}

// ── Toggle manual ────────────────────────────────────────────
function toggleMusic() {
    unlockAudio();
    if (musicMode!=='none') { stopAllMusic(); return; }
    if (!document.getElementById('final-screen').classList.contains('hidden')) startRomanticMusic();
    else if (!document.getElementById('prank-screen').classList.contains('hidden')) startChaosMusic();
    else startAmbientMusic();
}
function updateMusicBtn() {
    const btn=document.getElementById('music-btn'); if (!btn) return;
    btn.textContent=musicMode!=='none'?'🎵':'🔇';
    btn.style.boxShadow=musicMode!=='none'?'0 0 16px rgba(236,72,153,0.5)':'0 4px 15px rgba(0,0,0,0.3)';
}

// Primer clic → música ambient
function setupFirstClickMusic() {
    const fn=()=>{ if (firstClickDone) return; firstClickDone=true; unlockAudio();
        if (musicMode==='none'
            && document.getElementById('prank-screen').classList.contains('hidden')
            && document.getElementById('final-screen').classList.contains('hidden')) startAmbientMusic();
    };
    document.addEventListener('click',    fn,{once:true,capture:true});
    document.addEventListener('touchstart',fn,{once:true,capture:true,passive:true});
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function getSubIndex(cat,sub) {
    for (const l of ['es','en']) {
        const i=(config[l].sub[cat]||[]).indexOf(sub);
        if (i>=0) return i;
    }
    return 0;
}
function getTrolleo(cat,sub) {
    // Usa currentLang en tiempo real
    const pool=config[currentLang]?.trolleos?.[cat];
    if (!pool) return '';
    if (pool[sub]) return pool[sub];
    const idx=getSubIndex(cat,sub); const keys=Object.keys(pool);
    return pool[keys[idx]]||pool[keys[0]]||'';
}
function getFinalMsg(cat,sub) {
    const pool=config[currentLang]?.final?.[cat];
    if (!pool) return '';
    if (pool[sub]) return pool[sub];
    const idx=getSubIndex(cat,sub); const keys=Object.keys(pool);
    return pool[keys[idx]]||pool[keys[0]]||'';
}
function getGame(cat,sub) {
    const pool=config[currentLang]?.games?.[cat];
    if (!pool) return null;
    if (pool[sub]) return pool[sub];
    const idx=getSubIndex(cat,sub); const keys=Object.keys(pool);
    return pool[keys[idx]]||pool[keys[0]]||null;
}

// ★ Saludo con privacidad
function getGreeting(lang,cat,sub) {
    const t=config[lang];
    if (t.privateGreeting && t.privateGreeting.includes(sub)) return t.privateGreetingText;
    return t.greeting.replace('{sub}',sub);
}

// ═══════════════════════════════════════════════════════════════
// LANGUAGE — actualiza TODO el DOM visible
// ═══════════════════════════════════════════════════════════════
function changeLang(lang) {
    currentLang=lang;
    const t=config[lang]; const ui=t.ui;
    const el=id=>document.getElementById(id);

    el('btn-lang-es').classList.toggle('active',lang==='es');
    el('btn-lang-en').classList.toggle('active',lang==='en');
    el('btn-lang-fr').classList.toggle('active',lang==='fr');
    el('btn-lang-pt').classList.toggle('active',lang==='pt');

    // Creator
    const cv=el('creator-view');
    if (cv&&!cv.classList.contains('hidden')) {
        el('ui-title').textContent=ui.title; el('ui-desc').textContent=ui.desc;
        el('lbl-rel').textContent=ui.rel;    el('lbl-dest').textContent=ui.dest;
        el('lbl-msg').textContent=ui.msg;    el('lbl-opt').textContent=ui.msgOpt;
        el('lbl-hint').textContent=ui.msgHint; el('lbl-result').textContent=ui.result;
        el('btn-generate').textContent=ui.gen; el('btn-copy').textContent=ui.copy;
        el('custom-message').placeholder=ui.msgHolder;
        const cs=el('main-category'); cs.innerHTML='';
        for (const k in t.categories) cs.add(new Option(t.categories[k],k));
        updateSubCats();
    }

    const rv=el('receiver-view');
    if (!rv||rv.classList.contains('hidden')) return;

    // Tap overlay
    if (el('tap-title')) el('tap-title').textContent=t.tapTitle;
    if (el('tap-sub'))   el('tap-sub').textContent=t.tapSub;
    if (el('tap-btn'))   el('tap-btn').textContent=t.tapBtn;
    if (el('tap-hint'))  el('tap-hint').textContent=t.tapHint;

    // ★ Si la pantalla de PRANK está activa → reiniciar tipeo en nuevo idioma
    const ps=el('prank-screen');
    if (ps&&!ps.classList.contains('hidden')) {
        restartPrankTyping();
    }

    // Final screen
    const fs=el('final-screen');
    if (fs&&!fs.classList.contains('hidden')) {
        const p=new URLSearchParams(location.search);
        refreshFinalScreen(lang,p);
    }

    // Trivia (actualizar si está visible)
    const ta=el('trivia-area');
    if (ta&&!ta.classList.contains('hidden')&&!triviaAnswered) {
        renderTrivia();
    }
}

function refreshFinalScreen(lang,params) {
    const t=config[lang]; const el=id=>document.getElementById(id);
    const cat=params.get('c')||currentCat;
    const sub=decodeURIComponent(params.get('s')||currentSub);

    el('final-greeting').textContent=getGreeting(lang,cat,sub);

    const rawB64=params.get('m');
    let msg=getFinalMsg(cat,sub);
    if (rawB64){try{const d=decodeURIComponent(escape(atob(rawB64)));if(d.trim())msg=d;}catch(_){}}
    el('final-text').textContent=msg;

    if (el('btn-share'))    el('btn-share').textContent=t.shareBtn;
    if (el('share-sub'))    el('share-sub').textContent=t.shareSub;
    if (el('btn-donation')) el('btn-donation').textContent=t.donationBtn;

    refreshGameUI(cat,sub);
}

function refreshGameUI(cat,sub) {
    const g=getGame(cat,sub); const el=id=>document.getElementById(id); if (!g) return;
    if (cat==='amor') {
        if (el('question-text'))  el('question-text').textContent=g.question;
        if (el('btn-yes'))        el('btn-yes').textContent=g.yesBtn;
        if (el('celebrate-text')) el('celebrate-text').textContent=g.celebrateText;
        if (el('celebrate-sub'))  el('celebrate-sub').textContent=g.celebrateSub;
        const bn=el('btn-no');
        if (bn&&!bn.classList.contains('btn-no-surrender')) bn.textContent=g.noBtn;
    } else if (cat==='amistad') {
        if (el('game-amistad-title')) el('game-amistad-title').textContent=g.title;
        if (el('tap-game-btn'))       el('tap-game-btn').textContent=g.emoji;
        updateTapProgress();
        const doneEl=el('tap-done-text'); if(doneEl) doneEl.textContent=g.done;
    } else if (cat==='familiar') {
        if (el('game-familiar-title')) el('game-familiar-title').textContent=g.title;
        if (el('hug-game-btn'))        el('hug-game-btn').textContent=g.emoji;
        updateHugProgress();
        const doneEl=el('hug-done-text'); if(doneEl) doneEl.textContent=g.done;
    }
}

// ═══════════════════════════════════════════════════════════════
// CREATOR
// ═══════════════════════════════════════════════════════════════
function updateSubCats() {
    const cat=document.getElementById('main-category').value;
    const ss=document.getElementById('sub-category'); ss.innerHTML='';
    (config[currentLang].sub[cat]||[]).forEach(s=>ss.add(new Option(s,s)));
}
function generateLink() {
    unlockAudio(); playPop();
    const c=document.getElementById('main-category').value;
    const s=document.getElementById('sub-category').value;
    const raw=document.getElementById('custom-message').value.trim();
    const m=btoa(unescape(encodeURIComponent(raw)));
    const url=`${location.origin}${location.pathname}?c=${c}&s=${encodeURIComponent(s)}&m=${m}&l=${currentLang}`;
    document.getElementById('final-url').value=url;
    const ra=document.getElementById('result-area'); ra.classList.remove('hidden');
    ra.scrollIntoView({behavior:'smooth',block:'nearest'});
    incMyLinks(); hitCounter('links-generados');
    // Firebase
    const customMsg=document.getElementById('custom-message').value.trim();
    saveToFirebase(c, s, currentLang, !!customMsg);
}
async function copyLink() {
    unlockAudio();
    const text=document.getElementById('final-url').value;
    const btn=document.getElementById('btn-copy');
    try { await navigator.clipboard.writeText(text); }
    catch(_){ const inp=document.getElementById('final-url'); inp.select(); inp.setSelectionRange(0,99999); try{document.execCommand('copy');}catch(_2){} }
    playDing();
    const t=config[currentLang]; const orig=btn.textContent;
    btn.textContent=t.copied; btn.classList.add('bg-green-700');
    setTimeout(()=>{btn.textContent=t.ui.copy;btn.classList.remove('bg-green-700');},2000);
}

// ═══════════════════════════════════════════════════════════════
// RECEIVER: PRANK FLOW
// ═══════════════════════════════════════════════════════════════
function beginPrank() {
    unlockAudio(); startChaosMusic();
    recordViewFirebase(); // Firebase
    document.getElementById('tap-overlay').classList.add('hidden');
    const ps=document.getElementById('prank-screen');
    ps.classList.remove('hidden'); ps.classList.add('fade-in');
    setTimeout(()=>{
        ps.classList.add('chaos-mode');
        document.getElementById('prank-text').classList.add('chaos-mode');
    },400);
    const p=new URLSearchParams(location.search);
    startTyping(p);
}

function startTyping(p) {
    const cat=p.get('c')||'amistad';
    const sub=decodeURIComponent(p.get('s')||'');
    const msg=getTrolleo(cat,sub);  // ← usa currentLang en tiempo real
    const el=document.getElementById('prank-text');
    el.style.whiteSpace='pre-wrap'; el.textContent=''; el.classList.remove('terminal-cursor');

    if (currentTyper) { clearInterval(currentTyper); currentTyper=null; }

    let i=0,ce=0;
    currentTyper=setInterval(()=>{
        el.textContent+=msg.charAt(i); i++;
        ce++; const ch=msg.charAt(i-1);
        if (ce>=3&&ch!=='\n'&&ch!==' '){ ce=0; playKeyClick(); }
        if (i>=msg.length){ clearInterval(currentTyper); currentTyper=null; el.classList.add('terminal-cursor'); setTimeout(()=>fillBar(p),700); }
    },28);
}

// ★ Reiniciar tipeo al cambiar idioma durante prank
function restartPrankTyping() {
    if (currentTyper){ clearInterval(currentTyper); currentTyper=null; }
    const p=new URLSearchParams(location.search);
    // Resetear barra
    const bar=document.getElementById('progress-bar'); if(bar) bar.style.width='0%';
    startTyping(p);
}

function fillBar(p) {
    const bar=document.getElementById('progress-bar'), cont=document.getElementById('main-container');
    const el=document.getElementById('prank-text'); el.classList.remove('terminal-cursor');
    let w=0;
    const iv=setInterval(()=>{
        w++; bar.style.width=w+'%';
        if (w===55) playAlarm();
        if (w===80){ playGlitch(); cont.classList.add('shake-heavy'); }
        if (w>=100){ clearInterval(iv); cont.classList.remove('shake-heavy'); setTimeout(()=>showFinal(p),400); }
    },38);
}

function showFinal(p) {
    playFanfare(); launchConfetti();
    setTimeout(startRomanticMusic,900);  // ★ melodía romántica

    document.getElementById('prank-screen').classList.add('hidden');
    const fs=document.getElementById('final-screen');
    fs.classList.remove('hidden'); fs.classList.add('fade-in');

    const lang=currentLang;
    const cat=p.get('c')||'amistad';
    const sub=decodeURIComponent(p.get('s')||'');
    const t=config[lang];
    currentCat=cat; currentSub=sub;  // guardar para uso en refreshes

    const rawB64=p.get('m');
    let finalMsg=getFinalMsg(cat,sub);
    if (rawB64){try{const d=decodeURIComponent(escape(atob(rawB64)));if(d.trim())finalMsg=d;}catch(_){}}

    document.getElementById('final-greeting').textContent=getGreeting(lang,cat,sub);
    document.getElementById('final-text').textContent=finalMsg;
    document.getElementById('btn-share').textContent=t.shareBtn;
    document.getElementById('share-sub').textContent=t.shareSub;
    document.getElementById('btn-donation').textContent=t.donationBtn;

    initGame(lang,cat,sub);

    // Mostrar trivia después de 1.5s
    setTimeout(()=>{
        renderTrivia();
        document.getElementById('trivia-area').classList.remove('hidden');
    },1500);
}

// ═══════════════════════════════════════════════════════════════
// GAMES
// ═══════════════════════════════════════════════════════════════
function initGame(lang,cat,sub) {
    document.getElementById('game-area').classList.remove('hidden');
    ['amor','amistad','familiar'].forEach(c=>document.getElementById('game-'+c).classList.add('hidden'));
    document.getElementById('game-'+cat).classList.remove('hidden');
    refreshGameUI(cat,sub);
    if (cat==='amor') setTimeout(setupBtnNo,150);
}

// ── AMOR ────────────────────────────────────────────────────
const NO_POS=[
    {left:'65%',top:'-30px'},{left:'-28%',top:'25px'},
    {left:'60%',top:'38px'}, {left:'-22%',top:'-28px'},
    {left:'58%',top:'-18px'},{left:'-12%',top:'32px'},
];
function setupBtnNo() {
    const btn=document.getElementById('btn-no'); if (!btn) return;
    noEscapes=0; noLastTime=0;
    function tryEscape(){
        const now=Date.now(); if (now-noLastTime<200) return; noLastTime=now; noEscapes++;
        playEscape();
        if (noEscapes>=MAX_ESCAPES){
            const g=getGame(currentCat,currentSub);
            btn.textContent=g?g.noSurrender:'💕 ¡Igual te quiero!';
            btn.style.cssText=''; btn.style.position='relative';
            btn.classList.add('btn-no-surrender','bg-pink-100','text-pink-500');
            btn.removeEventListener('mouseover',tryEscape); btn.removeEventListener('touchstart',tryEscape);
            btn.onclick=celebrate; return;
        }
        const pos=NO_POS[(noEscapes-1)%NO_POS.length];
        btn.style.left=pos.left; btn.style.top=pos.top;
    }
    btn.addEventListener('mouseover',tryEscape);
    btn.addEventListener('touchstart',tryEscape,{passive:true});
}
function celebrate() {
    document.getElementById('btn-no-wrapper').style.display='none';
    document.getElementById('celebrate-msg').classList.remove('hidden');
    playFanfare(); launchConfetti(); setTimeout(launchConfetti,600);
}

// ── AMISTAD ─────────────────────────────────────────────────
function handleTapGame() {
    const g=getGame(currentCat,currentSub)||{target:7};
    const target=g.target||7;
    tapCount++; playDing(440+tapCount*50,660+tapCount*50);
    const btn=document.getElementById('tap-game-btn');
    btn.classList.add('game-tap-active'); setTimeout(()=>btn.classList.remove('game-tap-active'),180);
    updateTapProgress();
    if (tapCount>=target){ btn.style.pointerEvents='none'; document.getElementById('tap-done-msg').classList.remove('hidden'); playCheer(); launchConfetti(); btn.textContent='🤝'; }
}
function updateTapProgress() {
    const g=getGame(currentCat,currentSub)||{target:7,progress:'Apretones: {n} / {total}',done:'¡Somos los mejores!'};
    const target=g.target||7;
    const pct=Math.min(100,Math.round(tapCount/target*100));
    document.getElementById('tap-progress').style.width=pct+'%';
    document.getElementById('tap-progress-text').textContent=(g.progress||'').replace('{n}',Math.min(tapCount,target)).replace('{total}',target);
    const de=document.getElementById('tap-done-text'); if(de) de.textContent=g.done||'';
}

// ── FAMILIAR ────────────────────────────────────────────────
function handleHugGame() {
    const g=getGame(currentCat,currentSub)||{target:5};
    const target=g.target||5;
    hugCount++; playDing(300+hugCount*25,500+hugCount*25);
    const btn=document.getElementById('hug-game-btn');
    btn.classList.add('game-tap-active'); setTimeout(()=>btn.classList.remove('game-tap-active'),200);
    updateHugProgress();
    if (hugCount>=target){ btn.style.pointerEvents='none'; document.getElementById('hug-done-msg').classList.remove('hidden'); playCheer(); launchConfetti(); btn.textContent='💝'; }
}
function updateHugProgress() {
    const g=getGame(currentCat,currentSub)||{target:5,progress:'Abrazos: {n} / {total}',done:'¡Deuda saldada!'};
    const target=g.target||5;
    const pct=Math.min(100,Math.round(hugCount/target*100));
    document.getElementById('hug-progress').style.width=pct+'%';
    document.getElementById('hug-progress-text').textContent=(g.progress||'').replace('{n}',Math.min(hugCount,target)).replace('{total}',target);
    const de=document.getElementById('hug-done-text'); if(de) de.textContent=g.done||'';
}

// ═══════════════════════════════════════════════════════════════
// ★ TRIVIA
// ═══════════════════════════════════════════════════════════════
function renderTrivia() {
    const t=config[currentLang].trivia; if (!t) return;
    const el=id=>document.getElementById(id);
    el('trivia-question').textContent=t.question;
    const optContainer=el('trivia-options'); optContainer.innerHTML='';
    t.options.forEach((opt,i)=>{
        const btn=document.createElement('button');
        btn.className='trivia-btn w-full text-left font-semibold rounded-xl p-3 transition body-text';
        btn.textContent=opt;
        btn.onclick=()=>checkTrivia(i);
        optContainer.appendChild(btn);
    });
    // Reset result
    const res=el('trivia-result'); if(res){ res.classList.add('hidden'); }
}

function checkTrivia(idx) {
    if (triviaAnswered) return;
    triviaAnswered=true;
    const t=config[currentLang].trivia;
    const correct=idx===t.correct;
    const btns=document.querySelectorAll('.trivia-btn');

    btns.forEach((btn,i)=>{
        btn.disabled=true;
        if (i===t.correct) { btn.classList.add('trivia-correct'); }
        else if (i===idx && !correct) { btn.classList.add('trivia-wrong'); }
    });

    const resDiv=document.getElementById('trivia-result');
    const icon=document.getElementById('trivia-result-icon');
    const text=document.getElementById('trivia-result-text');

    icon.textContent=correct?'🎉':'😅';
    text.textContent=correct?t.right:t.wrong;
    resDiv.classList.remove('hidden');

    if (correct) {
        // ★ PHONK CELEBRATION
        setTimeout(startPhonkMusic,200);
        epicConfetti();
        // Animación de la card
        const card=document.getElementById('main-container');
        card.classList.add('celebrate-flash');
        setTimeout(()=>card.classList.remove('celebrate-flash'),2000);
        // Parar phonk después de 8 segundos y volver a romántica
        setTimeout(()=>{ if(musicMode==='phonk') startRomanticMusic(); },8000);
    } else {
        playDing(220,330);
    }
}

function epicConfetti() {
    const colors=['#ff4d6d','#ffd700','#ff85a1','#00ff88','#4d88ff','#ff6b35','#a855f7'];
    // Lluvia de confeti épica
    const end=Date.now()+4000;
    (function frame(){
        confetti({particleCount:8,angle:60, spread:55,origin:{x:0},colors});
        confetti({particleCount:8,angle:120,spread:55,origin:{x:1},colors});
        confetti({particleCount:5,angle:90, spread:70,origin:{x:.5,y:0},colors});
        if (Date.now()<end) requestAnimationFrame(frame);
    })();
    // Explosión central extra
    confetti({particleCount:200,spread:100,origin:{y:.5},colors});
}

// ═══════════════════════════════════════════════════════════════
// CONFETI NORMAL
// ═══════════════════════════════════════════════════════════════
function launchConfetti() {
    const c=['#ff4d6d','#ff85a1','#ffd6e0','#ff0054','#ffccd5'];
    confetti({particleCount:110,spread:70,origin:{y:.65},colors:c});
    setTimeout(()=>{
        confetti({particleCount:65,angle:60, spread:55,origin:{x:0,y:.7},colors:c});
        confetti({particleCount:65,angle:120,spread:55,origin:{x:1,y:.7},colors:c});
    },380);
}

// ═══════════════════════════════════════════════════════════════
// ACCIONES
// ═══════════════════════════════════════════════════════════════
function goToCreator() { window.location.href=location.origin+location.pathname; }
function showDonationJoke() { alert(config[currentLang].donation); }

// ═══════════════════════════════════════════════════════════════
// STATS (5 clics en footer)
// ═══════════════════════════════════════════════════════════════
function handleStatsTrigger() {
    statsClicks++; clearTimeout(statsTimer);
    statsTimer=setTimeout(()=>{statsClicks=0;},2000);
    if (statsClicks>=5){ statsClicks=0; showStats(); }
}
function showStats() {
    const t=config[currentLang]; const did=getDeviceId();
    const myV=getMyVisits(); const myL=getMyLinks();
    alert(t.statsResult.replace('{did}',did).replace('{myvisits}',myV).replace('{mylinks}',myL));
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
window.onload=()=>{
    const p=new URLSearchParams(location.search);
    setupFirstClickMusic();

    if (p.has('c')) {
        // RECEIVER
        document.getElementById('creator-view').classList.add('hidden');
        document.getElementById('receiver-view').classList.remove('hidden');
        const lang=p.get('l')||'es'; const t=config[lang]; currentLang=lang;
        document.getElementById('tap-title').textContent=t.tapTitle;
        document.getElementById('tap-sub').textContent=t.tapSub;
        document.getElementById('tap-btn').textContent=t.tapBtn;
        document.getElementById('tap-hint').textContent=t.tapHint;
        document.getElementById('btn-lang-es').classList.toggle('active',lang==='es');
        document.getElementById('btn-lang-en').classList.toggle('active',lang==='en');
        document.getElementById('btn-lang-fr').classList.toggle('active',lang==='fr');
        document.getElementById('btn-lang-pt').classList.toggle('active',lang==='pt');
        incMyVisits(); hitCounter('visitas-prank');
    } else {
        // CREATOR
        changeLang('es');
    }
};

// ═══════════════════════════════════════════════════════════════
// ★ DASHBOARD (NUEVO)
// ═══════════════════════════════════════════════════════════════
function showDashboard() {
    const modal = document.getElementById('dashboard-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    loadDashboardData();
}

function closeDashboard(event) {
    if (!event || event.target === event.currentTarget) {
        const modal = document.getElementById('dashboard-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function loadDashboardData() {
    if (!database) return;
    
    // Total messages
    database.ref('stats/totalMessages').once('value').then(snapshot => {
        const el = document.getElementById('total-messages');
        if (el) el.textContent = snapshot.val() || 0;
    });
    
    // Total views
    database.ref('stats/totalViews').once('value').then(snapshot => {
        const el = document.getElementById('total-views');
        if (el) el.textContent = snapshot.val() || 0;
    });
    
    // Categories chart
    database.ref('stats/categories').once('value').then(snapshot => {
        const categories = snapshot.val() || {};
        const chartDiv = document.getElementById('categories-chart');
        if (!chartDiv) return;
        chartDiv.innerHTML = '';
        
        const total = Object.values(categories).reduce((a, b) => a + b, 0);
        const sortedCats = Object.entries(categories).sort((a, b) => b[1] - a[1]);
        
        sortedCats.forEach(([cat, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const emoji = cat === 'amor' ? '❤️' : cat === 'amistad' ? '🤝' : '🏠';
            chartDiv.innerHTML += `
                <div class="flex items-center gap-3">
                    <span class="text-2xl">${emoji}</span>
                    <div class="flex-1">
                        <div class="flex justify-between mb-1">
                            <span class="font-bold text-sm">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                            <span class="text-sm font-mono">${count} (${percentage}%)</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-2">
                            <div class="bg-gradient-to-r from-pink-400 to-rose-400 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
    });
    
    // Languages chart
    database.ref('stats/languages').once('value').then(snapshot => {
        const languages = snapshot.val() || {};
        const chartDiv = document.getElementById('languages-chart');
        if (!chartDiv) return;
        chartDiv.innerHTML = '';
        
        const langFlags = { es: '🇲🇽', en: '🇺🇸', fr: '🇫🇷', pt: '🇧🇷' };
        const langNames = { es: 'Español', en: 'English', fr: 'Français', pt: 'Português' };
        const total = Object.values(languages).reduce((a, b) => a + b, 0);
        const sortedLangs = Object.entries(languages).sort((a, b) => b[1] - a[1]);
        
        sortedLangs.forEach(([lang, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            chartDiv.innerHTML += `
                <div class="flex items-center gap-3">
                    <span class="text-2xl">${langFlags[lang] || '🌐'}</span>
                    <div class="flex-1">
                        <div class="flex justify-between mb-1">
                            <span class="font-bold text-sm">${langNames[lang] || lang}</span>
                            <span class="text-sm font-mono">${count} (${percentage}%)</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-2">
                            <div class="bg-gradient-to-r from-purple-400 to-indigo-400 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
    });
    
    // Recent messages
    database.ref('messages').orderByChild('timestamp').limitToLast(10).once('value').then(snapshot => {
        const messages = [];
        snapshot.forEach(child => messages.push(child.val()));
        messages.reverse();
        
        const recentDiv = document.getElementById('recent-messages');
        if (!recentDiv) return;
        recentDiv.innerHTML = '';
        
        messages.forEach(msg => {
            const date = new Date(msg.timestamp);
            const timeAgo = getTimeAgo(date);
            const langFlag = { es: '🇲🇽', en: '🇺🇸', fr: '🇫🇷', pt: '🇧🇷' }[msg.lang] || '🌐';
            const catEmoji = msg.category === 'amor' ? '❤️' : msg.category === 'amistad' ? '🤝' : '🏠';
            
            recentDiv.innerHTML += `
                <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div class="flex items-center gap-2 text-sm">
                        <span>${catEmoji}</span>
                        <span class="font-bold text-slate-700">${msg.subCategory}</span>
                        <span>${langFlag}</span>
                        ${msg.hasCustomMessage ? '<span class="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">✨ Personalizado</span>' : ''}
                        <span class="ml-auto text-xs text-slate-400">${timeAgo}</span>
                    </div>
                </div>
            `;
        });
    });
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        año: 31536000, mes: 2592000, día: 86400,
        hora: 3600, minuto: 60, segundo: 1
    };
    
    for (let [name, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return `Hace ${interval} ${name}${interval > 1 ? 's' : ''}`;
        }
    }
    return 'Justo ahora';
}

