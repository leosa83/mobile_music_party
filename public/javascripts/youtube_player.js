
    var current_artist = '';
    var tmpArtist = '';
    var global_count = -1;
    var tracks = new Array();
    var tmpTracks = new Array();
    var artistQueue = new Array();

    function buildArray(){
        tracks = new Array();
        $.each($('.tracks'), function(i, v){
            tracks.push(v.firstChild.data);
        });

        //startPlayar(tracks);
    }

    function buildTmpArray(){
        tmpTracks = new Array();
        $.each($('.tracks'), function(i, v){
            tmpTracks.push(v.firstChild.data);
        });

        //startPlayar(tracks);
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
        return_video_key(current_artist, tracks[global_count]);
    }

   $('.tracks').live('click', function(){
        buildArray();
        current_artist = tmpArtist;
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

                               startVideo(data.id);
                        })}
                    }
            });
    }

     // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;

      function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'u1zgFlCw8Aw',
          playerVars: { 'autoplay': 1, 'controls': 1 },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
             'onError': onPlayerError
          }
        });
      }

      function onPlayerError(event) {
          if (event.data == '150' || event.data == '101')
          {
              fix_vevo_key(current_artist, tracks[global_count])
          }
      }

    function fix_vevo_key(artist, song)
    {
            query_string = artist + song;
            var keyword= encodeURIComponent(query_string);
            // Youtube API
            var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=2&v=2&alt=jsonc';
            $.ajax({
                type: "GET",
                url: yt_url,
                dataType:"json",
                    success: function(response){
                        if(response.data.items)
                        {
                            startVideo(response.data.items[1].id)

                        }
                }
            });
    }



      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
          startPlayar(tracks);
        }

      }
      function stopVideo() {
        player.stopVideo();
      }



      function startVideo(id) {
          player.loadVideoById(id);
          player.playVideo();
      }