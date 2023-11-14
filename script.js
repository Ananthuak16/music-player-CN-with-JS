

// const and let  declaration

const menuBtn = document.querySelector(".menu-btn"),
  container = document.querySelector(".container"),
  currentFavourite = document.querySelector("#current-favourite"),
  playlistContainer = document.querySelector("#playlist"),
  audio = new Audio();



let playing = false,
  currentSong = 0,
  favourites = [];

  // menu button event lisiner


  menuBtn.addEventListener("click", () => {
    container.classList.toggle("active");
  });
  


  //toggle button to change theame starts

  function toggleTheme() {
    const toggleOffIcon = document.getElementById('toggleOffIcon');
    const toggleOnIcon = document.getElementById('toggleOnIcon');
    const body = document.body;

    toggleOffIcon.classList.toggle('hidden');
    toggleOnIcon.classList.toggle('hidden');

    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
}
 //toggle button to change theame ends
   







// const and let  declaration for music player 

const infoWrapper = document.querySelector(".info"),
  coverImage = document.querySelector(".cover-image"),
  currentSongTitle = document.querySelector(".current-song-title"),
  progress = document.querySelector('.line'),
  strt = document.querySelector('#start'),
  end = document.querySelector('#end');




  // song array list 

  const songs = [
    {
      index:0,
      title: "All I Know - Duncan Laurence",
      artist: "Duncan Laurence",
      length: "03:03",
      genre:"rock",
      img_src: "all.jpg",
      src: "all.mp3",
    },
  
    {
      index:1,
      title: "Into Your Arms - Ava Max - Witt Lowry",
      artist: "Ava Max, Witt Lowry",
      length: "02:10",
      genre: "hip-hop",
      img_src: "into.jpg",
  
      src: "into.mp3",
    },
    {
      index:2,
      title: "Let Me Down Slowly - Alec Benjamin",
      artist: "Alec Benjamin",
      length: "02:57",
      genre: "rock",
      img_src: "let.jpg",
      src: "let.mp3",
    },
    {
      index:3,
      title: "Boyfriend - Ariana Grande",
      artist: "Ariana Grande",
      length: "04:10",
      genre: "pop",
      img_src: "ari.jpg",
      src: "ari.mp3",
    },
    {
      index:4,
      title: "Cheap Thrills Sia",
      artist: "Sean Paul, Sia",
      length: "04:05",
      genre: "hip-hop",
      img_src: "cheap.jpg",
      src: "cheap.mp3",
    },
    {
      index:5,
      title: "Troye Sivan - Angel Baby",
      artist: "Troye Sivan",
      length: "03:40",
      genre: "rock",
      img_src: "sivan.jpg",
      src: "sivan.mp3",
    },
    {
      index:6,
      title: "We Don't Talk Anymore - Charlie Puth",
      artist: "Charlie Puth, Selena Gomez",
      length: "03:50",
      genre: "pop",
      img_src: "we dont.jpg",
      src: "we dont.mp3",
    },
    {
      index:7,
      title: "Taki Taki - Selena Gomez - DJ Snake",
      artist: "Cardi B, Dj Snake, Ozuna, Selena Gomez",
      length: "03:31",
      genre: "hip-hop",
      img_src: "cardi.jpg",
      src: "cardi.mp3",
    },
    {
      index:8,
      title: "Camila Cabello - HAVANA Arabic Remix - Djmanayman",
      artist: "Camila Cabello",
      length: "03:31",
      genre: "rock",
      img_src: "camila.jpg",
      src: "camila.mp3",
    },
    {
      index:9,
      title: "Hymn for the Weekend - Coldplay",
      artist: "Coldplay",
      length: "04:24",
      genre: "pop",
      img_src: "codplay.jpg",
      src: "codplay.mp3",
    },
    {
      index:10,
      title: "OneRepublic - I Ain't Worried (From Top Gun: Maverick)",
      artist: "OneRepublic",
      length: "02:34",
      genre: "hip-hop",
      img_src: "one.jpg",
      src: "one.mp3",
    },
  ];
  

  // init function to load and update page on loading

