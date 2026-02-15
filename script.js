document.addEventListener("DOMContentLoaded", () => {

/* -------------------- CATEGORY DATA -------------------- */

const categories = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: data => `${data.setup} - ${data.punchline}`,
        offline: [
            "How do you stop a bull from charging? - Cancel its credit card!",
            "Why can't your nose be 12 inches long? - Because then it would be a foot!",
            "What do you call a pile of cats? - A meow-tain!"
        ]
    },

    puns: {
        name: "Puns",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [
            "To the guy who invented zero, thanks for nothing.",
            "I don’t trust stairs because they’re always up to something."
        ]
    },

    onelines: {
        name: "One-liners",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [
            "My IQ test results came back. They were negative.",
            "Why was six afraid of seven? Because seven eight nine."
        ]
    },

    dad: {
        name: "Dad Jokes",
        api: "https://icanhazdadjoke.com/",
        headers: { "Accept": "application/json" },
        parse: data => data.joke,
        offline: [
            "Why don't skeletons fight each other? They don't have the guts.",
            "How do you make a tissue dance? Put a little boogie in it!"
        ]
    },

    favorites: {
        name: "My Favorites ❤️",
        isFavorites: true
    }
};


/* -------------------- STATE -------------------- */

let currentCategory = null;
let currentJokeText = "";
let jokeHistory = [];
let historyIndex = -1;
let favorites = JSON.parse(localStorage.getItem("favoriteJokes") || "[]");


/* -------------------- SCREEN CONTROL -------------------- */

window.showCategories = function () {
    document.getElementById("category-screen").classList.add("active");
    document.getElementById("joke-screen").classList.remove("active");
};

window.startCategory = function (key) {

    currentCategory = categories[key];
    document.getElementById("category-title").innerText = currentCategory.name;

    jokeHistory = [];
    historyIndex = -1;
    currentJokeText = "";

    const jokeEl = document.getElementById("joke");
    jokeEl.innerText = "Loading joke...";

    if (currentCategory.isFavorites) {
        if (favorites.length === 0) {
            jokeEl.innerText = "No favorite jokes yet 💔";
        } else {
            jokeHistory = [...favorites];
            historyIndex = 0;
            showCurrentJoke();
        }
    } else {
        getJoke();
    }

    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("joke-screen").classList.add("active");
};


/* -------------------- GET JOKE -------------------- */

async function getJoke() {

    if (currentCategory.isFavorites) return;

    const jokeEl = document.getElementById("joke");

    jokeEl.style.opacity = 0;

    setTimeout(async () => {

        let text = "Couldn't load a joke...";

        try {

            const options = currentCategory.headers
                ? { headers: currentCategory.headers }
                : {};

            const res = await fetch(currentCategory.api, options);
            const data = await res.json();

            text = currentCategory.parse(data);

        } catch {

            const arr = currentCategory.offline;
            text = arr[Math.floor(Math.random() * arr.length)];
        }

        currentJokeText = text;

        jokeHistory = jokeHistory.slice(0, historyIndex + 1);
        jokeHistory.push(text);
        historyIndex = jokeHistory.length - 1;

        updateLoveButton();

        jokeEl.innerText = text;
        jokeEl.style.opacity = 1;

    }, 300);
}


/* -------------------- HISTORY -------------------- */

function showCurrentJoke() {

    if (historyIndex < 0 || historyIndex >= jokeHistory.length) return;

    currentJokeText = jokeHistory[historyIndex];
    document.getElementById("joke").innerText = currentJokeText;

    updateLoveButton();
}

window.prevJoke = function () {
    if (historyIndex <= 0) return;
    historyIndex--;
    showCurrentJoke();
};

window.nextJoke = function () {

    if (currentCategory.isFavorites) {

        if (historyIndex >= jokeHistory.length - 1) return;
        historyIndex++;
        showCurrentJoke();

    } else {
        getJoke();
    }
};


/* -------------------- FAVORITES -------------------- */

window.toggleFavorite = function () {

    if (!currentJokeText) return;

    const index = favorites.indexOf(currentJokeText);

    if (index === -1) favorites.push(currentJokeText);
    else favorites.splice(index, 1);

    localStorage.setItem("favoriteJokes", JSON.stringify(favorites));
    updateLoveButton();
};

function updateLoveButton() {

    const btn = document.getElementById("loveBtn");
    if (!btn) return;

    const isFav = favorites.includes(currentJokeText);

    btn.innerText = isFav ? "❤️" : "♡";
}


/* -------------------- SHARE -------------------- */

window.shareJoke = async function () {

    if (!currentJokeText) return;

    if (navigator.share) {

        await navigator.share({
            title: "Funny Joke",
            text: currentJokeText
        });

    } else {

        navigator.clipboard.writeText(currentJokeText);
        alert("Copied!");
    }
};


/* -------------------- SWIPE SUPPORT -------------------- */

let startX = 0;
const jokeBox = document.getElementById("joke-container");

if (jokeBox) {

    jokeBox.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    jokeBox.addEventListener("touchend", e => {

        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) nextJoke();
        if (endX - startX > 50) prevJoke();
    });
}


/* -------------------- FAVORITE BUTTON ANIMATION -------------------- */

const favBtn = document.getElementById("favorite-btn");

if (favBtn) {

    favBtn.addEventListener("click", () => {

        favBtn.classList.add("favorite-active");

        setTimeout(() => {
            favBtn.classList.remove("favorite-active");
        }, 400);
    });
}

});
