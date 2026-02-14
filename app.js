/* ================================================================
   app.js — Sorpresa Especial 💝  v6.0
   ✅ 4 idiomas completos: ES, EN, FR, PT
   ✅ Firebase Realtime Database integrado
   ✅ Dashboard de estadísticas en tiempo real
   ✅ Todo lo anterior mantenido
   ================================================================ */

// ═══════════════════════════════════════════════════════════════
// FIREBASE CONFIG
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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ═══════════════════════════════════════════════════════════════
// VARIABLES GLOBALES
// ═══════════════════════════════════════════════════════════════
let currentLang='es', audioCtx, musicMode='off';
let statsClicks=0, statsTimer=null;
let tapCount=0, hugCount=0, noMoveCount=0, triviaAnswered=false;

// ═══════════════════════════════════════════════════════════════
// CONFIG - 4 IDIOMAS COMPLETOS
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
      'Hermano/a':{ title:'¡Pelea de almohadas virtual! 🥊', emoji:'🥊', target:6, progress:'Almohazos: {n} / {total}', done:'¡Victoria! ¡Los hermanos son forever! 🎉' },
      'Tío/a':    { title:'¡High five con tu tío/a favorito/a! 🙌', emoji:'🙌', target:5, progress:'High fives: {n} / {total}', done:'¡Eres el/la mejor! 🙌✨' },
      'Primo/a':  { title:'¡Juego de palmas con tu primo/a! 👏', emoji:'👏', target:8, progress:'Palmas: {n} / {total}', done:'¡Primos forever! 🎊👏' },
      'Abuela/o': { title:'¡Envía besos a la abuela/o! 😘', emoji:'😘', target:10, progress:'Besos enviados: {n} / {total}', done:'¡Abrazos virtuales recibidos! 🥰❤️' }
    }
  },

  trivia: {
    question: '🤔 ¿Por qué se celebra el 14 de febrero?',
    options: [
      '❤️ Por San Valentín, mártir romano',
      '❄️ Porque es el día más frío del año',
      '🎁 Lo inventó Hallmark en los años 20'
    ],
    right: '¡Correcto! 🎉 San Valentín fue un sacerdote romano que casaba parejas en secreto.',
    wrong: '¡No exactamente! 😅 Se celebra por San Valentín, un mártir romano del siglo III.'
  },

  // UI labels
  title: 'MENSAJERÍA VIP',
  desc: 'Personaliza tu envío 💕',
  lblRel: 'Tipo de relación',
  lblDest: '¿Para quién es?',
  lblMsg: 'Tu mensaje especial',
  lblOpt: '✨ Opcional',
  lblHint: '💡 Si lo dejas vacío se usará un mensaje bonito por defecto',
  btnGenerate: 'Generar Link 🚀',
  lblResult: '✅ ¡Tu link está listo!',
  btnCopy: 'COPIAR',
  tapTitle: 'Tienes una sorpresa',
  tapSub: 'Alguien pensó en ti hoy 💕',
  tapBtn: '¡Abrir! 💝',
  tapHint: '🔊 Activa el sonido para la experiencia completa',
  btnShare: '💌 ¡Quiero enviarle esto a alguien!',
  shareSub: 'Crea tu propia sorpresa personalizada →',
  btnDonation: '☕ Invitar un café al creador',
  statsFooter: 'Hecho con ❤️ amor',
  copied: '¡Copiado! ✅',
  donation: '😂 ¡Me encantaría un café! Pero en serio, lo que más me alegra es que te haya gustado. ¡Compártelo con quien quieras! ❤️',
  statsResult: '📊 ESTADÍSTICAS\n\n🆔 Tu ID: {did}\n📥 Tus visitas: {myvisits}\n📤 Tus links creados: {mylinks}\n\n💡 Esto se guarda solo en tu dispositivo.'
},

