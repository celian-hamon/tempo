// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
const params = args.widgetParameter ? args.widgetParameter.split(" ") : [];

const isDarkTheme = params?.[0] === "dark";
const padding = 2;

const widget = new ListWidget();
if (isDarkTheme) {
    widget.backgroundColor = new Color("#1C1C1E");
}
widget.setPadding(padding, padding, padding, padding);

const headerStack = widget.addStack();
headerStack.setPadding(0, 0, 10, 0);
//const headerText = headerStack.addText("");
//headerText.font = Font.mediumSystemFont(16);
if (isDarkTheme) {
    //    headerText.textColor = new Color('#FFFFFF');
}

async function buildWidget() {
    for (i; i == params.length; i++) {
        const info = await getTokenInfo(params[i]);
        addCrypto(
            await loadImage(info.image),
            info.symbol,
            `$${firstInfo.price}`,
            info.grow
        );
    }

    // const firstInfo = await getTokenInfo(params[0]);
    // const secondInfo = await getTokenInfo(params[1]);

    // addCrypto(await loadImage(firstInfo.image), firstInfo.symbol, `$${firstInfo.price}`, firstInfo.grow);
    // addCrypto(await loadImage(secondInfo.image), secondInfo.symbol, `$${secondInfo.price}`, secondInfo.grow);
}

function addCrypto(image, symbol, price, grow) {
    const rowStack = widget.addStack();
    rowStack.setPadding(0, 0, 20, 0);
    rowStack.layoutHorizontally();

    const imageStack = rowStack.addStack();
    const symbolStack = rowStack.addStack();
    const priceStack = rowStack.addStack();

    imageStack.setPadding(0, 0, 0, 10);
    symbolStack.setPadding(0, 0, 0, 8);

    const imageNode = imageStack.addImage(image);
    imageNode.imageSize = new Size(20, 20);
    imageNode.leftAlignImage();

    const symbolText = symbolStack.addText(symbol);
    symbolText.font = Font.mediumSystemFont(16);

    const priceText = priceStack.addText(price);
    priceText.font = Font.mediumSystemFont(16);

    if (isDarkTheme) {
        symbolText.textColor = new Color("#FFFFFF");
    }

    if (grow) {
        priceText.textColor = new Color("#4AA956");
    } else {
        priceText.textColor = new Color("#D22E2E");
    }
}

async function getTokenInfo(tokenId) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenId}`;
    const req = new Request(url);
    const apiResult = await req.loadJSON();
    return {
        price: apiResult[0].current_price,
        grow: apiResult[0].price_change_24h > 0,
        symbol: apiResult[0].symbol.toUpperCase(),
        image: apiResult[0].image,
    };
}

async function loadImage(imgUrl) {
    const req = new Request(imgUrl);
    return await req.loadImage();
}

await buildWidget();

Script.setWidget(widget);
Script.complete();
widget.presentSmall();
