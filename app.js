function getSongTitle() {
    let inputText = document.querySelector("#songTitle").value;
    let artistName = document.querySelector('#artistName').value;

    axios
        .get(" https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search", {
            params: {
                format: "json",
                callback: "callback",
                q_track: inputText,
                q_artist: artistName,
                quorum_factor: 1,
                apikey: "7cb4d66178283a1d22075b7f6b8813dc",
            },
        })
        .then(function (response) {
            console.log(response.data);

            let trackList = response.data.message.body.track_list;

            let htmlStr = ``;
            trackList.forEach(({ track }) => {
                // console.log(app);
                console.log(track);

                htmlStr += `
                    <div class="col-md-6 mt-3">
                        <div class="card">
                            <img
                            class="card-img-top"
                            src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                            alt="Card image cap"
                            />
                            <div class="card-body">
                                <h4 class="card-title"><a>${track.track_name}</a></h4>
                                <h4 class="card-title"><a>${track.artist_name}</a></h4>
                                <p class="card-text">
                                    ${track.album_name}
                                </p>
                                <a href="${track.track_share_url}" class="btn btn-primary">Lyrics</a>
                            </div>
                        </div>
                    </div>
                    `;

            });
            document.getElementById('songList').innerHTML = htmlStr;
        })
        .catch(function (error) {
            console.log(error);


        })
        .then(function () {
            // always executed
        });
}