Rails.application.routes.draw do
  resources :reviews
  resources :schedules
  resources :spaces
  resources :users
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
