Rails.application.routes.draw do
  get 'chat/index'
  get 'chat/stream'
  post 'chat/message'
end
