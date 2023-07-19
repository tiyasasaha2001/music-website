console.log("Welcome to TuneSpot");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {songName: "Music 1", filePath: "./1.mp3", coverPath: "./1.jpg"},
  {songName: "Music 2", filePath: "./2.mp3", coverPath: "./2.jpg"},
  {songName: "Music 3", filePath: "./3.mp3", coverPath: "./3.jpg"},
  {songName: "Music 4", filePath: "./4.mp3", coverPath: "./4.jpg"},
  {songName: "Music 5", filePath: "./5.mp3", coverPath: "./5.jpg"},
  {songName: "Music 6", filePath: "./6.mp3", coverPath: "./6.jpg"},
  {songName: "Music 7", filePath: "./7.mp3", coverPath: "./7.jpg"},
  {songName: "Music 8", filePath: "./8.mp3", coverPath: "./8.jpg"},
  {songName: "Music 9", filePath: "./9.mp3", coverPath: "./9.jpg"},
  {songName: "Music 10", filePath: "./10.mp3", coverPath: "./10.jpg"},
];

songItems.forEach((element, i) => { 
  element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => { 
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});

document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});
