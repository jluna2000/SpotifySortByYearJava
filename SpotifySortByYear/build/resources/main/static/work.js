var host = window.location.host;
var itemList = {};

function addItem() {
    // Get the input value
    var inputKey = document.getElementById("inputKey").value;
    var inputValue = document.getElementById("inputValue").value;

    // Clear the input field
    document.getElementById("inputKey").value = "";
    document.getElementById("inputValue").value = "";

    // Create a new list item
    var newItem = document.createElement("li");
    newItem.appendChild(document.createTextNode(inputKey + ": " + inputValue));

    // Add the new item to the list
    document.getElementById("itemList").appendChild(newItem);

    itemList[inputKey] = inputValue;
}

function requestData(track, artist, token){
    var xhttp = new XMLHttpRequest();
    const method = "GET";
    const url = "https://api.spotify.com/v1/search?q=" + encodeURIComponent(`track:${track} artist:${artist}`) + "&type=track";
    const async = false;
    xhttp.open(method, url, async);
    xhttp.setRequestHeader("Authorization", "Bearer " + token);
    xhttp.send();
    return JSON.parse(xhttp.responseText);
}

function getFirstReleaseDate(song_data){
    let firstReleaseDate = null;
    for(const result of song_data['tracks']['items']){
        const releaseDate = result['album']['release_date'];
        if(firstReleaseDate === null || releaseDate < firstReleaseDate){
            firstReleaseDate = releaseDate;
        }
    }
    return firstReleaseDate;
}

function submitList(){
    var trackYears = {};
    const token = "BQCV91IqV4B8tFP7srzDj3woI7CTexnHRwuj5vpZLaxbpJWRq32nyak5EfzD0aJ8UpcdhcWMfvhfs3e0suL2a_ABdkKIzCzuHKVUlmtbo6Q2M68ri3U";
    for(const [song, artist] of Object.entries(itemList)){
        //Use requestData and getFirstReleaseDate to populate trackYears
        const songData = requestData(song, artist, token);
        // console.log(songData);
        const firstReleaseDate = getFirstReleaseDate(songData);
        trackYears[song] = firstReleaseDate;
    }
    var jsonString = JSON.stringify(trackYears);
    var xhttp = new XMLHttpRequest();
    const method = "POST";
    const url = "http://" + host + "/";
    const async = true;
    xhttp.open(method, url, async);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonString);
    xhttp.onload = function(){
        document.getElementById("itemList").innerHTML = "";
        a = this.responseText;
        a = a.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
        document.getElementById("itemList").innerHTML = a;
    }
}