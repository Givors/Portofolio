const express = require('express');
const app = express();
const PORT = 3000;

// Endpoint / rute utama
app.get('/', (req, res) => {
    res.send('Halo! Server Node.js + Express kamu udah jalan 🚀');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});