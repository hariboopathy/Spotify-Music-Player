console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let isShuffleMode = false;

let songs = [
    {songName: "Eminem - Without Me (Official Music Video)", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Lose Yourself -Eminem", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Venom Song by -Eminem", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {songName: "The Real SlimShady -Eminem", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Rap God by Eminem", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Eminem - Mockingbird ", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg"},
    {songName: "See You again - Charlie Puth", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Am I Wrong - Nico & Vinz", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Lover Boy - Awall", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Bones - Imagine Dragons", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
    let previousButton = document.getElementById("previous"); 
    if (previousButton) {
        previousButton.addEventListener("click", rewindToPreviousSong);
    } else {
        console.error("ERROR: 'previous' button not found!");
    }
});

// Update song list UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

// Listen to time updates and update progress bar
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek in the song
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
};

// Play a specific song
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        const clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            // If clicking the same song that's playing -> pause it
            audioElement.pause();
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            gif.style.opacity = 0;
        } else {
            // Play the selected song
            makeAllPlays();
            songIndex = clickedIndex;
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }
    });
});


// Next song functionality
document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSelectedSong();
});

// Shuffle mode toggle
function toggleShuffleMode() {
    isShuffleMode = !isShuffleMode;

    if (isShuffleMode) {
        shuffleButton.classList.add("active");
    } else {
        shuffleButton.classList.remove("active");
    }
}

// Rewind to previous song
function rewindToPreviousSong() {
    if (isShuffleMode) {
        const randomIndex = getRandomSongIndex();
        playSongAtIndex(randomIndex);
    } else {
        if (songIndex > 0) {
            songIndex--;
        } else {
            songIndex = songs.length - 1;
        }
        playSelectedSong();
    }
}

// Get a random song index
function getRandomSongIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === songIndex);
    return randomIndex;
}

// Play a song by index
function playSongAtIndex(index) {
    songIndex = index;
    playSelectedSong();
}

// Play the selected song
function playSelectedSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
}
document.addEventListener("DOMContentLoaded", function () {
    let shuffleButton = document.getElementById("shuffle");
    if (shuffleButton) {
        shuffleButton.addEventListener("click", toggleShuffleMode);
    } else {
        console.error("ERROR: 'shuffle' button not found! Check your HTML.");
    }
});

function toggleShuffleMode() {
    let shuffleButton = document.getElementById("shuffle");
    if (!shuffleButton) {
        console.error("ERROR: Shuffle button not found!");
        return;
    }

    isShuffleMode = !isShuffleMode;
    shuffleButton.classList.toggle("active");
}

document.getElementById("homeBtn").addEventListener("click", () => {
    location.reload(); // Reloads the current page
});

document.getElementById("aboutBtn").addEventListener("click", () => {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <div style="padding: 20px; color: black; font-size: 26px;">
            <h2>About Eminem</h2>
            <p >
                Eminem, born Marshall Bruce Mathers III, is an American rapper, songwriter, and record producer. 
                He is among the best-selling music artists of all time, known for his rapid-fire delivery, 
                clever lyrics, and controversial themes.
            </p>
            <p>
                Some of his most famous tracks include "Lose Yourself", "Rap God", "Mockingbird", and "The Real Slim Shady".
                Eminem has won numerous awards including multiple Grammys and an Academy Award.
            </p>
        </div>
    `;
});
