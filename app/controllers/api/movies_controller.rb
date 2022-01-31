class Api::MoviesController < ApplicationController
  Tmdb::Api.key(ENV["TMDB_KEY"])
  
  def index
    @movies = Tmdb::Movie.popular
    respond_to do |format|
      format.json {render json: @movies}
    end
  end

  def show
  end
end
