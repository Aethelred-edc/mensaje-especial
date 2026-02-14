/* ================================================================
   app.js — Sorpresa Especial 💝  v6.0 MEJORADO
   ✅ Firebase Realtime Database - Estadísticas globales
   ✅ 4 idiomas completos: ES, EN, PT, FR
   ✅ Dashboard de estadísticas en tiempo real
   ✅ Sistema de traducción mejorado
   ✅ Mejoras de rendimiento y UX
   ================================================================ */

// ═══════════════════════════════════════════════════════════════
// FIREBASE CONFIGURATION
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

// Initialize Firebase
let database;
try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log('✅ Firebase initialized');
} catch (error) {
    console.warn('⚠️ Firebase initialization failed:', error);
    database = null;
}

// ═══════════════════════════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════════════════════════
let currentLang = 'es';
let audioUnlocked = false;
let audioCtx = null;
let musicMode = 'off';
let chordTimer, chaosTimer, melodyTimer;
let noEscapeCount = 0;
let tapCount = 0;
let hugCount = 0;
let statsClicks = 0;
let statsTimer;

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS - 4 LANGUAGES
// ═══════════════════════════════════════════════════════════════
const translations = {
es: {
  langName: 'Español',
  categories: { amistad:'Amistad 🤝', amor:'Amor ❤️', familiar:'Familiar 🏠' },
  sub: {
    amistad:  ['Amigo/a','Mejor Amigo/a','Cómplice','Hermano/a del alma'],
    amor:     ['Crush','Pareja','Novio/a','Amor Platónico','Esposa/o'],
    familiar: ['Mamá','Papá','Hermano/a','Tío/a','Primo/a','Abuela/o']
  },
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
      'Amor Platónico': '> MODO CONFESIÓN SILENCIOSA ACTIVADO...\n> Recopilando: 847 veces que revisaste su perfil... 👀\n> Compilando: "me gusta" en fotos de 2018 y anteriores...\n> Exportando: screenshots de sus stories privadas...\n> Enviando a: la persona + su grupo de mejores amigos/as\n> Estado: STALKEO OFICIALMENTE CONFIRMADO ✓',
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
      'Amor Platónico': '¡Tranquilidad! 😅 Era una broma de alguien que piensa que eres increíble. Tienes una energía única y especial, y ojalá que ese alguien algún día se atreva a decírtelo. ✨💕',
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
  games: {
    amor: {
      'Crush':          { question:'¿Te gustó la sorpresa? 🌟', yesBtn:'¡Sí! ✨', noBtn:'Nop', noSurrender:'💫 ¡Me alegra!', celebrateText:'¡Qué bien! 🥰', celebrateSub:'¡Alguien especial pensó en ti hoy! 💝' },
      'Pareja':         { question:'¿Me perdonas la broma? 🥺', yesBtn:'Sí ❤️', noBtn:'NO', noSurrender:'💕 ¡Igual te quiero!', celebrateText:'¡Lo sabía! 🥰', celebrateSub:'¡Gracias por perdonarme! Te quiero mucho ❤️' },
      'Novio/a':        { question:'¿Me perdonas? ¿Todavía me quieres? 🥺', yesBtn:'¡Siempre! ❤️', noBtn:'Hmm...', noSurrender:'💕 ¡No puedes dejar de quererme!', celebrateText:'¡Sabía que sí! 🥰', celebrateSub:'¡Eres el/la mejor! Te amo ❤️' },
      'Amor Platónico': { question:'¿Valió la pena abrir la sorpresa? 🌸', yesBtn:'¡Sí! 💕', noBtn:'No sé', noSurrender:'💫 ¡A que sí!', celebrateText:'¡Perfecto! 🥰', celebrateSub:'¡Que alguien piensa en ti hoy! ✨💕' },
      'Esposa/o':       { question:'¿Me perdonas, mi amor? 🥺', yesBtn:'Esta vez sí ❤️', noBtn:'A ver...', noSurrender:'💕 ¡Claro que sí!', celebrateText:'¡Qué alivio! 🥰', celebrateSub:'¡Gracias por seguir eligiéndome! ❤️' }
    },
    amistad: {
      'Amigo/a':            { title:'¡Demuestra que somos amigos/as! 🤝', emoji:'🤜', target:7, progress:'Apretones: {n} / {total}', done:'¡Amistad confirmada! ¡Los mejores! 🤝💕' },
      'Mejor Amigo/a':      { title:'¡Los mejores se aprietan más fuerte! 💪', emoji:'🤜', target:10, progress:'Mega-apretones: {n} / {total}', done:'¡Imbatibles! ¡El dúo perfecto! 💙🤜' },
      'Cómplice':           { title:'¡El apretón secreto de los cómplices! 🤫', emoji:'🤫', target:5, progress:'Apretones secretos: {n} / {total}', done:'¡Misión cumplida, cómplice! 🕵️✅' },
      'Hermano/a del alma': { title:'¡Los hermanos del alma siempre conectan! ❤️', emoji:'🤝', target:8, progress:'Conexiones: {n} / {total}', done:'¡Vínculo eterno confirmado! ❤️✨' }
    },
    familiar: {
      'Mamá':     { title:'¡Paga tu deuda de abrazos, mami! 🤗', emoji:'🤗', target:7, progress:'Abrazos a mamá: {n} / {total}', done:'¡Deuda con mamá saldada! La quiero mucho ❤️' },
      'Papá':     { title:'¡Chócala con papá! 👊', emoji:'👊', target:5, progress:'Choques con papá: {n} / {total}', done:'¡Eso es papá! ¡Los mejores! 💙👊' },
      'Hermano/a':{ title:'¡El clásico entre hermanos! 👈', emoji:'👈', target:4, progress:'Jaloneos: {n} / {total}', done:'¡Hermanos inseparables! 🤝❤️' },
      'Tío/a':    { title:'¡El abrazo del tío/a favorito/a! 🤗', emoji:'🤗', target:3, progress:'Abrazos: {n} / {total}', done:'¡Tío/a favorito/a confirmado/a! 🏆❤️' },
      'Primo/a':  { title:'¡El apretón de primos! ✊', emoji:'✊', target:6, progress:'Apretones de primo/a: {n} / {total}', done:'¡Los mejores primos del mundo! 🎉❤️' },
      'Abuela/o': { title:'¡Un abrazo virtual para la abuela/o! 🥰', emoji:'🥰', target:6, progress:'Mimos: {n} / {total}', done:'¡La abuela/o ya siente el amor! 💝' }
    }
  },
  tapTitle:'Tienes una sorpresa', tapSub:'Alguien pensó en ti hoy 💕', tapBtn:'¡Abrir! 💝', tapHint:'🔊 Activa el sonido para la experiencia completa',
  greeting:'¡Para mi {sub}!',
  shareBtn:'💌 ¡Quiero enviarle esto a alguien!', shareSub:'Crea tu propia sorpresa personalizada →',
  donationBtn:'☕ Invitar un café al creador',
  donation:'⚠️ ERROR DE TRANSACCIÓN:\n\nEl sistema de pagos se ha bloqueado porque el programador aún no tiene edad legal para tener cuenta bancaria.\n\n¡Mejor regálale un chocolate! 🍫🍭',
  copied:'✓ COPIADO',
  statsResult:'📊 ESTADÍSTICAS\n\n🆔 Tu ID: {did}\n👆 Tus visitas: {myvisits}\n🔗 Links generados: {mylinks}',
  statsError:'No se pudieron cargar las estadísticas.',
  trivia: {
    question: '🤔 ¿Por qué se celebra el 14 de febrero?',
    options: ['❤️ Por San Valentín, mártir romano', '❄️ Porque es el día más frío del año', '🎁 Lo inventó Hallmark en los años 20'],
    correct: 0,
    right: '¡Correcto! 🎉 San Valentín fue un sacerdote romano que casaba parejas en secreto en el siglo III. ¡Por eso celebramos el amor hoy! ❤️',
    wrong: '¡Casi! 😅 La respuesta correcta es: San Valentín, un mártir romano del siglo III que casaba parejas en secreto. ¡Ya sabes para la próxima! 💪'
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
  langName: 'English',
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
      'Spouse':           { question:'Do you forgive me, my love? 🥺', yesBtn:'This time yes ❤️', noBtn:'Let\'s see...', noSurrender:'💕 Of course you do!', celebrateText:'What a relief! 🥰', celebrateSub:'Thanks for choosing me again! ❤️' }
    },
    amistad: {
      'Friend':           { title:'Prove we\'re friends! 🤝', emoji:'🤜', target:7, progress:'Fist bumps: {n} / {total}', done:'Friendship confirmed! Best friends! 🤝💕' },
      'Best Friend':      { title:'Best friends fist bump harder! 💪', emoji:'🤜', target:10, progress:'Mega-bumps: {n} / {total}', done:'Unbeatable! Perfect duo! 💙🤜' },
      'Partner in crime': { title:'The secret handshake! 🤫', emoji:'🤫', target:5, progress:'Secret bumps: {n} / {total}', done:'Mission accomplished, partner! 🕵️✅' },
      'Soul sibling':     { title:'Soul siblings always connect! ❤️', emoji:'🤝', target:8, progress:'Connections: {n} / {total}', done:'Eternal bond confirmed! ❤️✨' }
    },
    familiar: {
      'Mom':       { title:'Pay your hug debt to mom! 🤗', emoji:'🤗', target:7, progress:'Hugs to mom: {n} / {total}', done:'Debt paid to mom! Love her so much ❤️' },
      'Dad':       { title:'High five with dad! 👊', emoji:'👊', target:5, progress:'High fives with dad: {n} / {total}', done:'That\'s dad! The best! 💙👊' },
      'Sibling':   { title:'Classic sibling move! 👈', emoji:'👈', target:4, progress:'Nudges: {n} / {total}', done:'Inseparable siblings! 🤝❤️' },
      'Uncle/Aunt':{ title:'Hug for favorite uncle/aunt! 🤗', emoji:'🤗', target:3, progress:'Hugs: {n} / {total}', done:'Favorite uncle/aunt confirmed! 🏆❤️' },
      'Cousin':    { title:'Cousin fist bump! ✊', emoji:'✊', target:6, progress:'Cousin bumps: {n} / {total}', done:'Best cousins in the world! 🎉❤️' },
      'Grandma/pa':{ title:'Virtual hug for grandma/pa! 🥰', emoji:'🥰', target:6, progress:'Cuddles: {n} / {total}', done:'Grandma/pa feels the love! 💝' }
    }
  },
  tapTitle:'You have a surprise', tapSub:'Someone thought of you today 💕', tapBtn:'Open it! 💝', tapHint:'🔊 Turn on sound for the full experience',
  greeting:'For my {sub}!',
  shareBtn:'💌 I want to send this to someone!', shareSub:'Create your own personalized surprise →',
  donationBtn:'☕ Buy the creator a coffee',
  donation:'⚠️ TRANSACTION ERROR:\n\nThe payment system has been blocked because the programmer is not yet of legal age to have a bank account.\n\nBetter give him a chocolate! 🍫🍭',
  copied:'✓ COPIED',
  statsResult:'📊 STATISTICS\n\n🆔 Your ID: {did}\n👆 Your visits: {myvisits}\n🔗 Links generated: {mylinks}',
  statsError:'Could not load statistics.',
  trivia: {
    question: '🤔 Why is February 14th celebrated?',
    options: ['❤️ For Saint Valentine, Roman martyr', '❄️ Because it\'s the coldest day of the year', '🎁 Hallmark invented it in the 20s'],
    correct: 0,
    right: 'Correct! 🎉 Saint Valentine was a Roman priest who secretly married couples in the 3rd century. That\'s why we celebrate love today! ❤️',
    wrong: 'Almost! 😅 The correct answer is: Saint Valentine, a Roman martyr from the 3rd century who secretly married couples. Now you know for next time! 💪'
  },
  ui: {
    title:'VIP MESSAGING', desc:'Customize your delivery 💝', gen:'Generate Link 🚀',
    rel:'Relationship type', dest:'For whom?', msg:'Your special message',
    msgOpt:'✨ Optional', msgHint:'💡 If you leave it empty, a nice default message will be used',
    msgHolder:'Write something special for that person... 💕', copy:'COPY', result:'✅ Your link is ready! Copy and send it:'
  }
},