function init() {
  updatePlaylist(songs);
  loadSong(currentSong);
  
}

init();



// update playlist fuction starts


function updatePlaylist(songs) {
  playlistContainer.innerHTML = "";
  songs.forEach((song, index) => {
    const { title, length } = song;
    const isFavourite = favourites.includes(index);

    const tr = document.createElement("tr");
    tr.classList.add("songs");
    tr.innerHTML = `
      <td class="no">
        <h5>${index + 1}</h5>
      </td>
      <td class="title">
        <h6>${title}</h6>
      </td>
      <td class="length">
        <h5>${length}</h5>
      </td>
      <td>
        <i class="fas fa-heart ${isFavourite ? "active" : ""}"></i>
      </td>
    `;

    playlistContainer.appendChild(tr);


    // add to fav eventlisiner

    tr.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-heart")) {
        addToFavourites(index);
        e.target.classList.toggle("active");
        return;
      }
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      container.classList.remove("active");
      playing = true;
    });

    const audioForDuration = new Audio(`data/${song.src}`);
    audioForDuration.addEventListener("loadedmetadata", () => {
      const duration = audioForDuration.duration;
      let songDuration = formatTime(duration);
      tr.querySelector(".length h5").innerText = songDuration;
    });
  });
}


// update playlist fuction ends






// time format function 


function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}


// load songs function starts


function loadSong(num) {
  infoWrapper.innerHTML = `
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>
  `;
  currentSongTitle.innerHTML = songs[num].title;
  coverImage.style.backgroundImage = `url(data/${songs[num].img_src})`;

  if (songs[num].src) {
    audio.src = `data/${songs[num].src}`;
  } else {
    // Handle the case where the src is undefined or not provided
    console.error("Error: Song source (src) is not defined for the current song.");
  }

  if (favourites.includes(num)) {
    currentFavourite.classList.add("active");
  } else {
    currentFavourite.classList.remove("active");
  }
}


// load songs function ends


// play/pause/prev/next const declaration

const playPauseBtn = document.querySelector("#playpause");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");



// EventListener for play/pause button

playPauseBtn.addEventListener("click", () => {
  if (playing) {
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    playing = false;
    audio.pause();
  } else {
    playPauseBtn.classList.replace("fa-play", "fa-pause");
    playing = true;
    audio.play();
  }
});



// play next song function


function nextSong() {
  if (currentSong < songs.length - 1) {
    currentSong++;
  } else {
    currentSong = 0;
  }
  loadSong(currentSong);
  if (playing) {
    audio.play();
  }
}


// EventListener for Next button

nextBtn.addEventListener("click", nextSong);

// play previous song function

function prevSong() {
  if (currentSong > 0) {
    currentSong--;
  } else {
    currentSong = songs.length - 1;
  }
  loadSong(currentSong);
  if (playing) {
    audio.play();
  }
}


// EventListener for prev button

prevBtn.addEventListener("click", prevSong);

function addToFavourites(index) {
  if (favourites.includes(index)) {
    favourites = favourites.filter((item) => item !== index);
    currentFavourite.classList.remove("active");
    
  } else {
    favourites.push(index);
    currentFavourite.classList.add("active");
    
  }
  updatePlaylist(songs)
}



// EventListener for fav  button

currentFavourite.addEventListener("click", () => {
  addToFavourites(currentSong);
  currentFavourite.classList.toggle("active");
});




// EventListeners for progress handiling for fast forwrds/backwards button 

progress.addEventListener('mousedown', handleProgressBarClick);
progress.addEventListener('mousemove', handleProgressBarDrag);


// function for progress handiling starts

function handleProgressBarClick(event) {
  const progressBar = event.currentTarget;
  const boundingRect = progressBar.getBoundingClientRect();
  const offsetX = event.clientX - boundingRect.left;
  const percentage = offsetX / boundingRect.width;
  const newTime = percentage * audio.duration;

  audio.currentTime = newTime;
}

function handleProgressBarDrag(event) {
  if (event.buttons !== 1) return;
  handleProgressBarClick(event);
}

// function for progress handiling ends






// function for progress starts

