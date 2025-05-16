// main.js
const { launchBrowser } = require("./browser");
const { scrapeNovelDetails, scrapeChapters } = require("./scraper");
const { 
  insertNovel, 
  insertChapters, 
  checkNovelExists,
  getLatestChapterNumber,
  closeDbConnection
} = require("./DatabaseOperations");

// Main execution function
async function main() {

    const urls = [
    "https://www.mvlempyr.com/novel/reincarnated-into-a-new-world-as-a-vampire",
    "https://www.mvlempyr.com/novel/reincarnated-into-a-werewolf-the-demon-lord-servants",
    "https://www.mvlempyr.com/novel/reincarnated-lord-i-can-upgrade-everything",
    "https://www.mvlempyr.com/novel/reincarnated-to-evolve-my-bee-empire",
    "https://www.mvlempyr.com/novel/reincarnated-with-a-country-creation-system",
    "https://www.mvlempyr.com/novel/reincarnated-with-a-glitched-system-why-is-my-mp-not-running-out",
    "https://www.mvlempyr.com/novel/reincarnated-with-a-summoning-system",
    "https://www.mvlempyr.com/novel/reincarnated-with-the-country-system",
    "https://www.mvlempyr.com/novel/reincarnated-with-the-mind-control-powers-in-another-world",
    "https://www.mvlempyr.com/novel/reincarnated-with-the-strongest-system",
    "https://www.mvlempyr.com/novel/reincarnated-with-the-van-helsing-system",
    "https://www.mvlempyr.com/novel/reincarnated-with-three-unique-skills",
    "https://www.mvlempyr.com/novel/reincarnation-into-the-barrier-master",
    "https://www.mvlempyr.com/novel/reincarnation-of-a-swordsman-the-omni-mage",
    "https://www.mvlempyr.com/novel/reincarnation-of-the-strongest-healer",
    "https://www.mvlempyr.com/novel/reincarnation-of-the-strongest-spirit-master",
    "https://www.mvlempyr.com/novel/reincarnation-of-the-strongest-sword-god",
    "https://www.mvlempyr.com/novel/reincarnator",
    "https://www.mvlempyr.com/novel/reincarnators-stream",
    "https://www.mvlempyr.com/novel/release-that-witch",
    "https://www.mvlempyr.com/novel/remarried-empress",
    "https://www.mvlempyr.com/novel/renegade-immortal",
    "https://www.mvlempyr.com/novel/return-of-mount-hua-sect",
    "https://www.mvlempyr.com/novel/return-of-the-8th-class-mage",
    "https://www.mvlempyr.com/novel/return-of-the-female-knight",
    "https://www.mvlempyr.com/novel/return-of-the-former-hero",
    "https://www.mvlempyr.com/novel/return-of-the-frozen-player",
    "https://www.mvlempyr.com/novel/return-of-the-goddess",
    "https://www.mvlempyr.com/novel/return-of-the-swallow",
    "https://www.mvlempyr.com/novel/returning-from-the-immortal-world",
    "https://www.mvlempyr.com/novel/returning-from-the-magic-world",
    "https://www.mvlempyr.com/novel/reverend-insanity",
    "https://www.mvlempyr.com/novel/riaru-de-reberu-age-shitara-hobo-chitona-jinsei-ni-natta",
    "https://www.mvlempyr.com/novel/riches-and-bitches-i-have-a-gate-to-an-isekai-and-leveling-up-system",
    "https://www.mvlempyr.com/novel/riot-grasper",
    "https://www.mvlempyr.com/novel/rise-of-a-football-god",
    "https://www.mvlempyr.com/novel/rise-of-eros",
    "https://www.mvlempyr.com/novel/rise-of-evil-sword-god",
    "https://www.mvlempyr.com/novel/rise-of-the-alchemy-god",
    "https://www.mvlempyr.com/novel/rise-of-the-dark-alpha",
    "https://www.mvlempyr.com/novel/rise-of-the-demon-god",
    "https://www.mvlempyr.com/novel/rise-of-the-eromancer",
    "https://www.mvlempyr.com/novel/rise-of-the-god-emperor",
    "https://www.mvlempyr.com/novel/rise-of-the-horde",
    "https://www.mvlempyr.com/novel/rise-of-the-lustful-evil-monarch-re",
    "https://www.mvlempyr.com/novel/rise-of-the-rejected-deity-from-chaos",
    "https://www.mvlempyr.com/novel/rise-of-the-sword-son-in-law",
    "https://www.mvlempyr.com/novel/rise-of-the-undead-legion",
    "https://www.mvlempyr.com/novel/rise-of-the-white-devil",
    "https://www.mvlempyr.com/novel/rise-of-the-white-dragon",
    "https://www.mvlempyr.com/novel/rise-of-the-worm-sovereign",
    "https://www.mvlempyr.com/novel/rise-online-return-of-the-legendary-player",
    "https://www.mvlempyr.com/novel/rise-to-stardom",
    "https://www.mvlempyr.com/novel/risou-no-himo-seikatsu",
    "https://www.mvlempyr.com/novel/rivers-of-the-night",
    "https://www.mvlempyr.com/novel/rosies-games",
    "https://www.mvlempyr.com/novel/royal-secret-im-a-princess",
    "https://www.mvlempyr.com/novel/ruinous-return",
    "https://www.mvlempyr.com/novel/rulers-awakening-inheritor-of-the-sss-rank-dimensional-talent",
    "https://www.mvlempyr.com/novel/run-away-this-civilization-is-cheating",
    "https://www.mvlempyr.com/novel/run-girl-if-you-can",
    "https://www.mvlempyr.com/novel/runaway-guide",
    "https://www.mvlempyr.com/novel/runeblade",
    "https://www.mvlempyr.com/novel/runemaster-in-the-last-days",
    "https://www.mvlempyr.com/novel/running-away-from-the-hero",
    "https://www.mvlempyr.com/novel/rwby-moon-reflection",
    "https://www.mvlempyr.com/novel/ryuu-kusari-no-ori--kokoro-no-uchi-no-kokoro",

      ];

    const browser = await launchBrowser();

    try {
        for (let url of urls) {
            console.log(`Scraping novel from URL: ${url}`);
            const page = await browser.newPage();

            try {
                // Set up the page
                await page.setUserAgent(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                );
                await page.goto(url, { waitUntil: "networkidle2" });

                // // Scrape novel details
                // const novelData = await scrapeNovelDetails(page);
                // console.log("Novel information:", novelData);

                // if (!novelData.title || !novelData.author) {
                //     console.log("Missing essential novel data (title or author). Exiting.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Store novel in database or get existing ID
                // const novelId = await insertNovel({
                //     title: novelData.title,
                //     author: novelData.author,
                //     description: novelData.synopsis,
                //     cover_image_url: novelData.imageLink,
                //     tags: novelData.tags,
                //     genres: novelData.genres,
                //     status: novelData.status,
                // });

                // if (!novelId) {
                //     console.log("Failed to process novel data. Skipping.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Get latest chapter from DB to determine how many chapters to scrape
                // const latestChapterNumber = await getLatestChapterNumber(novelId);
                // console.log(`Current chapters in database: ${latestChapterNumber}`);
                // console.log(`Total chapters on site: ${novelData.numOfCh}`);

                // if (latestChapterNumber >= novelData.numOfCh) {
                //     console.log("Novel is already up to date. No new chapters to scrape.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Calculate how many new chapters to scrape
                // const chaptersToScrape = novelData.numOfCh - latestChapterNumber;
                // console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

                // // Scrape chapters (only the new ones)
                // const scrapedChapters = await scrapeChapters(page, novelData.numOfCh, latestChapterNumber);
                // console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Scrape novel details
        const novelData = await scrapeNovelDetails(page);
        console.log("Novel information:", novelData);

        if (!novelData.title || !novelData.author) {
            console.log("Missing essential novel data (title or author). Exiting.");
            continue;  // Skip this novel and move to the next one
        }

        // Store novel in database or get existing ID
        const novelId = await insertNovel({
            title: novelData.title,
            author: novelData.author,
            description: novelData.synopsis,
            cover_image_url: novelData.imageLink,
            tags: novelData.tags,
            genres: novelData.genres,
            status: novelData.status,
        });

        if (!novelId) {
            console.log("Failed to process novel data. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Get latest chapter from DB to determine how many chapters to scrape
        const latestChapterNumber = await getLatestChapterNumber(novelId);
        
        // Use the most reliable chapter count - prefer numOfCh but fall back to chapters
        // if numOfCh is zero
        const totalChapters = novelData.numOfCh || parseInt(novelData.chapters) || 0;
        
        console.log(`Current chapters in database: ${latestChapterNumber}`);
        console.log(`Total chapters on site: ${totalChapters}`);

        if (latestChapterNumber >= totalChapters || totalChapters === 0) {
            console.log("Novel is already up to date or no chapters found. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Calculate how many new chapters to scrape
        const chaptersToScrape = totalChapters - latestChapterNumber;
        console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

        // Scrape chapters (only the new ones)
        const scrapedChapters = await scrapeChapters(page, totalChapters, latestChapterNumber);
        console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Store new chapters in database
                if (scrapedChapters.length > 0) {
                    const newChaptersCount = await insertChapters(novelId, scrapedChapters);
                    console.log(`${newChaptersCount} new chapters stored in database with Novel ID: ${novelId}`);
                } else {
                    console.log("No new chapters to store.");
                }

            } catch (error) {
                console.error(`Error during scraping URL: ${url}`, error);
            } finally {
                // Close the page after scraping
                await page.close();
            }
        }

    } catch (error) {
        console.error("Error during scraping process:", error);
    } finally {
        // Close browser when done
        await browser.close();
        // Close database connection
        await closeDbConnection();
        console.log("Scraping process completed");
    }
}

// Execute the main function
main().catch(console.error);