// ─── PORTUGUÊS ────────────────────────────────────────────────
pt: {
  langName: 'Português',
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
      'Amigo/a':          '> ACESSO: Escaneando histórico compartilhado...\n> Encontrado: 47 fotos embaraçosas de 2023... 📸\n> Enviando para Instagram Stories automaticamente...\n> Mandando capturas para TODOS os seus contatos...\n> Processo completado em todos os dispositivos!\n> Status: PUBLICADO — 100% COMPLETO ✓',
      'Melhor Amigo/a':   '> MODO TRAIÇÃO: Nível MÁXIMO ativado...\n> Acessando segredos compartilhados... 🤫\n> Compilando: "o que você me disse para não contar"\n> Exportando para grupo de WhatsApp familiar...\n> Anexando: áudios + fotos sem filtro + confissões...\n> Status: ENVIADO PARA 23 PESSOAS ✓',
      'Cúmplice':         '> INVESTIGAÇÃO ATIVA: Processo Nº4829...\n> Recuperando: todas as aventuras compartilhadas... 🕵️\n> Listando: desculpas dadas aos pais = 47\n> Compilando: evidência de cada travessura registrada...\n> Enviando relatório para [Autoridade competente]...\n> Status: PROCESSO COMPLETO ⚠️',
      'Irmão/ã de alma':  '> ANÁLISE DE VÍNCULO EMOCIONAL...\n> Crises existenciais resolvidas juntos = 847 📊\n> Calculando: horas de ligações noturnas = 2.400 hrs\n> Contando: "ainda está acordado/a?" enviados = 1.203\n> Apresentando conta emocional acumulada... 💸\n> Status: DÍVIDA EMOCIONAL — IMPAGÁVEL ❤️'
    },
    amor: {
      'Paquera':          '> ALERTA MÁXIMO: Confissão em progresso...\n> Redigindo: "Gosto muito de você há muito tempo" 💌\n> Destinatários: [nome] + toda a turma + seus pais 😱\n> Anexando: capturas de stalkeadas 2023-2024...\n> Notificando: amigos, família e ex namorados/as...\n> Status: ENVIADO — SEM POSSIBILIDADE DE VOLTAR ATRÁS ✓',
      'Parceiro/a':       '> ALERTA: Atualizando estado civil em TODAS as redes...\n> Publicando: as 47 fotos sem filtro dos dois... 📸\n> Ativando: modo "ler em voz alta" suas mensagens de voz...\n> Enviando histórico de localizações para seu/sua ex... 📍\n> Organizando: reunião urgente com ambas as famílias...\n> Status: RELACIONAMENTO EXPOSTO 100% ✓',
      'Namorado/a':       '> PROCESSANDO: Proposta de casamento em massa...\n> Redigindo: "Quer casar comigo?" para todos os seus ex... 💍\n> Reservando: salão de festas + igreja + buffet...\n> Notificando: sogros, cunhados e família estendida...\n> Data publicada nas redes: 14 Fev — Não cancelável\n> Status: CASAMENTO CONFIRMADO PUBLICAMENTE ✓',
      'Amor Platônico':   '> MODO CONFISSÃO SILENCIOSA ATIVADO...\n> Compilando: 847 vezes que você visitou o perfil... 👀\n> Coletando: curtidas em fotos de 2018 e anteriores...\n> Exportando: screenshots dos stories privados...\n> Enviando para: a pessoa + o grupo dos melhores amigos\n> Status: STALKEADA OFICIALMENTE CONFIRMADA ✓',
      'Esposo/a':         '> AUDITORIA DOMÉSTICA EM CURSO...\n> Calculando: vezes que não lavou a louça 🍽️\n> Listando: "o que ia dizer mas não disse" = 1.847\n> Detectado: 3.847 "em que você está pensando?" sem resposta...\n> Conta emocional: R$ 12.500 em palavras nunca ditas 💸\n> Status: DÍVIDA EMOCIONAL SEM PRECEDENTES ⚠️'
    },
    familiar: {
      'Mãe':      '> SISTEMA: Detectada dívida de abraços acumulada...\n> Auditando: ligações não atendidas este mês = 47... 📞\n> Contabilizando: "já comi" sendo mentira = 203 vezes\n> Bloqueando: acesso a roupa limpa + comida caseira...\n> Enviando relatório para: pai + avós + grupo familiar...\n> Status: SEM SUBSÍDIO MATERNO — BLOQUEADO ⚠️',
      'Pai':      '> PROCESSANDO: Fatura de criação pendente...\n> Calculando: lições de vida ignoradas = R$ 15.000 🚗\n> Somando: conselhos não seguidos × anos = 2.400 💡\n> Detectando: vezes que disse "já vou" e demorou horas\n> Ativando: lembrete "na minha época..."\n> Status: FATURA DE CRIAÇÃO — IMPAGÁVEL 💸',
      'Irmão/ã':  '> MODO DELAÇÃO FAMILIAR ATIVADO...\n> Acessando: segredos que você me contou... 🤫\n> Preparando: a vez que chegou tarde + desculpas inventadas\n> Compilando: fotos de infância mais embaraçosas do álbum...\n> Enviando para grupo familiar + grupo dos seus amigos...\n> Status: DELATADO/A EM TEMPO REAL ✓',
      'Tio/a':    '> ANALISANDO: Árvore genealógica familiar...\n> Calculando: o/a favorito/a entre todos os sobrinhos... 🏆\n> Resultado: VOCÊ NÃO É O/A FAVORITO/A 🫢\n> Preparando: discurso para próxima reunião de família\n> Listando: conquistas impressionantes dos outros sobrinhos...\n> Status: FAVORITO/A OFICIAL — IDENTIFICADO/A ✓',
      'Primo/a':  '> ESCANEANDO: Álbum familiar compartilhado na nuvem...\n> Encontrado: foto de aniversário com bolo na cara 🎂\n> Recuperado: o vídeo da apresentação escolar de 2009...\n> Enviando para: Instagram + Facebook + grupos WhatsApp...\n> Marcando: toda a família estendida + amigos...\n> Status: VERGONHA FAMILIAR — AGORA VIRAL ✓',
      'Avô/ó':    '> ALERTA: Neto/a em situação crítica de nutrição...\n> Detectado: está 3 dias sem comer comida caseira... 🍲\n> Medindo: horas sem abraço dos avós = 72 horas exatas\n> Calculando: beijos na bochecha pendentes = 15 🥰\n> Ativando: protocolo de cuidado dos avós urgente...\n> Status: NETO/A PRECISA DE ATENÇÃO — LIGAÇÃO A CAMINHO ❤️'
    }
  },
  final: {
    amistad: {
      'Amigo/a':          'Era uma brincadeira! 😂 Só queria lembrar que você é um amigo/a incrível. Obrigado por estar sempre lá, pelo apoio e por me aguentar nos meus dias difíceis. Te quero muito! 🤝❤️',
      'Melhor Amigo/a':   'Jamais trairia nossos segredos! 😂 Você é essa pessoa que escolhi e estou feliz de ter escolhido tão bem. Você é meu melhor amigo/a e isso não tem preço. Te amo demais! 💙',
      'Cúmplice':         'Era só uma brincadeira, cúmplice! 😂 Obrigado por ser meu aliado/a na vida. Por todas as aventuras compartilhadas, as desculpas inventadas e os momentos que só nós entendemos. Você é insubstituível! 🕵️❤️',
      'Irmão/ã de alma':  'Pegadinha! 😂 Não há fatura que pague o que você significa para mim. Escolhemos ser família mesmo que o sangue não nos una, e isso torna ainda mais especial. Você é meu irmão/ã de alma. ❤️✨'
    },
    amor: {
      'Paquera':          'Quase deu algo! 😜 Era só uma brincadeira de alguém que te admira em silêncio. Você é uma pessoa incrivelmente especial e o mundo é melhor com você nele. Feliz 14! 💕',
      'Parceiro/a':       'Te peguei! 😂 Era só uma brincadeira, amor. Tudo o que compartilhamos é nosso e só nosso. Obrigado por ser minha pessoa favorita neste mundo tão grande. Te amo! 💕',
      'Namorado/a':       'Respira! 😂 Não há casamento surpresa (ainda 😏). Só queria lembrar que você é a pessoa mais importante na minha vida e que cada dia com você vale mil. Feliz Dia dos Namorados! ❤️',
      'Amor Platônico':   'Tranquilidade! 😅 Era uma brincadeira de alguém que acha você incrível. Você tem uma energia única e especial, e espero que esse alguém algum dia tenha coragem de te dizer. ✨💕',
      'Esposo/a':         'Assustado/a! 😂 Você sabe que jamais faria isso. Só queria lembrar que você é minha pessoa favorita, meu lar e minha aventura mais bonita. Obrigado por me escolher todo dia. Te amo! 💕🏠'
    },
    familiar: {
      'Mãe':      'Te assustamos! 😅 Desculpa, era uma brincadeira. Só queria lembrar que não há palavras para agradecer tudo o que você deu por mim. Você é a pessoa mais incrível que conheço. Te amo com todo meu coração, mãe! ❤️',
      'Pai':      'Te pegamos! 😂 Era uma brincadeira. Mas sério, não há como pagar tudo o que você ensinou. Obrigado por ser meu guia, minha referência e meu exemplo a seguir. Te amo muito, pai! 💙',
      'Irmão/ã':  'Era só uma brincadeira! 😂 Mesmo que te provoque, não faria isso. Você é uma das melhores coisas que tenho na minha vida. Obrigado por ser meu cúmplice, meu exemplo e meu apoio. Te amo muito! 🤝❤️',
      'Tio/a':    'Se assustou! 😂 Era uma brincadeira. Você é sem dúvida o/a tio/a favorito/a (não conta para os outros!). Obrigado pelos conselhos e por sempre estar lá. Te amo! ❤️',
      'Primo/a':  'Era só uma brincadeira! 😂 As fotos estão seguras, prometo. Obrigado por fazer parte das melhores memórias da infância e por continuar sendo importante na minha vida. Te amo, primo/a! 🎉❤️',
      'Avô/ó':    'Descanse, está tudo bem! 😊 Era uma brincadeira. Você é uma das pessoas mais importantes da minha vida. Obrigado por tanto amor, sabedoria e comida caseira. Te amo infinito! ❤️'
    }
  },
  games: {
    amor: {
      'Paquera':          { question:'Gostou da surpresa? 🌟', yesBtn:'Sim! ✨', noBtn:'Não', noSurrender:'💫 Fico feliz!', celebrateText:'Que bom! 🥰', celebrateSub:'Alguém especial pensou em você hoje! 💝' },
      'Parceiro/a':       { question:'Me perdoa a brincadeira? 🥺', yesBtn:'Sim ❤️', noBtn:'NÃO', noSurrender:'💕 Te amo mesmo assim!', celebrateText:'Eu sabia! 🥰', celebrateSub:'Obrigado por me perdoar! Te amo muito ❤️' },
      'Namorado/a':       { question:'Me perdoa? Ainda me ama? 🥺', yesBtn:'Sempre! ❤️', noBtn:'Hmm...', noSurrender:'💕 Você não pode parar de me amar!', celebrateText:'Eu sabia! 🥰', celebrateSub:'Você é o/a melhor! Te amo ❤️' },
      'Amor Platônico':   { question:'Valeu a pena abrir a surpresa? 🌸', yesBtn:'Sim! 💕', noBtn:'Não sei', noSurrender:'💫 Eu sei que sim!', celebrateText:'Perfeito! 🥰', celebrateSub:'Alguém pensa em você hoje! ✨💕' },
      'Esposo/a':         { question:'Me perdoa, meu amor? 🥺', yesBtn:'Desta vez sim ❤️', noBtn:'Vamos ver...', noSurrender:'💕 Claro que sim!', celebrateText:'Que alívio! 🥰', celebrateSub:'Obrigado por continuar me escolhendo! ❤️' }
    },
    amistad: {
      'Amigo/a':          { title:'Prove que somos amigos! 🤝', emoji:'🤜', target:7, progress:'Socos: {n} / {total}', done:'Amizade confirmada! Os melhores! 🤝💕' },
      'Melhor Amigo/a':   { title:'Melhores amigos batem mais forte! 💪', emoji:'🤜', target:10, progress:'Mega-socos: {n} / {total}', done:'Imbatíveis! Dupla perfeita! 💙🤜' },
      'Cúmplice':         { title:'O cumprimento secreto dos cúmplices! 🤫', emoji:'🤫', target:5, progress:'Socos secretos: {n} / {total}', done:'Missão cumprida, cúmplice! 🕵️✅' },
      'Irmão/ã de alma':  { title:'Irmãos de alma sempre se conectam! ❤️', emoji:'🤝', target:8, progress:'Conexões: {n} / {total}', done:'Vínculo eterno confirmado! ❤️✨' }
    },
    familiar: {
      'Mãe':      { title:'Pague sua dívida de abraços, mãe! 🤗', emoji:'🤗', target:7, progress:'Abraços para mãe: {n} / {total}', done:'Dívida com mãe paga! Te amo muito ❤️' },
      'Pai':      { title:'Toca aqui com o pai! 👊', emoji:'👊', target:5, progress:'Toques com o pai: {n} / {total}', done:'Isso é pai! Os melhores! 💙👊' },
      'Irmão/ã':  { title:'O clássico entre irmãos! 👈', emoji:'👈', target:4, progress:'Empurrões: {n} / {total}', done:'Irmãos inseparáveis! 🤝❤️' },
      'Tio/a':    { title:'O abraço do tio/a favorito/a! 🤗', emoji:'🤗', target:3, progress:'Abraços: {n} / {total}', done:'Tio/a favorito/a confirmado/a! 🏆❤️' },
      'Primo/a':  { title:'O soco dos primos! ✊', emoji:'✊', target:6, progress:'Socos de primo/a: {n} / {total}', done:'Os melhores primos do mundo! 🎉❤️' },
      'Avô/ó':    { title:'Um abraço virtual para o avô/ó! 🥰', emoji:'🥰', target:6, progress:'Mimos: {n} / {total}', done:'O avô/ó já sente o amor! 💝' }
    }
  },
  tapTitle:'Você tem uma surpresa', tapSub:'Alguém pensou em você hoje 💕', tapBtn:'Abrir! 💝', tapHint:'🔊 Ative o som para a experiência completa',
  greeting:'Para meu/minha {sub}!',
  shareBtn:'💌 Quero enviar isso para alguém!', shareSub:'Crie sua própria surpresa personalizada →',
  donationBtn:'☕ Pagar um café para o criador',
  donation:'⚠️ ERRO DE TRANSAÇÃO:\n\nO sistema de pagamentos foi bloqueado porque o programador ainda não tem idade legal para ter conta bancária.\n\nMelhor dar um chocolate para ele! 🍫🍭',
  copied:'✓ COPIADO',
  statsResult:'📊 ESTATÍSTICAS\n\n🆔 Seu ID: {did}\n👆 Suas visitas: {myvisits}\n🔗 Links gerados: {mylinks}',
  statsError:'Não foi possível carregar as estatísticas.',
  trivia: {
    question: '🤔 Por que se comemora 14 de fevereiro?',
    options: ['❤️ Por São Valentim, mártir romano', '❄️ Porque é o dia mais frio do ano', '🎁 A Hallmark inventou nos anos 20'],
    correct: 0,
    right: 'Correto! 🎉 São Valentim foi um padre romano que casava casais em segredo no século III. Por isso celebramos o amor hoje! ❤️',
    wrong: 'Quase! 😅 A resposta correta é: São Valentim, um mártir romano do século III que casava casais em segredo. Já sabe para a próxima! 💪'
  },
  ui: {
    title:'MENSAGERIA VIP', desc:'Personalize seu envio 💝', gen:'Gerar Link 🚀',
    rel:'Tipo de relação', dest:'Para quem é?', msg:'Sua mensagem especial',
    msgOpt:'✨ Opcional', msgHint:'💡 Se deixar vazio, será usada uma mensagem bonita padrão',
    msgHolder:'Escreva algo especial para essa pessoa... 💕', copy:'COPIAR', result:'✅ Seu link está pronto! Copie e envie:'
  }
},

