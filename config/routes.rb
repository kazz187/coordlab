Rails.application.routes.draw do
  get 'chat/index'
  get 'chat/stream'
  post 'chat/message'
  post 'chat/coord'
  get 'chat/search/:resource', to: 'chat#search'
end
