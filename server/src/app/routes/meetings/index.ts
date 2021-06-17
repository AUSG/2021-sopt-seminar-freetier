/**
 * /meetings
 */
import { Router, Request, Response, NextFunction } from 'express';
import { checkData, createRandomString, PCA, throwError } from '../../../utils';
import { getMeeting } from '../../../wrappers';
import { Meeting, ResultSetHeader } from '../../../interfaces';
import { DB } from '../../../utils';

const router: Router = Router({ mergeParams: true });

// 미팅 목록
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meetings: Meeting[] = await DB.query<Meeting[]>('SELECT * FROM Meeting ORDER BY end DESC');

        const liveMeetings: Meeting[] = meetings.filter((meeting) => meeting.end === null);
        const closedMeetings: Meeting[] = meetings.filter((meeting) => meeting.end !== null);

        res.status(200);
        res.json({ liveMeetings, closedMeetings });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 미팅 생성
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name }: { name: string } = req.body;

        if (!checkData(name)) {
            throwError('Bad Request', 400);
        }

        const room = await PCA.createRoom('private', name, 'default');
        const current = new Date();

        const meeting: Meeting = {
            id: createRandomString(16),
            name,
            roomId: room.id,
            start: current,
            end: null,
            participants: null,
            createdAt: current,
            updatedAt: current,
        };

        await DB.query<ResultSetHeader>(
            'INSERT INTO Meeting(id, name, roomId, start) VALUES(?, ?, ?, ?)',
            meeting.id,
            meeting.name,
            meeting.roomId,
            meeting.start,
        );

        res.status(200);
        res.json({ meeting });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 미팅 입장
router.post('/:meetingId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { meetingId } = req.params;
        const { name }: { name: string } = req.body;

        if (!checkData(name)) {
            throwError('Bad Request', 400);
        }

        const meeting: Meeting = await getMeeting(meetingId);

        if (checkData(meeting)) {
            throwError('Bad Request', 400);
        }

        const userId = createRandomString(16);

        const user = await PCA.createUser(userId, name);
        const member = await PCA.addMember(meeting.roomId, user.user_id);

        const url = `https://app.pagecall.net/${member.room_id}?access_token=${member.access_token}`;

        res.status(200);
        res.json({ url });
        res.end();
    } catch (e) {
        next(e);
    }
});

// 미팅 종료
router.put('/:meetingId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { meetingId } = req.params;

        const meeting: Meeting = await getMeeting(meetingId);

        if (checkData(meeting)) {
            throwError('Bad Request', 400);
        }

        const { room } = await PCA.updateRoom(meeting.roomId, true);

        const current = new Date();

        meeting.end = current;
        meeting.updatedAt = current;
        meeting.participants = room.members.length;

        await DB.query('UPDATE Meeting SET end = ?, participants = ? WHERE id = ?', meeting.end, meeting.participants, meeting.id);

        res.status(200);
        res.json({ meeting });
        res.end();
    } catch (e) {
        next(e);
    }
});

export default router;
