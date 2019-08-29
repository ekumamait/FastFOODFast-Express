import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL
  });
  
  pool.connect(() => {
    console.log('connected to the db');
  });

export const query = (text, params) => {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
  
/**
 * Create Orders Table
 */
export const createOrdersTable = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        orders(
          order_id UUID PRIMARY KEY,
          location TEXT NOT NULL,
          quantity INT NOT NULL,
          status TEXT NOT NULL,
          user_id UUID NOT NULL,
          order_date TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )`;
  
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

  /**
 * Create Users Table
 */
export const createUsersTable = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        users(
          user_id UUID PRIMARY KEY,
          user_name TEXT NOT NULL,
          user_email VARCHAR(128) UNIQUE NOT NULL,
          user_password VARCHAR(128) NOT NULL,
          admin BOOLEAN NOT NULL
        )`;
  
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }


/**
 * Drop Orders Table
 */
export const dropOrdersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS orders returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Users Table
 */
export const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create All Tables
 */
export const createAllTables = () => {
  createUserTable();
  createOrdersTable();
}

/**
 * Drop All Tables
 */
export const dropAllTables = () => {
  dropUserTable();
  dropOrdersTable();
}

// pool.connect(() => {
//   console.log('client removed');
//   process.exit(0);
// });

  module.exports = {
    createOrdersTable,
    createUsersTable,
    createAllTables,
    dropUsersTable,
    dropOrdersTable,
    dropAllTables,
    query
  };

  require('make-runnable');