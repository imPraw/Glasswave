window.addEventListener('DOMContentLoaded',() => {
    let play_button = document.querySelector("#play_button");
    let pause_button = document.querySelector("#pause_button");
    let left_skip_button = document.querySelector("#left_skip_button");
    let right_skip_button = document.querySelector("#right_skip_button");
    let audio = document.querySelector("audio")

    play_button.style.display = "inline-block";
    pause_button.style.display = "none";

    playlist = [ 
        {
            file: 'playlist/track_1.mp3',
            track: 'Elenor Rigby',
            artist: 'The Beatles',
        },
        {
            file: 'playlist/track_2.mp3',
            track: 'Never Gonna Give You Up',
            artist: 'Rick Astley',
        },
        {
            file: 'playlist/track_3.mp3',
            track: 'Seinna',
            artist: 'The Marias'
        }
    ]

    currentTrack = 0; 
    audio.src = playlist[currentTrack].file;

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
    }

})

