function unfixHeader() {
    document.querySelector("body").classList.add("header-unfix");
    document.querySelector("reddit-header-small").classList.remove("fixed");
}

function rejectNonEssential() {
    const d = new Date();
    const exdays = 365;
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    document.cookie = `eu_cookie={%22opted%22:true%2C%22nonessential%22:false}; expires=${d.toUTCString()}; SameSite=None; Secure`;
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(result) {
    if (result.unfixHeader) unfixHeader();
    if (result.rejectNonEssential) rejectNonEssential();
}

const getting = browser.storage.sync.get();
getting.then(onGot, onError);