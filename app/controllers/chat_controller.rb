class ChatController < ApplicationController
  include ActionController::Live

  @@streams ||= []

  def index
  end

  def stream
    response.headers['Content-Type'] = 'text/event-stream'
    @@streams.push(response.stream)
    loop do
      response.stream.write(":ping \n\n")
      sleep 15
    end
  rescue IOError
  ensure
    @@streams.delete(response.stream)
    response.stream.close
  end

  def message
    @@streams.each do |stream|
      stream.write("data: #{params[:comment]}\n\n") rescue nil
    end
    render text: nil
  end
end
