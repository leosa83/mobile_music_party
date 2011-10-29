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
  //  artistQueue.push(artist);
 // var i = artistQueue.length;
  var i = parseInt($('.artist_listing:last').attr('id').split('_', 2)[1]);
    alert(i);
  i += 1;
  var appendString = "<div class='artist_listing' id='listing_"+i+"'><div class='artist_shortcut' id='artist_"+i+"'>"+artist+" (Verifying)</div></div>";
  $('.artistQueue').append(appendString);

  $.post('/verifyArtist', {artist:artist});
}

$('.artist_listing .artist_shortcut').live('click', function(){
    var artist = $(this).text();
     tmpArtistCount = $(this).attr('id').split('_', 2)[1];
    $.post('/playArtist', {artist:artist, search:artist});
});

$('.delete_me').live('click', function(){
   pos = parseInt($(this).attr('id').split('_', 2)[1]);
   $('#listing_'+pos).fadeOut(400);
   artistQueue.splice(pos, 1);

});







