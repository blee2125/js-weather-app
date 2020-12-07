class UserController < ApplicationController
    require 'pry'

    def create
        @user= User.create!(name: params["username"], password: params["password"])
        if @user
            session[:user_id]= @user.id
            render json: {object: @user, message: "welcome new user"}
        end
    end


end