import * as nodeCron from "node-cron";

console.log("job scheduler has been start... ");

nodeCron.schedule("35 15 * * *",()=>{
    console.log("run on node-cron "+ new Date());
});