// 1. Inisialisasi Animate On Scroll (AOS)
AOS.init({
  duration: 800,
  once: false,
  mirror: true
});

// 2. Toggle Sidebar Navigasi
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
  }
}

// 3. Password Rahasia & Pop-up Handling
const OWNER_PASSWORD = "mommon"; // Password khusus Lury (Bisa kamu ganti)
let modeUpload = ""; // Menentukan apakah sedang mau upload 'foto' atau 'musik'

function bukaModalPassword(mode) {
  modeUpload = mode;
  document.getElementById("passwordModal").style.display = "flex";
  document.getElementById("passInput").value = "";
  document.getElementById("uploadFormArea").style.display = "none";
  document.getElementById("btnSubmit").setAttribute("onclick", "verifikasiPassword()");
  document.getElementById("btnSubmit").innerText = "Masuk";
}

function tutupModal() {
  document.getElementById("passwordModal").style.display = "none";
}

function verifikasiPassword() {
  const pass = document.getElementById("passInput").value;
  if (pass === OWNER_PASSWORD) {
    alert("Akses Diterima! Silakan isi data di bawah!");
    document.getElementById("uploadFormArea").style.display = "block";
    document.getElementById("btnSubmit").setAttribute("onclick", "eksekusiTambahContent()");
    document.getElementById("btnSubmit").innerText = "Simpan";
  } else {
    alert("Password salah! Eits, ini khusus Lury 😜");
  }
}

function eksekusiTambahContent() {
  const caption = document.getElementById("inputCaption").value;
  
  if (modeUpload === "foto") {
    if (caption === "") {
      alert("Isi caption-nya dulu ya!");
      return;
    }
    const gallery = document.getElementById("photoGallery");
    const newCard = document.createElement("div");
    newCard.className = "photo-card";
    newCard.innerHTML = `
      <img src="https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100)}" alt="Photo">
      <p class="caption">${caption}</p>
    `;
    gallery.appendChild(newCard);
    alert("Foto berhasil ditambahkan!");
  } else if (modeUpload === "musik") {
    if (caption === "") {
      alert("Isi nama lagunya dulu ya!");
      return;
    }
    document.getElementById("songTitle").innerText = caption;
    document.getElementById("songArtist").innerText = "Uploaded by Lury";
    alert("Lagu berhasil diperbarui!");
  }

  tutupModal();
}

// 4. Data Stories 3 Karakter
const storiesData = {
  karakter1: {
    title: "Karakter A: Jejak Sunyi",
    chapter: "Bab 1: Awal Pembuktian",
    text: "Di tengah riuh kata-kata yang menyudutkan, ia memilih diam. Bukan karena menyerah, melainkan sedang merancang sepuluh langkah melompat ke depan..."
  },
  karakter2: {
    title: "Karakter B: Melodi Dalam Gelap",
    chapter: "Bab 1: Sentuhan Pertama",
    text: "Dentingan kalimba di malam hari menyuarakan isi kepala yang terlalu ramai. Sebuah kisah tentang menemukan warna di balik gulita..."
  },
  karakter3: {
    title: "Karakter C: Pemimpi Dini Hari",
    chapter: "Bab 1: Kota yang Tertidur",
    text: "Ketika semua orang tertidur lelap, layarnya tetap menyala. Di sinilah petualangan baru dimulai..."
  }
};

function pilihKarakter(karakterKey) {
  // Update class active pada button
  const buttons = document.querySelectorAll('.char-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Update isi cerita
  const story = storiesData[karakterKey];
  const display = document.getElementById("storyDisplay");
  
  display.innerHTML = `
    <h3>${story.title}</h3>
    <span class="badge-chapter">${story.chapter}</span>
    <p>${story.text}</p>
  `;
}