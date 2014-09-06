Rails.application.routes.draw do
  get 'chat/index'
  get 'chat/stream'
  post 'chat/message'
  get 'chat/search/:resource', to: 'chat#search'
end