// ─── ENGLISH ──────────────────────────────────────────────────
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
      'Partner in Crime':  '> ACTIVE INVESTIGATION: File N°4829...\n> Recovering: all shared adventures... 🕵️\n> Listing: excuses given to parents = 47\n> Compiling: evidence of every mischief recorded...\n> Sending report to [Competent Authority]...\n> Status: FILE COMPLETE ⚠️',
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
      'Partner':        { question:'Do you forgive me for the joke? 🥺', yesBtn:'Yes ❤️',   noBtn:'NO',   noSurrender:'💕 I love you anyway!', celebrateText:'I knew it! 🥰', celebrateSub:'Thanks for forgiving me! I love you so much ❤️' },
      'Boyfriend/Girlfriend': { question:'Do you forgive me? Do you still love me? 🥺', yesBtn:'Always! ❤️', noBtn:'Hmm...', noSurrender:'💕 You can\'t stop loving me!', celebrateText:'I knew it! 🥰', celebrateSub:'You\'re the best! I love you ❤️' },
      'Secret Love':    { question:'Was it worth opening the surprise? 🌸', yesBtn:'Yes! 💕', noBtn:'Don\'t know', noSurrender:'💫 Bet it was!', celebrateText:'Perfect! 🥰', celebrateSub:'Someone thinks of you today! ✨💕' },
      'Spouse':         { question:'Do you forgive me, my love? 🥺', yesBtn:'This time yes ❤️', noBtn:'Let\'s see...', noSurrender:'💕 Of course!', celebrateText:'What a relief! 🥰', celebrateSub:'Thanks for still choosing me! ❤️' }
    },
    amistad: {
      'Friend':            { title:'Prove we\'re friends! 🤝', emoji:'🤜', target:7,  progress:'Fist bumps: {n} / {total}',         done:'Friendship confirmed! The best! 🤝💕' },
      'Best Friend':       { title:'Best friends bump harder! 💪', emoji:'🤜', target:10, progress:'Mega-bumps: {n} / {total}', done:'Unbeatable! The perfect duo! 💙🤜' },
      'Partner in Crime':  { title:'The secret handshake of accomplices! 🤫', emoji:'🤫', target:5,  progress:'Secret bumps: {n} / {total}', done:'Mission accomplished, partner! 🕵️✅' },
      'Soul Sibling':      { title:'Soul siblings always connect! ❤️', emoji:'🤝', target:8,  progress:'Connections: {n} / {total}',   done:'Eternal bond confirmed! ❤️✨' }
    },
    familiar: {
      'Mom':        { title:'Pay your hug debt, mom! 🤗', emoji:'🤗', target:7, progress:'Hugs to mom: {n} / {total}',    done:'Debt to mom paid! Love you so much ❤️' },
      'Dad':        { title:'High five with dad! 👊', emoji:'👊',  target:5, progress:'Bumps with dad: {n} / {total}', done:'That\'s dad! The best! 💙👊' },
      'Sibling':    { title:'Virtual pillow fight! 🥊', emoji:'🥊', target:6, progress:'Pillow hits: {n} / {total}', done:'Victory! Siblings are forever! 🎉' },
      'Uncle/Aunt': { title:'High five with your favorite uncle/aunt! 🙌', emoji:'🙌', target:5, progress:'High fives: {n} / {total}', done:'You\'re the best! 🙌✨' },
      'Cousin':     { title:'Clapping game with your cousin! 👏', emoji:'👏', target:8, progress:'Claps: {n} / {total}', done:'Cousins forever! 🎊👏' },
      'Grandparent':{ title:'Send kisses to grandma/grandpa! 😘', emoji:'😘', target:10, progress:'Kisses sent: {n} / {total}', done:'Virtual hugs received! 🥰❤️' }
    }
  },

  trivia: {
    question: '🤔 Why is February 14th celebrated?',
    options: [
      '❤️ For St. Valentine, Roman martyr',
      '❄️ Because it\'s the coldest day of the year',
      '🎁 Hallmark invented it in the 20s'
    ],
    right: 'Correct! 🎉 St. Valentine was a Roman priest who married couples in secret.',
    wrong: 'Not exactly! 😅 It\'s celebrated for St. Valentine, a 3rd century Roman martyr.'
  },

  title: 'VIP MESSAGING',
  desc: 'Customize your send 💕',
  lblRel: 'Relationship type',
  lblDest: 'Who is it for?',
  lblMsg: 'Your special message',
  lblOpt: '✨ Optional',
  lblHint: '💡 If you leave it empty, a nice default message will be used',
  btnGenerate: 'Generate Link 🚀',
  lblResult: '✅ Your link is ready!',
  btnCopy: 'COPY',
  tapTitle: 'You have a surprise',
  tapSub: 'Someone thought of you today 💕',
  tapBtn: 'Open it! 💝',
  tapHint: '🔊 Turn on sound for the complete experience',
  btnShare: '💌 I want to send this to someone!',
  shareSub: 'Create your own personalized surprise →',
  btnDonation: '☕ Buy the creator a coffee',
  statsFooter: 'Made with ❤️ love',
  copied: 'Copied! ✅',
  donation: '😂 I\'d love a coffee! But seriously, what makes me happiest is that you liked it. Share it with whoever you want! ❤️',
  statsResult: '📊 STATISTICS\n\n🆔 Your ID: {did}\n📥 Your visits: {myvisits}\n📤 Your created links: {mylinks}\n\n💡 This is saved only on your device.'
},