function prog() {
  const curtime = audio.currentTime;
  const mincur = Math.floor(curtime / 60);
  const seccur = Math.floor(curtime % 60);
  const secTotal = Math.floor(audio.duration % 60);

  const formattedSecCur = seccur < 10 ? `0${seccur}` : seccur;
  const formattedSecTotal = secTotal < 10 ? `0${secTotal}` : secTotal;

  strt.innerHTML = `${mincur}:${formattedSecCur}`;
  end.innerHTML = `${Math.floor(audio.duration / 60)}:${formattedSecTotal}`;
}

const lineChild = document.querySelector('.lineChild');

function line() {
  const widthbar = (audio.currentTime / audio.duration) * 100;
  lineChild.style.width = `${widthbar}%`;
}



// EventListener for time updation

audio.addEventListener('timeupdate', () => {
  prog();
  line();
});

// function for progress ends


// const decleration for song container 

const songContainer = document.querySelector(".SongContainer");




// function display allgenre and filter in song container starts


function displaySongsInContainer(songs) {
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");
    songDiv.innerHTML = `
      <img src="data/${song.img_src}" alt="${song.title}">
      <h4> ${song.title}</h4>
    `;

    songDiv.addEventListener("click", () => {
      currentSong = song.index;
      loadSong(currentSong);
      audio.play();
      container.classList.remove("active");
      playing = true;
      console.log(`Now playing: ${song.title} by ${song.artist}, Index: ${song.index}`);
    });

    songContainer.appendChild(songDiv);
  });
}

const genreFilter = document.getElementById("genreFilter");

// genre filter eventlisiner

genreFilter.addEventListener("change", () => {
  const selectedGenre = genreFilter.value;
  const filteredSongs = selectedGenre === "all" ? songs : songs.filter((song) => song.genre === selectedGenre);
  songContainer.innerHTML = "";
  displaySongsInContainer(filteredSongs);
});

displaySongsInContainer(songs);



// function display all genre and filter in song container ends




//playlist  functions  starts


const playlists = [];



// crreate playlist function starts

function createPlaylist() {


    const playlistNameInput = document.getElementById('playlistName');
    const playlistName = playlistNameInput.value;

    if (playlistName.trim() === "") {

        alert("Please enter a valid playlist name.");
        return;
    }

    // Create a new playlist object
    const playlist = {
        name: playlistName,
        songs: [], // Array to store songs in the playlist
    };

    // Add the playlist to the global array
    playlists.push(playlist);

    // Create a new playlist element
    const playlistElement = document.createElement('div');
    playlistElement.classList.add('playlist-item');
    playlistElement.innerHTML = `
        <h4 onclick="displayPlaylist('${playlist.name}')">${playlist.name}</h4>
    `;

    // Add the playlist to the "All Playlists" section
    const allPlaylists = document.querySelector('.allPlaylist');
    allPlaylists.appendChild(playlistElement);

    // Clear the input field
    playlistNameInput.value = "";
}

// create playlist function ends



// display playlist function starts

function displayPlaylist(playlistName) {
  // Find the selected playlist from the global array
  const selectedPlaylist = playlists.find(playlist => playlist.name === playlistName);

  // Display the selected playlist in the "Current Playlists" section
  const currentPlaylistsElement = document.querySelector('.currentPlaylist');

  // Get the index of the current playing song
  const currentSongIndex = currentSong !== null ? currentSong : 0;

  currentPlaylistsElement.innerHTML = `
      <h3>${selectedPlaylist.name}</h3>
      <ul>
          ${selectedPlaylist.songs.map((song, index) => `
              <li>
                  <span class="song-name" onclick="playSelectedSong(${index}, '${playlistName}')">
                      ${index === currentSongIndex ? 'playlist ' : ''}
                      ${song.title} - ${song.length}
                  </span>
              </li>
          `).join('')}
      </ul>
      <button onclick="playPlaylist('${playlistName}')">Play Playlist</button>  `;  // play playlist button
}


// display playlist function ends


// const decleration

let currentPlaylistName = "";
let currentSongIndex = 0;



// play songs in the playlist function starts

