/**
 * MySQL
 */
import mysql from 'mysql2/promise';
import env from '../env';
import { Transaction } from '../interfaces';

class Database {
    private dbInfo: { host: string; user: string; password: string; database: string; timezone: string };
    private connection: mysql.Connection;

    constructor(host: string, user: string, password: string, database: string, timezone: string) {
        this.dbInfo = { host, user, password, database, timezone };
        this.connection = null;
    }

    async query<T>(query: string, ...args: any[]): Promise<T> {
        try {
            if (this.connection === null) {
                this.connection = await mysql.createConnection(this.dbInfo);
            }

            const result: [any, any[]] = await this.connection.query(query, args);

            return result[0] as T;
        } catch (e) {
            throw e;
        }
    }

    async transaction(queries: Transaction[]): Promise<any[]> {
        try {
            if (this.connection === null) {
                this.connection = await mysql.createConnection(this.dbInfo);
            }

            await this.connection.beginTransaction();

            const results: any[] = await Promise.all(
                queries.map(async (query) => {
                    const result = await this.connection.query(query.query, query.args);
                    return result[0];
                }),
            );

            await this.connection.commit();

            return results;
        } catch (e) {
            if (this.connection !== null) {
                await this.connection.rollback();
            }

            throw e;
        }
    }

    async close() {
        try {
            if (this.connection !== null) {
                await this.connection.end();
                this.connection = null;
            }
        } catch (e) {
            throw e;
        }
    }
}

export const DB = new Database(env.DB_ENDPOINT, env.DB_USER, env.DB_PASSWORD, env.DB_DATABASE, 'Z');
