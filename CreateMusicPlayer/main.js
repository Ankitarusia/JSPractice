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
let volumeIcon = document.querySelector(".volume_icon");
let track_index=0;
let isPlaying=false;
let updateTimer;
var dataswitchID;
let current_track= document.createElement('audio');


	let track_list=[
{
	name: "Beyhadh", 
    artist: "Rahul Jain", 
    image: "img/Beyhadh.jpg", 
    path: "audio/Beyhadh - Rahul Jain.mp3"
},
{
	name: "Adhi Adhi Raat", 
    artist: "Bilal Saeed", 
    image: "img/ganesh.jpg", 
    path: "audio/Adhi Adhi Raat.mp3"
},
{
	name: "Ek Villain - Galliyan", 
    artist: "Ankit Tiwari", 
    image: "img/Galliyan.jpg", 
    path: "audio/Ek Villain - Galliyan.mp3"
},
{
	name: "Teri Baat Aur Hai", 
    artist: "Stebin Ben", 
    image: "img/teribaatorhai.jpg", 
    path: "audio/Teri Baat Aur Hai - Stebin Ben.mp3"
},
{
	name: "BADAN PE SITARE", 
    artist: "Darshan Raval", 
    image: "img/badanpesitare.jpg", 
    path: "audio/Badan Pe Sitare (Darshan Raval).mp3"
},
{
	name: "Humko Tum Mil Gaye", 
    artist: "Vishal Mishra", 
    image: "img/humkotummilgaye.jpg", 
    path: "audio/Humko Tum Mil Gaye - Vishal Mishra.mp3"
},
{
	name: "Jaan Ban Gaye - Khuda Haafiz", 
    artist: "Asees Kaur", 
    image: "img/jaanbangaye.jpg", 
    path: "audio/Jaan Ban Gaye - Khuda Haafiz.mp3"
},
{
	name: "Kaise Hua - Kabir Singh", 
    artist: "Vishal Mishra", 
    image: "img/kaisehua.jpg", 
    path: "audio/Kaise Hua - Kabir Singh.mp3"
}
]


function loadTrack(track_index){
	clearInterval(updateTimer);
	resetValues();
	volumeIcon.addEventListener("click",fmute);
	current_track.src=track_list[track_index].path;
	current_track.load();
track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
track_name.textContent= track_list[track_index].name;
track_artist.textContent= track_list[track_index].artist;
//now_playing.textContent= "Playing " + (track_index+1) + "of" + track_list.length;  

updateTimer= setInterval(seekUpdate, 1000);

current_track.addEventListener("ended", nextTrack);
volume_slider.addEventListener("mousemove",setVolume);
randombgImage();
}

function randombgImage(){
var images = ['img/Beyhadh.jpg','img/ganesh.jpg',
      'img/Galliyan.jpg',
      'img/teribaatorhai.jpg','img/badanpesitare.jpg','img/humkotummilgaye.jpg','img/jaanbangaye.jpg','img/kaisehua.jpg'];
      var heading=['MUSIC IS LIFE','MUSIC BRINGS RELIEF','MUSIC IS THE SHORTHAND OF EMOTIONS','MUSIC IS LOVE IN SEARCH OF WORD','WHERE WORDS FAIL, MUSIC SPEAKS','MUSIC IS WHAT FEELINGS SOUND LIKE','MUSIC IS AN OUTBURST OF THE SOUL','LIFE IS A SONG. SING IT!'];
	
	for (var i = 0; i < images.length; i++) {
	if (dataswitchID==i || track_index==i) {
	 document.getElementById('banner').setAttribute("style", "background-image: url(" +images[i] + ");background-position:top;transition:all ease;background-repeat: no-repeat;background-size: cover; ");
	document.getElementById('h1').innerHTML=heading[i];
	document.getElementById('h1').setAttribute("style",'');
	}
	
}}
/* 
function randombgColor() {

   var imgCount = 3;
   var dir = 'http://local.statamic.com/_themes/img/';
   var randomCount = (Math.floor(Math.random() * imgCount));
   var images = ['img/image1.jpg','img/image2.jpg','img/image3.jpg'];
   document.getElementById('banner').setAttribute("style", "background-image: url("dir +images[randomCount] + ");background-repeat: no-repeat;background-size: cover cover");
}
 /* function randombgImage()
{
	var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
   document.body.style.background = color;
}
let red = Math.floor(Math.random() * 256) + 16; 
let green = Math.floor(Math.random() * 256) + 16; 
let blue = Math.floor(Math.random() * 256) + 16; 
let alpha = Math.floor(Math.random() * 256) + 16; 
  let bgColor = "rgba(" + red + ", " + green + ", " + blue + ","+alpha+")"; 
  document.body.style.background = bgColor; 
}
 */
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
function fmute(){
	if(current_track.muted){
		current_track.muted=false;
		volumeIcon.innerHTML='<i class="fa fa-volume-up"></i>';
		volume_slider.value=100; }
	else{
			current_track.muted=true;
			volumeIcon.innerHTML='<i class="fa fa-volume-off"></i>';
			volume_slider.value=0;
		}

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
$(".album-poster").on('click',function(e){
	dataswitchID=$(this).attr("data-switch");
	loadTrack(dataswitchID);
	playTrack();
});

