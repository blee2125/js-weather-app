Rails.application.routes.draw do
  get '/test', to: 'application#test'

  resources :sessions
  
end