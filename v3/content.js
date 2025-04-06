// إرسال إشعار عبر WhatsApp عندما يتم العثور على الكلمة المفتاحية
function sendWhatsAppNotification(keyword) {
  chrome.runtime.sendMessage({
    type: 'sendMessage',
    keyword: keyword
  });
}

// البحث في محتوى الصفحة
function searchInElement(element, keywords) {
  const bodyText = element.textContent || element.innerText;
  let foundKeywords = [];

  // البحث عن جميع الكلمات المفتاحية
  for (let keyword of keywords) {
    if (bodyText.toLowerCase().includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword); // إضافة الكلمة إلى القائمة
      console.log(`🔍 تم العثور على الكلمة المفتاحية: ${keyword}`);
    }
  }
  return foundKeywords; // إرجاع قائمة بالكلمات التي تم العثور عليها
}

// البحث في الصفحة الرئيسية والإطارات (iframes)
function searchCheckIn() {
  const keywords = [
    "date", "jour",
    "day", "jour",
    "casablanca", "Casablanca",
    "number", "numéro",
    "spaces", "espaces",
    "register", "s'inscrire",
    "online", "en ligne",
    "april", "avril",
    "adress", "adresse",
    "seats", "sièges",
    "free", "gratuit",
    "year", "année",
    "actions", "actions",
    
    "accompaniment", "accompagnement"
];

  let foundKeywords = searchInElement(document.body, keywords);

  // البحث في الإطارات (iframes) إذا لم يتم العثور على كلمات في الصفحة الرئيسية
  if (foundKeywords.length === 0) {
    const iframes = document.getElementsByTagName('iframe');
    for (let iframe of iframes) {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        foundKeywords = foundKeywords.concat(searchInElement(iframeDocument.body, keywords)); // دمج الكلمات المكتشفة
        if (foundKeywords.length > 0) break;
      } catch (e) {
        console.log('⚠️ لم يتمكن من الوصول إلى iframe بسبب سياسة نفس الأصل.');
      }
    }
  }

  // إرسال إشعارات عبر WhatsApp لكل كلمة مفتاحية تم العثور عليها
  if (foundKeywords.length > 0) {
    foundKeywords.forEach(keyword => {
      sendWhatsAppNotification(keyword);
    });
  } else {
    console.log('❌ لم يتم العثور على أي من الكلمات المفتاحية.');
  }
}

// البحث كل 0.5 ثانية
setInterval(searchCheckIn, 500);

// إعادة تحميل الصفحة كل 11 ثانية
setInterval(() => {
  console.log('🔄 جاري إعادة تحميل الصفحة...');
  window.location.reload();
}, 11000);