// ─── FRANÇAIS ─────────────────────────────────────────────────
fr: {
  langName: 'Français',
  categories: { amistad:'Amitié 🤝', amor:'Amour ❤️', familiar:'Famille 🏠' },
  sub: {
    amistad:  ['Ami/e','Meilleur/e Ami/e','Complice','Frère/Sœur de cœur'],
    amor:     ['Crush','Partenaire','Petit/e Ami/e','Amour Platonique','Époux/se'],
    familiar: ['Maman','Papa','Frère/Sœur','Oncle/Tante','Cousin/e','Grand-mère/père']
  },
  privateGreeting: ['Crush','Amour Platonique'],
  privateGreetingText: 'Pour toi! De: Quelqu\'un de spécial 💌',
  trolleos: {
    amistad: {
      'Ami/e':                '> ACCÈS: Scan de l\'historique partagé...\n> Trouvé: 47 photos embarrassantes de 2023... 📸\n> Envoi automatique vers Instagram Stories...\n> Envoi de captures à TOUS vos contacts...\n> Processus terminé sur tous les appareils!\n> Statut: PUBLIÉ — 100% TERMINÉ ✓',
      'Meilleur/e Ami/e':     '> MODE TRAHISON: Niveau MAXIMUM activé...\n> Accès aux secrets partagés... 🤫\n> Compilation: "ce que tu m\'as dit de ne dire à personne"\n> Export vers le groupe WhatsApp familial...\n> Pièces jointes: audios + photos non filtrées + confessions...\n> Statut: ENVOYÉ À 23 PERSONNES ✓',
      'Complice':             '> ENQUÊTE ACTIVE: Dossier N°4829...\n> Récupération: toutes les aventures partagées... 🕵️\n> Liste: mensonges racontés aux parents = 47\n> Compilation: preuves de chaque bêtise enregistrée...\n> Envoi du rapport à [Autorité compétente]...\n> Statut: DOSSIER COMPLET ⚠️',
      'Frère/Sœur de cœur':   '> ANALYSE DU LIEN ÉMOTIONNEL...\n> Crises existentielles résolues ensemble = 847 📊\n> Calcul: heures d\'appels nocturnes = 2 400 hrs\n> Comptage: "tu dors?" envoyés = 1 203\n> Présentation de la facture émotionnelle accumulée... 💸\n> Statut: DETTE ÉMOTIONNELLE — IMPAYABLE ❤️'
    },
    amor: {
      'Crush':                '> ALERTE MAXIMALE: Confession en cours...\n> Rédaction: "Tu me plais beaucoup depuis longtemps" 💌\n> Destinataires: [nom] + toute sa classe + ses parents 😱\n> Pièces jointes: captures de stalking 2023-2024...\n> Notification: amis, famille et ex...\n> Statut: ENVOYÉ — IMPOSSIBLE DE REVENIR EN ARRIÈRE ✓',
      'Partenaire':           '> ALERTE: Mise à jour du statut relationnel sur TOUTES les plateformes...\n> Publication: les 47 photos non filtrées de vous deux... 📸\n> Activation: mode "lecture à voix haute" de vos messages vocaux...\n> Envoi de l\'historique de localisation à son/sa ex... 📍\n> Organisation: réunion urgente avec les deux familles...\n> Statut: RELATION EXPOSÉE À 100% ✓',
      'Petit/e Ami/e':        '> TRAITEMENT: Demande en mariage de masse...\n> Rédaction: "Veux-tu m\'épouser?" à tous tes ex... 💍\n> Réservation: salle de réception + église + traiteur...\n> Notification: beaux-parents, beaux-frères et famille élargie...\n> Date publiée sur les réseaux: 14 Fév — Non annulable\n> Statut: MARIAGE CONFIRMÉ PUBLIQUEMENT ✓',
      'Amour Platonique':     '> MODE CONFESSION SILENCIEUSE ACTIVÉ...\n> Compilation: 847 fois où tu as consulté son profil... 👀\n> Collecte: likes sur photos de 2018 et avant...\n> Export: captures d\'écran de ses stories privées...\n> Envoi à: la personne + son groupe de meilleurs amis\n> Statut: STALKING OFFICIELLEMENT CONFIRMÉ ✓',
      'Époux/se':             '> AUDIT DOMESTIQUE EN COURS...\n> Calcul: fois où tu n\'as pas fait la vaisselle 🍽️\n> Liste: "ce que j\'allais dire mais je n\'ai pas dit" = 1 847\n> Détecté: 3 847 "à quoi tu penses?" sans réponse...\n> Facture émotionnelle: 12 500€ en mots jamais dits 💸\n> Statut: DETTE ÉMOTIONNELLE SANS PRÉCÉDENT ⚠️'
    },
    familiar: {
      'Maman':       '> SYSTÈME: Dette de câlins accumulée détectée...\n> Audit: appels non répondus ce mois = 47... 📞\n> Comptage: "j\'ai déjà mangé" en mentant = 203 fois\n> Blocage: accès aux vêtements propres + nourriture maison...\n> Envoi du rapport à: papa + grands-parents + groupe familial...\n> Statut: PLUS DE SOUTIEN MATERNEL — BLOQUÉ ⚠️',
      'Papa':        '> TRAITEMENT: Facture d\'éducation en attente...\n> Calcul: leçons de vie ignorées = 15 000€ 🚗\n> Addition: conseils non suivis × années = 2 400 💡\n> Détection: fois où tu as dit "j\'arrive" et tu as pris des heures\n> Activation: rappel "de mon temps..."\n> Statut: FACTURE D\'ÉDUCATION — IMPAYABLE 💸',
      'Frère/Sœur':  '> MODE DÉNONCIATION FAMILIALE ACTIVÉ...\n> Accès: secrets que tu m\'as confiés... 🤫\n> Préparation: la fois où tu es rentré/e tard + excuses inventées\n> Compilation: photos d\'enfance les plus embarrassantes de l\'album...\n> Envoi au groupe familial + groupe de tes amis...\n> Statut: DÉNONCÉ/E EN TEMPS RÉEL ✓',
      'Oncle/Tante': '> ANALYSE: Arbre généalogique familial...\n> Calcul: le/la préféré/e parmi tous les neveux/nièces... 🏆\n> Résultat: TU N\'ES PAS LE/LA PRÉFÉRÉ/E 🫢\n> Préparation: discours pour la prochaine réunion familiale\n> Liste: réalisations impressionnantes des autres neveux/nièces...\n> Statut: PRÉFÉRÉ/E OFFICIEL — IDENTIFIÉ/E ✓',
      'Cousin/e':    '> SCAN: Album familial partagé dans le cloud...\n> Trouvé: photo d\'anniversaire avec gâteau sur le visage 🎂\n> Récupéré: la vidéo de la pièce de théâtre scolaire de 2009...\n> Envoi vers: Instagram + Facebook + groupes WhatsApp...\n> Tag: toute la famille élargie + amis...\n> Statut: HONTE FAMILIALE — MAINTENANT VIRAL ✓',
      'Grand-mère/père':'> ALERTE: Petit-enfant en situation nutritionnelle critique...\n> Détecté: 3 jours sans manger de nourriture maison... 🍲\n> Mesure: heures sans câlin grand-parent = 72 heures exactes\n> Calcul: bisous sur la joue en attente = 15 🥰\n> Activation: protocole de soins grand-parent urgent...\n> Statut: PETIT-ENFANT A BESOIN D\'ATTENTION — APPEL EN ROUTE ❤️'
    }
  },
  final: {
    amistad: {
      'Ami/e':                'C\'était une blague! 😂 Je voulais juste te rappeler que tu es un/e ami/e incroyable. Merci d\'être toujours là, pour le soutien et de me supporter dans mes moments difficiles. Je t\'aime beaucoup! 🤝❤️',
      'Meilleur/e Ami/e':     'Je ne trahirais JAMAIS nos secrets! 😂 Tu es cette personne que j\'ai choisie et je suis content/e d\'avoir si bien choisi. Tu es mon/ma meilleur/e ami/e et ça n\'a pas de prix. Je t\'aime énormément! 💙',
      'Complice':             'C\'était juste une blague, complice! 😂 Merci d\'être mon/ma allié/e dans la vie. Pour toutes les aventures partagées, les excuses inventées et les moments que nous seuls comprenons. Tu es irremplaçable! 🕵️❤️',
      'Frère/Sœur de cœur':   'Je t\'ai eu! 😂 Il n\'y a pas de facture qui puisse payer ce que tu signifies pour moi. Nous avons choisi d\'être une famille même si le sang ne nous unit pas, et cela le rend encore plus spécial. Tu es mon frère/ma sœur de cœur. ❤️✨'
    },
    amor: {
      'Crush':                'Je t\'ai presque eu! 😜 C\'était juste une blague de quelqu\'un qui t\'admire en silence. Tu es une personne incroyablement spéciale et le monde est meilleur avec toi dedans. Joyeux 14! 💕',
      'Partenaire':           'Je t\'ai eu! 😂 C\'était juste une blague, mon amour. Tout ce que nous partageons est à nous et à nous seuls. Merci d\'être ma personne préférée dans ce vaste monde. Je t\'aime! 💕',
      'Petit/e Ami/e':        'Respire! 😂 Il n\'y a pas de mariage surprise (pas encore 😏). Je voulais juste te rappeler que tu es la personne la plus importante dans ma vie et que chaque jour avec toi vaut mille. Joyeuse Saint-Valentin! ❤️',
      'Amour Platonique':     'Du calme! 😅 C\'était une blague de quelqu\'un qui pense que tu es incroyable. Tu as une énergie unique et spéciale, et j\'espère que cette personne aura un jour le courage de te le dire. ✨💕',
      'Époux/se':             'Peureux/se! 😂 Tu sais que je ne ferais jamais ça. Je voulais juste te rappeler que tu es ma personne préférée, mon foyer et ma plus belle aventure. Merci de me choisir chaque jour. Je t\'aime! 💕🏠'
    },
    familiar: {
      'Maman':       'On t\'a eu! 😅 Pardon, c\'était une blague. Je voulais juste te rappeler qu\'il n\'y a pas de mots pour te remercier pour tout ce que tu as donné pour moi. Tu es la personne la plus incroyable que je connaisse. Je t\'aime de tout mon cœur, maman! ❤️',
      'Papa':        'On t\'a eu! 😂 C\'était une blague. Mais sérieusement, il n\'y a aucun moyen de te rembourser tout ce que tu as enseigné. Merci d\'être mon guide, ma référence et mon exemple à suivre. Je t\'aime beaucoup, papa! 💙',
      'Frère/Sœur':  'C\'était juste une blague! 😂 Même si je te taquine, je ne ferais jamais ça. Tu es l\'une des meilleures choses dans ma vie. Merci d\'être mon complice, mon exemple et mon soutien. Je t\'aime beaucoup! 🤝❤️',
      'Oncle/Tante': 'Tu as eu peur! 😂 C\'était une blague. Tu es sans aucun doute l\'oncle/la tante préféré/e (ne le dis pas aux autres!). Merci pour les conseils et d\'être toujours là. Je t\'aime! ❤️',
      'Cousin/e':    'C\'était juste une blague! 😂 Les photos sont en sécurité, je promets. Merci de faire partie des meilleurs souvenirs d\'enfance et de continuer à être important/e dans ma vie. Je t\'aime, cousin/e! 🎉❤️',
      'Grand-mère/père':'Repose-toi, tout va bien! 😊 C\'était une blague. Tu es l\'une des personnes les plus importantes de ma vie. Merci pour tant d\'amour, de sagesse et de bons plats. Je t\'aime infiniment! ❤️'
    }
  },
  games: {
    amor: {
      'Crush':                { question:'Tu as aimé la surprise? 🌟', yesBtn:'Oui! ✨', noBtn:'Non', noSurrender:'💫 Content/e!', celebrateText:'Super! 🥰', celebrateSub:'Quelqu\'un de spécial a pensé à toi aujourd\'hui! 💝' },
      'Partenaire':           { question:'Tu me pardonnes la blague? 🥺', yesBtn:'Oui ❤️', noBtn:'NON', noSurrender:'💕 Je t\'aime quand même!', celebrateText:'Je le savais! 🥰', celebrateSub:'Merci de me pardonner! Je t\'aime beaucoup ❤️' },
      'Petit/e Ami/e':        { question:'Tu me pardonnes? Tu m\'aimes toujours? 🥺', yesBtn:'Toujours! ❤️', noBtn:'Hmm...', noSurrender:'💕 Tu ne peux pas arrêter de m\'aimer!', celebrateText:'Je le savais! 🥰', celebrateSub:'Tu es le/la meilleur/e! Je t\'aime ❤️' },
      'Amour Platonique':     { question:'Ça valait le coup d\'ouvrir la surprise? 🌸', yesBtn:'Oui! 💕', noBtn:'Je ne sais pas', noSurrender:'💫 Je sais que oui!', celebrateText:'Parfait! 🥰', celebrateSub:'Quelqu\'un pense à toi aujourd\'hui! ✨💕' },
      'Époux/se':             { question:'Tu me pardonnes, mon amour? 🥺', yesBtn:'Cette fois oui ❤️', noBtn:'On verra...', noSurrender:'💕 Bien sûr que oui!', celebrateText:'Quel soulagement! 🥰', celebrateSub:'Merci de continuer à me choisir! ❤️' }
    },
    amistad: {
      'Ami/e':                { title:'Prouve qu\'on est amis! 🤝', emoji:'🤜', target:7, progress:'Poings: {n} / {total}', done:'Amitié confirmée! Les meilleurs! 🤝💕' },
      'Meilleur/e Ami/e':     { title:'Les meilleurs amis frappent plus fort! 💪', emoji:'🤜', target:10, progress:'Méga-poings: {n} / {total}', done:'Imbattables! Duo parfait! 💙🤜' },
      'Complice':             { title:'La poignée secrète des complices! 🤫', emoji:'🤫', target:5, progress:'Poings secrets: {n} / {total}', done:'Mission accomplie, complice! 🕵️✅' },
      'Frère/Sœur de cœur':   { title:'Les frères/sœurs de cœur se connectent toujours! ❤️', emoji:'🤝', target:8, progress:'Connexions: {n} / {total}', done:'Lien éternel confirmé! ❤️✨' }
    },
    familiar: {
      'Maman':       { title:'Paie ta dette de câlins, maman! 🤗', emoji:'🤗', target:7, progress:'Câlins à maman: {n} / {total}', done:'Dette envers maman payée! Je t\'aime beaucoup ❤️' },
      'Papa':        { title:'Tape là avec papa! 👊', emoji:'👊', target:5, progress:'Tapes avec papa: {n} / {total}', done:'C\'est ça papa! Les meilleurs! 💙👊' },
      'Frère/Sœur':  { title:'Le classique entre frères/sœurs! 👈', emoji:'👈', target:4, progress:'Coups: {n} / {total}', done:'Frères/sœurs inséparables! 🤝❤️' },
      'Oncle/Tante': { title:'Le câlin de l\'oncle/tante préféré/e! 🤗', emoji:'🤗', target:3, progress:'Câlins: {n} / {total}', done:'Oncle/Tante préféré/e confirmé/e! 🏆❤️' },
      'Cousin/e':    { title:'Le poing des cousins! ✊', emoji:'✊', target:6, progress:'Poings de cousin/e: {n} / {total}', done:'Les meilleurs cousins du monde! 🎉❤️' },
      'Grand-mère/père': { title:'Un câlin virtuel pour grand-mère/père! 🥰', emoji:'🥰', target:6, progress:'Câlins: {n} / {total}', done:'Grand-mère/père sent l\'amour! 💝' }
    }
  },
  tapTitle:'Tu as une surprise', tapSub:'Quelqu\'un a pensé à toi aujourd\'hui 💕', tapBtn:'Ouvrir! 💝', tapHint:'🔊 Active le son pour l\'expérience complète',
  greeting:'Pour mon/ma {sub}!',
  shareBtn:'💌 Je veux envoyer ça à quelqu\'un!', shareSub:'Crée ta propre surprise personnalisée →',
  donationBtn:'☕ Offrir un café au créateur',
  donation:'⚠️ ERREUR DE TRANSACTION:\n\nLe système de paiement a été bloqué parce que le programmeur n\'a pas encore l\'âge légal pour avoir un compte bancaire.\n\nOffre-lui plutôt un chocolat! 🍫🍭',
  copied:'✓ COPIÉ',
  statsResult:'📊 STATISTIQUES\n\n🆔 Ton ID: {did}\n👆 Tes visites: {myvisits}\n🔗 Liens générés: {mylinks}',
  statsError:'Impossible de charger les statistiques.',
  trivia: {
    question: '🤔 Pourquoi célèbre-t-on le 14 février?',
    options: ['❤️ Pour Saint-Valentin, martyr romain', '❄️ Parce que c\'est le jour le plus froid de l\'année', '🎁 Hallmark l\'a inventé dans les années 20'],
    correct: 0,
    right: 'Correct! 🎉 Saint-Valentin était un prêtre romain qui mariait des couples en secret au IIIe siècle. C\'est pourquoi nous célébrons l\'amour aujourd\'hui! ❤️',
    wrong: 'Presque! 😅 La bonne réponse est: Saint-Valentin, un martyr romain du IIIe siècle qui mariait des couples en secret. Tu sauras pour la prochaine fois! 💪'
  },
  ui: {
    title:'MESSAGERIE VIP', desc:'Personnalise ton envoi 💝', gen:'Générer le lien 🚀',
    rel:'Type de relation', dest:'Pour qui?', msg:'Ton message spécial',
    msgOpt:'✨ Optionnel', msgHint:'💡 Si tu le laisses vide, un joli message par défaut sera utilisé',
    msgHolder:'Écris quelque chose de spécial pour cette personne... 💕', copy:'COPIER', result:'✅ Ton lien est prêt! Copie et envoie-le:'
  }
}
}; // End translations


