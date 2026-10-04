/* Bakso Boom Enggal Kasmaran - interaksi */
(function () {
  'use strict';
  var D = window.BAKSO || { menu: [], minPorsi: 50, waNumber: '' };
  var root = document.documentElement;

  /* ---------- Tema terang/gelap ---------- */
  var temaBtn = document.querySelector('.tema-btn');
  function temaSekarang() {
    var t = root.getAttribute('data-tema');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'gelap' : 'terang';
  }
  if (temaBtn) {
    temaBtn.addEventListener('click', function () {
      var baru = temaSekarang() === 'gelap' ? 'terang' : 'gelap';
      root.setAttribute('data-tema', baru);
      try { localStorage.setItem('tema', baru); } catch (e) {}
    });
  }

  /* ---------- Navigasi HP ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var buka = nav.classList.toggle('buka');
      toggle.setAttribute('aria-expanded', String(buka));
    });
  }

  /* ---------- Kalkulator pesanan acara ---------- */
  var kalk = document.getElementById('kalkulator');
  if (!kalk) return;

  var harga = {}, hitung = {}, namaMenu = {};
  D.menu.forEach(function (m) { harga[m.id] = m.harga; hitung[m.id] = m.hitungPorsi; namaMenu[m.id] = m.nama; });

  var elPorsi = document.getElementById('total-porsi');
  var elHarga = document.getElementById('total-harga');
  var elStatus = document.getElementById('status-min');
  var btnSalin = document.getElementById('salin');
  var btnWa = document.getElementById('kirim-wa');
  var btnReset = document.getElementById('reset');
  var inNama = document.getElementById('nama-pemesan');
  var inTgl = document.getElementById('tgl-acara');

  function rp(n) { return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  function jumlah(baris) {
    var v = parseInt(baris.querySelector('input').value, 10);
    return isNaN(v) || v < 0 ? 0 : v;
  }

  function hitungSemua() {
    var porsi = 0, total = 0, daftar = [];
    kalk.querySelectorAll('.baris').forEach(function (b) {
      var id = b.getAttribute('data-id'), q = jumlah(b);
      if (!q) return;
      total += q * harga[id];
      if (hitung[id]) porsi += q;
      daftar.push({ nama: namaMenu[id], q: q, sub: q * harga[id] });
    });
    return { porsi: porsi, total: total, daftar: daftar };
  }

  function ringkasan(h) {
    var baris = ['Pesanan acara - ' + D.nama];
    if (inNama.value.trim()) baris.push('Pemesan: ' + inNama.value.trim());
    if (inTgl.value) baris.push('Tanggal acara: ' + inTgl.value);
    baris.push('');
    h.daftar.forEach(function (d) { baris.push('- ' + d.nama + ' x ' + d.q + ' = ' + rp(d.sub)); });
    baris.push('');
    baris.push('Total porsi: ' + h.porsi);
    baris.push('Perkiraan total: ' + rp(h.total));
    return baris.join('\n');
  }

  function render() {
    var h = hitungSemua();
    elPorsi.textContent = h.porsi;
    elHarga.textContent = rp(h.total);
    var kurang = D.minPorsi - h.porsi;
    if (kurang > 0) {
      elStatus.className = 'status kurang-min';
      elStatus.textContent = 'Minimal ' + D.minPorsi + ' porsi. Kurang ' + kurang + ' porsi lagi.';
    } else {
      elStatus.className = 'status cukup';
      elStatus.textContent = 'Jumlah sudah memenuhi minimal pesanan acara.';
    }
    var siap = kurang <= 0;
    btnSalin.disabled = !siap;
    if (D.waNumber) {
      btnWa.hidden = !siap;
      btnWa.href = 'https://wa.me/' + D.waNumber + '?text=' + encodeURIComponent(ringkasan(h));
    }
  }

  kalk.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var baris = b.closest('.baris'), inp = baris.querySelector('input');
    var q = jumlah(baris);
    if (b.classList.contains('tambah')) q += (e.shiftKey ? 10 : 1);
    if (b.classList.contains('kurang')) q = Math.max(0, q - (e.shiftKey ? 10 : 1));
    inp.value = q;
    render();
  });
  kalk.addEventListener('input', render);
  inNama.addEventListener('input', render);
  inTgl.addEventListener('input', render);

  btnSalin.addEventListener('click', function () {
    var teks = ringkasan(hitungSemua());
    var label = btnSalin.textContent;
    function ok() { btnSalin.textContent = 'Tersalin!'; setTimeout(function () { btnSalin.textContent = label; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(teks).then(ok, function () { window.prompt('Salin ringkasan pesanan:', teks); });
    } else {
      window.prompt('Salin ringkasan pesanan:', teks);
    }
  });

  btnReset.addEventListener('click', function () {
    kalk.querySelectorAll('input').forEach(function (i) { i.value = 0; });
    inNama.value = ''; inTgl.value = '';
    render();
  });

  render();
})();
