/**
 * Created by JetBrains RubyMine.
 * User: root
 * Date: 10/26/11
 * Time: 10:48 PM
 * To change this template use File | Settings | File Templates.
 */



function playArtist() {

var artist = $('#playArtist').val();
 current_artist = artist;
$.post('/playArtist', {artist:artist});



}