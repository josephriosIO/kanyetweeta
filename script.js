const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitter = document.querySelector("#twitter");
const newQuote = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//hide loading
const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// GET Kanye quote
async function getQuote() {
  loading();
  const api = "https://api.kanye.rest/";
  try {
    const quote = await fetch(api);
    const data = await quote.json();
    authorText.innerText = "Kanye West";
    if (data.quote.length > 120) {
      quoteContainer.classList.add("long-quote");
    } else {
      quoteContainer.classList.remove("long-quote");
    }
    quoteText.innerText = data.quote;
    // Stop loader
    complete();
  } catch (err) {
    console.log(err);
    getQuote();
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuote.addEventListener("click", getQuote);
twitter.addEventListener("click", tweetQuote);

// on load
getQuote();
