class UserController < ApplicationController

    def create
        @user= User.create!(name: params[:name], password: params[:password])
        if @user
            session[:user_id]= @user.id
            json(object: @user, status: :created)
        end
    end


end