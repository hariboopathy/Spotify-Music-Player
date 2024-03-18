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
const shuffleButton = document.getElementById('shuffle');

let songs = [
    {songName: "Eminem - Without Me (Official Music Video)", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
    {songName: "Lose Yourself -Eminem", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Venom Song by -Eminem", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {songName: "The Real SlimShady -Eminem", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Rap God by Eminem", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Eminem - Mockingbird ", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg"},
    {songName: "See You again - charile puth", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Am I wrong - Nico & Winz", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Lover Boy - A wall ", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Bones - Imagine Dragons", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
const rewindButton = document.getElementById('rewind');

// Add click event listeners to the buttons
shuffleButton.addEventListener('click', toggleShuffleMode);
rewindButton.addEventListener('click', rewindToPreviousSong);

// Define the shuffle function
function toggleShuffleMode() {
    isShuffleMode = !isShuffleMode; // Toggle shuffle mode

    // Update the shuffle button's appearance based on shuffle mode
    if (isShuffleMode) {
        shuffleButton.classList.add('active'); // Add a CSS class for visual indication
    } else {
        shuffleButton.classList.remove('active'); // Remove the CSS class
    }
}

// Define the rewind function
function rewindToPreviousSong() {
    if (isShuffleMode) {
        // Handle shuffle mode rewind logic here
        // For example, select a random song and play it
        const randomIndex = getRandomSongIndex();
        playSongAtIndex(randomIndex);
    } else {
        // Handle regular rewind logic here
        if (songIndex > 0) {
            songIndex--;
        } else {
            songIndex = songs.length - 1;
        }
        playSelectedSong();
    }
}

// Function to get a random song index
function getRandomSongIndex() {
    const currentIndex = songIndex;
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentIndex);
    return randomIndex;
}

// Function to play a song by its index
function playSongAtIndex(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})