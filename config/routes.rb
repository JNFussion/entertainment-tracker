Rails.application.routes.draw do
  namespace :api do
    get '/tmdb/:type/popular', to: 'tmdb#popular'
    get '/tmdb/:type/find', to: 'tmdb#find'
    get '/tmdb/show/:type/:id', to: 'tmdb#show'
    get '/tmdb/cast/:type/:id', to: 'tmdb#cast'
    get 'movies/index'
    get 'movies/show'
  end

  root 'static#index'
  get '/*path', to: 'static#index'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
