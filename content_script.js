
// Add local storage key to prevent "Continue with firefox" from popping up.
window.localStorage.setItem("xpromo-consolidation", new Date());

// Set "Reject non-essential cookies" cookie.
document.cookie = "eu_cookie={%22opted%22:true%2C%22nonessential%22:false}"
