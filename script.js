let currentCategory = null;
let currentJokeText = "";
let jokeHistory = [];
let historyIndex = -1;
let favorites = JSON.parse(localStorage.getItem("favoriteJokes") || "[]");

const jokeEl = document.getElementById("joke");
const loveBtn = document.getElementById("loveBtn");
const jokeBox = document.getElementById("joke-container");

let startX = 0;

/* ================= CATEGORY NAV ================= */

function showCategories() {
    document.getElementById("category-screen").classList.add("active");
    document.getElementById("joke-screen").classList.remove("active");
}

function startCategory(key) {
    currentCategory = categories[key];
    document.getElementById("category-title").innerText = currentCategory.name;

    jokeHistory = [];
    historyIndex = -1;
    currentJokeText = "";

    updateLoveButton();

    jokeEl.innerText = "Loading joke...";
    jokeEl.style.opacity = 1;

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
}

/* ================= GET JOKE ================= */

async function getJoke() {

    if (currentCategory.isFavorites) return;

    jokeEl.style.opacity = 0;

    document.getElementById("laughSound").play().catch(() => {});

    const colors = ["#2c3e50","#8e44ad","#2980b9","#27ae60","#e67e22","#c0392b","#34495e","#d35400"];
    document.body.style.background = colors[Math.floor(Math.random()*colors.length)];

    setTimeout(async () => {

        let text = "Couldn't load a joke...";

        try {

            const options = currentCategory.headers ? { headers: currentCategory.headers } : {};
            const res = await fetch(currentCategory.api, options);
            const data = await res.json();

            text = currentCategory.parse(data);

        } catch {

            const arr = currentCategory.offline;
            text = arr[Math.floor(Math.random()*arr.length)];

        }

        currentJokeText = text;

        jokeHistory = jokeHistory.slice(0, historyIndex + 1);
        jokeHistory.push(text);
        historyIndex = jokeHistory.length - 1;

        updateLoveButton();

        jokeEl.innerText = text;
        jokeEl.style.opacity = 1;

    }, 400);
}

/* ================= HISTORY ================= */

function showCurrentJoke() {

    if (historyIndex < 0 || historyIndex >= jokeHistory.length) return;

    currentJokeText = jokeHistory[historyIndex];
    jokeEl.innerText = currentJokeText;
    jokeEl.style.opacity = 1;

    updateLoveButton();
}

function prevJoke() {

    if (historyIndex <= 0) return;

    historyIndex--;
    showCurrentJoke();
}

function nextJoke() {

    if (currentCategory.isFavorites) {

        if (historyIndex >= jokeHistory.length - 1) return;

        historyIndex++;
        showCurrentJoke();

    } else {
        getJoke();
    }
}

/* ================= FAVORITES ================= */

function updateLoveButton() {

    const liked = favorites.includes(currentJokeText);

    loveBtn.innerText = liked ? "❤️" : "♡";
    loveBtn.classList.toggle("liked", liked);
}

function toggleFavorite() {

    if (!currentJokeText) return;

    const index = favorites.indexOf(currentJokeText);

    if (index === -1) {
        favorites.push(currentJokeText);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem("favoriteJokes", JSON.stringify(favorites));

    loveBtn.classList.add("favorite-active");

    setTimeout(() => {
        loveBtn.classList.remove("favorite-active");
    }, 400);

    updateLoveButton();
}

/* ================= SHARE ================= */

async function shareJoke() {

    if (!currentJokeText) return;

    if (navigator.share) {

        try {
            await navigator.share({
                title: "Funny Joke",
                text: currentJokeText
            });
        } catch {}

    } else {

        navigator.clipboard.writeText(currentJokeText);
        alert("Joke copied!");

    }
}

/* ================= SWIPE SUPPORT ================= */

jokeBox.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

jokeBox.addEventListener("touchend", e => {

    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextJoke();
    if (endX - startX > 50) prevJoke();
});
