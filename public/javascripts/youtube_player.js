
    var current_artist = '';
    var tmpArtist = '';
    var global_count = -1;
    var error_counter = 1;
    var artist_count = '';
    var tmpArtistCount = '';

    var tracks = new Array();
    var tmpTracks = new Array();
    var artistQueue = new Array();

    function buildArray(param){
        tracks = new Array();
        $.each($(param), function(i, v){
            if (param != '.tracks')
            {
             // alert(v.firstChild.data.split('-', 2)[1]);
             var j = v.firstChild.data.split('-', 2);
             var pushMe = j[0]+' '+j[1];
             tracks.push(pushMe);
            }
            else
            {
              tracks.push(v.firstChild.data);
            }
        });

        //startPlayar(tracks);
    }

    function buildTmpArray(param){
        tmpTracks = new Array();
        $.each($(param), function(i, v){
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
        buildArray('.tracks');
        current_artist = tmpArtist;
        var arr = $(this).attr('id').split('_', 2);
        global_count = parseInt(arr[1] - 1);
        artist_count = tmpArtistCount;
        $('.artist_listing').removeClass('active');
        $('.playlist_listing').removeClass('active');
        $(this).parent('.track_listing').addClass('active');
        $('#listing_'+artist_count).addClass('active');

        startPlayar(tracks);
   });

    function highlight_current_song() {
        de_highlight_song();
        if (current_artist == 'playlist')
        {
           $('#playlist_track_'+global_count).parent('.playlist_track_listing').addClass('active');
        }
        else
        {
           $('#track_'+global_count).parent('.track_listing').addClass('active');
        }

    }

    function de_highlight_song(){
        if (current_artist == 'playlist')
        {
           $('.playlist_track_listing').removeClass('active');
            $('.track_listing').removeClass('active');
        }
        else
        {
           $('.track_listing').removeClass('active');
            $('.playlist_track_listing').removeClass('active');
        }

    }

    function return_video_key(artist, song)
    {
            if (artist == 'playlist')
            {
              query_string = song;
            }
            else
            {
              query_string = artist + song;
            }

            var keyword= encodeURIComponent(query_string);
            // Youtube API
            var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=1&v=2&top_rated&alt=jsonc';
            $.ajax({
                type: "GET",
                url: yt_url,
                dataType:"json",
                    success: function(response){
                        if(response.data.items)
                        {
                            $.each(response.data.items, function(i,data){
                               if (tmpArtistCount == artist_count)
                               {
                                  highlight_current_song();
                               }
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
          videoId: 'mjli3hj0ZkM',
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
              error_counter++;

              if (error_counter == 5)
              {
                  alert('Video has been removed from the list... Blame Vimeo.');
                  //tracks.splice(global_count, 1);
                  startPlayar(tracks);
              }
              fix_vevo_key(current_artist, tracks[global_count], error_counter);
          }
          else
          {
              error_counter = 1;
          }
      }

    function fix_vevo_key(artist, song, error_counter)
    {
            query_string = artist + song;
            var keyword= encodeURIComponent(query_string);
            // Youtube API
            var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results='+error_counter+'&v=2&top_rated&alt=jsonc';
            $.ajax({
                type: "GET",
                url: yt_url,
                dataType:"json",
                    success: function(response){
                        if(response.data.items)
                        {
                             if (tmpArtistCount == artist_count)
                             {
                                  highlight_current_song();
                                  startVideo(response.data.items[response.data.items.length-1].id)
                             }
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