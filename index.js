console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs=[{songName:"Music1", filePath:"songs/1.mp3", coverPath:"images/1.jpg"},
{songName:"Music2", filePath:"songs/2.mp3", coverPath:"images/2.jpg"},
{songName:"Music3", filePath:"songs/3.mp3", coverPath:"images/3.jpg"},
{songName:"Music4", filePath:"songs/4.mp3", coverPath:"images/4.jpg"},
{songName:"Music5", filePath:"songs/5.mp3", coverPath:"images/5.jpg"},
{songName:"Music6", filePath:"songs/6.mp3", coverPath:"images/6.jpg"},
{songName:"Music7", filePath:"songs/7.mp3", coverPath:"images/7.jpg"},
{songName:"Music8", filePath:"songs/8.mp3", coverPath:"images/8.jpg"},
{songName:"Music9", filePath:"songs/9.mp3", coverPath:"images/9.jpg"},
{songName:"Music10", filePath:"songs/10.mp3", coverPath:"images/10.jpg"}
];


songItem.forEach((elements,i) => {
  elements.getElementsByTagName("img")[0].src = songs[i].coverPath;
  elements.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});



masterPlay.addEventListener("click",function(){
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity=1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity=0;
  }
});


audioElement.addEventListener("timeupdate",function(){
  progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value = progress;
});


myProgressBar.addEventListener("change", function(){
  audioElement.currentTime=myProgressBar.value * (audioElement.duration/100);
});


const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-circle-play");
  })
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
  element.addEventListener("click",(e)=>{
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-pause-circle");
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  })
});


document.getElementById("next").addEventListener("click",function(){
  if(songIndex>=9){
    songIndex=0;
  }
  else{
    songIndex+=1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`
  masterSongName.innerText= songs[songIndex].songName;
  audioElement.currentTime=0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click",function(){
  if(songIndex<=0){
    songIndex=0;
  }
  else{
    songIndex-=1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`
  masterSongName.innerText= songs[songIndex].songName;
  audioElement.currentTime=0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
