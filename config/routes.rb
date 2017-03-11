Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  get '/sails'=> 'presset#sails', as: 'presset_sails'
  get '/memory'=> 'presset#memory', as: 'presset_memory'
end
