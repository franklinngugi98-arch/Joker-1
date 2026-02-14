// Offline jokes list
const offlineJokes = [
  "Why did the chicken cross the road? - To get to the other side!",
  "I told my computer I needed a break, and it froze.",
  "Why don’t skeletons fight each other? - They don’t have the guts!",
  "Why did the scarecrow win an award? - Because he was outstanding in his field!",
  "I asked my dog what's two minus two. He said nothing."
];

// Function to fetch online joke
async function getJoke() {
    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        document.getElementById("joke").innerText = data.setup + " - " + data.punchline;
    } catch (error) {
        // If online joke fails, use offline joke
        const randomIndex = Math.floor(Math.random() * offlineJokes.length);
        document.getElementById("joke").innerText = offlineJokes[randomIndex];
    }
            }
