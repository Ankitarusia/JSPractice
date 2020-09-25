let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let prev_btn = document.querySelector(".prev-track");
let next_btn = document.querySelector(".next-track");
let playpause_btn = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider"); 
let volume_slider = document.querySelector(".volume_slider"); 
let curr_time = document.querySelector(".current-time"); 
let total_duration = document.querySelector(".total-duration"); 
let track_index=0;
let isPlaying=false;
let updateTimer;

let current_track= document.createElement('audio');

let track_list=[{
	name: "Adhi Adhi Raat", 
    artist: "Bilal Saeed", 
    image: "img/image1.jpg", 
    path: "Adhi Adhi Raat.mp3"
},
{
	name: "Ek Villain - Galliyan", 
    artist: "Ankit Tiwari", 
    image: "img/image2.jpg", 
    path: "Ek Villain - Galliyan.mp3"
},
{
	name: "Khud Ko Tere", 
    artist: "Mahalakshmi Iyer", 
    image: "img/image3.jpg", 
    path: "Khud Ko Tere.mp3"
},
];

function loadTrack(track_index){
	clearInterval(updateTimer);
	resetValues();
	current_track.src=track_list[track_index].path;
	current_track.load();
track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
track_name.textContent= track_list[track_index].name;
track_artist.textContent= track_list[track_index].artist;
now_playing.textContent= "Playing " + (track_index+1) + "of" + track_list.length;  

updateTimer= setInterval(seekUpdate, 1000);

current_track.addEventListener("ended", nextTrack);

randombgColor();
}

/*function randombgColor()
{
let red = Math.floor(Math.random() * 256) + 64; 
let green = Math.floor(Math.random() * 256) + 64; 
let blue = Math.floor(Math.random() * 256) + 64; 
  
  // Construct a color withe the given values 
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")"; 
  
  // Set the background to the new color 
  document.body.style.background = bgColor; 
} */
/*function Random_bg_image(){
var images = ['img/image1.jpg',
      'img/image2.jpg',
      'img/image3.jpg'];
	
	for (var i = 0; i < images.length; i++) {
	if (track_index==i) {
	document.body.style.backgroundImage= "url ("+images[i]+")";
	
	}
	
}}

*/

function randombgColor()
{
let red = Math.floor(Math.random() * 256) + 64; 
let green = Math.floor(Math.random() * 256) + 64; 
let blue = Math.floor(Math.random() * 256) + 64; 
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")"; 
  document.body.style.background = bgColor; 
}

var resetValues=function() { 
  curr_time.textContent='00:00'; 
  total_duration.textContent= "00:00"; 
  seek_slider.value = 0; 
};

function playpauseTrack(){
	if (!isPlaying) 
		playTrack();
	else
		pauseTrack();
}

var playTrack= function()
{
	current_track.play();
	isPlaying=true;
	playpause_btn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
};

var pauseTrack = function(){
	current_track.pause();
	isPlaying=false;
	playpause_btn.innerHTML='<i class="fas fa-play fa-2x"></i>';
};

var nextTrack=function(){
	if (track_index< track_list.length-1) {
		track_index +=1;
		}
		else track_index=0;

loadTrack(track_index);
playTrack();
};

function previousTrack(){
	if (track_index>0) {
		track_index-=1;
		}
		else track_index= track_list.length;
	loadTrack(track_index);
	playTrack();
	}


function seekTo() { 
let seekto = current_track.duration * (seek_slider.value / 100); 
current_track.currentTime = seekto; 
} 

function setVolume() { 
current_track.volume = volume_slider.value / 100; 
} 

function seekUpdate() { 
let seekPosition = 0;  
if (!isNaN(current_track.duration)) { 
	seekPosition = current_track.currentTime * (100 / current_track.duration); 
	seek_slider.value = seekPosition; 
	let currentMinutes = Math.floor(current_track.currentTime / 60); 
	let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60); 
	let durationMinutes = Math.floor(current_track.duration / 60); 
	let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60); 
	if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
	if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
	if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
	if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
	curr_time.textContent = currentMinutes + ":" + currentSeconds; 
	total_duration.textContent = durationMinutes + ":" + durationSeconds; 
} 
} 

loadTrack(track_index); 