// ─── FRANÇAIS ──────────────────────────────────────────────────
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
      'Partenaire':     { question:'Tu me pardonnes la blague? 🥺', yesBtn:'Oui ❤️',   noBtn:'NON',   noSurrender:'💕 Je t\'aime quand même!', celebrateText:'Je le savais! 🥰', celebrateSub:'Merci de me pardonner! Je t\'aime beaucoup ❤️' },
      'Petit(e) Ami(e)':{ question:'Tu me pardonnes? Tu m\'aimes encore? 🥺', yesBtn:'Toujours! ❤️', noBtn:'Hmm...', noSurrender:'💕 Tu ne peux pas arrêter de m\'aimer!', celebrateText:'Je le savais! 🥰', celebrateSub:'Tu es le/la meilleur(e)! Je t\'aime ❤️' },
      'Amour Platonique':{ question:'Ça valait la peine d\'ouvrir la surprise? 🌸', yesBtn:'Oui! 💕', noBtn:'Je ne sais pas', noSurrender:'💫 Parie que oui!', celebrateText:'Parfait! 🥰', celebrateSub:'Quelqu\'un pense à toi aujourd\'hui! ✨💕' },
      'Époux/Épouse':   { question:'Tu me pardonnes, mon amour? 🥺', yesBtn:'Cette fois oui ❤️', noBtn:'On verra...', noSurrender:'💕 Bien sûr!', celebrateText:'Quel soulagement! 🥰', celebrateSub:'Merci de continuer à me choisir! ❤️' }
    },
    amistad: {
      'Ami(e)':            { title:'Prouve qu\'on est ami(e)s! 🤝', emoji:'🤜', target:7,  progress:'Check: {n} / {total}',         done:'Amitié confirmée! Les meilleurs! 🤝💕' },
      'Meilleur(e) Ami(e)':{ title:'Les meilleurs frappent plus fort! 💪', emoji:'🤜', target:10, progress:'Méga-check: {n} / {total}', done:'Imbattables! Le duo parfait! 💙🤜' },
      'Complice':          { title:'Le check secret des complices! 🤫', emoji:'🤫', target:5,  progress:'Check secrets: {n} / {total}', done:'Mission accomplie, complice! 🕵️✅' },
      'Frère/Sœur d\'âme': { title:'Les frères/sœurs d\'âme se connectent toujours! ❤️', emoji:'🤝', target:8,  progress:'Connexions: {n} / {total}',   done:'Lien éternel confirmé! ❤️✨' }
    },
    familiar: {
      'Maman':      { title:'Paye ta dette de câlins, maman! 🤗', emoji:'🤗', target:7, progress:'Câlins à maman: {n} / {total}',    done:'Dette à maman payée! Je t\'aime beaucoup ❤️' },
      'Papa':       { title:'Tope là avec papa! 👊', emoji:'👊',  target:5, progress:'Tope avec papa: {n} / {total}', done:'C\'est ça papa! Les meilleurs! 💙👊' },
      'Frère/Sœur': { title:'Bataille d\'oreillers virtuelle! 🥊', emoji:'🥊', target:6, progress:'Coups d\'oreiller: {n} / {total}', done:'Victoire! Les frères/sœurs c\'est pour toujours! 🎉' },
      'Oncle/Tante':{ title:'Tope là avec ton oncle/tante préféré(e)! 🙌', emoji:'🙌', target:5, progress:'Tope là: {n} / {total}', done:'Tu es le/la meilleur(e)! 🙌✨' },
      'Cousin(e)':  { title:'Jeu de mains avec ton cousin/ta cousine! 👏', emoji:'👏', target:8, progress:'Tapes: {n} / {total}', done:'Cousins pour toujours! 🎊👏' },
      'Grand-parent':{ title:'Envoie des bisous à grand-mère/père! 😘', emoji:'😘', target:10, progress:'Bisous envoyés: {n} / {total}', done:'Câlins virtuels reçus! 🥰❤️' }
    }
  },

  trivia: {
    question: '🤔 Pourquoi le 14 février est-il célébré?',
    options: [
      '❤️ Pour Saint-Valentin, martyr romain',
      '❄️ Parce que c\'est le jour le plus froid de l\'année',
      '🎁 Hallmark l\'a inventé dans les années 20'
    ],
    right: 'Correct! 🎉 Saint-Valentin était un prêtre romain qui mariait des couples en secret.',
    wrong: 'Pas exactement! 😅 Il est célébré pour Saint-Valentin, un martyr romain du IIIe siècle.'
  },

  title: 'MESSAGERIE VIP',
  desc: 'Personnalise ton envoi 💕',
  lblRel: 'Type de relation',
  lblDest: 'Pour qui est-ce?',
  lblMsg: 'Ton message spécial',
  lblOpt: '✨ Optionnel',
  lblHint: '💡 Si tu le laisses vide, un joli message par défaut sera utilisé',
  btnGenerate: 'Générer le lien 🚀',
  lblResult: '✅ Ton lien est prêt!',
  btnCopy: 'COPIER',
  tapTitle: 'Tu as une surprise',
  tapSub: 'Quelqu\'un a pensé à toi aujourd\'hui 💕',
  tapBtn: 'Ouvrir! 💝',
  tapHint: '🔊 Active le son pour l\'expérience complète',
  btnShare: '💌 Je veux envoyer ça à quelqu\'un!',
  shareSub: 'Crée ta propre surprise personnalisée →',
  btnDonation: '☕ Offrir un café au créateur',
  statsFooter: 'Fait avec ❤️ amour',
  copied: 'Copié! ✅',
  donation: '😂 J\'adorerais un café! Mais sérieusement, ce qui me rend le plus heureux c\'est que ça t\'a plu. Partage-le avec qui tu veux! ❤️',
  statsResult: '📊 STATISTIQUES\n\n🆔 Ton ID: {did}\n📥 Tes visites: {myvisits}\n📤 Tes liens créés: {mylinks}\n\n💡 Ceci est sauvegardé uniquement sur ton appareil.'
},

