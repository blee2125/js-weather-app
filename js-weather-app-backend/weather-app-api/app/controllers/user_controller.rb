class UserController < ApplicationController
    require 'pry'

    def create
        @user= User.create!(name: params["username"], password: params["password"])
        if @user
            session[:user_id]= @user.id
            render json: {object: @user, message: "Logged In"}
        end
    end

    def update
        @user= User.find_by(name: params["username"])
        if @user.update(user_params)
            render json: {object: @user, message: "Updated"}
        else
            render json: {message: "Error"}
        end
    end

    def user_params
        params.require(:user).permit(:locations, :settings)
    end

end