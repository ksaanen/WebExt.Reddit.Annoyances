const submitButton = document.querySelector("button[type=submit]");

function saveOption(input) {
    browser.storage.sync.set({
        [input.name]: input.checked,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        result.forEach((setting, checked) => {
            document.querySelector(`#${setting}`).checked = checked || false
        });
    }

    function onError(error) {
        console.log(`Error: ${error}`); 
    }

    let getting = browser.storage.sync.get(); 
    getting.then(setCurrentChoice, onError); 
} 

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("click", () => saveOption(input));
});
