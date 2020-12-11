Rails.application.routes.draw do
  get '/test', to: 'application#test'

  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  post '/signup', to: 'user#create'
  patch '/update', to: 'user#update'
end