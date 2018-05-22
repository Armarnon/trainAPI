import { Router, Request, Response } from 'express';
//import { mysqlDB } from '../shared/mysql-db';
import { jwt } from '../shared/auth';
import { UserService } from '../shared/user';

const router = Router();
router.get('', jwt.authenticate(), (req: Request, res: Response) => {
    //console.log("dsadsd");
    // mysqlDB.query('SELECT * FROM sc_user', (err, result) => {
    //     if (err) {
    //         res.json(err);
    //     } else {
    //         res.json(result);
    //     }

    // });

    UserService.list((err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });

});

export const UserController: Router = router;