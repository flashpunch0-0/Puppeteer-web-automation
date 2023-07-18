import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false }); // Launch headful browser
  const page = await browser.newPage();

  try {
    // Go to the desired URL
    await page.goto("https://swap.defillama.com/");
    await page.setViewport({ width: 1080, height: 1920 });

    // Fill the form

    // selecting arbitrium
    await page.type("#react-select-2-input", "Arbitrum");
    await page.keyboard.press("Enter");
    // working above

    // choosing Wbtc
    const tokenElement = await page.$(
      'button[class="chakra-button css-qjhap"]'
    );
    await tokenElement.click();
    await page.goto(
      "https://swap.defillama.com/?chain=arbitrum&from=0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f"
    );
    // wbtc selected

    // choosing usdc
    await page.goto(
      "https://swap.defillama.com/?chain=arbitrum&from=0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f&to=0xaf88d065e77c8cc2239327c5edb3a432268e5831"
    );
    // redirecting after choosing usdc

    // doing for changing value from 10 to 12
    const inputElement = await page.$('input[class="chakra-input css-lv0ed5"]');
    await inputElement.click();
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.type('input[class="chakra-input css-lv0ed5"]', "12");
    // You sell = 12

    // selecting 2nd best route
    const mainDiv = await page.$$(".sc-bb167634-2 cObIGF");
    await page.waitForTimeout(3000);
    const childDiv = await page.$$(".sc-bb167634-2 cObIGF:nth-child(4)");
    await page.click(childDiv);

    await new Promise(() => {});
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // await browser.close();
    // Keep the browser window open
    await page.screenshot({ path: "sc.png" });
  }
}

main();
// main function called
