const categories = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: data => `${data.setup} - ${data.punchline}`,
        offline: [
            "Why did the chicken cross the road? - To get to the other side!",
            "I told my computer I needed a break, and it froze.",
            "Why don’t skeletons fight each other? - They don’t have the guts!",
            "Why did the scarecrow win an award? - Because he was outstanding in his field!",
            "I asked my dog what's two minus two. He said nothing."
        ]
    },
    puns: {
        name: "Puns",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "I'm terrified of elevators... so I'm taking steps to avoid them.",
            "Time flies like an arrow. Fruit flies like a banana."
        ]
    },
    onelines: {
        name: "One-liners",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [
            "I only know 25 letters of the alphabet. I don't know y.",
            "Parallel lines have so much in common. It's a shame they'll never meet.",
            "My friend says I'm addicted to brake fluid, but I can stop anytime."
        ]
    },
    dad: {
        name: "Dad Jokes",
        api: "https://icanhazdadjoke.com/",
        headers: { "Accept": "application/json" },
        parse: data => data.joke,
        offline: [
            "I'm reading a book on anti-gravity. It's impossible to put down!",
            "Why don't eggs tell jokes? They'd crack each other up.",
            "I used to play piano by ear, but now I use my hands."
        ]
    },
    favorites: {
        name: "My Favorites ❤️",
        isFavorites: true
    }
};

let currentCategory = null;
let currentJokeText = "";
let jokeHistory = [];           // array of strings (joke texts)
let historyIndex = -1;
let favorites = JSON.parse(localStorage.getItem("favoriteJokes") || "[]");

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

    document.getElementById("loveBtn").classList.remove("liked");
    document.getElementById("loveBtn").innerText = "♡";

    if (currentCategory.isFavorites) {
        if (favorites.length === 0) {
            document.getElementById("joke").innerText = "No favorite jokes yet 💔";
        } else {
            jokeHistory = [...favorites];
            historyIndex = 0;
            showCurrentJoke();
        }
    } else {
        getJoke();  // load first joke
    }

    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("joke-screen").classList.add("active");
}

async function getJoke() {
    if (currentCategory.isFavorites) return;

    const jokeEl = document.getElementById("joke");
    jokeEl.style.opacity = 0;

    document.getElementById("laughSound").play().catch(() => {});

    const colors = ["#2c3e50","#8e44ad","#2980b9","#27ae60","#e67e22","#c0392b","#34495e","#d35400"];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];

    setTimeout(async () => {
        let text = "Couldn't load a joke... try again!";

        try {
            const options = currentCategory.headers ? { headers: currentCategory.headers } : {};
            const response = await fetch(currentCategory.api, options);
            if (!response.ok) throw new Error();
            const data = await response.json();
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
    }, 400);
}

function showCurrentJoke() {
    if (historyIndex < 0 || historyIndex >= jokeHistory.length) return;

    currentJokeText = jokeHistory[historyIndex];
    document.getElementById("joke").innerText = currentJokeText;
    document.getElementById("joke").style.opacity = 1;
    updateLoveButton();
}

function updateLoveButton() {
    const btn = document.getElementById("loveBtn");
    const isFavorite = favorites.includes(currentJokeText);
    btn.innerText = isFavorite ? "❤️" : "♡";
    btn.classList.toggle("liked", isFavorite);
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
    updateLoveButton();

    // If we are in favorites view and removed the current one
    if (currentCategory.isFavorites && index !== -1) {
        jokeHistory = [...favorites];
        if (jokeHistory.length === 0) {
            document.getElementById("joke").innerText = "No favorite jokes left 💔";
            historyIndex = -1;
        } else {
            historyIndex = Math.min(historyIndex, jokeHistory.length - 1);
            showCurrentJoke();
        }
    }
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
