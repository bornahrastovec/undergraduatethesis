// 0 0 * * * --> crontab
const {CronJob} = require('cron');

const scraper = require('./scraper');

console.log("Scheduler started");

const fetchArticlesJob = new CronJob("0 0 * * *", async () => {
    console.log("Fetching articles...");
    await scraper.run();
})

fetchArticlesJob.start();