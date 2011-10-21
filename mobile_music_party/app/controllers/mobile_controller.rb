class MobileController < ApplicationController

  def index
    @request = Request.new
  end

  def create
      new_song = Request.new(params[:request])
      new_song.save

      redirect_to mobile_index_path
  end

end
