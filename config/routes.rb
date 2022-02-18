Rails.application.routes.draw do
  namespace :api do
    get '/tmdb/:type/popular', to: 'tmdb#popular'
    get '/tmdb/:type/find', to: 'tmdb#find'
    get '/tmdb/show/:type/:id', to: 'tmdb#show'
    get '/tmdb/cast/:type/:id', to: 'tmdb#cast'
    get 'tmdb/similar/movie/:id', to: 'tmdb#similar'
    namespace :monitoring do
      resources :movies
      resources :tv
    end
    resources :user
  end



  root 'static#index'
  get '/*path', to: 'static#index'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
