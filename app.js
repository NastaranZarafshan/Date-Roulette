'use strict';

/*
 * Date Roulette — ساخته‌شده برای 🌸گل سرحدنشین🌸
 * No framework or own backend. Privacy-friendly Umami tracking is optional.
 * Invite data is stored in the URL fragment. FormSubmit is used only to email results.
 */
const CATEGORIES = [
  { title:'حال‌وهوای دیت', icon:'💘', question:'دوست داری اولین قرارمون چه حسی داشته باشه؟', options:['💗 رمانتیک و لطیف','😂 خنده‌دار و شیطون','🧸 کیوت و بامزه','🎢 پر از هیجان','🌿 آروم و صمیمی','🕵️ مرموز و سورپرایزی','✨ شیک و لاکچری','🤪 دیوونه‌وار و متفاوت'] },
  { title:'مقصد رؤیایی', icon:'🗺️', question:'اگه بگم «آماده شو، بریم»، کجا رو انتخاب می‌کنی؟', options:['☕ کافه دنج','🌲 جنگل سرسبز','🏔️ بالای کوه','🏖️ کنار دریا','🌳 پارک قشنگ','🎡 شهربازی','🌆 بالای شهر','🏛️ یه جای تاریخی','🏞️ کنار رودخونه','🎲 مقصد سورپرایزی'] },
  { title:'ماجرای طبیعت', icon:'🌿', question:'اگه بریم طبیعت، چی بیشتر می‌چسبه؟', options:['🧺 پیک‌نیک','🌅 دیدن غروب','✨ شمردن ستاره‌ها','🌊 دیدن آبشار','🚶 پیاده‌روی جنگلی','🏕️ کمپ کوتاه و امن','🌻 گشت‌وگذار بین گل‌ها','📷 عکاسی طبیعت'] },
  { title:'جای کافه', icon:'☕', question:'چه جور کافه‌ای دوست داری؟', options:['🕯️ دنج و کم‌نور','🌿 کافه‌باغ','📚 کافه‌کتاب','🐈 کافه گربه','🌆 کافه با ویوی شهر','🎼 موسیقی زنده','🥐 کافه صبحانه','🎨 کافه هنری'] },
  { title:'غذای خوشمزه', icon:'🍕', question:'مهم‌ترین تصمیم دیت: چی بخوریم؟', options:['🍕 پیتزا','🍔 برگر','🍝 پاستا','🍣 سوشی','🍜 رامن','🥩 استیک','🥙 کباب','🌮 تاکو','🍗 سوخاری','🥗 غذای سبک','🥐 صبحونه','👩‍🍳 خودمون بپزیم'] },
  { title:'نوشیدنی خوش‌حال‌کن', icon:'🧋', question:'یه نوشیدنی به حساب من؛ چی سفارش می‌دی؟', options:['☕ قهوه','🧊 آیس‌لاته','🍫 هات‌چاکلت','🍵 ماچا','🧋 بابل‌تی','🥤 میلک‌شیک','🍓 اسموتی','🍹 موکتل','🫖 چای','🎲 هرچی تو انتخاب کنی'] },
  { title:'یه چیز شیرین', icon:'🍰', question:'برای شیرین‌تر شدن روزمون چی انتخاب می‌کنی؟', options:['🍦 بستنی','🍰 چیزکیک','🧇 وافل','🥞 پنکیک','🍪 کوکی','🍩 دونات','🍫 براونی','🍓 توت‌فرنگی شکلاتی','🍮 تیرامیسو','🍨 دسر سورپرایزی'] },
  { title:'زمان طلایی', icon:'⏰', question:'ساعت چند بیشتر با حال‌وهوات جور درمیاد؟', options:['🌅 طلوع خورشید','🥐 صبح زود','☀️ ظهر','🌤️ عصر','🌇 موقع غروب','🌙 شب','✨ زیر آسمون پرستاره','🗓️ یه روز کامل'] },
  { title:'تفریح اصلی', icon:'🎳', question:'دلت می‌خواد با هم چه تفریحی داشته باشیم؟', options:['🎬 سینما','🎳 بولینگ','🎱 بیلیارد','🏎️ کارتینگ','🎢 شهربازی','🔐 اتاق فرار','⛸️ اسکیت','🚴 دوچرخه','🎮 گیم‌سنتر','🎤 کارائوکه','🧗 دیوارنوردی','🎟️ کنسرت'] },
  { title:'قرار هنری', icon:'🎨', question:'اگه یه قرار هنری بسازیم کدوم جذاب‌تره؟', options:['🏺 سفالگری','🎨 نقاشی دونفره','🖼️ گالری‌گردی','📷 عکاسی','🎭 تئاتر','📚 کتاب‌فروشی','🎻 کنسرت کلاسیک','🍳 کلاس آشپزی'] },
  { title:'مسابقه دونفره', icon:'🏆', question:'روی چی شرط می‌بندی منو می‌بری؟ 😏', options:['🎮 بازی ویدئویی','🎯 دارت','🎳 بولینگ','🧩 پازل','🧠 معما','🃏 بازی کارتی','🎤 حدس آهنگ','😂 مسابقه نخندیدن'] },
  { title:'چالش خنده‌دار', icon:'🤪', question:'جرئت داری یه چالش بامزه با هم انجام بدیم؟', options:['📸 عکس‌های خیلی مسخره','🎁 هدیه عجیب و ارزون','🎨 کشیدن پرتره هم','🎤 خوانندگی افتضاح','🪙 مسیر با شیر یا خط','🎭 ادابازی','👀 حدس‌زدن سفارش هم','💬 سه سؤال شیطون ولی محترمانه'] },
  { title:'ماجراجویی بعدی', icon:'🚗', question:'کدوم ماجراجویی رو انتخاب می‌کنی؟', options:['🚗 جاده‌گردی','🏘️ کشف یه شهر جدید','🏕️ سفر یک‌روزه','🛍️ بازارگردی','🌌 ستاره‌بینی','🗺️ پیدا کردن یه جای ناشناخته','🌺 باغ گیاه‌شناسی','🏰 گشتن توی یه قلعه'] },
  { title:'لباس قرار', icon:'👗', question:'با چه استایلی سر قرار بیایم؟', options:['🖤 استایل مشکی','🤍 استایل سفید','👟 اسپرت و راحت','✨ شیک و مجلسی','🎨 هم‌رنگ','🧸 فانتزی و کیوت','👖 کژوال','🌈 رنگی‌رنگی','😎 هرچی دل‌مون خواست'] },
  { title:'پلی‌لیست خاطره‌ها', icon:'🎧', question:'آهنگ پس‌زمینه دیت‌مون چه سبکی باشه؟', options:['🎹 پیانوی ملایم','🎷 جَز','🎸 راک','💗 پاپ عاشقانه','🪩 آهنگ شاد','📼 نوستالژی','🌿 صدای طبیعت','🎶 پلی‌لیست مشترک','🎲 آهنگ شانسی'] },
  { title:'سورپرایز کوچولو', icon:'🎁', question:'کدوم سورپرایز کوچولو برات بانمک‌تره؟', options:['💐 یه شاخه گل','💌 نامه دست‌نویس','🍫 شکلات','📷 عکس چاپی','📚 کتاب با یادداشت','🎵 آهنگ اختصاصی','🧸 عروسک کوچیک','🗺️ مقصد مخفی','✨ هیچ‌چیز؛ فقط وقت باکیفیت'] },
  { title:'قانون خنده‌دار', icon:'😈', question:'واسه دیت‌مون چه قانون عجیبی بذاریم؟', options:['📵 نیم‌ساعت بدون گوشی','😂 هرکی بخنده بازنده‌ست','🪙 تصمیم‌گیری با سکه','💬 پنج سؤال خاص','🎨 هرکی برای دیگری انتخاب کنه','📸 مسابقه بهترین عکس','🎭 نقش غریبه‌ها رو بازی کنیم','🤝 فقط تصمیم‌های مشترک'] },
  { title:'بودجه جذاب', icon:'💸', question:'دلمون یه دیت چه‌مدلی می‌خواد؟', options:['🆓 رایگان و خلاقانه','🪙 خیلی اقتصادی','💵 معمولی و راحت','✨ یه کم خاص','💎 لوکس','🎲 سورپرایز با بودجه مشخص'] },
  { title:'راه رسیدن', icon:'🚲', question:'چجوری راه بیفتیم دنبال خاطره‌سازی؟', options:['🚶 پیاده‌روی','🚗 ماشین و آهنگ','🚲 دوچرخه','🚇 متروگردی','🛴 اسکوتر','🚕 تاکسی','🚌 اتوبوس‌گردی','🎲 هرچی جور شد'] },
  { title:'پایان رؤیایی', icon:'🌙', question:'اگه دیت خوب پیش رفت، آخرش چی قشنگ‌تره؟', options:['🌇 دیدن غروب','🌌 ستاره‌بینی','🍦 بستنی آخر شب','🚶 قدم‌زدن آروم','📸 عکس یادگاری','💌 یه پیام قشنگ','☕ نوشیدنی آخر','🗓️ برنامه‌ریزی دیت دوم','✨ خداحافظی با یه لبخند'] }
];

