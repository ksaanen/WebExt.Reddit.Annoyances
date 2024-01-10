export enum optionsEnum {
    rejectNonEssential = "rejectNonEssential",
    unfixHeader = "unfixHeader",
    debugMode = "debugMode"
}

export interface Option {
    name: string,
    description: string,
    checked?: boolean
}

export const optionsConfig: Option[] = [
    {
        name: optionsEnum.rejectNonEssential,
        description: 'Write "reject non-essential cookies" cookie. Another approach to getting rid of the cookiewall, may reduce flickering effect from loading style overrides.',
    },
    {
        name: optionsEnum.unfixHeader,
        description: 'Unfix top header (mobile). Enabling this makes the top header move with rest of the content on scroll.',
    },
    {
        name: optionsEnum.debugMode,
        description: 'Enable debug mode (in development).',
    }
];

class Options {
    private readonly placeholder = document.getElementById('options_placeholder');

    constructor() {
        const getting = browser.storage.sync.get();

        getting.then((result) => {
            optionsConfig.forEach(option => {
                option.checked = result[option.name] || false;

                const el = document.createElement('div');
                el.classList.add('input-group');
    
                const input = document.createElement('input');
                input.id = option.name;
                input.type = "checkbox";
                input.classList.add('form-check-input');
                input.checked = option.checked;
                input.onchange = () => this.saveOption(option.name, !!input.checked);
    
                const label = document.createElement('label');
                label.setAttribute('for', input.id);
                label.innerText = option.description;
    
                el.append(input);
                el.append(label);
                this.placeholder.append(el);
            });
        }, (error) => console.log(`Error: ${error}`));
    }

    saveOption(option: string, value: boolean) {
        browser.storage.sync.set({[option]: value});
    }
}
new Options();
