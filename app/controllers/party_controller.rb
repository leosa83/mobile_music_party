class PartyController < ApplicationController
    require 'rubygems'

  def index
     @artists = Artist.order('artist ASC').all
  end


  def new
    num_songs = params[:num_songs].to_i
    current_songs = Request.count.to_i
    @num = current_songs - num_songs
    if current_songs - num_songs > 0
      @new_songs = Request.last(current_songs - num_songs)
    else
      @new_songs = nil
    end

    respond_to do |format|
      format.js
    end
  end

  def return_artist_tracks
    artist = params[:artist]
    search = params[:search]
    artist_id = Artist.find_by_artist(artist.strip.capitalize).id

    if search.nil?
      @condition = 'add'
    else
      @condition = nil
    end

    song_count = Song.find_all_by_artist_id(artist_id).count

    if song_count < 30
      @condition = 'updating'
      update_songs_via_lastfm(artist_id, artist)
    end

    @artist = artist
    @tracks = Song.select('song').where(:artist_id => artist_id)

    respond_to do |format|
      format.js
    end
  end

  def update_songs_via_lastfm(artist_id, artist)
    artist_array = Rockstar::Artist.new(artist, :include_info => true)
    tracks = []
    artist_array.top_tracks.each{|track| tracks << track.name }

    tracks.each do |track|
      if !Song.find_by_song(track)
        Song.create(:artist_id => artist_id, :song => track)
      end
    end
  end


  def verify_artist
     @artist = params[:artist]

     artist_array = Rockstar::Artist.new(@artist, :include_info => true)
     if !artist_array.content
       @verified = false
     else
       Artist.create(:artist => @artist.strip.capitalize)

       @verified = true
     end
    @count = Artist.all.count
    respond_to do |format|
      format.js
    end
  end



end
