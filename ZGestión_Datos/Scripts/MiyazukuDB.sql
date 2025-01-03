-- ELIMINAR Y CREAR LA BASE DE DATOS
DROP DATABASE IF EXISTS dbGamarraMarket;
CREATE DATABASE dbGamarraMarket DEFAULT CHARACTER SET utf8mb4;
USE dbGamarraMarket;

-- TABLA: CLIENTE
CREATE TABLE CLIENTE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento CHAR(3) NOT NULL,
    numero_documento CHAR(15) NOT NULL UNIQUE,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(90) NOT NULL,
    email VARCHAR(80),
    celular CHAR(9),
    fecha_nacimiento DATE,
    activo BOOLEAN DEFAULT TRUE
);

-- TABLA: VENDEDOR
CREATE TABLE VENDEDOR (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_documento CHAR(3) NOT NULL,
    numero_documento CHAR(15) NOT NULL UNIQUE,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(90) NOT NULL,
    salario DECIMAL(8,2) NOT NULL,
    celular CHAR(9),
    email VARCHAR(80),
    activo BOOLEAN DEFAULT TRUE
);

-- TABLA: PRENDA
CREATE TABLE PRENDA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(90) NOT NULL,
    marca VARCHAR(60) NOT NULL,
    cantidad INT NOT NULL,
    talla VARCHAR(10) NOT NULL,
    precio DECIMAL(8,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- TABLA: VENTA
CREATE TABLE VENTA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    cliente_id INT NOT NULL,
    vendedor_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES CLIENTE(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (vendedor_id) REFERENCES VENDEDOR(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TABLA: VENTA_DETALLE
CREATE TABLE VENTA_DETALLE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    venta_id INT NOT NULL,
    prenda_id INT NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES VENTA(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (prenda_id) REFERENCES PRENDA(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CONSULTA DE RELACIONES ENTRE TABLAS
SELECT 
    kcu.CONSTRAINT_NAME AS 'Nombre de Relación',
    kcu.REFERENCED_TABLE_NAME AS 'Tabla Padre',
    kcu.REFERENCED_COLUMN_NAME AS 'Primary Key',
    kcu.TABLE_NAME AS 'Tabla Hija',
    kcu.COLUMN_NAME AS 'Foreign Key'
FROM 
    information_schema.KEY_COLUMN_USAGE AS kcu
WHERE 
    kcu.TABLE_SCHEMA = 'dbGamarraMarket' 
    AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;

-- LISTAR LAS TABLAS
SHOW TABLES;

-- DESCRIPCIONES DE TABLAS
DESCRIBE CLIENTE;
DESCRIBE VENDEDOR;
DESCRIBE PRENDA;
DESCRIBE VENTA;