// ─── PORTUGUÊS ────────────────────────────────────────────────
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
      'Parceiro/a':     { question:'Me perdoa a brincadeira? 🥺', yesBtn:'Sim ❤️',   noBtn:'NÃO',   noSurrender:'💕 Te amo mesmo assim!', celebrateText:'Eu sabia! 🥰', celebrateSub:'Obrigado por me perdoar! Te amo muito ❤️' },
      'Namorado/a':     { question:'Me perdoa? Ainda me ama? 🥺', yesBtn:'Sempre! ❤️', noBtn:'Hmm...', noSurrender:'💕 Você não pode parar de me amar!', celebrateText:'Eu sabia! 🥰', celebrateSub:'Você é o/a melhor! Te amo ❤️' },
      'Amor Platônico': { question:'Valeu a pena abrir a surpresa? 🌸', yesBtn:'Sim! 💕', noBtn:'Não sei', noSurrender:'💫 Aposto que sim!', celebrateText:'Perfeito! 🥰', celebrateSub:'Alguém pensa em você hoje! ✨💕' },
      'Esposo/a':       { question:'Me perdoa, meu amor? 🥺', yesBtn:'Desta vez sim ❤️', noBtn:'Vamos ver...', noSurrender:'💕 Claro que sim!', celebrateText:'Que alívio! 🥰', celebrateSub:'Obrigado por continuar me escolhendo! ❤️' }
    },
    amistad: {
      'Amigo/a':            { title:'Prove que somos amigos/as! 🤝', emoji:'🤜', target:7,  progress:'Socos: {n} / {total}',         done:'Amizade confirmada! Os melhores! 🤝💕' },
      'Melhor Amigo/a':     { title:'Os melhores batem mais forte! 💪', emoji:'🤜', target:10, progress:'Mega-socos: {n} / {total}', done:'Imbatíveis! A dupla perfeita! 💙🤜' },
      'Cúmplice':           { title:'O aperto secreto dos cúmplices! 🤫', emoji:'🤫', target:5,  progress:'Apertos secretos: {n} / {total}', done:'Missão cumprida, cúmplice! 🕵️✅' },
      'Irmão/ã de alma':    { title:'Irmãos/ãs de alma sempre se conectam! ❤️', emoji:'🤝', target:8,  progress:'Conexões: {n} / {total}',   done:'Vínculo eterno confirmado! ❤️✨' }
    },
    familiar: {
      'Mãe':      { title:'Pague sua dívida de abraços, mãe! 🤗', emoji:'🤗', target:7, progress:'Abraços para mãe: {n} / {total}',    done:'Dívida com a mãe quitada! Te amo muito ❤️' },
      'Pai':      { title:'Toca aqui com o pai! 👊', emoji:'👊',  target:5, progress:'Toques com pai: {n} / {total}', done:'Isso é pai! Os melhores! 💙👊' },
      'Irmão/ã':  { title:'Guerra de travesseiros virtual! 🥊', emoji:'🥊', target:6, progress:'Travesseiradas: {n} / {total}', done:'Vitória! Irmãos são para sempre! 🎉' },
      'Tio/a':    { title:'Toca aqui com seu tio/a favorito/a! 🙌', emoji:'🙌', target:5, progress:'Toques: {n} / {total}', done:'Você é o/a melhor! 🙌✨' },
      'Primo/a':  { title:'Jogo de palmas com seu primo/a! 👏', emoji:'👏', target:8, progress:'Palmas: {n} / {total}', done:'Primos para sempre! 🎊👏' },
      'Avô/ó':    { title:'Envie beijos para o avô/avó! 😘', emoji:'😘', target:10, progress:'Beijos enviados: {n} / {total}', done:'Abraços virtuais recebidos! 🥰❤️' }
    }
  },

  trivia: {
    question: '🤔 Por que o dia 14 de fevereiro é celebrado?',
    options: [
      '❤️ Por São Valentim, mártir romano',
      '❄️ Porque é o dia mais frio do ano',
      '🎁 A Hallmark inventou nos anos 20'
    ],
    right: 'Correto! 🎉 São Valentim era um padre romano que casava casais em segredo.',
    wrong: 'Não exatamente! 😅 É celebrado por São Valentim, um mártir romano do século III.'
  },

  title: 'MENSAGERIA VIP',
  desc: 'Personalize seu envio 💕',
  lblRel: 'Tipo de relacionamento',
  lblDest: 'Para quem é?',
  lblMsg: 'Sua mensagem especial',
  lblOpt: '✨ Opcional',
  lblHint: '💡 Se deixar vazio, será usada uma mensagem bonita padrão',
  btnGenerate: 'Gerar Link 🚀',
  lblResult: '✅ Seu link está pronto!',
  btnCopy: 'COPIAR',
  tapTitle: 'Você tem uma surpresa',
  tapSub: 'Alguém pensou em você hoje 💕',
  tapBtn: 'Abrir! 💝',
  tapHint: '🔊 Ative o som para a experiência completa',
  btnShare: '💌 Quero enviar isso para alguém!',
  shareSub: 'Crie sua própria surpresa personalizada →',
  btnDonation: '☕ Pagar um café ao criador',
  statsFooter: 'Feito com ❤️ amor',
  copied: 'Copiado! ✅',
  donation: '😂 Adoraria um café! Mas sério, o que me deixa mais feliz é que você gostou. Compartilhe com quem quiser! ❤️',
  statsResult: '📊 ESTATÍSTICAS\n\n🆔 Seu ID: {did}\n📥 Suas visitas: {myvisits}\n📤 Seus links criados: {mylinks}\n\n💡 Isso é salvo apenas no seu dispositivo.'
}

}; // END CONFIG

