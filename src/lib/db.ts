import mysql from 'mysql2/promise';

let pool: mysql.Pool;

function getPool() {
  if (!pool) {
    const connectionString = `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT || 3306}/${process.env.MYSQL_DATABASE}`
    pool = mysql.createPool(connectionString);
  }
  return pool;
}

export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  const db = getPool();
  const [results] = await db.execute(sql, params);
  return results as T;
}
