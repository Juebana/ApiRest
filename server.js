const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const app = express();

// Configuración del archivo de logs
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });

// Configuración de CORS
const allowedOrigins = ['http://localhost:3000', 'http://mi-sitio.com']; 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware para manejar JSON
app.use(express.json());

app.use(morgan('combined', { stream: logStream })); // Registrar logs en server.log

// Middleware para manejar errores
app.use((err, req, res, next) => {
  fs.appendFileSync(
    path.join(__dirname, 'server.log'),
    `Error: ${err.message} at ${new Date().toISOString()}\n`
  );
  res.status(500).json({ error: 'Internal Server Error' });
});

// Rutas
app.use('/api/v1/books', require('./routes/books'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/relations', require('./routes/relations'));

// Iniciar el servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