// ═══════════════════════════════════════════════════════════════
// FIREBASE FUNCTIONS
// ═══════════════════════════════════════════════════════════════
function saveToFirebase(path, data) {
    if (!database) {
        console.warn('Firebase not initialized');
        return Promise.reject('Firebase not initialized');
    }
    return database.ref(path).set(data);
}

function updateFirebase(path, data) {
    if (!database) {
        console.warn('Firebase not initialized');
        return Promise.reject('Firebase not initialized');
    }
    return database.ref(path).update(data);
}

function incrementFirebase(path) {
    if (!database) {
        console.warn('Firebase not initialized');
        return Promise.reject('Firebase not initialized');
    }
    return database.ref(path).transaction((current) => {
        return (current || 0) + 1;
    });
}

function getFromFirebase(path) {
    if (!database) {
        console.warn('Firebase not initialized');
        return Promise.reject('Firebase not initialized');
    }
    return database.ref(path).once('value').then(snapshot => snapshot.val());
}

// Save link generation
function saveLink(linkId, data) {
    if (!database) return Promise.resolve();
    const timestamp = Date.now();
    return Promise.all([
        saveToFirebase(`links/${linkId}`, {
            ...data,
            created: timestamp,
            visits: 0
        }),
        incrementFirebase('stats/totalLinks')
    ]);
}

