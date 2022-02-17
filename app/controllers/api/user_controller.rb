class Api::UserController < ApplicationController
  def create
    User.create(user_params)
  end

  private
    def user_params
      params.require(:user).permit(:uid)
    end
end
