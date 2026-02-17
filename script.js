const categories = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: data => `${data.setup} - ${data.punchline}`,
        offline: [ /* your original list */ ]
    },
    puns: {
        name: "Puns",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [ /* your original list */ ]
    },
    onelines: {
        name: "One-liners",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [ /* your original list */ ]
    },
    dad: {
        name: "Dad Jokes",
        api: "https://icanhazdadjoke.com/",
        headers: { "Accept": "application/json" },
        parse: data => data.joke,
        offline: [ /* your original list */ ]
    },
    favorites: {
        name: "My Favorites ❤️",
        isFavorites: true
    }
};

let currentCategory = null;
let currentJokeText = "";
let jokeHistory = [];
let historyIndex = -1;
let favorites = JSON.parse(localStorage.getItem("favoriteJokes") || "[]");

// Settings
let settings = {
  font: localStorage.getItem('jokeFont') || 'Poppins',
  bgMode: localStorage.getItem('bgMode') || 'random'
};

// Track seen jokes per category to prevent repeats
const seenJokes = {}; // key: category key, value: Set of seen joke strings

function applySettings() {
  const jokeEl = document.getElementById('joke');
  jokeEl.className = '';
  jokeEl.classList.add(settings.font.toLowerCase());

  if (settings.bgMode === 'fixed') {
    document.body.classList.add('bg-fixed');
  } else {
    document.body.classList.remove('bg-fixed');
  }
}

function openSettings() {
  document.getElementById('settings-modal').classList.add('active');
  document.getElementById('fontSelect').value = settings.font;
  document.getElementById('bgModeSelect').value = settings.bgMode;
}

function closeSettings() {
  document.getElementById('settings-modal').classList.remove('active');
}

function saveSettings() {
  settings.font = document.getElementById('fontSelect').value;
  settings.bgMode = document.getElementById('bgModeSelect').value;

  localStorage.setItem('jokeFont', settings.font);
  localStorage.setItem('bgMode', settings.bgMode);

  applySettings();
  closeSettings();
}

function showCategories() {
  document.getElementById("category-screen").classList.add("active");
  document.getElementById("joke-screen").classList.remove("active");
  document.getElementById("settingsBtn").style.display = "none";
}

function startCategory(key) {
  currentCategory = categories[key];
  document.getElementById("category-title").innerText = currentCategory.name;

  jokeHistory = [];
  historyIndex = -1;
  currentJokeText = "";

  if (!seenJokes[key]) seenJokes[key] = new Set();

  document.getElementById("loveBtn").classList.remove("liked");
  document.getElementById("loveBtn").innerText = "♡";

  const jokeEl = document.getElementById("joke");
  jokeEl.innerText = "Loading joke...";
  jokeEl.style.opacity = 1;

  applySettings();

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
  document.getElementById("settingsBtn").style.display = "block";
}

async function getJoke() {
  if (currentCategory.isFavorites) return;

  const jokeEl = document.getElementById("joke");
  jokeEl.style.opacity = 0;

  if (settings.bgMode === 'random') {
    const colors = ["#2c3e50","#8e44ad","#2980b9","#27ae60","#e67e22","#c0392b","#34495e","#d35400"];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
  }

  document.getElementById("laughSound").play().catch(() => {});

  setTimeout(async () => {
    let text = "Couldn't load a joke... using offline fallback!";

    // Try API first
    try {
      const options = currentCategory.headers ? { headers: currentCategory.headers } : {};
      const response = await fetch(currentCategory.api, options);
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      text = currentCategory.parse(data);
    } catch (err) {
      console.log("API failed, using offline:", err);
      // Offline fallback with no-repeat logic
      const key = Object.keys(categories).find(k => categories[k] === currentCategory);
      const seen = seenJokes[key] || new Set();
      const available = currentCategory.offline.filter(j => !seen.has(j));

      if (available.length > 0) {
        text = available[Math.floor(Math.random() * available.length)];
        seen.add(text);
        seenJokes[key] = seen;
      } else {
        // All seen → reset and pick any
        seenJokes[key] = new Set();
        text = currentCategory.offline[Math.floor(Math.random() * currentCategory.offline.length)];
        seenJokes[key].add(text);
      }
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

async function shareJoke() {
  if (!currentJokeText) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Funny Joke', text: currentJokeText });
    } catch (err) {
      console.error('Share failed:', err);
    }
  } else {
    navigator.clipboard.writeText(currentJokeText);
    alert('Joke copied to clipboard!');
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

// Apply settings on page load
applySettings();
