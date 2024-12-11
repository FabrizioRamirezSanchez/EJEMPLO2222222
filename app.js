const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const HOST = '174.129.164.154'; //IP PUBLICA
const PORT = 3000;

const app = express();

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    host: 'admin.cba02oi88fu1.us-east-1.rds.amazonaws.com', // Host de la base de datos
    user: 'admin', // Usuario de la base de datos
    password: 'admin123', // Contraseña de la base de datos
    database: 'formulario_db', // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'index.html'));
});

// Ruta para obtener eventos del día actual
app.get('/api/eventos', (req, res) => {
    const query = `
        SELECT id, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, nombre_evento, ods_relacionado
        FROM Calendario
        WHERE DATE(fecha) = CURDATE()
    `;

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err.message);
            return res.status(500).json({ error: 'Error al obtener los eventos' });
        }
        res.json({ hoy: results });
    });
});

// Ruta para procesar el formulario de donación
app.post('/donar', (req, res) => {
    const { nombre, telefono, email, donacion } = req.body;

    if (!nombre || !telefono || !email || !donacion) {
        return res.status(400).json({ success: false, message: 'Faltan campos obligatorios.' });
    }

    const query = 'INSERT INTO formulario_db (nombre, telefono, email, donacion) VALUES (?, ?, ?, ?)';
    pool.query(query, [nombre, telefono, email, donacion], (err) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err.message);
            return res.status(500).json({ success: false, message: 'Error al guardar los datos.' });
        }
        res.json({ success: true, message: 'Donación registrada con éxito. ¡Gracias!' });
    });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    pool.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err.message);
            return res.status(500).json({ success: false, message: 'Error del servidor' });
        }

        if (results.length > 0) {
            res.json({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
});

// Ruta de registro
app.post('/register', (req, res) => {
    const { nombre_completo, email, username, password } = req.body;

    if (!username || !password || !email || !nombre_completo) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario o el correo ya existen
    const checkQuery = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    pool.query(checkQuery, [username, email], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error al verificar usuario:', checkErr.message);
            return res.status(500).json({ success: false, message: 'Error al verificar usuario' });
        }

        if (checkResults.length > 0) {
            return res.status(400).json({ success: false, message: 'El usuario o email ya existe' });
        }

        // Si no existe, proceder con el registro
        const insertQuery = 'INSERT INTO usuarios (nombre_completo, email, username, password) VALUES (?, ?, ?, ?)';
        pool.query(insertQuery, [nombre_completo, email, username, password], (insertErr) => {
            if (insertErr) {
                console.error('Error al registrar usuario:', insertErr.message);
                return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
            }
            res.json({ success: true, message: 'Usuario registrado correctamente' });
        });
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});


