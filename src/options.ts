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
        description: 'Generate log message that\'s usefull for the developer feedback.',
    }
];

class Options {
    private readonly placeholder = document.getElementById('options_placeholder');

    constructor() {
        const getting = browser.storage.sync.get();

        getting.then((result) => {
            optionsConfig.forEach(option => {
                option.checked = result[option.name] || false;

                const group: HTMLDivElement = document.createElement('div');
                group.classList.add('d-flex', 'gap-20', 'flex-align-start');

                    const description: HTMLDivElement = document.createElement('div');
                    description.classList.add('flex-grow');
                    description.innerText = option.description;
                    group.append(description);

                    const div: HTMLDivElement = document.createElement('div');
                    group.append(div);

                        const label: HTMLLabelElement = document.createElement('label');
                        label.classList.add('switch');
                        label.setAttribute('for', option.name);
                        div.append(label);

                            const input: HTMLInputElement = document.createElement('input');
                            input.id = option.name;
                            input.type = "checkbox";
                            input.classList.add('form-check-input');
                            input.checked = option.checked;
                            input.onchange = () => this.saveOption(option.name, !!input.checked);
                            label.append(input);

                            const span: HTMLSpanElement = document.createElement('span');
                            span.classList.add('slider');
                            label.append(span);

                this.placeholder.append(group);
            });
        }, (error) => console.log(`Error: ${error}`));
    }

    private saveOption(option: string, value: boolean): void {
        browser.storage.sync.set({[option]: value});
    }
}
new Options();
