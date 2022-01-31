Rails.application.routes.draw do
  namespace :api do
    get 'movies/index'
    get 'movies/show'
  end
  root 'static#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
