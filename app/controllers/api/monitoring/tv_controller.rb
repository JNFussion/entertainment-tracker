class Api::Monitoring::TvController < ApplicationController
  def index
    @user = User.find_by uid: params[:uid]
    
    respond_to do |format|
      format.json { render json: @user.tvs }
    end
  end

  def show
    @user = User.find_by uid: params[:uid]
    @tv = @user.tvs.find_by tmdb_id: params[:id]
    
    respond_to do |format|
      format.json { render json: @tv }
    end
  end

  def create
    @user = User.find_by uid: params[:tv][:uid]
    @tv = Tv.new(tv_params)
    @user.tvs << @tv
  end

  def update
    @user = User.find_by uid: params[:uid]
    @tv = @user.tvs.where(tmdb_id: params[:id])
    @tv.update(tv_params)
  end

  private
    def tv_params
      params.require(:tv).permit(:tmdb_id, :monitoring, :state)
    end
end
