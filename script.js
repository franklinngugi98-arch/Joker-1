const categoryJokes = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: data => `${data.setup} — ${data.punchline}`,
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
        parse: data => data.joke,
        offline: [
            "I'm reading a book on anti-gravity. It's impossible to put down!",
            "I used to play piano by ear, but now I use my hands.",
            "Why do dads tell dad jokes? Because they are groan-ups."
        ]
    },
    puns: {
        name: "Puns",
        api: "https://v2.jokeapi.dev/joke/Any?type=single", // many are punny
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
            "I told my computer I needed a break, and now it won't stop sending me KitKat ads.",
            "Parallel lines have so much in common. It's a shame they'll never meet.",
            "My friend says I'm addicted to brake fluid, but I can stop anytime."
        ]
    }
};

let currentCategory = null;

function showCategories() {
    document.getElementById("category-screen").classList.add("active");
    document.getElementById("joke-screen").classList.remove("active");
}

function startJokes(categoryKey) {
    currentCategory = categoryJokes[categoryKey];
    document.getElementById("category-title").innerText = currentCategory.name;
    document.getElementById("joke").innerText = "Click to get a " + currentCategory.name.toLowerCase().replace("jokes", "joke") + "!";
    
    document.getElementById("category-screen").classList.remove("active");
    document.getElementById("joke-screen").classList.add("active");

    // Optional: load first joke automatically
    // getJoke();
}

async function getJoke() {
    if (!currentCategory) return;

    const jokeEl = document.getElementById("joke");
    jokeEl.style.opacity = 0;

    // Play sound
    const sound = document.getElementById("laughSound");
    sound.currentTime = 0;
    sound.play().catch(() => {}); // ignore autoplay block

    // Random background color
    const colors = ["#2c3e50", "#8e44ad", "#2980b9", "#27ae60", "#e67e22", "#c0392b", "#34495e", "#d35400"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;

    setTimeout(async () => {
        let text = "";

        try {
            const fetchOptions = currentCategory.headers ? { headers: currentCategory.headers } : {};
            const response = await fetch(currentCategory.api, fetchOptions);
            if (!response.ok) throw new Error();
            const data = await response.json();
            text = currentCategory.parse(data);
        } catch {
            // Offline fallback
            const arr = currentCategory.offline;
            text = arr[Math.floor(Math.random() * arr.length)];
        }

        jokeEl.innerText = text;
        jokeEl.style.opacity = 1;
    }, 400);
}

// Optional: load first joke when category chosen (uncomment in startJokes if wanted)
