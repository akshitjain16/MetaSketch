export const JWT_PASSWORD = "123aba321";

export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost', // Use the PostgreSQL container's hostname
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '000000',
    database: process.env.DB_NAME || 'metasketch',
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
  },
};