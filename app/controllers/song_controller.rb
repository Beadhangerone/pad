class SongController < ApplicationController
  def index
    @songs = Song.all()
  end

  def create
    song = Song.new(song_params)
    if song.save
      redirect_to pressets_all_path
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :b64)
  end

end
