require 'pry'

class ChatController < ApplicationController
  include ActionController::Live
  before_filter :set_default_val

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
      j = {
        type: 'chat',
        attr: {
          comment: params[:comment],
          name: params[:name],
          icon: params[:icon]
        }
      }.to_json

      stream.write("data: #{j}\n\n") rescue nil
    end
    render text: nil
  end

  def coord
    @@streams.each do |stream|
      j = {
        type: 'coordinate',
        attr: {
          type: params[:type],
          item_id: params[:item_id],
          item_img: params[:item_img],
          x: params[:x],
          y: params[:y]
        }
      }.to_json

      stream.write("data: #{j}\n\n") rescue nil
    end
    render text: nil
  end

  def user
    render json: {
      user: params[:twitter_name],
      icon: 'https://pbs.twimg.com/profile_images/434591623058452480/S-x7J4lw_bigger.jpeg'
    }.to_json
  end

  def search
    case(params[:resource])
    when 'iqon_item'
      api_result = Search.new.iqon_item(params)
    when 'iqon_set'
      api_result = Search.new.iqon_set
    when 'iqon_set_detail'
      api_result = Search.new.iqon_set_item_detail(params)
    end

    render json: api_result
  end

  def set_default_val
    @category_id1 = category_id1
  end

  def category_id1
    {
      10 => 'アウター',
      11 => 'トップス',
      12 => 'ボトムス',
      13 => 'シューズ',
      14 => 'バッグ',
      15 => 'アクセ',
      16 => '帽子',
      17 => '装飾小物',
      18 => 'ルームウェア',
      19 => 'コスメ',
      20 => '雑貨',
      21 => '水着・浴衣',
      22 => 'デコ素材'
    }
  end
end
