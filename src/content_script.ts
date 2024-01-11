enum optionsEnum {
    rejectNonEssential = "rejectNonEssential",
    unfixHeader = "unfixHeader",
    debugMode = "debugMode"
}

class ContentScript {
    private readonly body = document.querySelector("body") as HTMLBodyElement;

    constructor() {
        const getting = browser.storage.sync.get();
        getting.then((result) => {
            if (result[optionsEnum.unfixHeader]) this.unfixHeader();
            if (result[optionsEnum.rejectNonEssential]) this.rejectNonEssential();
            if (result[optionsEnum.debugMode]) this.debugMode();
        }, (error) => {
            console.log(`Error: ${error}`);
        });
    }

    private debugMode() {
        const data = {
            userAgent: navigator.userAgent.toString(),
            screenSize: {
                h: window.innerHeight,
                w: window.innerWidth
            }
        };

        const container: HTMLDivElement = document.createElement('div');
        container.classList.add('debug-mode--container');

        const close: HTMLSpanElement = document.createElement('span');
        close.classList.add('close-button');
        close.innerText = '[close]';
        close.onclick = () => {
            browser.storage.sync.set({[optionsEnum.debugMode]: false});
            container.remove();
        };
        container.append(close);

        const log: HTMLTextAreaElement = document.createElement('textarea');
        log.value = JSON.stringify(data);
        container.append(log);

        this.body.append(container);
    }

    private unfixHeader() {
        this.body.classList.add("header-unfix");
        const header = document.querySelector("reddit-header-small");
        if (header) header.classList.remove("fixed");
    }

    private rejectNonEssential() {
        const d = new Date();
        const exdays = 365;
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        document.cookie = `eu_cookie={%22opted%22:true%2C%22nonessential%22:false}; expires=${d.toUTCString()}; SameSite=None; Secure`;
    }
}

new ContentScript();