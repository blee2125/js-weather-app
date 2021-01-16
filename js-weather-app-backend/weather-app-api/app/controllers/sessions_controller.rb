class SessionsController < ApplicationController
    require 'pry'

    def create
        @user= User.find_by(name: params["username"])
        if @user && @user.authenticate(params["password"])
            session[:user_id] = @user.id
            render json: {object: @user, message: "Logged In"}
        else
            render json: {message: "Error"}
        end
    end

    def destroy
        session.delete("user_id")
        render json: {message: "Logged Out"}
    end

end