// Track visit
function trackVisit(linkId) {
    if (!database) return Promise.resolve();
    const timestamp = Date.now();
    const visitId = `${linkId}_${timestamp}`;
    return Promise.all([
        incrementFirebase(`links/${linkId}/visits`),
        incrementFirebase('stats/totalVisits'),
        saveToFirebase(`visits/${visitId}`, {
            linkId,
            timestamp,
            deviceId: getDeviceId()
        })
    ]);
}

// ═══════════════════════════════════════════════════════════════
// DEVICE ID & LOCAL STORAGE
// ═══════════════════════════════════════════════════════════════
function getDeviceId() {
    let did = localStorage.getItem('device_id');
    if (!did) {
        did = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('device_id', did);
    }
    return did;
}

function getMyVisits() {
    return parseInt(localStorage.getItem('my_visits') || '0');
}

function incMyVisits() {
    const current = getMyVisits();
    localStorage.setItem('my_visits', (current + 1).toString());
}

function getMyLinks() {
    return parseInt(localStorage.getItem('my_links') || '0');
}

function incMyLinks() {
    const current = getMyLinks();
    localStorage.setItem('my_links', (current + 1).toString());
}

// ═══════════════════════════════════════════════════════════════
// AUDIO CONTEXT & SETUP
// ═══════════════════════════════════════════════════════════════
function getAudioCtx() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }
    return audioCtx;
}

