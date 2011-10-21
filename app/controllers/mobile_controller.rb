class MobileController < ApplicationController

  def index
    @request = Request.new
  end

  def create
      artist = params[:artist]
      song = params[:song]
      new_song = Request.new
      new_song.artist = artist
      new_song.song = song
      new_song.save

      respond_to do |format|
        format.js
      end

  end

end
