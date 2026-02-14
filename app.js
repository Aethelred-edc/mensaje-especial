/* ================================================================
   app.js — Sorpresa Especial 💝  v5.0
   ✅ Fuentes más grandes (CSS)
   ✅ Texto sin cortes inferiores
   ✅ Juegos únicos por sub-categoría
   ✅ Idioma funciona en TODAS las pantallas incluyendo prank
   ✅ Privacidad: saludo anónimo para Crush / Amor Platónico
   ✅ 4 melodías: Ambient / Chaos / Romantic / Phonk-Trivia
   ✅ Trivia 14 Feb con phonk celebration
   ✅ Estadísticas 100% confiables con localStorage
   ================================================================ */

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
        incMyVisits(); hitCounter('visitas-prank');
    } else {
        // CREATOR
        changeLang('es');
    }
};

