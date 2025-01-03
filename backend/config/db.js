import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createConnection() {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.error('Database connection failed:', err.stack);
        throw err;
    }
}

export default createConnection;
