Rails.application.routes.draw do
  resources :spaces, only: [:index] do
    resources :schedules
  end

  
  resources :users do
    resource :spaces 
  end
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
