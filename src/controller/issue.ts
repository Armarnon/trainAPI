import { Request, Response, Router } from 'express';
//import { mysqlDB } from '../shared/mysql-db';
import * as excel from 'excel4node';
import { UserService } from '../shared/user';

const router: Router = Router();

router.get('/excel', (req: Request, res: Response) => {
    //     let sql = `
    //     SELECT 
    //     user_code as "userCode"
    //     , user_title as "userTitle"
    //     , user_first_name as "userName"
    //     , user_last_name as "userLastName"
    //     , user_email as "userEmail"
    //     , user_tel as "userTel"
    // from sc_user;
    //     `;

    UserService.list((err, result) => {

        if (err) {
            res.json(err);
        } else {
            var wb = new excel.Workbook();
            var ws = wb.addWorksheet('All User');
            for (let i = 0; i < result.length; i++) {

                ws.cell(i + 1, 1).string(result[i].userCode);
                ws.cell(i + 1, 2).string(result[i].userTitle);
                ws.cell(i + 1, 3).string(result[i].userName);
                ws.cell(i + 1, 4).string(result[i].userLastName);
                ws.cell(i + 1, 5).string(result[i].userEmail);
                ws.cell(i + 1, 6).string(result[i].userTel);

                // .style({
                //     font: {
                //         bold: true
                //     }
                // });

            }
            wb.write("issue.xlsx", res);
        }

    });


});

export const IssueController: Router = router;