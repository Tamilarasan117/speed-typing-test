let testContainer = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let spinnerEl = document.getElementById("spinner");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnElEl = document.getElementById("submitBtnEl");
let resetBtnEl = document.getElementById("resetBtn");
let second = 0;

function newQuote(quote) {
    spinnerEl.classList.add("d-none");
    quoteDisplayEl.textContent = quote;
}

function getQuote() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.remove("d-none");
            let quote = jsonData.content;
            newQuote(quote);
        });
}
getQuote();

let setId = setInterval(function() {
    timerEl.textContent = second;
    second += 1;
}, 1000);

submitBtnElEl.addEventListener("click", function() {
    let userQuoteValue = quoteInputEl.value;
    let displayQuoteValue = quoteDisplayEl.textContent;
    if (userQuoteValue === displayQuoteValue) {
        clearInterval(setId);
        resultEl.textContent = "You typed in " + second + " seconds";
    } else if (userQuoteValue === "") {
        resultEl.textContent = "First type sentence and click submit buttion";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});

resetBtnEl.addEventListener("click", function() {
    spinnerEl.classList.toggle("d-none");
    resultEl.textContent = "";
    quoteInputEl.value = "";
    second = 0;
    getQuote();
});