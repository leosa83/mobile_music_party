
$('.playlist_tracks').live('click', function(){
        buildArray('.playlist_tracks');
        current_artist = 'playlist';
        var arr = $(this).attr('id').split('_', 3);
        global_count = parseInt(arr[2] - 1);
        artist_count = tmpArtistCount;
        $('.playlist_listing').removeClass('active');
         $('.artist_listing').removeClass('active');
        $('.playlist_track_listing').removeClass('active');
        $(this).parent('.playlist_track_listing').addClass('active');
        $('#playlist_listing_'+artist_count).addClass('active');
        startPlayar(tracks);
});


$('.playlist_shortcut').live('click', function(){
     var playlist = $(this).text();
     tmpArtistCount = $(this).attr('id').split('_', 2)[1];
     tmpArtist = playlist;
    $.post('/returnTracks', {id:tmpArtistCount});
});

$('.add_playlist').live('click', function(){
    track_id = $(this).attr('id').split('_', 2)[1];
    track_name = $('#track_'+track_id).text();
    $('#addTrack').val(tmpArtist + " - " + track_name);

});

function createPlaylist() {
     var playlist = $('#playlistTrack').val();
     $.post('/createPlaylist', {playlist:playlist});

}

function addTrack(){

    var track = $('#addTrack').val();
    if (track != '' && track != 'Error')
    {
        var track_info = track.split('-', 2);

        var artist = track_info[0];
        var song = track_info[1];
        var playlist_id = $('#playlist_id').val();
        alert(artist + ' ' + song );
        $.post('/addTrack', {artist:artist, song:song, playlist_id:playlist_id});
    }
    else
    {
        $('#addTrack').val('Error').delay(600).val('');
    }

    $('#addTrack').val('');
}



