Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  get '/presset/:name'=> 'presset#show', as: 'presset_show'
 	get '/pressets/all'=> 'presset#all', as: 'all_pressets'
  get '/profile'=> 'user#profile', as:'profile'
end
