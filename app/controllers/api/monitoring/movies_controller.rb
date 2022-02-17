class Api::Monitoring::MoviesController < ApplicationController
  def index
    @user = User.find_by uid: params[:uid]
    
    respond_to do |format|
      format.json { render json: @user.movies }
    end
  end

  def show
    @user = User.find_by uid: params[:uid]
    @movie = @user.movies.find_by tmdb_id: params[:id]
    
    respond_to do |format|
      format.json { render json: @movie }
    end
  end

  def create
    @user = User.find_by uid: params[:movie][:uid]
    @movie = Movie.new(movie_params)
    @user.movies << @movie
  end

  def update
    @user = User.find_by uid: params[:uid]
    @movie = @user.movies.where(tmdb_id: params[:id])
    @movie.update(movie_params)
  end

  private
    def movie_params
      params.require(:movie).permit(:tmdb_id, :monitoring, :state)
    end
end
