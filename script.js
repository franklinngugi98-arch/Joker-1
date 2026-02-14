// ────────────────────────────────────────────────
// Category configuration
// ────────────────────────────────────────────────
const categories = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: d => `${d.setup} — ${d.punchline}`,
        offline: [ /* ... your jokes ... */ ]
    },
    dad: { /* ... */ },
    puns: { /* ... */ },
    onelines: { /* ... */ },
    favorites: {
        name: "My Favorites",
        isFavorites: true,
        offline: [] // will be loaded from storage
    }
};

let currentCategory = null;
let currentJoke = null;        // {text: "...", categoryKey: "..."}
let favorites = JSON.parse(localStorage.getItem("favoriteJokes") || "[]");

// ────────────────────────────────────────────────
// UI Functions
// ────────────────────────────────────────────────
function showCategories() {
    document.getElementById("category-screen").classList.add("active");
    document.getElementById("joke-screen").classList.remove("active");
}

function startCategory(key) {
    currentCategory = categories[key];
    document.getElementById("category-title").textContent = currentCategory.name;
    
    if (currentCategory.isFavorites) {
        document.getElementById("joke").textContent = favorites.length 
            ? "Your favorite jokes ❤️" 
            : "No favorites yet — like some jokes! ♡";
        document.querySelector(".action-btn").style.display = "none"; // no "new joke" in favorites
    } else {
        document.getElementById("joke").textContent = `Tap or swipe → to start`;
        document.querySelector(".action-btn").style.display = "inline-block";
    }
    
    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("joke-screen").classList.add("active");
    document.getElementById("like-btn").classList.remove("liked"); // reset heart

    // Load first joke automatically for non-favorites
    if (!currentCategory.isFavorites) getJoke();
}

// ────────────────────────────────────────────────
// Like / Favorites
// ────────────────────────────────────────────────
function toggleLike() {
    if (!currentJoke) return;

    const index = favorites.findIndex(j => j.text === currentJoke.text);
    const btn = document.getElementById("like-btn");

    if (index === -1) {
        // like
        favorites.push(currentJoke);
        btn.classList.add("liked");
        btn.textContent = "❤️";
    } else {
        // unlike
        favorites.splice(index, 1);
        btn.classList.remove("liked");
        btn.textContent = "♡";
    }

    localStorage.setItem("favoriteJokes", JSON.stringify(favorites));

    // If currently in favorites view → refresh
    if (currentCategory?.isFavorites) {
        startCategory("favorites");
    }
}

// ────────────────────────────────────────────────
// Joke Fetching
// ────────────────────────────────────────────────
async function getJoke() {
    if (!currentCategory || currentCategory.isFavorites) return;

    const jokeEl = document.getElementById("joke");
    jokeEl.style.opacity = 0;

    document.getElementById("laughSound").play().catch(() => {});

    // Random bg
    const colors = ["#1a237e","#311b92","#4a148c","#7b1fa2","#880e4f","#b71c1c","#d32f2f","#f57c00","#388e3c","#0288d1"];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];

    setTimeout(async () => {
        let text = "Couldn't load joke...";

        try {
            const options = currentCategory.headers ? { headers: currentCategory.headers } : {};
            const res = await fetch(currentCategory.api, options);
            if (!res.ok) throw new Error();
            const data = await res.json();
            text = currentCategory.parse(data);
        } catch {
            const jokes = currentCategory.offline;
            text = jokes[Math.floor(Math.random() * jokes.length)];
        }

        currentJoke = { text, categoryKey: Object.keys(categories).find(k => categories[k] === currentCategory) };

        // Check if already liked
        const isLiked = favorites.some(j => j.text === text);
        const btn = document.getElementById("like-btn");
        btn.textContent = isLiked ? "❤️" : "♡";
        btn.classList.toggle("liked", isLiked);

        jokeEl.textContent = text;
        jokeEl.style.opacity = 1;
    }, 400);
}

// ────────────────────────────────────────────────
// Swipe Detection (left or right → next joke)
// ────────────────────────────────────────────────
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 60;

const jokeContainer = document.getElementById("joke-container");

jokeContainer.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

jokeContainer.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (currentCategory?.isFavorites) return; // no swipe in favorites for now

    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < swipeThreshold) return;

    // Swipe left (→ new joke) or right (also new for simplicity)
    getJoke();
}

// ────────────────────────────────────────────────
// Theme Handling (unchanged)
// ────────────────────────────────────────────────
// ... paste your previous theme code here ...
initTheme();
// ... rest of theme listeners ...
