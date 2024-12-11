// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { nombre_completo, email, username, password } = req.body;

    // Verificar si el usuario o correo ya existen
    const checkQuery = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    connection.query(checkQuery, [username, email], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error al verificar usuario:', checkErr);
            return res.status(500).json({ success: false, message: 'Error al verificar usuario' });
        }

        if (checkResults.length > 0) {
            return res.status(400).json({ success: false, message: 'El usuario o email ya existe' });
        }

        // Si no existe, proceder con el registro
        const insertQuery = 'INSERT INTO usuarios (nombre_completo, email, username, password) VALUES (?, ?, ?, ?)';
        
        connection.query(insertQuery, [nombre_completo, email, username, password], (insertErr, insertResults) => {
            if (insertErr) {
                // Aquí agregamos más detalles del error como el código y mensaje
                console.error('Error al registrar usuario:', insertErr.code); // Agregar más detalles del error
                return res.status(500).json({ success: false, message: 'Error al registrar usuario', error: insertErr.message });
            }

            // Si todo está bien, devolvemos la respuesta exitosa
            res.json({ success: true, message: 'Usuario registrado con éxito' });
        });
    });
});
