class Api::TmdbController < ApplicationController
    Tmdb::Api.key(ENV["TMDB_KEY"])
  
  def popular
    @movies = Tmdb::Movie.popular
    respond_to do |format|
      format.json {render json: @movies}
    end
  end
end
