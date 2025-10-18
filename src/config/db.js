// import pkg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();

// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// export default pool;

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',         // username default PostgreSQL
  host: 'localhost',
  database: 'postgres',     // atau ganti sesuai nama database kamu
  password: '77777', // ganti dengan password PostgreSQL kamu
  port: 5432,
});

export default pool;
