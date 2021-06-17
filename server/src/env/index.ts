/**
 * Enviromnent Variable Preset for Performance
 */
const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const DB_ENDPOINT = process.env.DB_ENDPOINT;

const DB_DATABASE = process.env.DB_DATABASE;

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

const PAGECALL_KEY = process.env.PAGECALL_KEY;

const envs = {
    NODE_ENV,
    PORT,
    DB_DATABASE,
    DB_ENDPOINT,
    DB_USER,
    DB_PASSWORD,
    PAGECALL_KEY,
};

export default envs;
