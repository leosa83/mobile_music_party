  $(document).ready(function(){

});
    var current_artist = '';
    var global_count = -1;
    var tracks = new Array();

    function buildArray(){
       tracks = new Array();
        $.each($('.tracks'), function(i, v){
            tracks.push(v.firstChild.data);
        });

        startPlayar(tracks);
    }

    function nextSong(){
        startPlayar(tracks);
    }

    function previousSong(){
        if (global_count == 0){
            global_count = -1;
        }
        else if(global_count == 1){
            global_count = -1;
        }
        else {
            global_count -= 2;
        }
       startPlayar(tracks);
    }


    function startPlayar(tracks)
    {
       global_count++;
        alert(global_count);
        return_video_key(current_artist, tracks[global_count]);
    }

   $('.tracks').live('click', function(){
        global_count = parseInt($(this).attr('id') - 1);
        startPlayar(tracks);
   });


    function return_video_key(artist, song)
    {
            query_string = artist + song;
            var keyword= encodeURIComponent(query_string);
            // Youtube API
            var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=1&v=2&alt=jsonc';
            $.ajax({
                type: "GET",
                url: yt_url,
                dataType:"json",
                    success: function(response){
                        if(response.data.items)
                        {
                            $.each(response.data.items, function(i,data){

                               loadVideo(data.id);
                        })}
                    }
            });
    }



    function updateHTML(elmId, value) {
      document.getElementById(elmId).innerHTML = value;
    }

    // Loads the selected video into the player.
    function loadVideo(videoID) {


      if(ytplayer) {
        ytplayer.loadVideoById(videoID);
      }
    }

    function onPlayerStateChange(newState) {

        if (newState == 0 || newState == '0') {
            startPlayar(tracks);
        }


        updateHTML("playerState", newState);
    }

    // This function is called when an error is thrown by the player
    function onPlayerError(errorCode) {
      alert("An error occured of type:" + errorCode);
    }

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  ytplayer.cueVideoById("ylLzyHk54Z0");
}

    // The "main method" of this sample. Called when someone clicks "Run".
    function loadPlayer() {
      // The video to load
      var videoID = "ylLzyHk54Z0"
      // Lets Flash from another domain call JavaScript
      var params = { allowScriptAccess: "always" };
      // The element id of the Flash embed
      var atts = { id: "ytPlayer" };
      // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
      swfobject.embedSWF("http://www.youtube.com/v/" + videoID +
                         "?version=3&enablejsapi=1&playerapiid=player1&autoplay=1",
                         "videoDiv", "480", "295", "9", null, null, params, atts);
    }


  function _run() {
    loadPlayer();
  }
     google.setOnLoadCallback(_run);