// Init AOS
AOS.init({ duration: 800, once: true });

// Toggle Like Button Instagram Card
function toggleLike(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('liked')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
}

// Template Karakter Data
const templateKarakter = {
    karakter1: {
        nama: "Nama Karakter 1",
        chapter: "Side Bab: Chapter 1",
        foto: "https://via.placeholder.com/220x280/1a1a2e/ffffff?text=Foto+Karakter+1",
        cerita: "(Teks cerita Karakter 1 masih kosong. Siap diisi nanti!)"
    },
    karakter2: {
        nama: "Nama Karakter 2",
        chapter: "Side Bab: Chapter 2",
        foto: "https://via.placeholder.com/220x280/1a1a2e/ffffff?text=Foto+Karakter+2",
        cerita: "(Teks cerita Karakter 2 masih kosong. Siap diisi nanti!)"
    },
    karakter3: {
        nama: "Nama Karakter 3",
        chapter: "Side Bab: Chapter 3",
        foto: "https://via.placeholder.com/220x280/1a1a2e/ffffff?text=Foto+Karakter+3",
        cerita: "(Teks cerita Karakter 3 masih kosong. Siap diisi nanti!)"
    }
};

function pilihKarakter(key, element) {
    const buttons = document.querySelectorAll('.char-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');

    const data = templateKarakter[key];
    if (data) {
        document.getElementById('charName').innerText = data.nama;
        document.getElementById('charChapter').innerText = data.chapter;
        document.getElementById('charPhoto').src = data.foto;
        document.getElementById('charStory').innerHTML = `<p>${data.cerita}</p>`;
    }
}

// Playlist & Music Player
const playlist = [
    {
        judul: "Retro Cyber Vibe",
        artis: "Lury Sound Lab",
        tahun: 2024,
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        lirik: "Langkah di bawah sinar neon malam...\nDesir angin membawa melodi rahasia..."
    },
    {
        judul: "Midnight Acoustic",
        artis: "Acoustica Team",
        tahun: 2023,
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        lirik: "Petikan gitar di tengah dingin malam...\nMengingatkan pada kenangan lama..."
    }
];

let currentSongIndex = 0;
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const vinyl = document.getElementById('vinylRecord');
const progressBar = document.getElementById('progressBar');

function loadSong(index) {
    const song = playlist[index];
    document.getElementById('songTitle').innerText = song.judul;
    document.getElementById('songArtist').innerText = ` Artis: ${song.artis}`;
    document.getElementById('songYear').innerText = ` Tahun Rilis: ${song.tahun}`;
    document.getElementById('albumCover').src = song.cover;
    document.getElementById('albumCoverCenter').src = song.cover;
    document.getElementById('songLyrics').innerText = song.lirik;
    audio.src = song.audioSrc;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        vinyl.classList.add('spinning');
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        vinyl.classList.remove('spinning');
    }
}

playBtn.addEventListener('click', togglePlay);

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    vinyl.classList.add('spinning');
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    vinyl.classList.add('spinning');
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        document.getElementById('currentTime').innerText = formatTime(audio.currentTime);
        document.getElementById('durationTime').innerText = formatTime(audio.duration);
    }
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

loadSong(currentSongIndex);