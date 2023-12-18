const submitButton = document.querySelector("button[type=submit]");

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        rejectNonEssential: document.querySelector("#rejectNonEssential").checked,
        unfixHeader: document.querySelector("#unfixHeader").checked,
    });
    submitButton.setAttribute("disabled", true);
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#rejectNonEssential").checked = result.rejectNonEssential || false;
        document.querySelector("#unfixHeader").checked = result.unfixHeader || false;
    }

    function onError(error) {
        console.log(`Error: ${error}`); 
    }

    let getting = browser.storage.sync.get(); 
    getting.then(setCurrentChoice, onError); 
} 

document.querySelectorAll("input").forEach(function(input) {
    input.addEventListener("click", function() {
        submitButton.removeAttribute("disabled")
    });
});

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