// ═══════════════════════════════════════════════════════════════
// FIREBASE FUNCTIONS
// ═══════════════════════════════════════════════════════════════
function saveMessage(category, subCategory, lang, hasCustomMessage) {
    const timestamp = Date.now();
    const messageData = {
        category,
        subCategory,
        lang,
        hasCustomMessage,
        timestamp,
        date: new Date().toISOString()
    };
    
    // Guardar mensaje
    database.ref('messages').push(messageData);
    
    // Actualizar contadores
    database.ref('stats/totalMessages').transaction((current) => (current || 0) + 1);
    database.ref(`stats/categories/${category}`).transaction((current) => (current || 0) + 1);
    database.ref(`stats/languages/${lang}`).transaction((current) => (current || 0) + 1);
}

function recordView() {
    const timestamp = Date.now();
    database.ref('stats/totalViews').transaction((current) => (current || 0) + 1);
    database.ref('views').push({ timestamp, date: new Date().toISOString() });
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD FUNCTIONS
// ═══════════════════════════════════════════════════════════════
function showDashboard() {
    const modal = document.getElementById('dashboard-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    loadDashboardData();
}

function closeDashboard(event) {
    if (!event || event.target === event.currentTarget) {
        const modal = document.getElementById('dashboard-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function loadDashboardData() {
    // Total messages
    database.ref('stats/totalMessages').once('value').then(snapshot => {
        document.getElementById('total-messages').textContent = snapshot.val() || 0;
    });
    
    // Total views
    database.ref('stats/totalViews').once('value').then(snapshot => {
        document.getElementById('total-views').textContent = snapshot.val() || 0;
    });
    
    // Categories chart
    database.ref('stats/categories').once('value').then(snapshot => {
        const categories = snapshot.val() || {};
        const chartDiv = document.getElementById('categories-chart');
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

// ═══════════════════════════════════════════════════════════════
// AUDIO CONTEXT & MUSIC
// ═══════════════════════════════════════════════════════════════
function setupFirstClickMusic() {
    document.body.addEventListener('click', ()=>{
        if (!audioCtx) { audioCtx=new (window.AudioContext||window.webkitAudioContext)(); }
    }, {once:true});
}

function playDing(f1=440,f2=554) {
    if(!audioCtx)return;
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.frequency.value=f1; o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.15,audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.18);
    o.start(); o.stop(audioCtx.currentTime+0.18);
    setTimeout(()=>{
        const o2=audioCtx.createOscillator(),g2=audioCtx.createGain();
        o2.frequency.value=f2; o2.connect(g2); g2.connect(audioCtx.destination);
        g2.gain.setValueAtTime(0.15,audioCtx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.22);
        o2.start(); o2.stop(audioCtx.currentTime+0.22);
    },90);
}

function playWhoosh() {
    if(!audioCtx)return;
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.frequency.setValueAtTime(800,audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(120,audioCtx.currentTime+0.3);
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.2,audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.3);
    o.start(); o.stop(audioCtx.currentTime+0.3);
}

function playPop() {
    if(!audioCtx)return;
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.frequency.setValueAtTime(180,audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(60,audioCtx.currentTime+0.1);
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.25,audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.1);
    o.start(); o.stop(audioCtx.currentTime+0.1);
}

// ─── MÚSICA ───
let oscillators=[];
function stopMusic() {
    oscillators.forEach(o=>{ try{o.stop();}catch(e){} });
    oscillators=[];
    musicMode='off';
}

function toggleMusic() {
    if(musicMode==='off'){ startAmbientMusic(); }
    else if(musicMode==='ambient'){ startChaosMusic(); }
    else if(musicMode==='chaos'){ startRomanticMusic(); }
    else if(musicMode==='romantic'){ stopMusic(); }
    else{ stopMusic(); }
}

function startAmbientMusic() {
    stopMusic(); musicMode='ambient';
    if(!audioCtx)return;
    const createAmbient=(freq,vol,detune=0)=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();
        o.frequency.value=freq; o.detune.value=detune;
        o.type='sine'; o.connect(g); g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0,audioCtx.currentTime);
        g.gain.linearRampToValueAtTime(vol,audioCtx.currentTime+1.5);
        o.start(); oscillators.push(o); return{o,g};
    };
    createAmbient(130.81,0.04); createAmbient(164.81,0.03);
    createAmbient(196,0.035,5);  createAmbient(261.63,0.025,-3);
}

function startChaosMusic() {
    stopMusic(); musicMode='chaos';
    if(!audioCtx)return;
    const createChaos=(freq,vol,speed)=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain(),lfo=audioCtx.createOscillator();
        o.type='sawtooth'; o.frequency.value=freq; lfo.frequency.value=speed;
        const lfoGain=audioCtx.createGain(); lfoGain.gain.value=30;
        lfo.connect(lfoGain); lfoGain.connect(o.frequency);
        o.connect(g); g.connect(audioCtx.destination); g.gain.value=vol;
        o.start(); lfo.start(); oscillators.push(o,lfo);
    };
    createChaos(110,0.05,0.5); createChaos(146.83,0.04,0.7);
    createChaos(164.81,0.045,0.3); createChaos(220,0.035,0.6);
}

function startRomanticMusic() {
    stopMusic(); musicMode='romantic';
    if(!audioCtx)return;
    const createRomantic=(freq,vol,detune=0)=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();
        o.frequency.value=freq; o.detune.value=detune;
        o.type='sine'; o.connect(g); g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0,audioCtx.currentTime);
        g.gain.linearRampToValueAtTime(vol,audioCtx.currentTime+1.2);
        o.start(); oscillators.push(o);
    };
    createRomantic(261.63,0.05); createRomantic(329.63,0.04,3);
    createRomantic(392,0.045,-2);  createRomantic(523.25,0.03,5);
}

function startPhonkMusic() {
    stopMusic(); musicMode='phonk';
    if(!audioCtx)return;
    const bass=(freq,vol)=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();
        o.type='sawtooth'; o.frequency.value=freq;
        o.connect(g); g.connect(audioCtx.destination);
        g.gain.setValueAtTime(vol,audioCtx.currentTime);
        o.start(); oscillators.push(o);
    };
    bass(55,0.12); bass(82.41,0.08); bass(110,0.09);
    
    const hihat=()=>{
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();
        o.type='square'; o.frequency.value=8000;
        o.connect(g); g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.05,audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01,audioCtx.currentTime+0.05);
        o.start(); o.stop(audioCtx.currentTime+0.05);
    };
    setInterval(hihat,250);
}

