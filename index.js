const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ IMPORTER

const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors()); // ✅ ACTIVER CORS ICI
app.use(express.json());

// 🔗 Connexion à MongoDB Atlas
mongoose.connect('mongodb+srv://sanaebahloulisf:h9J52CPHvtb8xza2@cluster0.oaayf1c.mongodb.net/todoapp?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connecté à MongoDB Atlas'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

app.use('/api', taskRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('✅ Serveur Express connecté à MongoDB !');
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
