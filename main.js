console.log("Welcome to Zinda Music Player");

let currIndex = -1;
let audio = new Audio('Tracks/Fullmetal.wav');

let currTrackArt = document.getElementById('currTrackArt');
let currTrackName = document.getElementById('currTrackName');
let progressBar = document.getElementById('progressBar');
let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let currTime = document.getElementById('currTime');
let totalTime = document.getElementById('totalTime');

// style progressBar
const min = progressBar.min;
const max = progressBar.max;
let value = progressBar.value;
let track = Array.from(document.getElementsByClassName('track'));
let playButtons = Array.from(document.getElementsByClassName('play-pause'));

// Initialize all tracks
let tracks = [
    {trackName: "Fullmetal", path: "Tracks/Fullmetal.wav", 
    trackArt: "Images/Track-Art/Fullmetal.jpeg", key: "G# minor", bpm: "137", length: "2:11"},

    {trackName: "The Red Line", path: "Tracks/TRL.wav", 
    trackArt: "Images/Track-Art/The Red Line.jpeg", key: "D# minor", bpm: "117", length: "2:29"},

    {trackName: "5 Stars", path: "Tracks/5 Stars.wav", 
    trackArt: "Images/Track-Art/5 Star.jpeg", key: "G minor", bpm: "162", length: "1:45"},

    {trackName: "Where Am I", path: "Tracks/WAI.wav", 
    trackArt: "Images/Track-Art/Where Am I.jpeg", key: "A minor", bpm: "117", length: "2:05"},

    {trackName: "4PF Beethoven", path: "Tracks/4PFB.wav", 
    trackArt: "Images/Track-Art/4PF Beethoven.jpeg", key: "A minor", bpm: "168", length: "3:04"},

    {trackName: "Lone", path: "Tracks/Lone.wav", 
    trackArt: "Images/Track-Art/Lone.jpeg", key: "A# minor", bpm: "155", length: "2:07"},

    {trackName: "Shower Thoughts", path: "Tracks/ST.wav", 
    trackArt: "Images/Track-Art/cryign man.jpeg", key: "G minor", bpm: "157", length: "2:02"},

    {trackName: "Don't Hide It", path: "Tracks/DHI.wav", 
    trackArt: "Images/Track-Art/Don't Hide It.jpeg", key: "A minor", bpm: "156", length: "3:05"},

    {trackName: "Loops", path: "Tracks/Loops.wav", 
    trackArt: "Images/Track-Art/Loops.jpeg", key: "G# minor", bpm: "87", length: "2:46"},
]
let lastSongIndex = tracks.length - 1;

// make track box in html reflect track info
track.forEach((element, i)=>{
    element.getElementsByClassName("track-art")[0].src = tracks[i].trackArt;
    element.getElementsByClassName("track-name")[0].innerText = tracks[i].trackName;
    element.getElementsByClassName("track-key")[0].innerText = tracks[i].key;
    element.getElementsByClassName("track-bpm")[0].innerText = tracks[i].bpm;
    element.getElementsByClassName("track-length")[0].innerText = tracks[i].length;
})

const resetPlayButtons = ()=> {
    playButtons.forEach((element)=> {
        element.src = "Images/Control/play-alt 2.svg";
    })
}

const updatePlayButtons = () => {
    resetPlayButtons();
    document.getElementById(currIndex).src = "Images/Control/pause-alt 2.svg";
    masterPlay.src = "Images/Control/pause.svg";
}

const updatePlayer = () => {
    currTrackArt.src = tracks[currIndex].trackArt;
    currTrackName.innerText = tracks[currIndex].trackName;
    totalTime.innerText = tracks[currIndex].length;
}

// Event Listening

// when user clicks play on a song
playButtons.forEach((element)=> {
    element.addEventListener('click', (e)=> {
        // get index of song clicked
        songIndex = parseInt(e.target.id);
        
        // update player with song info

        // if song is already playing
        if (e.target.getAttribute('src') == "Images/Control/pause-alt 2.svg") {
            audio.pause();
            e.target.src = "Images/Control/play-alt 2.svg";
            masterPlay.src = "Images/Control/play.svg";
        }

        // if new song is clicked
        else if (songIndex != currIndex) {
            resetPlayButtons();
            console.log(e.target);
            
            // play song at that index in tracks array
            console.log("playing song at index: " + songIndex);
            currIndex = songIndex;
            audio.src = tracks[songIndex].path;
            audio.currentTime = 0;
            e.target.src = "Images/Control/pause-alt 2.svg";
            masterPlay.src = "Images/Control/pause.svg";
            audio.play();
            
        }

        // if same song playing is unpaused
        else {
            e.target.src = "Images/Control/pause-alt 2.svg";
            masterPlay.src = "Images/Control/pause.svg";
            audio.play();
        }
        updatePlayer();
    })
})

// Handle big play pause clicks
masterPlay.addEventListener('click', ()=> {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterPlay.src = "Images/Control/pause.svg";
        updatePlayButtons();
    }
    else {
        audio.pause();
        masterPlay.src = "Images/Control/play.svg";
        resetPlayButtons();
    }
})

// while audio is playing
audio.addEventListener('timeupdate', ()=> {
    // update current time
    totalSeconds = Math.floor(audio.currentTime);
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    if (seconds < 10) {
        secondString = "0" + seconds;
    }
    else {
        secondString = "" + seconds;
    }

    currTime.innerText = minutes + ":" + secondString;
    //update progress bar
    progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    progressBar.style.backgroundSize = progressPercent + 0.25 + '% 100%'

    if (progressPercent == 100) {
        nextSong();
    }
})

// when user changes progress bar manually
progressBar.addEventListener('change', ()=> {
    audio.currentTime = progressBar.value * audio.duration / 100;
})

previous.addEventListener('click', ()=> {
    // if first song isn't playing
    if (currIndex != 0) {
        currIndex--;
    }
    audio.src = tracks[currIndex].path;
    audio.currentTime = 0;
    updatePlayer();
    updatePlayButtons();
    audio.play();
})

const nextSong = () => {
    // if last song isn't playing
    if (currIndex != lastSongIndex) {
        currIndex++;
    }
    else {
        currIndex = 0;
    }
    audio.src = tracks[currIndex].path;
    audio.currentTime = 0;
    updatePlayer();
    updatePlayButtons();
    audio.play();
}

next.addEventListener('click', ()=> {
    
    nextSong();
})
