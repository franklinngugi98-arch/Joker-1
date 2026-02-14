const offlineJokes = [
  "Why did the chicken cross the road? - To get to the other side!",
  "I told my computer I needed a break, and it froze.",
  "Why don’t skeletons fight each other? - They don’t have the guts!",
  "Why did the scarecrow win an award? - Because he was outstanding in his field!",
  "I asked my dog what's two minus two. He said nothing."
];

async function getJoke() {
    const jokeEl = document.getElementById("joke");
    jokeEl.style.opacity = 0;

    setTimeout(async () => {
        try {
            const response = await fetch("https://official-joke-api.appspot.com/random_joke");
            if (!response.ok) throw new Error("Network error");

            const data = await response.json();
            jokeEl.innerText = data.setup + " - " + data.punchline;
        } catch {
            const randomIndex = Math.floor(Math.random() * offlineJokes.length);
            jokeEl.innerText = offlineJokes[randomIndex];
        }

        jokeEl.style.opacity = 1;
    }, 300);
}
