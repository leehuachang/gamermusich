const musicTracks = {
    warhammer: [
        'music/warhammer 40k 1.mp3',
        'music/warhammer 40k 2.mp3',
        'music/warhammer 40k 3.mp3',
        'music/warhammer 40k 4.mp3',
        'music/warhammer 40k 5.mp3',
		'music/warhammer 40k 6.mp3',
		'music/warhammer 40k 7.mp3',
		'music/warhammer 40k 8.mp3',
		'music/warhammer 40k 9.mp3',
        // Add more warhammer tracks here
    ],
    lofi: [
        'music/Lofi hiphop 1.mp3',
        'music/Lofi hiphop 2.mp3',
		'music/Lofi hiphop 3.mp3',
		'music/Lofi hiphop 4.mp3',
		'music/Lofi hiphop 5.mp3',
		'music/Lofi hiphop 6.mp3',
		'music/Lofi hiphop 7.mp3',
		'music/Lofi hiphop 8.mp3',
		'music/Lofi hiphop 9.mp3',
        // Add more lofi tracks here
    ],
    citypop: [
        'music/citypop1.mp3',
        'music/citypop2.mp3','music/Lofi hiphop 9.mp3',
        // Add more citypop fight tracks here
    ]
};

const buttons = document.querySelectorAll('.categories button');
const audioPlayer = document.getElementById('audioPlayer');
const trackInfo = document.getElementById('trackInfo');
const skipButton = document.getElementById('skipButton'); // Reference to the skip button

let currentPlaylist = [];
let currentTrackIndex = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        playPlaylist(category);
    });
});

skipButton.addEventListener('click', () => {
    skipToNextTrack();
});

function playPlaylist(category) {
    const tracks = musicTracks[category];
    if (tracks && tracks.length > 0) {
        currentPlaylist = tracks;
        currentTrackIndex = 0;
        playCurrentTrack();
        skipButton.disabled = false; // Enable the skip button when a playlist is active
    } else {
        alert('No tracks available for this category.');
        skipButton.disabled = true; // Disable the skip button if no tracks are available
    }
}

function playCurrentTrack() {
    const trackSrc = currentPlaylist[currentTrackIndex];
    audioPlayer.src = trackSrc;
    audioPlayer.play();

    // Display the currently playing track
    const trackName = trackSrc.substring(trackSrc.lastIndexOf('/') + 1);
    trackInfo.textContent = `Now Playing: ${trackName}`;
}

function skipToNextTrack() {
    if (currentPlaylist.length === 0) return;

    currentTrackIndex++;
    if (currentTrackIndex >= currentPlaylist.length) {
        currentTrackIndex = 0; // Loop back to the first track
    }
    playCurrentTrack();
}

// Disable skip button initially
skipButton.disabled = true;

audioPlayer.addEventListener('ended', () => {
    skipToNextTrack();
});