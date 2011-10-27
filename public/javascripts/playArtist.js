/**
 * Created by JetBrains RubyMine.
 * User: root
 * Date: 10/26/11
 * Time: 10:48 PM
 * To change this template use File | Settings | File Templates.
 */





function playArtist(index) {

//var artist = $('#playArtist').val();
var artist = artistQueue[index];
current_artist = artist;
$.post('/playArtist', {artist:artist});

}

function searchArtist() {
   var artist = $('#playArtist').val();
   tmpArtist = artist;
    $.post('/playArtist', {artist:artist, search:artist});
}


function addArtistToQueue(){
  var artist = $('#playArtist').val();
  artistQueue.push(artist);
  var appendString = '';
  $.each(artistQueue, function(i, v){
    appendString += "<div class='artist_shortcut' id='"+i+"'>"+v+"</div>";
  });
   $('.artistQueue').html(appendString);
}

$('.artist_shortcut').live('click', function(){
    artist = $(this).text();
    $.post('/playArtist', {artist:artist, search:artist});
});