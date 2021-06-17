/**
 * /
 */
import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200);
        res.end();
    } catch (e) {
        next(e);
    }
});

export default router;
