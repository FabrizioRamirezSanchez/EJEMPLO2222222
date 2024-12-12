# BASE DE DATOS EN MYSQL

1. [MYSQL](#mysql)
2. [Creación de base de datos](#creando-base-de-datos)
   * [Poniendo en uso la base de datos](#poniendo-el-uso-de-la-base-de-datos)
   * [Inventario de base de datos](#inventario-de-base-de-datos)
   * [Eliminando base de datos](#eliminando-base-de-datos)
3. [Tablas del sistema](#tablas-del-sistema)
   * [Tabla: donations](#tabla-donations)
   * [Tabla: product](#tabla-product)
   * [Tabla: sales](#tabla-sales)
   * [Tabla: user](#tabla-user)
4. [Creando base de datos PRO](#creacion-de-base-de-datos-pro)

---
## MYSQL

1. Este diseño de base de datos está orientado a gestionar un sistema de donaciones y ventas, alineado con los objetivos del proyecto.
2. Se estructura con tablas clave para registrar usuarios, productos, donaciones y ventas.
3. Incluye relaciones bien definidas entre las tablas mediante claves foráneas.

---

### CREANDO BASE DE DATOS

````sql
CREATE DATABASE MiyazukuDB;
````

### PONIENDO EL USO DE LA BASE DE DATOS

1. Sintaxis para poner en uso de la base de datos:

````sql
USE MiyazukuDB;
````

### INVENTARIO DE BASE DE DATOS

1. Sintaxis para listar las base de datos:

````SQL
SHOW DATABASES;
````
### ELIMINANDO BASE DE DATOS

1. Antes de eliminar una base de datos, esta no debe estar en uso.
2. Para saber que base de datos está en uso utilice: SELECT DATABASE();
3. Poner otra base de datos en uso: USE sakila;
4. Para eliminar una base de datos utilice DROP DATABASE.
5. Sintaxis para eliminar una base de datos:

````SQL
DROP DATABASE MiyazukuDB;
````

6. Verificar si se ha eliminado haciendo un listado de base de datos.

````SQL
SHOW DATABASES;
````

7. Tener presente que el eliminado es una operación irreversible.

## TABLAS DEL SISTEMA

### Tabla: donations

````sql
CREATE TABLE donations (
    id int NOT NULL COMMENT 'Identificador único de la donación',
    user_id int NOT NULL COMMENT 'Identificador del usuario que realiza la donación.',
    amount decimal(10,2) NOT NULL COMMENT 'Monto donado',
    date date NOT NULL COMMENT 'Fecha de la donación',
    CONSTRAINT respuestas_pk PRIMARY KEY (id)
) COMMENT 'Guarda el registro de las donaciones realizadas por los usuarios, indicando si la donación va destinada a una organización o directamente al proyecto.';
````

### Tabla: product

````sql
CREATE TABLE product (
    id int NOT NULL COMMENT 'Identificador único del producto',
    names varchar(8) NULL COMMENT 'Nombre del producto "MIYAZUKU"',
    description text NULL COMMENT 'Descripción del producto',
    price int NOT NULL COMMENT 'Precio de venta',
    stock int NOT NULL COMMENT 'Cantidad disponible del producto, ej. 2 o 3',
    CONSTRAINT producto_pk PRIMARY KEY (id)
) COMMENT 'Este es el producto que se va a desarrollar para promocionarlo en nuestra página web';
````

### Tabla: sales

````sql
CREATE TABLE sales (
    id int NOT NULL COMMENT 'Identificador único de la venta',
    user_id int NOT NULL COMMENT 'Identificador del usuario que realiza la compra',
    product_id int NOT NULL COMMENT 'Identificador del producto vendido',
    amount longtext NOT NULL COMMENT 'Cantidad de productos comprados',
    sale_date datetime NOT NULL COMMENT 'Fecha de la venta',
    total varchar(15) NOT NULL COMMENT 'Total de la venta (calculado como precio * cantidad)',
    CONSTRAINT sales_pk PRIMARY KEY (id)
) COMMENT 'Esta tabla contiene los registros de todas las ventas realizadas, asociando los productos comprados con los usuarios';
````

### Tabla: user

````sql
CREATE TABLE user (
    id int NOT NULL COMMENT 'Identificador del cliente',
    email varchar(100) NOT NULL COMMENT 'Correo electrónico del usuario',
    phone_number varchar(9) NOT NULL COMMENT 'Número de contacto.',
    names varchar(100) NOT NULL COMMENT 'Nombres del usuario.',
    rol_user char(1) NOT NULL COMMENT 'Indica si el usuario es (C) comprador o (D) donador.',
    CONSTRAINT usuario_pk PRIMARY KEY (id)
) COMMENT 'Guarda los datos de los usuarios de la página web, ya sea para comprar productos o donar.';
````

---
## CREACION DE BASE DE DATOS PRO

````SQL
CREATE DATABASE IF NOT EXISTS MiyazukuDB; 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_spanish_ci;
USE MiyazukuDB; 
````
---