const $ = (s, root=document) => root.querySelector(s);
const app = $('#app');
const stageTag = $('#stageTag');
const toast = $('#toast');
const emptyAnswers = () => Array(CATEGORIES.length).fill('');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let state = { mode:'setup', demo:false, config:null, link:'', answers:emptyAnswers(), index:0, noClicks:0, noPos:0, decision:'', sendStatus:'idle', sendMessage:'', sending:false };
let toastTimer;
let lastOpenedHash = null;
function trackEvent(name){window.DateRouletteAnalytics?.track(name);}
function inviteMessage(){
  const c=state.config;
  return `💌 ${c.receiver} جان!\n${c.sender} یه دعوت کوچولوی بامزه برات داره 🥹💕\nیه سؤال عاشقانه و ۲۰ مرحله انتخاب‌های جالب منتظرته!\n\n${state.link}\n\nپ.ن: هر جوابی بدی، با احترام پذیرفته می‌شه 🌷`;
}

function safe(s){return String(s??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function textLimit(s,n=65){return String(s??'').trim().slice(0,n);}
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3500);}
function scrollUp(){window.scrollTo({top:0,behavior:'smooth'});}
function buttonCopy(text){
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(text).then(()=>notify('کپی شد! 💌')).catch(()=>fallbackCopy(text));
  return fallbackCopy(text);
}
function fallbackCopy(text){const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy');notify('کپی شد! 💌');}catch(_){notify('لینک رو انتخاب و دستی کپی کن.');}t.remove();}
function pack(object){const bytes=new TextEncoder().encode(JSON.stringify(object));let raw='';for(const n of bytes)raw+=String.fromCharCode(n);return btoa(raw).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function unpack(value){try{const raw=atob(value.replace(/-/g,'+').replace(/_/g,'/'));const data=new Uint8Array([...raw].map(c=>c.charCodeAt(0)));return JSON.parse(new TextDecoder().decode(data));}catch(_){return null;}}
function getInvite(){const h=location.hash.slice(1);if(!h.startsWith('invite='))return null;const c=unpack(h.slice(7));if(!c||c.v!==1||!EMAIL_RE.test(String(c.email||''))||String(c.sender||'').length>65||String(c.receiver||'').length>65)return null;return {sender:textLimit(c.sender)||'یه نفر که دوستت داره',receiver:textLimit(c.receiver)||'دوست خوبم',email:String(c.email).trim()};}
function currentBase(){const u=new URL(location.href);u.hash='';u.search='';return u.toString();}
function hosted(){return ['https:','http:'].includes(location.protocol);}
function setStage(label){stageTag.textContent=label;}
function render(){
  if(state.mode==='setup')renderSetup();
  if(state.mode==='share')renderShare();
  if(state.mode==='invite')renderInvite();
  if(state.mode==='game')renderGame();
  if(state.mode==='result')renderResult();
}
function bootstrap(){
  const cfg=getInvite();
  const preview=new URLSearchParams(location.search).get('preview')==='1';
  if(cfg){
    state={...state,mode:'invite',demo:preview,config:cfg,answers:emptyAnswers(),index:0,noClicks:0,noPos:0,decision:'',sendStatus:'idle'};
    if(!preview && location.hash!==lastOpenedHash){trackEvent('invitation_opened');lastOpenedHash=location.hash;}
  }else{state={...state,mode:'setup',demo:false,config:null,answers:emptyAnswers(),noClicks:0};}
  render();
}
window.addEventListener('hashchange',bootstrap);

function renderSetup(){
  setStage('INVITATION STUDIO');
  let saved={};try{saved=JSON.parse(localStorage.getItem('date-roulette-sender')||'{}');}catch(_){}
  const defaultSite=hosted()?currentBase():'';
  app.innerHTML=`
    <div class="intro-top"><span class="pill">💌 استودیوی دعوت اختصاصی</span><div class="big-icon">💝</div>
    <h1 class="title">یه دعوت <span class="accent">خوشگل</span> بساز!</h1>
    <p class="subtitle">اسمت رو بنویس، اسم کسی رو که می‌خوای دعوت کنی وارد کن، و لینک مخصوص خودتون رو بفرست. آخرش جواب و انتخاب‌هاش برات ایمیل می‌شه.</p>
    <p class="soft-note">😏 پسرای دونگ بگیر (تستوسترون قحطی زده ها!) حق استفاده از این برنامه رو ندارن.</p></div>
    <form id="setupForm" class="form-grid">
      <div class="field"><label for="sender">اسم تو (دعوت‌کننده) ✨</label><input id="sender" class="input" maxlength="65" placeholder="مثلاً: یه آدم سمجِ دوست‌داشتنی!" value="${safe(saved.sender||'')}" required /></div>
      <div class="field"><label for="receiver">اسم اون نفر 💗</label><input id="receiver" class="input" maxlength="65" placeholder="اسم یا لقب بانمکش" value="${safe(saved.receiver||'')}" required /></div>
      <div class="field"><label for="email">ایمیل تو برای دریافت نتیجه 📬</label><input id="email" class="input ltr" type="email" maxlength="160" autocomplete="email" placeholder="you@example.com" value="${safe(saved.email||'')}" required /><small>جواب «بله/خیر» و انتخاب‌های نهایی به این ایمیل فرستاده می‌شوند.</small></div>
      <div class="field"><label for="siteUrl">آدرس آنلاین سایت 🔗</label><input id="siteUrl" class="input ltr" type="url" value="${safe(defaultSite||saved.siteUrl||'')}" placeholder="https://your-site.netlify.app/" required /><small>${hosted()?'آدرس سایت به‌صورت خودکار شناسایی شد.':'اول سایت را آنلاین کن و آدرس آن را اینجا وارد کن تا لینک قابل ارسال ساخته شود.'}</small></div>
      <label class="checkline"><input type="checkbox" id="agree" required /><span>می‌دونم نتیجه از طریق سرویس شخص ثالث FormSubmit به ایمیلم ارسال می‌شه و قبل از بازی به مخاطب هم این موضوع گفته می‌شه.</span></label>
      <button class="btn btn-primary btn-wide" type="submit">بسازش، بریم برای دعوت! 💘</button>
      <button class="btn btn-secondary btn-wide" type="button" id="tryDemo">👀 اول بازی رو آزمایشی ببین</button>
    </form>
    <div class="divider"></div>
    <p class="hint">📨 <strong>فعال‌سازی ایمیل:</strong> بعد از ساخت لینک می‌تونی یه ایمیل آزمایشی بفرستی. اگر اولین باره، پیام تأیید FormSubmit رو توی ایمیلت باز کن تا نتیجه‌های واقعی برسن.</p>`;
  $('#tryDemo').addEventListener('click',()=>{state.demo=true;state.config={sender:'یه نفر که دوستت داره',receiver:'دوست خوبم',email:'demo@example.com'};state.mode='invite';state.answers=emptyAnswers();state.noClicks=0;state.noPos=0;render();scrollUp();notify('حالت نمایشی فعاله؛ هیچ ایمیلی ارسال نمی‌شه 🌷');});
  $('#setupForm').addEventListener('submit',ev=>{
    ev.preventDefault();
    const sender=textLimit($('#sender').value),receiver=textLimit($('#receiver').value);
    const email=$('#email').value.trim();let siteUrl=$('#siteUrl').value.trim();
    if(!sender||!receiver||!EMAIL_RE.test(email)){notify('اسم‌ها و ایمیل معتبر رو وارد کن.');return;}
    let u;try{u=new URL(siteUrl);if(!['http:','https:'].includes(u.protocol))throw Error();}catch(_){notify('آدرس سایت باید با https:// شروع بشه.');return;}
    u.hash='';u.search='';
    state.demo=false;state.config={sender,receiver,email};
    state.link=u.toString()+'#invite='+pack({v:1,sender,receiver,email});
    try{localStorage.setItem('date-roulette-sender',JSON.stringify({sender,receiver,email,siteUrl:u.toString()}));}catch(_){}
    state.mode='share';trackEvent('invitation_created');render();scrollUp();
  });
}
function renderShare(){
  setStage('READY TO FALL?');const {sender,receiver,email}=state.config;
  const previewUrl=new URL(state.link);
  previewUrl.searchParams.set('preview','1');
  app.innerHTML=`<div class="intro-top"><span class="pill">🎉 آماده ارسال شد!</span><div class="big-icon">💌</div>
    <h1 class="title">یه دعوت مخصوص <span class="accent">${safe(receiver)}</span>!</h1>
    <p class="subtitle">از طرف <strong>${safe(sender)}</strong> 💖<br>پیام و لینک اختصاصی رو یکجا برای اون آدم خاص بفرست.</p></div>
    <div class="message-preview" id="messagePreview">${safe(inviteMessage())}</div>
    <div class="link-preview" id="linkBox" tabindex="0">${safe(state.link)}</div>
    <div class="actions"><button class="btn btn-primary btn-wide" id="copyMessage">💌 کپی پیام + لینک دعوت</button></div>
    <div class="share-row"><button class="btn btn-secondary" id="whatsappShare">💚 واتساپ</button><button class="btn btn-secondary" id="telegramShare">✈️ تلگرام</button></div>
    <div class="share-row extra-share"><button class="btn btn-secondary" id="nativeShare">📲 اشتراک‌گذاری</button><button class="btn btn-secondary" id="copyLink">🔗 فقط لینک</button></div>
    <button class="btn btn-ghost btn-wide" id="previewInvite">👀 تست دعوت بدون ثبت آمار و ایمیل</button>
    <div class="divider"></div>
    <h2 class="section-title">📬 فعال‌سازی دریافت نتیجه</h2>
    <p class="desc">برای اینکه انتخاب‌های <strong>${safe(receiver)}</strong> به <strong>${safe(email)}</strong> برسه، یک پیام تست بفرست و اگر اولین بارته، لینک فعال‌سازی FormSubmit رو از صندوق ایمیلت تأیید کن.</p>
    <button class="btn btn-secondary btn-wide" id="testEmail">✉️ ارسال پیام تست و فعال‌سازی</button>
    <div id="testFeedback" class="hint" role="status"></div>
    <p class="soft-note">📊 اگر Umami رو در config.js فعال کرده باشی، آمار بازدیدکننده‌ها و شروع/پایان بازی توی داشبورد شخصی Umami ثبت می‌شه. اسم، ایمیل و جواب‌ها به ابزار آمارگیری فرستاده نمی‌شن.</p>
    <p class="soft-note">💗 نتیجه فقط بعد از پاسخ نهایی (پذیرش و تکمیل بازی، یا رد دعوت) برای ایمیل مقصد ارسال می‌شه. «نه» بعد از سه جابه‌جایی در بار چهارم پذیرفته می‌شه و راه پایان فوری هم وجود داره.</p>
    <button class="btn btn-ghost btn-wide" id="backSetup">✏️ ویرایش دعوت</button>`;
  $('#copyMessage').addEventListener('click',()=>{trackEvent('share_clicked');buttonCopy(inviteMessage());});
  $('#copyLink').addEventListener('click',()=>{trackEvent('share_clicked');buttonCopy(state.link);});
  $('#whatsappShare').addEventListener('click',()=>{trackEvent('share_clicked');window.open('https://wa.me/?text='+encodeURIComponent(inviteMessage()),'_blank','noopener,noreferrer');});
  $('#telegramShare').addEventListener('click',()=>{trackEvent('share_clicked');window.open('https://t.me/share/url?url='+encodeURIComponent(state.link)+'&text='+encodeURIComponent(inviteMessage().replace(state.link,'').trim()),'_blank','noopener,noreferrer');});
  $('#nativeShare').addEventListener('click',async()=>{
    if(navigator.share){try{await navigator.share({title:'💌 یه دعوت مخصوص تو',text:inviteMessage()});trackEvent('share_clicked');}catch(_){/* user cancelled share */}}
    else{trackEvent('share_clicked');buttonCopy(inviteMessage());}
  });
  $('#previewInvite').addEventListener('click',()=>window.open(previewUrl.toString(),'_blank','noopener,noreferrer'));
  $('#backSetup').addEventListener('click',()=>{state.mode='setup';render();scrollUp();});
  $('#testEmail').addEventListener('click',async()=>{
    const btn=$('#testEmail'),info=$('#testFeedback');btn.disabled=true;btn.textContent='در حال ارسال پیام تست…';
    try{await submitMail(state.config.email,{
      name:'Date Roulette / تست ایمیل',_subject:'💌 فعال‌سازی دریافت نتیجه بازی دیت',
      message:`سلام ${state.config.sender}! 🌸\nاین یک پیام تست از بازی گل سرحدنشین است.\nپس از تأیید فعال‌سازی FormSubmit، نتیجه دعوت برای ${state.config.receiver} به همین ایمیل ارسال خواهد شد.`,
      type:'test',_captcha:'false'
    });info.className='success-banner';info.textContent='درخواست تست ثبت شد. صندوق ورودی و پوشه Spam رو چک کن؛ اگر اولین پیامته، حتماً ایمیل فعال‌سازی رو تأیید کن.';}
    catch(e){info.className='warning';info.textContent='تست ثبت نشد: '+e.message+' — اتصال اینترنت یا تنظیمات ایمیل را بررسی کن.';}
    btn.disabled=false;btn.textContent='✉️ دوباره پیام تست بفرست';
  });
}
function noPositions(){return[{left:'66%',top:'66px'},{left:'62%',top:'14px'},{left:'65%',top:'122px'},{left:'57%',top:'19px'}]}
function renderInvite(){
  setStage('SPECIAL INVITATION');const {sender,receiver,email}=state.config;
  const cute=['','واقعاً نه؟ 😂 یه بار دیگه امتحان کن!','این دکمه چقدر بازیگوشه! 🙈','قول می‌دم دیگه جابه‌جا نشه؛ انتخابت با خودته 💗'];
  const pos=noPositions()[state.noPos];
  app.innerHTML=`<div class="invite-card">
     <span class="pill">💗 دعوت‌نامه فقط برای تو</span><span class="float-heart" aria-hidden="true">💌</span>
     <div class="eyebrow">A LITTLE QUESTION, A BIG SMILE</div>
     <h1 class="title">${safe(receiver)} جان…<br><span class="accent">با من میای دیت؟</span> 🥹</h1>
     <p class="subtitle">${safe(sender)} یه عالمه ایده بامزه واسه یه قرار قشنگ داره؛ جنگل، کافه، غذا، بازی و کلی سورپرایز! فقط کافیه جواب بدی…</p>
     <div class="answer-arena"><button class="btn btn-primary yes" id="yes">آرههه، بریم! 😍</button><button class="btn no" id="no" style="left:${pos.left};top:${pos.top}">نه، ممنون 🙃</button></div>
     <div class="arena-caption" id="noCaption" role="status">${cute[state.noClicks]||'یک جواب از ته دل! 💖'}</div>
     <button class="btn btn-ghost" id="declineNow">🌷 ترجیح می‌دم همین‌جا دعوت رو رد کنم</button>
     <p class="privacy-note">${state.demo?'👀 این یک پیش‌نمایش آزمایشی است؛ هیچ آمار یا ایمیلی ثبت نمی‌شود.':`${window.DateRouletteAnalytics?.enabled?'📊 بازدید و مراحل بازی به‌صورت آماری و بدون اسم یا جواب‌ها ثبت می‌شن.':'📊 آمارگیری تنها در صورت فعال‌سازی توسط سازنده انجام می‌شه.'} 🔒 پاسخ نهایی از طریق FormSubmit به دعوت‌کننده ارسال می‌شه. ایمیل مقصد: ${safe(email)}`}</p>
     ${state.demo?'<button class="btn btn-ghost" id="demoBack">↩ برگشت به ساخت دعوت</button>':''}
   </div>`;
  if(state.demo)$('#demoBack').addEventListener('click',()=>{state.mode='setup';state.demo=false;render();scrollUp();});
  $('#declineNow').addEventListener('click',()=>finish(false));
  $('#yes').addEventListener('click',()=>{trackEvent('invite_yes');trackEvent('game_started');state.mode='game';state.noClicks=0;state.index=0;state.answers=emptyAnswers();render();scrollUp();notify('اوووف! چه خبر قشنگی 😍');});
  $('#no').addEventListener('click',()=>{
    state.noClicks++;
    if(state.noClicks<=3){trackEvent('invite_no_playful_click');state.noPos=state.noClicks;renderInvite();}
    else finish(false);
  });
}
function renderGame(){
  setStage('DATE ROULETTE / '+String(state.index+1).padStart(2,'0'));
  const item=CATEGORIES[state.index];const selected=state.answers[state.index];const count=state.answers.filter(Boolean).length;
  app.innerHTML=`<div class="progress-meta"><span>مرحله <strong>${state.index+1}</strong> از ${CATEGORIES.length}</span><span>${count} انتخاب ثبت‌شده ✨</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${((state.index+1)/CATEGORIES.length)*100}%"></div></div>
    <div class="category-top"><div class="category-emoji">${item.icon}</div><h1 class="category-title">${safe(item.title)}</h1><p class="category-question">${safe(item.question)}</p></div>
    <div class="option-grid" id="choices">${item.options.map((o,i)=>`<button class="option ${selected===o?'selected':''}" data-index="${i}" aria-pressed="${selected===o?'true':'false'}">${safe(o)}</button>`).join('')}</div>
    <div class="game-foot"><button class="btn btn-secondary" id="prev" ${state.index===0?'disabled':''}>→ قبلی</button><button class="btn btn-primary" id="next">${state.index===CATEGORIES.length-1?'دیدن نتیجه 💌':'بعدی ←'}</button></div>
    <div class="game-tools"><button id="random">🎲 انتخاب شانسی</button><button id="skip">⏭️ رد کردن این دسته</button><button id="clear">↩️ پاک کردن انتخاب</button></div>
    ${selected?`<div class="mini-preview">انتخاب تو: <strong>${safe(selected)}</strong> 💗</div>`:'<div class="mini-preview">هر مرحله یه انتخاب کوچیک برای یه خاطره بزرگه ✨</div>'}`;
  $$('.option',app).forEach(b=>b.addEventListener('click',()=>{const index=Number(b.dataset.index);state.answers[state.index]=item.options[index];renderGame();}));
  $('#prev').addEventListener('click',()=>{if(state.index>0){state.index--;render();scrollUp();}});
  $('#next').addEventListener('click',()=>advance());
  $('#random').addEventListener('click',()=>{state.answers[state.index]=item.options[Math.floor(Math.random()*item.options.length)];renderGame();});
  $('#clear').addEventListener('click',()=>{state.answers[state.index]='';renderGame();});
  $('#skip').addEventListener('click',()=>{state.answers[state.index]='';advance();});
}
function $$(s,root=document){return [...root.querySelectorAll(s)];}
function advance(){if(state.index<CATEGORIES.length-1){state.index++;render();scrollUp();}else finish(true);}
function finish(accepted){
  if(!state.demo) trackEvent(accepted?'game_completed':'invite_no_final');
  state.decision=accepted?'yes':'no';state.mode='result';state.sendStatus='sending';state.sendMessage='داریم درخواست ارسال نتیجه رو ثبت می‌کنیم…';render();scrollUp();deliver();
}
function messageText(){
  const who=state.config||{sender:'',receiver:''};
  const status=state.decision==='yes'?'💖 دعوت پذیرفته شد':'🌷 دعوت پذیرفته نشد';
  const lines=[`💌 نتیجه بازی «یه قرار با من؟»`, `سازنده: 🌸گل سرحدنشین🌸`,`دعوت‌کننده: ${who.sender}`,`دعوت‌شونده: ${who.receiver}`,`نتیجه: ${status}`,`زمان: ${new Date().toLocaleString('fa-IR')}`];
  if(state.decision==='yes'){
    lines.push('',`✨ انتخاب‌های بازی (${state.answers.filter(Boolean).length} از ${CATEGORIES.length} دسته):`);
    for(let i=0;i<CATEGORIES.length;i++)lines.push(`${i+1}. ${CATEGORIES[i].icon} ${CATEGORIES[i].title}: ${state.answers[i]||'رد شد / انتخاب نشده'}`);
  }else lines.push('پاسخ «نه» پس از سه بار جابه‌جایی دکمه و انتخاب دوباره آن ثبت شد.');
  return lines.join('\n');
}
async function submitMail(email,payload){
  const controller=new AbortController();const tm=setTimeout(()=>controller.abort(),16000);
  try{const response=await fetch(`https://formsubmit.co/ajax/${email}`,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
    if(!response.ok)throw Error('سرور پاسخ مناسبی نداد.');
    const data=await response.json();
    if(data.success===false||data.success==='false')throw Error(String(data.message||'سرویس ارسال نتیجه را نپذیرفت.'));
    return data;
  }finally{clearTimeout(tm);}
}
async function deliver(){
  if(state.demo){state.sendStatus='done';state.sendMessage='👀 این فقط پیش‌نمایش بود؛ هیچ ایمیلی ارسال نشد.';renderResult();return;}
  if(state.sending)return;state.sending=true;
  state.sendStatus='sending';state.sendMessage='داریم درخواست ارسال نتیجه رو ثبت می‌کنیم…';renderResult();
  try{
    trackEvent('result_email_requested');
    await submitMail(state.config.email,{
      name:'Date Roulette — 🌸گل سرحدنشین🌸',
      _subject:`💌 نتیجه دعوت: ${state.config.receiver} — ${state.decision==='yes'?'قبول کرد 💖':'رد کرد 🌷'}`,
      'نتیجه دعوت':state.decision==='yes'?'بله 💘':'خیر 🌷',
      'نام دعوت‌کننده':state.config.sender,
      'نام دعوت‌شونده':state.config.receiver,
      'انتخاب‌های نهایی':messageText(),
      _captcha:'false',_template:'table'
    });
    trackEvent('result_email_accepted');
    state.sendStatus='done';state.sendMessage='درخواست ارسال نتیجه ثبت شد! 💌 اگر ایمیل فعال‌سازی FormSubmit رو قبلاً تأیید کرده باشن، نتیجه به صندوق دعوت‌کننده می‌رسه.';
  }catch(e){trackEvent('result_email_error');state.sendStatus='error';state.sendMessage='ارسال خودکار ناموفق بود. '+(e?.name==='AbortError'?'اتصال زمان‌بر شد.':e.message)+' می‌تونی دوباره امتحان کنی یا نتیجه رو دستی بفرستی.';}
  finally{state.sending=false;renderResult();}
}
function renderResult(){
  setStage('THE FINAL ANSWER');
  const yes=state.decision==='yes';const selected=state.answers.map((o,i)=>({title:CATEGORIES[i].title,icon:CATEGORIES[i].icon,value:o})).filter(x=>x.value);
  app.innerHTML=`<div class="result-hero"><span class="pill">${yes?'💖 دعوت پذیرفته شد':'🌷 پاسخ ثبت شد'}</span><div class="big-icon">${yes?'💑':'💐'}</div>
    <h1 class="result-title">${yes?'وای! پس دیت در راهه 😍':'ممنون که صادقانه جواب دادی 🌷'}</h1>
    <p class="subtitle">${yes?`چه سلیقه قشنگی، ${safe(state.config.receiver)}! اینم خلاصه قرار رؤیایی که ساختی. 🎀`:'نه گفتن هم کاملاً اوکیه. هیچ اجباری برای دیت وجود نداره و انتخاب تو محترمه. 💗'}</p></div>
    ${yes?`<div class="result-scroll">${selected.length?selected.map(r=>`<div class="result-row"><span class="key">${r.icon} ${safe(r.title)}</span><span class="value">${safe(r.value)}</span></div>`).join(''):'<p class="hint">بدون انتخاب هم یه جواب قشنگ ثبت شد.</p>'}</div>`:''}
    <div id="sendState" class="send-state ${safe(state.sendStatus)}" role="status">${safe(state.sendMessage)}</div>
    <div class="result-actions"><button id="copyResult" class="btn btn-primary">📋 کپی نتیجه</button><button id="mailResult" class="btn btn-secondary">✉️ ارسال دستی</button>${state.sendStatus==='error'?'<button id="retry" class="btn btn-secondary full">🔄 تلاش دوباره برای ارسال خودکار</button>':''}</div>
    ${state.demo?'<button id="demoRestart" class="btn btn-ghost btn-wide">↩ بازگشت به تنظیمات دعوت</button>':''}
    <p class="foot-mini">${yes?'آرزو می‌کنیم حسابی خوش بگذره! 🌸':'ممنون که توی بازی شرکت کردی! 🌸'}<br>ساخته‌شده توسط 🌸گل سرحدنشین🌸</p>`;
  $('#copyResult').addEventListener('click',()=>buttonCopy(messageText()));
  $('#mailResult').addEventListener('click',()=>{const subject=`نتیجه بازی دیت برای ${state.config.receiver}`;location.href=`mailto:${encodeURIComponent(state.config.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText())}`;});
  if($('#retry'))$('#retry').addEventListener('click',()=>deliver());
  if($('#demoRestart'))$('#demoRestart').addEventListener('click',()=>{state.mode='setup';state.demo=false;render();scrollUp();});
}
bootstrap();
