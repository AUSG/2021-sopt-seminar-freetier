/**
 * /
 */
import { Router, Request, Response, NextFunction } from 'express';

import meetings from './meetings';

const router: Router = Router({ mergeParams: true });

router.use('/meetings', meetings);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200);
        res.end();
    } catch (e) {
        next(e);
    }
});

router.get('/ping', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200);
        res.send('pong');
        res.end();
    } catch (e) {
        next(e);
    }
});

export default router;