// ═══════════════════════════════════════════════════════════════
// LANGUAGE
// ═══════════════════════════════════════════════════════════════
function changeLang(l) {
    currentLang=l;
    ['es','en','fr','pt'].forEach(x=>document.getElementById('btn-lang-'+x).classList.toggle('active',x===l));
    renderCreator();
}

function renderCreator() {
    const t=config[currentLang];
    document.getElementById('ui-title').textContent=t.title;
    document.getElementById('ui-desc').textContent=t.desc;
    document.getElementById('lbl-rel').textContent=t.lblRel;
    document.getElementById('lbl-dest').textContent=t.lblDest;
    document.getElementById('lbl-msg').textContent=t.lblMsg;
    document.getElementById('lbl-opt').textContent=t.lblOpt;
    document.getElementById('lbl-hint').textContent=t.lblHint;
    document.getElementById('btn-generate').textContent=t.btnGenerate;
    document.getElementById('lbl-result').textContent=t.lblResult;
    document.getElementById('btn-copy').textContent=t.btnCopy;
    document.getElementById('stats-trigger').textContent=t.statsFooter;

    const mainCat=document.getElementById('main-category');
    mainCat.innerHTML='';
    Object.entries(t.categories).forEach(([k,v])=>{
        const opt=document.createElement('option'); opt.value=k; opt.textContent=v; mainCat.appendChild(opt);
    });
    updateSubCats();
}

function updateSubCats() {
    const t=config[currentLang];
    const mainCat=document.getElementById('main-category').value;
    const subCat=document.getElementById('sub-category');
    subCat.innerHTML='';
    t.sub[mainCat].forEach(s=>{
        const opt=document.createElement('option'); opt.value=s; opt.textContent=s; subCat.appendChild(opt);
    });
}

// ═══════════════════════════════════════════════════════════════
// CREATOR
// ═══════════════════════════════════════════════════════════════
function generateLink() {
    const mainCat=document.getElementById('main-category').value;
    const subCat=document.getElementById('sub-category').value;
    const customMsg=document.getElementById('custom-message').value.trim();
    const params=new URLSearchParams({c:mainCat,s:subCat,l:currentLang});
    if(customMsg) params.set('m',btoa(encodeURIComponent(customMsg)));
    
    const url=location.origin+location.pathname+'?'+params.toString();
    document.getElementById('final-url').value=url;
    document.getElementById('result-area').classList.remove('hidden');
    playDing(440,554);
    
    // Guardar en Firebase
    saveMessage(mainCat, subCat, currentLang, !!customMsg);
    incMyLinks();
}

function copyLink() {
    const input=document.getElementById('final-url');
    input.select(); input.setSelectionRange(0,99999);
    navigator.clipboard.writeText(input.value);
    const btn=document.getElementById('btn-copy');
    const orig=btn.textContent;
    btn.textContent=config[currentLang].copied;
    playDing(554,659);
    setTimeout(()=>btn.textContent=orig,1500);
}

// ═══════════════════════════════════════════════════════════════
// RECEIVER
// ═══════════════════════════════════════════════════════════════
function beginPrank() {
    recordView(); // Firebase
    playWhoosh();
    document.getElementById('tap-overlay').classList.add('hidden');
    document.getElementById('prank-screen').classList.remove('hidden');
    startChaosMusic();
    
    const p=new URLSearchParams(location.search);
    const mainCat=p.get('c'), subCat=p.get('s'), lang=p.get('l')||'es';
    const t=config[lang].trolleos[mainCat][subCat];
    
    const prankBox=document.getElementById('prank-text');
    prankBox.textContent='';
    prankBox.classList.add('chaos-mode');
    
    let idx=0;
    const typeChar=()=>{
        if(idx<t.length){ prankBox.textContent+=t[idx]; idx++; setTimeout(typeChar,25); }
        else{ setTimeout(showFinal,800); }
    };
    
    const prg=document.getElementById('progress-bar');
    let w=0;
    const fillBar=setInterval(()=>{
        w+=1; prg.style.width=w+'%';
        if(w>=100){ clearInterval(fillBar); }
    },40);
    
    typeChar();
    document.body.classList.add('shake-heavy');
    setTimeout(()=>document.body.classList.remove('shake-heavy'),1800);
}

