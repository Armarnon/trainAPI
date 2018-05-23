import { Request, Response, Router } from 'express';
//import { mysqlDB } from '../shared/mysql-db';
import * as excel from 'excel4node';
import { UserService } from '../shared/user';
import * as multer from 'multer';
import * as config from 'config';
import * as nodemailer from 'nodemailer';

const router: Router = Router();
var diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.get("UPLOAD_PATH"))
    },
    filename: function (req, file, cb) {
        //file.originalname
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({
    storage: diskStorage
});
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

router.post("/attach/:id", upload.single("attach"), (req: Request, res: Response) => {
    res.json({
        success: true
    });
});

router.post("/sendEmail/:id",(req: Request, res: Response)=>{
    let email = nodemailer.createTransport(config.get("smtp"));

    email.sendMail({
        subject: "ARM Hello from node.js",
        to: "angkhana.lil94@gmail.com",
        html: "<b>Hello From Node.js</b>"
        ,
        attachments: [{
            path: "uploads/attach-4646566.jpg"
        }]
    },(err, result)=>{
        if(err){
            res.json(err);
        }else{
            res.json({
                success: true
            });
        }
    });
});



export const IssueController: Router = router;