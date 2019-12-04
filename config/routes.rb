Rails.application.routes.draw do
  resources :spaces, only: [:index]
  resources :users do
    resource :spaces do
      resource :reviews
      resource :schedules
    end
  end
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
