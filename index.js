window.addEventListener('DOMContentLoaded',() => {
    let play_button = document.querySelector("#play_button");
    let pause_button = document.querySelector("#pause_button");
    let left_skip_button = document.querySelector("#left_skip_button");
    let right_skip_button = document.querySelector("#right_skip_button");
    let loop_button = document.querySelector("#loop_button");
    const progress_slider = document.querySelector("#progress_slider")
    let audio = document.querySelector("audio")
    let album_art = document.querySelector("#album_art")
    let isLooping = false;
    let isShuffling = false;

    currentTrack = 0; 
    album_art.style.animationPlayState = 'paused';


    play_button.style.display = "inline-block";
    pause_button.style.display = "none";

    playlist = [ 
        {
            file: 'playlist/track_1.mp3',
            track: 'Duvet',
            artist: 'Boa',
            cover: 'track_1_cover.jpeg',
        },
        {
            file: 'playlist/track_2.mp3',
            track: 'Seinna',
            artist: 'The Marias',
            cover: 'track_2_cover.jpeg',

        },
        {
            file: 'playlist/track_3.mp3',
            track: 'Wildflower',
            artist: 'Yung Kai',
            cover: 'track_3_cover.jpeg',

        },
    ]
    audio.addEventListener('ended', () => {

        if (!isLooping) { 
            if (isShuffling) { 
                let nextTrack; 
                do { 
                    nextTrack = Math.floor (Math.random()*playlist.length);
                }
                while ( nextTrack === currentTrack && playlist.length > 1)
                
                currentTrack = nextTrack; 
            } else { 
                currentTrack = (currentTrack+1)%playlist.length;
            }
            audio.src = playlist[currentTrack].file;
            updateSongInfo(playlist[currentTrack]);
            audio.play();
        } else {

        }
    })
    audio.addEventListener('timeupdate',()=> {
        const progress = (audio.currentTime/audio.duration)*100; 
        progress_slider.value = progress || 0;
    })
    progress_slider.addEventListener('input', ()=> {
        const seek_time = (progress_slider.value / 100) * audio.duration; 
        audio.currentTime = seek_time;
    })


    play_button.addEventListener('click', () => {
        audio.play();
        updateSongInfo(currentTrack)
        play_button.style.display = "none";
        pause_button.style.display = "inline-block";


    })
    pause_button.addEventListener('click', () => {
        audio.pause();
        pause_button.style.display = "none";
        play_button.style.display = "inline-block";

    })
    left_skip_button.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + playlist.length) % playlist.length; 
        audio.src = playlist[currentTrack].file;
        audio.play();
        updateSongInfo(currentTrack)
        play_button.style.display = "none";
        pause_button.style.display = "inline-block";


    })
    right_skip_button.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        audio.src = playlist[currentTrack].file;
        audio.play();
        updateSongInfo(currentTrack)
        play_button.style.display = "none";
        pause_button.style.display = "inline-block";

    })
    function updateSongInfo(currentTrack) {
        document.getElementById('song_name').innerHTML = playlist[currentTrack].track;
        document.getElementById('artist_name').innerHTML = playlist[currentTrack].artist;
        document.getElementById('album_art').src = playlist[currentTrack].cover;
    }
    loop_button.addEventListener('click', () => {
        isLooping = !isLooping;
        audio.loop = isLooping;
        if (isLooping) { 
            loop_button.innerHTML = "🔂";
            loop_button.style.background = "gray";
            loop_button.style.background = "rgba(236,236,236,0.9)";
        } else {
            loop_button.innerHTML = "🔁"
            loop_button.style.background = "white";
        }
        // loop_button.style.opacity = isLooping ? 1: 0.5;
    })
    shuffle_button.addEventListener('click', () => {
        isShuffling = !isShuffling;
        if (isShuffling) { 
            console.log ("Shuffling On");
            shuffle_button.innerHTML = "🔀";
            shuffle_button.style.background = "rgba(236,236,236,0.9)";
        } else {
            console.log ("Shuffling Off");
            shuffle_button.style.background = "white";
        }
        // loop_button.style.opacity = isLooping ? 1: 0.5;
    })

// for circle 
    audio.addEventListener('play', () => {
        album_art.style.animationPlayState = 'running';
    });

    audio.addEventListener('pause', () => {
        album_art.style.animationPlayState = 'paused';
    });

})

