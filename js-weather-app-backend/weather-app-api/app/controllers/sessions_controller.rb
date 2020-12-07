class SessionsController < ApplicationController
    require 'pry'

    def create
        @user= User.find_by(name: params["session"]["username"])
        if @user && @user.authenticate(params["session"]["password"])
            session[:user_id] = @user.id
            render json: {object: @user, message: "welcome back"}
        else
            render json: {message: "username/password incorrect"}
        end
    end

    def destroy
        session.delete("user_id")
        render json: {message: "Logged Out"}
    end

end
