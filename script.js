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
        createConfetti(); // Add confetti effect
    }, 300);
}

// 🎉 Confetti + emoji animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const emojis = ["😂","🎭","🤣","😎","🤪","🎉"];
    for(let i=0;i<30;i++){
        const emoji = document.createElement('div');
        emoji.innerText = emojis[Math.floor(Math.random()*emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.fontSize = Math.random()*24+14+'px';
        emoji.style.left = Math.random()*window.innerWidth+'px';
        emoji.style.top = '-50px';
        emoji.style.opacity = 0.8;
        emoji.style.transform = `rotate(${Math.random()*360}deg)`;
        confettiContainer.appendChild(emoji);

        // Animate falling
        let top = -50;
        const speed = Math.random()*3 + 2;
        const fall = setInterval(()=>{
            top += speed;
            emoji.style.top = top+'px';
            if(top>window.innerHeight){
                emoji.remove();
                clearInterval(fall);
            }
        },16);
    }
      }
