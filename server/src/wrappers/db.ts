/**
 * DB wrappers
 */
import { DB } from '../utils';
import { Meeting } from '../interfaces';

/**
 * Get a meeting
 * @param id Meeting ID
 */
export const getMeeting = async (id: string): Promise<Meeting> => {
    try {
        const meetings = await DB.query<Meeting[]>(
            `
            SELECT *
            FROM Meeting
            WHERE id = ?
            LIMIT 1
            `,
            id,
        );

        return meetings[0] ?? null;
    } catch (e) {
        throw e;
    }
};
