Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  get '/presset/:name'=> 'presset#show', as: 'presset_show'
 	get '/pressets/all'=> 'presset#all', as: 'pressets_all'
  get '/profile'=> 'user#profile', as:'profile'
  get '/songs'=> 'song#index', as:'songs'
  post '/song/create'=> 'song#create', as:'song_create'
end
