class Api::TmdbController < ApplicationController
    Tmdb::Api.key(ENV["TMDB_KEY"])
  
  def popular
    @movies = Tmdb::Movie.popular
    respond_to do |format|
      format.json {render json: @movies}
    end
  end

  def find
    @movies = Tmdb::Movie.find(params[:term])
    respond_to do |format|
      format.json {render json: @movies}
    end
  end

  def show
    @movie = Tmdb::Movie.detail(params[:id])
    respond_to do |format|
      format.json {render json: @movie}
    end
  end
end
