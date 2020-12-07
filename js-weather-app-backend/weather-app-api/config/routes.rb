Rails.application.routes.draw do
  get '/test', to: 'application#test'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'user#create'
end