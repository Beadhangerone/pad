Rails.application.routes.draw do
  root 'home#index'

  get '/presset/:name'=> 'presset#show', as: 'presset_show'
end
