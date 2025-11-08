const items = $input.all();

function findSender(obj) {
  if (!obj || typeof obj !== 'object') return null;

  const directKeys = ['from','author','sender','wa_id','remoteJid','phone'];
  for (const k of directKeys) {
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === k.toLowerCase() && obj[key]) return obj[key];
    }
  }

  if (obj.messages && Array.isArray(obj.messages) && obj.messages.length) {
    const m = obj.messages[0];
    for (const k of ['from','author','id','wa_id']) {
      if (m[k]) return m[k];
      if (m.context && m.context[k]) return m.context[k];
    }
    if (m.contacts && Array.isArray(m.contacts) && m.contacts[0]) {
      if (m.contacts[0].wa_id) return m.contacts[0].wa_id;
      if (m.contacts[0].phone) return m.contacts[0].phone;
    }
  }

  for (const val of Object.values(obj)) {
    if (typeof val === 'object') {
      const found = findSender(val);
      if (found) return found;
    }
  }
  return null;
}

function normalizePhone(raw) {
  if (!raw) return null;
  if (typeof raw === 'object') {
    if (raw.wa_id) raw = raw.wa_id;
    else if (raw.id) raw = raw.id;
    else raw = JSON.stringify(raw);
  }

  let digits = String(raw).replace(/\D/g, '');
  if (!digits) return null;
  digits = digits.replace(/@.*$/, '');
  if (digits.startsWith('0')) digits = '62' + digits.slice(1);
  if (digits.startsWith('8')) digits = '62' + digits;
  return digits;
}

const parsedData = items.map(item => {
  const body = item.json?.messages?.[0]?.text?.body || item.json?.body || '';
  const data = {};

  // Ambil nomor WA pengirim dari payload
  const rawSender = findSender(item.json);
  const normalizedSender = normalizePhone(rawSender);

  // Parse pesan teks jadi key:value
  const lines = String(body).split("\n").map(l => l.trim()).filter(l => l);
  lines.forEach((line) => {
    const [keyPart, ...rest] = line.split(":");
    if (!rest.length) return;
    const key = keyPart.trim();
    let value = rest.join(":").trim();
    value = value.replace(/Setiap/gi, "").replace(/menit/gi, "").trim();
    data[key] = value || null;
  });

  // Tambahkan Nomor Whatsapp
  if (normalizedSender) {
    data["Nomor Whatsapp"] = normalizedSender;
  } else if (data["Nomor Whatsapp"]) {
    data["Nomor Whatsapp"] = normalizePhone(data["Nomor Whatsapp"]);
  } else {
    data["Nomor Whatsapp"] = null;
  }

  return { json: data };
});

// ✅ Return array berisi objek { json: ... }
return parsedData;
