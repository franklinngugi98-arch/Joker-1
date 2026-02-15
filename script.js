const categories = {
    general: {
        name: "General Jokes",
        api: "https://official-joke-api.appspot.com/random_joke",
        parse: data => `${data.setup} - ${data.punchline}`,
        offline: [
            "How do you stop a bull from charging? - Cancel its credit card!",
            "What do you call a snobbish criminal going down the stairs? - A condescending con descending!",
            "Why can't your nose be 12 inches long? - Because then it would be a foot!",
            "What is the difference between a poorly-dressed man on a tricycle and a well-dressed man on a bicycle? - Attire!",
            "What do you call an angry carrot? - A steamed veggie!",
            "Why did the golfer bring two pairs of pants? - In case he got a hole-in-one!",
            "What did the horse say after it tripped? - Help! I've fallen and I can't giddyup!",
            "Why does Snoop Dogg use an umbrella? - For drizzle!",
            "What do you call a priest that becomes a lawyer? - A father-in-law!",
            "What do you call a man that irons clothes? - Iron Man!",
            "How did the barber win the race? - He knew a shortcut!",
            "RIP, boiling water. - You will be mist!",
            "What do you call a pile of cats? - A meow-tain!",
            "What kind of music do planets like? - Neptunes!",
            "How did the hipster burn his tongue? - He drank his coffee before it was cool!",
            "What do you call a row of rabbits hopping away? - A receding hare line!",
            "Why don't they play poker in the jungle? - Too many cheetahs!",
            "Where does the electric cord go to shopping? - The outlet mall, of course!",
            "Why did the Clydesdale give the pony a glass of water? - Because he was a little horse!",
            "What did the football coach say to the broken vending machine? - Give me my quarterback!",
            "What kind of tea is hard to swallow? - Reality!",
            "Why can't you trust the king of the jungle? - Because he's always lion!",
            "Why did the stadium get hot after the game? - All of the fans left!",
            "What kind of cheese isn't yours? - Nacho cheese!",
            "I couldn't figure out why the baseball kept getting larger. - Then it hit me!",
            "Why wouldn't the shrimp share his treasure? - He was a little shellfish!",
            "Did you hear about the population of Ireland's capital? - It's Dublin!",
            "What's a bear with no teeth called? - A gummy bear!",
            "What kind of music do mummies listen to? - Wrap music!",
            "How do you make a Venetian blind? - Poke him in the eyes!"
        ]
    },
    puns: {
        name: "Puns",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [
            "Why did Adele cross the road? To say hello from the other side.",
            "What kind of concert only costs 45 cents? A 50 Cent concert featuring Nickelback.",
            "What did the grape say when it got crushed? Nothing, it just let out a little wine.",
            "I want to be cremated as it is my last hope for a smoking hot body.",
            "Yesterday, I accidentally swallowed some food coloring. The doctor says I’m okay, but I feel like I’ve dyed a little inside.",
            "To the guy who invented zero, thanks for nothing.",
            "I had a crazy dream last night! I was swimming in an ocean of orange soda. Turns out it was just a Fanta sea.",
            "A crazy wife says to her husband that moose are falling from the sky. The husband says, it’s reindeer.",
            "Ladies, if he can’t appreciate your fruit jokes , you need to let that mango.",
            "Geology rocks, but Geography is where it’s at!",
            "What was Forrest Gump ’s email password? 1forrest1",
            "Did you hear about the restaurant on the Moon ? I heard the food was good, but it had no atmosphere.",
            "Can February March? No, but April May.",
            "Need an ark to save two of every animal? I noah guy.",
            "I don’t trust stairs because they’re always up to something.",
            "Smaller babies may be delivered by stork, but the heavier ones need a crane.",
            "My grandpa has the heart of a lion and a lifetime ban from the zoo.",
            "Why was Dumbo sad? He felt irrelephant.",
            "A man sued an airline company after it lost his luggage. Sadly, he lost his case.",
            "I lost my mood ring, and I don’t know how to feel about it!",
            "Time flies like an arrow. Fruit flies like a banana.",
            "So what if I don’t know what apocalypse means? It’s not the end of the world!",
            "My friend drove his expensive car into a tree and found out how his Mercedes bends.",
            "Becoming a vegetarian is one big missed steak .",
            "I can’t believe I got fired from the calendar factory. All I did was take a day off!",
            "Some aquatic mammals at the zoo escaped. It was otter chaos!",
            "Never trust an atom; they make up everything!",
            "Waking up this morning was an eye-opening experience.",
            "Long fairy tales have a tendency to dragon .",
            "What do you use to cut a Roman Emperor’s hair? Ceasers."
        ]
    },
    onelines: {
        name: "One-liners",
        api: "https://v2.jokeapi.dev/joke/Any?type=single",
        parse: data => data.joke,
        offline: [
            "Did you hear they arrested the devil? Yeah, they got him on possession.",
            "What did one DNA say to the other DNA? “Do these genes make me look fat?”",
            "My IQ test results came back. They were negative.",
            "What do you get when you cross a polar bear with a seal? A polar bear.",
            "Why can’t you trust an atom? Because they make up literally everything.",
            "Why was six afraid of seven? Because seven eight nine.",
            "What do you call a hippie’s wife? Mississippi.",
            "What’s the difference between an outlaw and an in-law? Outlaws are wanted.",
            "Scientists have recently discovered a food that greatly reduces sex drive. It’s called wedding cake.",
            "Before you marry a person, you should first make them use a computer with a slow Internet connection to see who they really are.",
            "I never knew what happiness was until I got married—and then it was too late.",
            "Some men say they don’t wear their wedding band because it cuts off circulation. Well, that’s the point, isn’t it?",
            "Advice to husbands: Try praising your wife now and then, even if it does startle her at first.",
            "Did you hear about the shepherd who drove his sheep through town? He was given a ticket for making a ewe turn.",
            "What happens to an illegally parked frog? It gets toad away.",
            "How does the man in the moon get his hair cut? Eclipse it.",
            "What do you call a blonde with half a brain? Gifted.",
            "Why are so many blonde jokes one-liners? So brunettes can remember them.",
            "Our child has a great deal of willpower—and even more won’t power.",
            "Among the things that are so simple even a child can operate them are parents.",
            "Why aren’t dogs good dancers? Because they have two left feet.",
            "What’s a dog’s favorite homework assignment? A lab report.",
            "Why did Beethoven get rid of his chickens? All they said was, “Bach, Bach, Bach …”",
            "Of course I wouldn’t say anything about her unless I could say something good. And, oh boy, is this good …",
            "When he talks, it isn’t a conversation. It’s a filibuster.",
            "She leaves me with the feeling that when we bury the hatchet she’ll mark the exact spot.",
            "You can’t believe everything you hear—but you can repeat it.",
            "There’s a lot to be said in his favor, but it’s not nearly as interesting.",
            "They’ve been treating me like one of the family, and I’ve put up with it for as long as I can.",
            "Why did the parents not like their son’s biology teacher? He had skeletons in his closet."
        ]
    },
    dad: {
        name: "Dad Jokes",
        api: "https://icanhazdadjoke.com/",
        headers: { "Accept": "application/json" },
        parse: data => data.joke,
        offline: [
            "Why don't skeletons fight each other? They don't have the guts.",
            "How do you make a tissue dance? Put a little boogie in it!",
            "Want to hear a joke about construction? I'm still working on it.",
            "Why can't you give Elsa a balloon? Because she will let it go.",
            "What do you call cheese that isn't yours? Nacho cheese.",
            "Why did the coffee file a police report? It got mugged.",
            "What do you call a belt made of watches? A waist of time.",
            "I'm reading a book on anti-gravity. It's impossible to put down!",
            "Why don't scientists trust atoms? Because they make up everything!",
            "I used to play piano by ear, but now I use my hands.",
            "Why did the scarecrow win an award? Because he was outstanding in his field.",
            "What do you call fake spaghetti? An impasta.",
            "What do you call a factory that makes okay products? A satisfactory.",
            "Why did the math book look sad? Because it had too many problems.",
            "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
            "Why can't your nose be 12 inches long? Because then it would be a foot.",
            "What did one wall say to the other wall? I'll meet you at the corner.",
            "How does a penguin build its house? Igloos it together.",
            "Why was the math book sad? It had too many problems.",
            "What do you call an alligator in a vest? An investigator.",
            "What do you call a dinosaur with a great vocabulary? A thesaurus.",
            "Why did the kid bring a ladder to school? Because he wanted to go to high school.",
            "How does a cucumber become a pickle? It goes through a jarring experience.",
            "What do you call a bear with no teeth? A gummy bear.",
            "Why did the computer go to the doctor? Because it had a virus.",
            "What kind of flower doesn't sleep at night? The day-zzz-y.",
            "Why did the gardener plant a light bulb? He wanted to grow a power plant.",
            "How do flowers greet each other? 'Hey bud, what's up?'",
            "What’s a flower’s favorite drink? Root beer.",
            "Why are flowers so friendly? They always have buds around."
        ]
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

function showCategories() {
    document.getElementById("category-screen").classList.add("active");
    document.getElementById("joke-screen").classList.remove("active");
}

function startCategory(key) {
    console.log(`Starting category: ${key}`); // Debug: Function called with key
    currentCategory = categories[key];
    document.getElementById("category-title").innerText = currentCategory.name;

    jokeHistory = [];
    historyIndex = -1;
    currentJokeText = "";

    document.getElementById("loveBtn").classList.remove("liked");
    document.getElementById("loveBtn").innerText = "♡";

    const jokeEl = document.getElementById("joke");
    jokeEl.innerText = "Loading joke..."; // Temporary text to show something immediately
    jokeEl.style.opacity = 1; // Force visible on switch

    if (currentCategory.isFavorites) {
        console.log('Loading favorites. Number of favorites:', favorites.length); // Debug
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
    console.log('Switched to joke-screen. Category title:', document.getElementById("category-title").innerText); // Debug
}

async function getJoke() {
    if (currentCategory.isFavorites) return;

    const jokeEl = document.getElementById("joke");
    jokeEl.style.opacity = 0;
    console.log('getJoke started. Setting opacity to 0'); // Debug

    document.getElementById("laughSound").play().catch((err) => console.error('Sound play error:', err));

    const colors = ["#2c3e50","#8e44ad","#2980b9","#27ae60","#e67e22","#c0392b","#34495e","#d35400"];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];

    setTimeout(async () => {
        console.log('Inside getJoke timeout'); // Debug
        let text = "Couldn't load a joke... try again!";

        try {
            const options = currentCategory.headers ? { headers: currentCategory.headers } : {};
            const response = await fetch(currentCategory.api, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            text = currentCategory.parse(data);
            console.log('Fetched from API:', text); // Debug
        } catch (err) {
            console.error('Fetch error:', err.message); // Debug
            const arr = currentCategory.offline;
            text = arr[Math.floor(Math.random() * arr.length)];
            console.log('Using offline joke:', text); // Debug
        }

        currentJokeText = text;
        jokeHistory = jokeHistory.slice(0, historyIndex + 1);
        jokeHistory.push(text);
        historyIndex = jokeHistory.length - 1;

        updateLoveButton();
        jokeEl.innerText = text;
        jokeEl.style.opacity = 1;
        console.log('Joke updated:', text, 'Opacity set to 1'); // Debug
    }, 400);
}

function showCurrentJoke() {
    if (historyIndex < 0 || historyIndex >= jokeHistory.length) return;

    currentJokeText = jokeHistory[historyIndex];
    document.getElementById("joke").innerText = currentJokeText;
    document.getElementById("joke").style.opacity = 1;
    updateLoveButton();
    console.log('Showing current joke from history:', currentJokeText); // Debug
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
            await navigator.share({
                title: 'Funny Joke',
                text: currentJokeText,
            });
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