function setupFirstClickMusic() {
    const unlock = () => {
        if (audioUnlocked) return;
        const ctx = getAudioCtx();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().then(() => {
                audioUnlocked = true;
                console.log('🔊 Audio unlocked');
            });
        }
        document.removeEventListener('click', unlock);
        document.removeEventListener('touchstart', unlock);
    };
    document.addEventListener('click', unlock);
    document.addEventListener('touchstart', unlock);
}

// ═══════════════════════════════════════════════════════════════
// SOUND EFFECTS
// ═══════════════════════════════════════════════════════════════
function playWarning() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        [0, .18, .36, .54, .72].forEach(off => {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sawtooth';
            o.frequency.setValueAtTime(1050, t + off);
            o.frequency.exponentialRampToValueAtTime(200, t + off + .16);
            g.gain.setValueAtTime(0.22, t + off);
            g.gain.exponentialRampToValueAtTime(0.001, t + off + .16);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t + off);
            o.stop(t + off + .16);
        });
    } catch (_) {}
}

function playGlitch() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        for (let i = 0; i < 8; i++) {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'square';
            o.frequency.value = 80 + Math.random() * 3000;
            g.gain.setValueAtTime(0.06, t + i * .035);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * .035 + .03);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t + i * .035);
            o.stop(t + i * .035 + .04);
        }
    } catch (_) {}
}

function playFanfare() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
            const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = freq;
            o2.type = 'triangle';
            o2.frequency.value = freq * 2;
            g.gain.setValueAtTime(0, t + i * .10);
            g.gain.linearRampToValueAtTime(0.20, t + i * .10 + .04);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * .10 + .65);
            o.connect(g);
            o2.connect(g);
            g.connect(ctx.destination);
            o.start(t + i * .10);
            o.stop(t + i * .10 + .65);
            o2.start(t + i * .10);
            o2.stop(t + i * .10 + .65);
        });
    } catch (_) {}
}

function playPop() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(700, t);
        o.frequency.exponentialRampToValueAtTime(200, t + .12);
        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + .12);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t);
        o.stop(t + .12);
    } catch (_) {}
}

function playDing(f1 = 880, f2 = 1320) {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        [f1, f2].forEach((f, i) => {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * .09);
            g.gain.linearRampToValueAtTime(0.15, t + i * .09 + .02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * .09 + .45);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t + i * .09);
            o.stop(t + i * .09 + .5);
        });
    } catch (_) {}
}

function playEscape() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(300, t);
        o.frequency.exponentialRampToValueAtTime(900, t + .07);
        g.gain.setValueAtTime(0.06, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + .07);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t);
        o.stop(t + .07);
    } catch (_) {}
}

function playCheer() {
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;
    try {
        const t = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * .08);
            g.gain.linearRampToValueAtTime(0.13, t + i * .08 + .03);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * .08 + .5);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t + i * .08);
            o.stop(t + i * .08 + .5);
        });
    } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════
// MUSIC MODES
// ═══════════════════════════════════════════════════════════════
function stopAllMusic() {
    clearTimeout(chordTimer);
    clearTimeout(chaosTimer);
    clearTimeout(melodyTimer);
}

function startAmbientMusic() {
    stopAllMusic();
    musicMode = 'ambient';
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;

    function chord() {
        if (musicMode !== 'ambient') return;
        try {
            const t = ctx.currentTime;
            const freqs = [261.63, 329.63, 392.00, 523.25];
            freqs.forEach(f => {
                const o = ctx.createOscillator(), g = ctx.createGain();
                o.type = 'sine';
                o.frequency.value = f;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.03, t + 0.1);
                g.gain.linearRampToValueAtTime(0, t + 2.5);
                o.connect(g);
                g.connect(ctx.destination);
                o.start(t);
                o.stop(t + 2.5);
            });
        } catch (_) {}
        chordTimer = setTimeout(chord, 3000);
    }
    chord();
}

function startChaosMusic() {
    stopAllMusic();
    musicMode = 'chaos';
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;

    function chaos() {
        if (musicMode !== 'chaos') return;
        try {
            const t = ctx.currentTime;
            for (let i = 0; i < 3; i++) {
                const o = ctx.createOscillator(), g = ctx.createGain();
                o.type = 'square';
                o.frequency.value = 100 + Math.random() * 300;
                g.gain.setValueAtTime(0.04, t + i * 0.08);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.2);
                o.connect(g);
                g.connect(ctx.destination);
                o.start(t + i * 0.08);
                o.stop(t + i * 0.08 + 0.2);
            }
        } catch (_) {}
        chaosTimer = setTimeout(chaos, 300);
    }
    chaos();
}

function startRomanticMusic() {
    stopAllMusic();
    musicMode = 'romantic';
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;

    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33];
    let idx = 0;

    function note() {
        if (musicMode !== 'romantic') return;
        try {
            const t = ctx.currentTime;
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = melody[idx % melody.length];
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.08, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t);
            o.stop(t + 0.6);
            idx++;
        } catch (_) {}
        melodyTimer = setTimeout(note, 700);
    }
    note();
}