function showFinal() {
    startRomanticMusic();
    document.getElementById('prank-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    
    const p=new URLSearchParams(location.search);
    const mainCat=p.get('c'), subCat=p.get('s'), lang=p.get('l')||'es', customMsg=p.get('m');
    const t=config[lang];
    
    let greeting='';
    if(t.privateGreeting.includes(subCat)){ greeting=t.privateGreetingText; }
    else{ greeting='¡Para ti! De: Alguien que te quiere 💝'; }
    document.getElementById('final-greeting').textContent=greeting;
    
    let finalText='';
    if(customMsg){
        try{ finalText=decodeURIComponent(atob(customMsg)); }
        catch(e){ finalText=t.final[mainCat][subCat]; }
    } else{ finalText=t.final[mainCat][subCat]; }
    document.getElementById('final-text').textContent=finalText;
    
    const gameArea=document.getElementById('game-area');
    const triviaArea=document.getElementById('trivia-area');
    gameArea.classList.add('hidden');
    triviaArea.classList.add('hidden');
    document.getElementById('game-amor').classList.add('hidden');
    document.getElementById('game-amistad').classList.add('hidden');
    document.getElementById('game-familiar').classList.add('hidden');
    
    if(mainCat==='amor'){
        gameArea.classList.remove('hidden');
        document.getElementById('game-amor').classList.remove('hidden');
        setupGameAmor(t.games.amor[subCat]);
    } else if(mainCat==='amistad'){
        gameArea.classList.remove('hidden');
        document.getElementById('game-amistad').classList.remove('hidden');
        setupGameAmistad(t.games.amistad[subCat]);
    } else if(mainCat==='familiar'){
        gameArea.classList.remove('hidden');
        document.getElementById('game-familiar').classList.remove('hidden');
        setupGameFamiliar(t.games.familiar[subCat]);
    }
    
    triviaArea.classList.remove('hidden');
    setupTrivia(t.trivia);
    
    document.getElementById('btn-share').textContent=t.btnShare;
    document.getElementById('share-sub').textContent=t.shareSub;
    document.getElementById('btn-donation').textContent=t.btnDonation;
    document.getElementById('stats-trigger-r').textContent=t.statsFooter;
    
    launchConfetti();
}

// ═══════════════════════════════════════════════════════════════
// GAMES
// ═══════════════════════════════════════════════════════════════
function setupGameAmor(g) {
    noMoveCount=0;
    document.getElementById('question-text').textContent=g.question;
    document.getElementById('btn-yes').textContent=g.yesBtn;
    document.getElementById('btn-no').textContent=g.noBtn;
    document.getElementById('celebrate-text').textContent=g.celebrateText;
    document.getElementById('celebrate-sub').textContent=g.celebrateSub;
    
    const btnNo=document.getElementById('btn-no');
    btnNo.classList.remove('btn-no-surrender');
    btnNo.style.right='0';
    
    btnNo.onmouseover=()=>{ moveNoBtn(); };
    btnNo.ontouchstart=(e)=>{ e.preventDefault(); moveNoBtn(); };
    
    function moveNoBtn() {
        if(noMoveCount>=10){
            btnNo.textContent=g.noSurrender;
            btnNo.classList.add('btn-no-surrender');
            btnNo.style.right='0'; btnNo.style.transform='none';
            return;
        }
        noMoveCount++;
        const w=document.getElementById('btn-no-wrapper').offsetWidth;
        const btnW=btnNo.offsetWidth;
        const maxR=w-btnW-120;
        const newR=Math.random()*maxR;
        btnNo.style.right=newR+'px';
        playPop();
    }
}

function celebrate() {
    playDing(554,659);
    document.getElementById('celebrate-msg').classList.remove('hidden');
    launchConfetti();
}

function setupGameAmistad(g) {
    tapCount=0;
    document.getElementById('game-amistad-title').textContent=g.title;
    document.getElementById('tap-game-btn').textContent=g.emoji;
    updateTapProgress(g);
}

function handleTapGame() {
    const p=new URLSearchParams(location.search);
    const lang=p.get('l')||'es', mainCat=p.get('c'), subCat=p.get('s');
    const g=config[lang].games.amistad[subCat];
    
    tapCount++;
    updateTapProgress(g);
    playPop();
    
    const btn=document.getElementById('tap-game-btn');
    btn.classList.add('game-tap-active');
    setTimeout(()=>btn.classList.remove('game-tap-active'),150);
    
    if(tapCount>=g.target){
        document.getElementById('tap-done-text').textContent=g.done;
        document.getElementById('tap-done-msg').classList.remove('hidden');
        launchConfetti();
    }
}

function updateTapProgress(g) {
    const pct=(tapCount/g.target)*100;
    document.getElementById('tap-progress').style.width=pct+'%';
    document.getElementById('tap-progress-text').textContent=g.progress.replace('{n}',tapCount).replace('{total}',g.target);
}

function setupGameFamiliar(g) {
    hugCount=0;
    document.getElementById('game-familiar-title').textContent=g.title;
    document.getElementById('hug-game-btn').textContent=g.emoji;
    updateHugProgress(g);
}

function handleHugGame() {
    const p=new URLSearchParams(location.search);
    const lang=p.get('l')||'es', mainCat=p.get('c'), subCat=p.get('s');
    const g=config[lang].games.familiar[subCat];
    
    hugCount++;
    updateHugProgress(g);
    playPop();
    
    const btn=document.getElementById('hug-game-btn');
    btn.classList.add('game-tap-active');
    setTimeout(()=>btn.classList.remove('game-tap-active'),150);
    
    if(hugCount>=g.target){
        document.getElementById('hug-done-text').textContent=g.done;
        document.getElementById('hug-done-msg').classList.remove('hidden');
        launchConfetti();
    }
}

function updateHugProgress(g) {
    const pct=(hugCount/g.target)*100;
    document.getElementById('hug-progress').style.width=pct+'%';
    document.getElementById('hug-progress-text').textContent=g.progress.replace('{n}',hugCount).replace('{total}',g.target);
}

// ═══════════════════════════════════════════════════════════════
// TRIVIA
// ═══════════════════════════════════════════════════════════════
function setupTrivia(t) {
    triviaAnswered=false;
    document.getElementById('trivia-question').textContent=t.question;
    const opts=document.getElementById('trivia-options');
    opts.innerHTML='';
    t.options.forEach((opt,i)=>{
        const btn=document.createElement('button');
        btn.className='trivia-btn w-full text-left font-semibold rounded-xl p-3 transition body-text';
        btn.textContent=opt;
        btn.onclick=()=>checkTrivia(i);
        opts.appendChild(btn);
    });
}

function checkTrivia(idx) {
    if(triviaAnswered)return;
    triviaAnswered=true;
    
    const p=new URLSearchParams(location.search);
    const lang=p.get('l')||'es';
    const t=config[lang].trivia;
    
    const correct=(idx===0);
    const btns=document.querySelectorAll('#trivia-options button');
    btns.forEach((btn,i)=>{
        btn.disabled=true;
        if(i===0) btn.classList.add('trivia-correct');
        else if(i===idx && !correct) btn.classList.add('trivia-wrong');
    });
    
    const resDiv=document.getElementById('trivia-result');
    const icon=document.getElementById('trivia-result-icon');
    const text=document.getElementById('trivia-result-text');
    
    icon.textContent=correct?'🎉':'😅';
    text.textContent=correct?t.right:t.wrong;
    resDiv.classList.remove('hidden');
    
    if(correct){
        setTimeout(startPhonkMusic,200);
        epicConfetti();
        const card=document.getElementById('main-container');
        card.classList.add('celebrate-flash');
        setTimeout(()=>card.classList.remove('celebrate-flash'),2000);
        setTimeout(()=>{ if(musicMode==='phonk') startRomanticMusic(); },8000);
    } else{
        playDing(220,330);
    }
}

function epicConfetti() {
    const colors=['#ff4d6d','#ffd700','#ff85a1','#00ff88','#4d88ff','#ff6b35','#a855f7'];
    const end=Date.now()+4000;
    (function frame(){
        confetti({particleCount:8,angle:60, spread:55,origin:{x:0},colors});
        confetti({particleCount:8,angle:120,spread:55,origin:{x:1},colors});
        confetti({particleCount:5,angle:90, spread:70,origin:{x:.5,y:0},colors});
        if(Date.now()<end) requestAnimationFrame(frame);
    })();
    confetti({particleCount:200,spread:100,origin:{y:.5},colors});
}

function launchConfetti() {
    const c=['#ff4d6d','#ff85a1','#ffd6e0','#ff0054','#ffccd5'];
    confetti({particleCount:110,spread:70,origin:{y:.65},colors:c});
    setTimeout(()=>{
        confetti({particleCount:65,angle:60, spread:55,origin:{x:0,y:.7},colors:c});
        confetti({particleCount:65,angle:120,spread:55,origin:{x:1,y:.7},colors:c});
    },380);
}

// ═══════════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════════
function goToCreator() { window.location.href=location.origin+location.pathname; }
function showDonationJoke() { alert(config[currentLang].donation); }

// ═══════════════════════════════════════════════════════════════
// STATS (localStorage - privacy)
// ═══════════════════════════════════════════════════════════════
function getDeviceId() {
    let did=localStorage.getItem('device_id');
    if(!did){ did='dev_'+Math.random().toString(36).substr(2,9); localStorage.setItem('device_id',did); }
    return did;
}
function getMyVisits() { return parseInt(localStorage.getItem('my_visits')||'0'); }
function incMyVisits() { localStorage.setItem('my_visits',(getMyVisits()+1).toString()); }
function getMyLinks() { return parseInt(localStorage.getItem('my_links')||'0'); }
function incMyLinks() { localStorage.setItem('my_links',(getMyLinks()+1).toString()); }

function handleStatsTrigger() {
    statsClicks++; clearTimeout(statsTimer);
    statsTimer=setTimeout(()=>{statsClicks=0;},2000);
    if(statsClicks>=5){ statsClicks=0; showStats(); }
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
    
    if(p.has('c')){
        // RECEIVER
        document.getElementById('creator-view').classList.add('hidden');
        document.getElementById('receiver-view').classList.remove('hidden');
        const lang=p.get('l')||'es'; const t=config[lang]; currentLang=lang;
        document.getElementById('tap-title').textContent=t.tapTitle;
        document.getElementById('tap-sub').textContent=t.tapSub;
        document.getElementById('tap-btn').textContent=t.tapBtn;
        document.getElementById('tap-hint').textContent=t.tapHint;
        ['es','en','fr','pt'].forEach(x=>document.getElementById('btn-lang-'+x).classList.toggle('active',x===lang));
        incMyVisits();
    } else{
        // CREATOR
        changeLang('es');
    }
};

