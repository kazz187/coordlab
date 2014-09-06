Rails.application.routes.draw do
  root to: 'chat#index'
  get 'chat/index'
  get 'chat/stream'
  post 'chat/message'
  post 'chat/coord'
  get 'chat/search/:resource', to: 'chat#search'
  get 'chat/user', to: 'chat#user'
end