function playPlaylist(playlistName) {
  const selectedPlaylist = playlists.find(playlist => playlist.name === playlistName);

  if (!selectedPlaylist || selectedPlaylist.songs.length === 0) {
    console.error("Invalid playlist or playlist is empty.");
    return;
  }

  // Set the current playlist and reset the current song index
  currentPlaylistName = playlistName;
  currentSongIndex = 0;

  playSelectedSong(currentSongIndex, currentPlaylistName);
  // console.log(`Now playing: ${selectedPlaylist.songs[currentSong].title} (Index: ${currentSong})`);
}

// play songs in the playlist function ends


// play selected songs in the playlist function starts

function playSelectedSong(songIndex, playlistName) {
  // Update the playlist and play the selected song
  const selectedPlaylist = playlists.find(playlist => playlist.name === playlistName);

  if (!selectedPlaylist || songIndex < 0 || songIndex >= selectedPlaylist.songs.length) {
    console.error("Invalid selection.");
    return;
  }

  // Play the selected song
  currentSongIndex = songIndex;
  loadSong(currentSongIndex);
  audio.play();

  // Update the music player UI with the selected song's information
  updateMusicPlayerUI(selectedPlaylist.songs[currentSongIndex]);

   
}







// play songs in the playlist function ends



// Function to play the next song in the current playlist
function playNextSong() {
  const selectedPlaylist = playlists.find(playlist => playlist.name === currentPlaylistName);

  if (!selectedPlaylist || selectedPlaylist.songs.length === 0) {
    console.error("Invalid playlist or playlist is empty.");
    return;
  }

  // Increment the current song index
  currentSongIndex = (currentSongIndex + 1) % selectedPlaylist.songs.length;

  // Play the next song
  playSelectedSong(currentSongIndex, currentPlaylistName);
}







// Function to play the previous song in the current playlist
function playPreviousSong() {
  const selectedPlaylist = playlists.find(playlist => playlist.name === currentPlaylistName);

  if (!selectedPlaylist || selectedPlaylist.songs.length === 0) {
    console.error("Invalid playlist or playlist is empty.");
    return;
  }

  // Decrement the current song index
  currentSongIndex = (currentSongIndex - 1 + selectedPlaylist.songs.length) % selectedPlaylist.songs.length;

  // Play the previous song
  playSelectedSong(currentSongIndex, currentPlaylistName);
}





// Event listeners for control buttons
document.getElementById('prev').addEventListener('click', playPreviousSong);
document.getElementById('playpause').addEventListener('click', () => {
  // Toggle between play and pause when the play/pause button is clicked
  if (audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
});
document.getElementById('next').addEventListener('click', playNextSong);




// function to update music player UI

function updateMusicPlayerUI(song) {
  // Update the music player UI with the selected song's information
  const songContainer = document.querySelector('.SongContainer');
  songContainer.innerHTML = `
      <h2>${song.title}</h2>
      <h3>${song.artist}</h3>
  `;

 
  updatePlaylist(selectedPlaylist.songs);
}



// add to current playlist functin starts


function addToCurrentPlaylist() {
  const currentPlaylistName = document.querySelector('.currentPlaylist h3').textContent;
  const selectedPlaylist = playlists.find(playlist => playlist.name === currentPlaylistName);

  if (!selectedPlaylist) {
    console.error("Current playlist not found.");
    return;
  }


  // Check if a song is currently playing
  if (currentSong === null || currentSong < 0 || currentSong >= songs.length) {
    console.error("No song is currently playing.");
    return;
  }


  // Check if the song is already in the playlist
  const currentSongToAdd = songs[currentSong];
  const isSongAlreadyInPlaylist = selectedPlaylist.songs.some(song =>
    song.title === currentSongToAdd.title && song.length === currentSongToAdd.length
  );



  if (isSongAlreadyInPlaylist) {
    alert("Song is already in the playlist.");
    return;
  }

  

  // Add the currently playing song to the current playlist
  selectedPlaylist.songs.push(currentSongToAdd);

  // Refresh the display of the current playlist
  displayPlaylist(currentPlaylistName);
}


// add to current playlist functin ends



//playlist  functions  ends