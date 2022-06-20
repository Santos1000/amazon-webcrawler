const fs = require("fs");
const parser = require("../parser");

const productPage1Html = fs.readFileSync("tests/html/productpage3.html")
let parserResult;
beforeAll(() => {
  parserResult = parser(productPage1Html);
});

describe("parsing html product page correctly", () => {
  test("title", () => {
    expect(parserResult.title).toBe(
      "NPET K10 Gaming Keyboard, LED Backlit, Spill-Resistant Design, Multimedia Keys, Quiet Silent USB Membrane Keyboard for Desktop, Computer, PC (Black)"
    );
  });
  test("price", () => {
    expect(parserResult.price).toBe("$23.99");
  });

  test("product links", () => {
    expect(parserResult.productLinks.length).toBe(25);
  });
});
