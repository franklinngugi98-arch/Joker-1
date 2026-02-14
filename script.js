// ────────────────────────────────────────────────
// Category configuration
// ────────────────────────────────────────────────
const categories = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: d => `${d.setup} — ${d.punchline}`,
        offline: [
            "Why did the chicken cross the road? — To get to the other side!",
            "Why don’t skeletons fight each other? — They don’t have the guts!",
            "Why did the scarecrow win an award? — Because he was outstanding in his field!"
        ]
    },
    dad: {
        name: "Dad Jokes",
        api: "https://icanhazdadjoke.com/",
        headers: { "Accept": "application/json" },
        parse: d => d.joke,
        offline: [
            "I'm reading a book on anti-gravity. It's impossible to put down!",
            "Why don't eggs tell jokes? They'd crack each other up.",
            "I only know 25 letters of the alphabet. I don't know y."
        ]
    },
    puns: {
        name: "Puns",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: d => d.joke,
        offline: [
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "I'm terrified of elevators… so I'm taking steps to avoid them.",
            "Time flies like an arrow. Fruit flies like a banana."
        ]
    },
    onelines: {
        name: "One-liners",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: d => d.joke,
        offline: [
            "I told my computer I needed a break, now it won't stop sending KitKat ads.",
            "Parallel lines have so much in common. It's a shame they'll never meet.",
            "My friend says I'm addicted to brake fluid, but I can stop anytime."
        ]
    }
};

let currentCategory = null;

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
    document.getElementById("joke").textContent = `Tap "New Joke" to start`;
    
    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("joke-screen").classList.add("active");

    // Optional: getJoke(); // auto-load first joke
}

// ────────────────────────────────────────────────
// Joke Fetching
// ────────────────────────────────────────────────
async function getJoke() {
    if (!currentCategory) return;

    const jokeEl = document.getElementById("joke");
    jokeEl.style.opacity = 0;

    // Sound
    const sound = document.getElementById("laughSound");
    sound.currentTime = 0;
    sound.play().catch(() => {});

    // Random background
    const colors = [
        "#1a237e", "#311b92", "#4a148c", "#7b1fa2", "#880e4f",
        "#b71c1c", "#d32f2f", "#f57c00", "#388e3c", "#0288d1"
    ];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];

    setTimeout(async () => {
        let text = "Couldn't load a joke... try again!";

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

        jokeEl.textContent = text;
        jokeEl.style.opacity = 1;
    }, 400);
}

// ────────────────────────────────────────────────
// Theme Handling
// ────────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
}

function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) {
        setTheme(saved);
        return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
});

initTheme();

window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", e => {
        if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
        }
    });
