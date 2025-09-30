console.log("welcome to spotify clone");
async function getSongs() {
    let a = await fetch("http://192.168.86.82:3000/songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("http://192.168.86.82:3000/songs/"));
        }
    }
    return songs;
}
getSongs()
async function main() {
    let songs = await getSongs()
    console.log(songs);

    let songsul=document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songsul.innerHTML=songsul.innerHTML + `<li>${song}</li>`;
    }

    var audio = new Audio(songs[0]);
    // audio.play();
}
main();
