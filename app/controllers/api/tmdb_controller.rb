class Api::TmdbController < ApplicationController
    Tmdb::Api.key(ENV["TMDB_KEY"])
  
  def popular
    if params[:type] == "movie"
      @media = Tmdb::Movie.popular 
    else
      @media = Tmdb::TV.popular 
    end
    
    respond_to do |format|
      format.json {render json: @media}
    end
  end

  def find
    if params[:type] == "movie"
      @media = Tmdb::Movie.find(params[:term])
    else
      @media = Tmdb::TV.find(params[:term])
    end

    respond_to do |format|
      format.json {render json: @media}
    end
  end

  def show
    if params[:type] == "movie"
      @media = Tmdb::Movie.detail(params[:id])
    else
      @media = Tmdb::TV.detail(params[:id])
    end

    respond_to do |format|
      format.json {render json: @media}
    end
  end

  def cast
    if params[:type] == "movie"
      @cast = Tmdb::Movie.casts(params[:id])
    else
      @cast = Tmdb::TV.cast(params[:id])
    end

    respond_to do |format|
      format.json {render json: @cast}
    end
  end
end
