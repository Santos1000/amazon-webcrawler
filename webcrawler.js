const httpRequest = require("./httpRequest");
const parser = require("./parser");

const visitedLinks = [];
let linksToVisit = [
  "NPET-Floating-Keyboard-Mechanical-Illuminated/dp/B01ALLT2W4/ref=sr_1_3?dchild=1&keywords=gaming+keyboard&qid=1585952021&s=electronics&sr=1-3"
];


async function main() {
  while (linksToVisit.length > 0) {
      try {
          const currentUrl = linksToVisit.pop();
          if(visitedLinks.includes(currentUrl)) continue;
          console.log("now crawling" + currentUrl);

          const html = await httpRequest.getRequest(
            "https://www.amazon.com/" + currentUrl
          );

          const parserResult = parser(html);

          const cleanLinks = parserResult.productLinks.map((link =>
             link.slice(0, 14)
              ));

          linksToVisit = linksToVisit.concat(parserResult.productLinks);
          console.log(parserResult);
          visitedLinks.push(currentUrl);
          await sleep(5000);

      } catch (err) {
        console.log(err);
      }
  }
}

async function sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

main();
