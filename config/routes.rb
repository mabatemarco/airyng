Rails.application.routes.draw do

  resources :spaces do
    resources :schedules
    resources :pics
  end

  resources :users
  get '/users/:id/spaces', to: 'users#user_spaces'
  delete '/spaces/:space_id/pics', to: 'pics#clear'
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
end
