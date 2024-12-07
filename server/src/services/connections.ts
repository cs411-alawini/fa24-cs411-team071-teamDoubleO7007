import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('Environment variables not set!');
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "", //process.env.DB_PASSWORD,
  database: process.env.DB_NAME
  // port: 3306
});

export const db = {
  query: async <T>(query: string, params?: any[]): Promise<T[]> => {
    const [rows] = await pool.query(query, params);
    return rows as T[];
  },
  execute: async <T>(query: string, params?: any[]): Promise<T> => {
    const [result] = await pool.execute(query, params);
    return result as T;
  },
};


// const connection = await pool.getConnection();

console.log('Connected to MySQL database');
console.log(process.env.DB_HOST)


export default pool;