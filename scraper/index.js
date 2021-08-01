const pupeteer = require('puppeteer');
const fs = require('fs');

var articles = [];

module.exports.run = async () => {
    console.log("Scraper started");
    const browser = await pupeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--window-size=1920x1080',
            '--proxy-server="direct://"',
            '--proxy-bypass-list=*'
        ]
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'")
    await page.goto("http://mentalnozdravlje.com.hr/category/clanci/");

    const blogTitles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".blog-title"))
            .map(title => title.innerText.trim())
    })

    const shortDescriptions = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".blog.content"))
            .map(text => text.innerText.trim())
    })

    const blogImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".gdl-image img"))
            .map(link => link.getAttribute("src"));
    })

    const blogContinueReading = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".blog-continue-reading"))
            .map(link => link.getAttribute("href"))
    })

    console.log(blogTitles);
    console.log(blogImages);
    console.log(blogContinueReading);
    for (let i = 0; i < blogTitles.length; i++) {
        console.log("Reading blog title: ", blogTitles[i])
        console.log(`a[href='${blogContinueReading[i].toString()}']`);
        try {
            console.log(blogContinueReading[i]);
            await page.goto(blogContinueReading[i].toString());

            const date = await page.evaluate(() => {
                return document.querySelector(".blog-date-wrapper").textContent;
            })

            const text = await page.evaluate(() => {
                return document.querySelector(".blog-content").innerHTML;
            })

            const blogPost = new BlogPost(i, blogTitles[i], shortDescriptions[i], date, text, blogImages[i]);

            console.log("NEW BLOGPOST: ", blogPost)
            articles.push(blogPost);

            console.log("Works page!");

        } catch (err) {
            console.log(err)
        }
        await page.goBack();
    }

    writeFilesToJson(articles);

    console.log("Scraped articles: ", articles);

    await browser.close();

};

function writeFilesToJson(articles) {
    fs.writeFile("../client/src/assets/articles.json", JSON.stringify(articles), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
    console.log("Successfully wrote articles to json");
}


class BlogPost {
    constructor(id, title, shortDescription, date, text, imgUrl) {
        this.id = id,
            this.title = title,
            this.shortDescription = shortDescription,
            this.date = date,
            this.text = text,
            this.imgUrl = imgUrl
    }
}