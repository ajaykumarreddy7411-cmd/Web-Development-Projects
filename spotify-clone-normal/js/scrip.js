console.log("hello welcome to javascript");
let currSong = new Audio();
let songs;
let currFolder;
let url="http://192.168.202.82:3000";


async function getSongs(folder) {
    currFolder = folder;
    let request = await fetch(`${url}/songs/${folder}`);
    let data = await request.text();
    let req=await fetch(`${url}/songs/${folder}/info.json`);
    let info=await req.json();

    //take the innercontent of the res  ponse and put it in a div

    
    

    let div = document.createElement("div");
    div.innerHTML = data;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (const song of as) {
        if (song.href.endsWith(".mp3")) {
            // Extract file name
            let filename = decodeURIComponent(song.href.split("/").pop());

            // Remove extension
            // let nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

            // // Remove stuff in parentheses, like (MP3_160K)
            // let cleanName = nameWithoutExt.replace(/\(.*?\)/g, "").trim();

            songs.push(filename);
        }
    }

    let songul = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songul.innerHTML = "";

    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
                <img class="invert" src="images/music.svg" alt="music icon" />
                <div class="info">
                  <div>${song}</div>
                  <div>${info.title}</div>
                </div>
                <div class="playnow">
                  <span>Play now</span>
                  <img class="invert" src="images/mainplay.svg" alt="">
                </div>
              </li>`;
    }
    //Attach an event listener to list the songs
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e =>
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    )



}
const playMusic = (track, pause = false) => {
    currSong.src = `/songs/${currFolder}/` + track;
    // let playbtn=document.querySelector("#play");
    // playbtn.addEventListener("click",element=>{
    //     currSong.play();
    // })
    if (!pause) {
        currSong.play();
        play.src = "images/pause.svg"
    }
    // let audio=new Audio("/songs/"+track+".mp3");
    // audio.play();
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
async function displayAlbums() {
    let cardContainer = document.querySelector(".cardContainer");
    let request = await fetch(`${url}/songs/`);
    let data = await request.text();
    let div = document.createElement("div");
    div.innerHTML = data;
    let anchors = div.getElementsByTagName("a");
    let array = Array.from(anchors);
    for (const e of array) {
        if (e.href.includes("/songs/")) {
            if (!e.href.endsWith("/")) continue;
            let folder = e.href.split("/").slice(-2)[0];
            // console.log(decodeURIComponent(folder));


            let a = await fetch(`${url}/songs/${folder}/info.json`);
            let response = await a.json();
            // console.log(response.title);


            cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
              <div class="play">
                <img src="images/play.svg" alt="" />
              </div>
              <img
                src="${url}/songs/${folder}/coverimg.jpg"
                alt=""
              />
              <h2>${response.title}</h2>
              <p>${response.description}</p>
            </div>`

        }


    }
    //accessing folders like playlists



}


async function main() {



    await getSongs("Anirudh");


    await displayAlbums();
    playMusic(songs[0], true);
    //Attach an event listener for previous and next and play
    play.addEventListener("click", () => {
        if (currSong.paused) {
            currSong.play();
            play.src = "images/pause.svg"
        }
        else {
            currSong.pause();
            play.src = "images/mainplay.svg"
        }
    })

    //Listen for time update event
    currSong.addEventListener("timeupdate", () => {
        // console.log(currSong.currentTime, currSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currSong.currentTime)}/${secondsToMinutesSeconds(currSong.duration)}`;
        document.querySelector(".circle").style.left = (currSong.currentTime) / (currSong.duration) * 100 + "%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        // console.log(e.target.getBoundingClientRect().width);
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currSong.currentTime = ((currSong.duration) * percent) / 100;
    })

    //Doing the hamburger machanism
    document.querySelector(".hamburger").addEventListener("click", e => {
        document.querySelector(".left").style.left = "0"
    })

    //Doing cross button 
    document.querySelector(".cross").addEventListener("click", e => {
        document.querySelector(".left").style.left = "-120%"
    })

    //event listener for previous and next
    previous.addEventListener("click", () => {
        // console.log(decodeURIComponent(currSong.src.split("/").pop()));

        let index = songs.indexOf(decodeURIComponent(currSong.src.split("/").pop()));
        if (index === 0) {
            index = songs.length;
        }
        playMusic(songs[--index])

    })
    next.addEventListener("click", () => {
        let index = songs.indexOf(decodeURIComponent(currSong.src.split("/").pop()));
        if (index === songs.length - 1) {
            playMusic(songs[0])
        } else {
            playMusic(songs[++index])
        }
    })
    let previousVolume = 1;
    //volume event listener
    document.querySelector(".vol-seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        let perc = (e.offsetX / e.target.getBoundingClientRect().width);
        previousVolume = perc;

        document.querySelector(".vol-circle").style.left = percent + "%";
        currSong.volume = perc;
        let image = document.querySelector(".vol").getElementsByTagName("img")[0];
        if (image.src.endsWith("images/mute.svg")) {
            image.src = "images/volume.svg";
        }


    })
    document.querySelector(".vol").getElementsByTagName("img")[0].addEventListener("click", () => {
        let image = document.querySelector(".vol").getElementsByTagName("img")[0];

        if (currSong.volume > 0) {
            currSong.volume = "0";
            document.querySelector(".vol-circle").style.left = "0%";
            image.src = "images/mute.svg";
        }
        else {
            currSong.volume = previousVolume;
            document.querySelector(".vol-circle").style.left = previousVolume * 100 + "%";
            image.src = "images/volume.svg";
        }
    })


    Array.from(document.querySelectorAll(".card")).forEach(e => {
        e.addEventListener("click", async item => {
            // console.log(item.currentTarget);
            // console.log(item.currentTarget.dataset.folder);
            await getSongs(item.currentTarget.dataset.folder);
            playMusic(songs[0])

        })
    })


}
main();