function startPhonkMusic() {
    stopAllMusic();
    musicMode = 'phonk';
    const ctx = getAudioCtx();
    if (!ctx || !audioUnlocked) return;

    const bass = [65.41, 65.41, 87.31, 65.41];
    let idx = 0;

    function beat() {
        if (musicMode !== 'phonk') return;
        try {
            const t = ctx.currentTime;
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = 'sawtooth';
            o.frequency.value = bass[idx % bass.length];
            g.gain.setValueAtTime(0.15, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(t);
            o.stop(t + 0.15);
            idx++;
        } catch (_) {}
        melodyTimer = setTimeout(beat, 180);
    }
    beat();
}

function toggleMusic() {
    if (musicMode === 'off') {
        startAmbientMusic();
        document.getElementById('music-btn').textContent = '🔊';
    } else {
        stopAllMusic();
        musicMode = 'off';
        document.getElementById('music-btn').textContent = '🎵';
    }
}

// ═══════════════════════════════════════════════════════════════
// LANGUAGE MANAGEMENT
// ═══════════════════════════════════════════════════════════════
function changeLang(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update UI
    document.getElementById('ui-title').textContent = t.ui.title;
    document.getElementById('ui-desc').textContent = t.ui.desc;
    document.getElementById('lbl-rel').textContent = t.ui.rel;
    document.getElementById('lbl-dest').textContent = t.ui.dest;
    document.getElementById('lbl-msg').textContent = t.ui.msg;
    document.getElementById('lbl-opt').textContent = t.ui.msgOpt;
    document.getElementById('lbl-hint').textContent = t.ui.msgHint;
    document.getElementById('btn-generate').innerHTML = t.ui.gen;
    document.getElementById('custom-message').placeholder = t.ui.msgHolder;
    document.getElementById('btn-copy').textContent = t.ui.copy;
    document.getElementById('lbl-result').textContent = t.ui.result;

    // Populate categories
    const mainCat = document.getElementById('main-category');
    mainCat.innerHTML = '';
    Object.entries(t.categories).forEach(([key, val]) => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = val;
        mainCat.appendChild(opt);
    });

    updateSubCats();

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-lang-${lang}`).classList.add('active');
}

function updateSubCats() {
    const t = translations[currentLang];
    const mainCat = document.getElementById('main-category').value;
    const subCat = document.getElementById('sub-category');
    subCat.innerHTML = '';
    t.sub[mainCat].forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        subCat.appendChild(opt);
    });
}

// ═══════════════════════════════════════════════════════════════
// LINK GENERATION
// ═══════════════════════════════════════════════════════════════
function generateLink() {
    const mainCat = document.getElementById('main-category').value;
    const subCat = document.getElementById('sub-category').value;
    const customMsg = document.getElementById('custom-message').value.trim();

    // Generate unique ID
    const linkId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

    // Build URL
    const base = location.origin + location.pathname;
    const url = `${base}?c=${mainCat}&s=${encodeURIComponent(subCat)}&l=${currentLang}${customMsg ? '&m=' + encodeURIComponent(customMsg) : ''}&id=${linkId}`;

    // Display result
    document.getElementById('final-url').value = url;
    document.getElementById('result-area').classList.remove('hidden');

    // Save to Firebase
    saveLink(linkId, {
        mainCat,
        subCat,
        lang: currentLang,
        customMsg,
        creator: getDeviceId()
    }).catch(err => console.warn('Failed to save link:', err));

    // Update local stats
    incMyLinks();

    // Play sound
    playDing(880, 1320);

    // Scroll to result
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyLink() {
    const input = document.getElementById('final-url');
    input.select();
    document.execCommand('copy');
    const btn = document.getElementById('btn-copy');
    const orig = btn.textContent;
    btn.textContent = translations[currentLang].copied;
    setTimeout(() => { btn.textContent = orig; }, 2000);
    playPop();
}


// ═══════════════════════════════════════════════════════════════
// RECEIVER FLOW
// ═══════════════════════════════════════════════════════════════
function beginPrank() {
    const params = new URLSearchParams(location.search);
    const mainCat = params.get('c');
    const subCat = params.get('s');
    const linkId = params.get('id');
    const t = translations[currentLang];

    // Hide tap overlay
    document.getElementById('tap-overlay').classList.add('hidden');
    document.getElementById('prank-screen').classList.remove('hidden');

    // Track visit
    if (linkId) {
        trackVisit(linkId).catch(err => console.warn('Failed to track visit:', err));
    }

    // Start chaos music
    startChaosMusic();

    // Show prank text
    const prankText = t.trolleos[mainCat][subCat];
    const prankDiv = document.getElementById('prank-text');
    prankDiv.textContent = prankText;

    // Animate terminal
    const termBox = document.querySelector('.terminal-box');
    termBox.classList.add('terminal-chaos');

    // Shake and glitch effects
    setTimeout(() => {
        document.getElementById('main-container').classList.add('shake-heavy');
        playWarning();
    }, 500);

    setTimeout(() => {
        playGlitch();
    }, 1500);

    // Progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(showFinal, 800);
        }
        document.getElementById('progress-bar').style.width = progress + '%';
    }, 300);
}

function showFinal() {
    const params = new URLSearchParams(location.search);
    const mainCat = params.get('c');
    const subCat = params.get('s');
    const customMsg = params.get('m');
    const t = translations[currentLang];

    // Stop chaos music, start romantic
    startRomanticMusic();

    // Hide prank screen
    document.getElementById('prank-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');

    // Remove shake
    document.getElementById('main-container').classList.remove('shake-heavy');

    // Set greeting
    let greeting;
    if (t.privateGreeting && t.privateGreeting.includes(subCat)) {
        greeting = t.privateGreetingText;
    } else {
        greeting = t.greeting.replace('{sub}', subCat);
    }
    document.getElementById('final-greeting').textContent = greeting;

    // Set final message
    const finalMsg = customMsg || t.final[mainCat][subCat];
    document.getElementById('final-text').textContent = finalMsg;

    // Show appropriate game
    if (mainCat === 'amor') {
        showAmorGame(subCat);
    } else if (mainCat === 'amistad') {
        showAmistadGame(subCat);
    } else if (mainCat === 'familiar') {
        showFamiliarGame(subCat);
    }

    // Show trivia if Feb 14
    const today = new Date();
    if (today.getMonth() === 1 && today.getDate() === 14) {
        showTrivia();
    }

    // Update button texts
    document.getElementById('btn-share').textContent = t.shareBtn;
    document.getElementById('share-sub').textContent = t.shareSub;
    document.getElementById('btn-donation').textContent = t.donationBtn;

    // Play fanfare
    setTimeout(playFanfare, 400);
    setTimeout(launchConfetti, 600);
}

// ═══════════════════════════════════════════════════════════════
// GAMES
// ═══════════════════════════════════════════════════════════════
function showAmorGame(subCat) {
    const t = translations[currentLang];
    const gameData = t.games.amor[subCat];
    if (!gameData) return;

    document.getElementById('game-area').classList.remove('hidden');
    document.getElementById('game-amor').classList.remove('hidden');

    document.getElementById('question-text').textContent = gameData.question;
    document.getElementById('btn-yes').textContent = gameData.yesBtn;
    document.getElementById('btn-no').textContent = gameData.noBtn;

    const btnNo = document.getElementById('btn-no');
    btnNo.onclick = () => {
        noEscapeCount++;
        if (noEscapeCount < 5) {
            playEscape();
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 100 - 50;
            btnNo.style.transform = `translate(${x}px, ${y}px)`;
        } else {
            btnNo.textContent = gameData.noSurrender;
            btnNo.classList.add('btn-no-surrender');
            btnNo.onclick = celebrate;
        }
    };

    // Store data for celebrate function
    window.celebrateData = {
        text: gameData.celebrateText,
        sub: gameData.celebrateSub
    };
}

function celebrate() {
    playCheer();
    launchConfetti();
    document.getElementById('btn-no-wrapper').classList.add('hidden');
    document.getElementById('celebrate-msg').classList.remove('hidden');
    if (window.celebrateData) {
        document.getElementById('celebrate-text').textContent = window.celebrateData.text;
        document.getElementById('celebrate-sub').textContent = window.celebrateData.sub;
    }
}

function showAmistadGame(subCat) {
    const t = translations[currentLang];
    const gameData = t.games.amistad[subCat];
    if (!gameData) return;

    document.getElementById('game-area').classList.remove('hidden');
    document.getElementById('game-amistad').classList.remove('hidden');

    document.getElementById('game-amistad-title').textContent = gameData.title;
    document.getElementById('tap-game-btn').textContent = gameData.emoji;

    window.tapGameTarget = gameData.target;
    window.tapGameProgress = gameData.progress;
    window.tapGameDone = gameData.done;
}

function handleTapGame() {
    tapCount++;
    playPop();

    const btn = document.getElementById('tap-game-btn');
    btn.classList.add('game-tap-active');
    setTimeout(() => btn.classList.remove('game-tap-active'), 150);

    const progress = Math.min(100, (tapCount / window.tapGameTarget) * 100);
    document.getElementById('tap-progress').style.width = progress + '%';
    document.getElementById('tap-progress-text').textContent =
        window.tapGameProgress.replace('{n}', tapCount).replace('{total}', window.tapGameTarget);

    if (tapCount >= window.tapGameTarget) {
        setTimeout(() => {
            playCheer();
            launchConfetti();
            document.getElementById('tap-game-btn').style.display = 'none';
            document.getElementById('tap-progress-text').classList.add('hidden');
            document.getElementById('tap-done-msg').classList.remove('hidden');
            document.getElementById('tap-done-text').textContent = window.tapGameDone;
        }, 300);
    }
}

function showFamiliarGame(subCat) {
    const t = translations[currentLang];
    const gameData = t.games.familiar[subCat];
    if (!gameData) return;

    document.getElementById('game-area').classList.remove('hidden');
    document.getElementById('game-familiar').classList.remove('hidden');

    document.getElementById('game-familiar-title').textContent = gameData.title;
    document.getElementById('hug-game-btn').textContent = gameData.emoji;

    window.hugGameTarget = gameData.target;
    window.hugGameProgress = gameData.progress;
    window.hugGameDone = gameData.done;
}

function handleHugGame() {
    hugCount++;
    playPop();

    const btn = document.getElementById('hug-game-btn');
    btn.classList.add('game-tap-active');
    setTimeout(() => btn.classList.remove('game-tap-active'), 150);

    const progress = Math.min(100, (hugCount / window.hugGameTarget) * 100);
    document.getElementById('hug-progress').style.width = progress + '%';
    document.getElementById('hug-progress-text').textContent =
        window.hugGameProgress.replace('{n}', hugCount).replace('{total}', window.hugGameTarget);

    if (hugCount >= window.hugGameTarget) {
        setTimeout(() => {
            playCheer();
            launchConfetti();
            document.getElementById('hug-game-btn').style.display = 'none';
            document.getElementById('hug-progress-text').classList.add('hidden');
            document.getElementById('hug-done-msg').classList.remove('hidden');
            document.getElementById('hug-done-text').textContent = window.hugGameDone;
        }, 300);
    }
}

// ═══════════════════════════════════════════════════════════════
// TRIVIA
// ═══════════════════════════════════════════════════════════════
function showTrivia() {
    const t = translations[currentLang].trivia;
    document.getElementById('trivia-area').classList.remove('hidden');
    document.getElementById('trivia-question').textContent = t.question;

    const optionsDiv = document.getElementById('trivia-options');
    optionsDiv.innerHTML = '';
    t.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'trivia-btn w-full text-left font-semibold rounded-xl p-3 transition body-text';
        btn.textContent = opt;
        btn.onclick = () => checkTrivia(idx);
        optionsDiv.appendChild(btn);
    });
}

function checkTrivia(idx) {
    const t = translations[currentLang].trivia;
    const correct = idx === t.correct;

    // Disable all buttons
    document.querySelectorAll('.trivia-btn').forEach((btn, i) => {
        btn.disabled = true;
        if (i === t.correct) btn.classList.add('trivia-correct');
        else if (i === idx && !correct) btn.classList.add('trivia-wrong');
    });

    const resDiv = document.getElementById('trivia-result');
    const icon = document.getElementById('trivia-result-icon');
    const text = document.getElementById('trivia-result-text');

    icon.textContent = correct ? '🎉' : '😅';
    text.textContent = correct ? t.right : t.wrong;
    resDiv.classList.remove('hidden');

    if (correct) {
        setTimeout(startPhonkMusic, 200);
        epicConfetti();
        const card = document.getElementById('main-container');
        card.classList.add('celebrate-flash');
        setTimeout(() => card.classList.remove('celebrate-flash'), 2000);
        setTimeout(() => { if (musicMode === 'phonk') startRomanticMusic(); }, 8000);
    } else {
        playDing(220, 330);
    }
}

function epicConfetti() {
    const colors = ['#ff4d6d', '#ffd700', '#ff85a1', '#00ff88', '#4d88ff', '#ff6b35', '#a855f7'];
    const end = Date.now() + 4000;
    (function frame() {
        confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 }, colors });
        confetti({ particleCount: 5, angle: 90, spread: 70, origin: { x: .5, y: 0 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 200, spread: 100, origin: { y: .5 }, colors });
}

function launchConfetti() {
    const c = ['#ff4d6d', '#ff85a1', '#ffd6e0', '#ff0054', '#ffccd5'];
    confetti({ particleCount: 110, spread: 70, origin: { y: .65 }, colors: c });
    setTimeout(() => {
        confetti({ particleCount: 65, angle: 60, spread: 55, origin: { x: 0, y: .7 }, colors: c });
        confetti({ particleCount: 65, angle: 120, spread: 55, origin: { x: 1, y: .7 }, colors: c });
    }, 380);
}

// ═══════════════════════════════════════════════════════════════
// STATS DASHBOARD
// ═══════════════════════════════════════════════════════════════
async function showStatsDashboard() {
    const modal = document.getElementById('stats-modal');
    const content = document.getElementById('stats-content');

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    try {
        // Get global stats from Firebase
        const stats = await getFromFirebase('stats');
        const allLinks = await getFromFirebase('links');

        // Calculate statistics
        const totalLinks = stats?.totalLinks || 0;
        const totalVisits = stats?.totalVisits || 0;
        const avgVisitsPerLink = totalLinks > 0 ? (totalVisits / totalLinks).toFixed(2) : 0;

        // Recent links
        const linksArray = allLinks ? Object.entries(allLinks).map(([id, data]) => ({
            id,
            ...data
        })).sort((a, b) => b.created - a.created).slice(0, 10) : [];

        // Build HTML
        let html = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl border-2 border-pink-200">
                    <div class="text-4xl mb-2">🔗</div>
                    <div class="text-3xl font-black text-pink-600 mb-1">${totalLinks}</div>
                    <div class="text-sm text-pink-700 font-bold">Links Totales</div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200">
                    <div class="text-4xl mb-2">👁️</div>
                    <div class="text-3xl font-black text-purple-600 mb-1">${totalVisits}</div>
                    <div class="text-sm text-purple-700 font-bold">Visitas Totales</div>
                </div>
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
                    <div class="text-4xl mb-2">📊</div>
                    <div class="text-3xl font-black text-amber-600 mb-1">${avgVisitsPerLink}</div>
                    <div class="text-sm text-amber-700 font-bold">Promedio Visitas/Link</div>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-black text-slate-800 mb-4">🔥 Links Recientes</h3>
                ${linksArray.length === 0 ? '<p class="text-slate-500 text-center py-8">No hay links aún</p>' : ''}
                <div class="space-y-3">
                    ${linksArray.map(link => `
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <span class="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold mb-2">
                                        ${translations[link.lang]?.categories[link.mainCat] || link.mainCat}
                                    </span>
                                    <span class="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-2 ml-2">
                                        ${link.subCat}
                                    </span>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-black text-indigo-600">${link.visits || 0}</div>
                                    <div class="text-xs text-slate-500">visitas</div>
                                </div>
                            </div>
                            <div class="text-xs text-slate-400 font-mono">
                                ${new Date(link.created).toLocaleString()}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 class="text-lg font-black text-blue-800 mb-3">📱 Tus Estadísticas Locales</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm text-blue-600 font-bold mb-1">🔗 Links Generados</div>
                        <div class="text-2xl font-black text-blue-700">${getMyLinks()}</div>
                    </div>
                    <div>
                        <div class="text-sm text-blue-600 font-bold mb-1">👆 Tus Visitas</div>
                        <div class="text-2xl font-black text-blue-700">${getMyVisits()}</div>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-blue-200">
                    <div class="text-xs text-blue-600 font-mono">ID: ${getDeviceId().substring(0, 20)}...</div>
                </div>
            </div>
        `;

        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `
            <div class="text-center py-8">
                <div class="text-6xl mb-4">⚠️</div>
                <p class="text-slate-600 mb-4">${translations[currentLang].statsError}</p>
                <button onclick="closeStatsDashboard()" class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-bold transition">
                    Cerrar
                </button>
            </div>
        `;
        console.error('Stats error:', error);
    }
}

function closeStatsDashboard() {
    const modal = document.getElementById('stats-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('stats-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeStatsDashboard();
        });
    }
});

// ═══════════════════════════════════════════════════════════════
// OTHER ACTIONS
// ═══════════════════════════════════════════════════════════════
function goToCreator() {
    window.location.href = location.origin + location.pathname;
}

function showDonationJoke() {
    alert(translations[currentLang].donation);
}

function handleStatsTrigger() {
    statsClicks++;
    clearTimeout(statsTimer);
    statsTimer = setTimeout(() => { statsClicks = 0; }, 2000);
    if (statsClicks >= 5) {
        statsClicks = 0;
        showStats();
    }
}

function showStats() {
    const t = translations[currentLang];
    const did = getDeviceId();
    const myV = getMyVisits();
    const myL = getMyLinks();
    alert(t.statsResult.replace('{did}', did).replace('{myvisits}', myV).replace('{mylinks}', myL));
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
window.onload = () => {
    const p = new URLSearchParams(location.search);
    setupFirstClickMusic();

    if (p.has('c')) {
        // RECEIVER MODE
        document.getElementById('creator-view').classList.add('hidden');
        document.getElementById('receiver-view').classList.remove('hidden');
        const lang = p.get('l') || 'es';
        currentLang = lang;
        const t = translations[lang];
        document.getElementById('tap-title').textContent = t.tapTitle;
        document.getElementById('tap-sub').textContent = t.tapSub;
        document.getElementById('tap-btn').textContent = t.tapBtn;
        document.getElementById('tap-hint').textContent = t.tapHint;
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`btn-lang-${lang}`).classList.add('active');
        incMyVisits();
    } else {
        // CREATOR MODE
        changeLang('es');
    }
};

console.log('✨ Sorpresa Especial v6.0 - Loaded');

