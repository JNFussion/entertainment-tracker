Rails.application.routes.draw do
  namespace :api do
    get '/tmdb/popular', to: 'tmdb#popular'
    get 'movies/index'
    get 'movies/show'
  end
  root 'static#index'
  get '/*path', to: 'static#index'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
