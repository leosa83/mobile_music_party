class PartyController < ApplicationController
  def index
    @requests = Request.all
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
end
