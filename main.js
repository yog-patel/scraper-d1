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
  "https://www.mvlempyr.com/novel/baby-tyrant",
          "https://www.mvlempyr.com/novel/back-for-my-daughter",
          "https://www.mvlempyr.com/novel/back-to-the-sixties-farm-get-wealthy-raise-the-cubs",
          "https://www.mvlempyr.com/novel/bai-fumei-in-the-70s",
          "https://www.mvlempyr.com/novel/bambi-and-the-duke",
          "https://www.mvlempyr.com/novel/bamboo-forest-manager",
          "https://www.mvlempyr.com/novel/basketball-legend-when-pride-still-matters",
          "https://www.mvlempyr.com/novel/basketball-system-rebound-of-the-underdog",
          "https://www.mvlempyr.com/novel/battle-and-sex-is-all-a-primordial-fiend-needs",
          "https://www.mvlempyr.com/novel/battle-through-the-heavens",
          "https://www.mvlempyr.com/novel/be-the-hardest-working-demon-cultivator",
          "https://www.mvlempyr.com/novel/beast-evolution",
          "https://www.mvlempyr.com/novel/beast-evolution-forge",
          "https://www.mvlempyr.com/novel/beast-hack-customizing-beasts-and-capturing-beauties",
          "https://www.mvlempyr.com/novel/beast-taming-nah-dragon-herding-is-way-better",
          "https://www.mvlempyr.com/novel/beast-taming-patrol",
          "https://www.mvlempyr.com/novel/beast-taming-starting-from-zero",
          "https://www.mvlempyr.com/novel/beast-world-rise-to-power-with-the-offspring-system",
          "https://www.mvlempyr.com/novel/beautiful-ceos-super-expert",
          "https://www.mvlempyr.com/novel/became-a-medieval-fantasy-wizard",
          "https://www.mvlempyr.com/novel/became-an-evolving-space-monster",
          "https://www.mvlempyr.com/novel/because-i-was-excluded-out-of-the-class-transfer-i-decided-to-steal-my-classmates-lover-wn",
          "https://www.mvlempyr.com/novel/because-ive-been-reincarnated-as-the-piggy-duke-this-time-i-will-say-i-like-you-wn",
          "https://www.mvlempyr.com/novel/because-she-had-a-time-limit-she-became-the-villains-daughter-in-law",
          "https://www.mvlempyr.com/novel/because-there-were-100-goddesses-in-charge-of-reincarnation-i-received-100-cheat-skills",
          "https://www.mvlempyr.com/novel/become-the-guard-ai-of-the-lost-civilization-after-transmigration",
          "https://www.mvlempyr.com/novel/becoming-a-deity-from-planting-the-bodhi-tree",
          "https://www.mvlempyr.com/novel/becoming-a-life-winner-from-infancy",
          "https://www.mvlempyr.com/novel/becoming-a-true-immortal-through-my-descendents-praying",
          "https://www.mvlempyr.com/novel/becoming-evil-makes-you-ten-times-stronger-but-becoming-a-demon-gives-you-hundredfold-strength",
          "https://www.mvlempyr.com/novel/becoming-professor-moriartys-probability",
          "https://www.mvlempyr.com/novel/becoming-the-demon-lord-taming-the-demon-queen-begins",
          "https://www.mvlempyr.com/novel/becoming-the-king-of-a-new-filthy-world",
          "https://www.mvlempyr.com/novel/becoming-the-strongest-as-a-game-dev",
          "https://www.mvlempyr.com/novel/becoming-the-villains-family",
          "https://www.mvlempyr.com/novel/beggar-cultivation-system",
          "https://www.mvlempyr.com/novel/behemoths-pet",
          "https://www.mvlempyr.com/novel/being-able-to-edit-skills-in-another-world-i-gained-op-waifus-wn",
          "https://www.mvlempyr.com/novel/being-an-extra-actor-in-an-escape-game",
          "https://www.mvlempyr.com/novel/believe-it-or-not-i-already-caught-you",
          "https://www.mvlempyr.com/novel/belle-adams-butler",
          "https://www.mvlempyr.com/novel/beloved-marriage-in-high-society",
          "https://www.mvlempyr.com/novel/beware-of-chicken",
          "https://www.mvlempyr.com/novel/bewitching-prince-spoils-his-wife-genius-doctor-unscrupulous-consort",
          "https://www.mvlempyr.com/novel/beyond-chaos---a-dicerpg",
          "https://www.mvlempyr.com/novel/beyond-the-eternity",
          "https://www.mvlempyr.com/novel/billionaires-contracted-unloved-wife",
          "https://www.mvlempyr.com/novel/billionaires-love",
          "https://www.mvlempyr.com/novel/bio-engineered-dinosaur-in-the-immortal-world",
          "https://www.mvlempyr.com/novel/biochemical-martial-arts-supreme-heavenly-venerate",
      "https://www.mvlempyr.com/novel/biological-supercomputer-system",
          "https://www.mvlempyr.com/novel/birth-of-the-crafts-god",
          "https://www.mvlempyr.com/novel/birth-of-the-demonic-sword",
          "https://www.mvlempyr.com/novel/bitcoin-billionaire-i-regressed-to-invest-in-the-first-bitcoin",
          "https://www.mvlempyr.com/novel/black-string-of-fate",
          "https://www.mvlempyr.com/novel/black-summoner",
          "https://www.mvlempyr.com/novel/blacksmith-of-the-apocalypse",
          "https://www.mvlempyr.com/novel/blacksmith-vs-the-system",
          "https://www.mvlempyr.com/novel/blessed-by-night",
          "https://www.mvlempyr.com/novel/blessed-to-be-the-villain",

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
