/*
 * @Author: vyron
 * @Date: 2021-08-15 13:27:58
 * @LastEditTime: 2021-08-29 10:21:53
 * @LastEditors: vyron
 * @Description: 定时任务
 * @FilePath: /wechat-bot/src/utils/schedule/index.ts
 */
import { scheduleJob } from "node-schedule";
/**
    rule 
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
 */

export const setScheduleJob = scheduleJob;
