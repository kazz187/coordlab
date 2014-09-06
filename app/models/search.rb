require 'faraday'
require 'pry'

class Search < ActiveRecord::Base
  def iqon_item(options = {})
    options = {
      category_id1: 1,
      category_id2: 2
    }
    r = iqon_endpoint.get("/item#{Parameter.new(options).to_s}")
    JSON.parse(r.body)
  end

  def iqon_endpoint
    Faraday.new('http://api.thefashionhack.com')
  end

  class Parameter
    def initialize options
      @options = options
    end

    def to_s
      return '' if @options.nil?
      r = @options.inject { |(k, v)| "&#{k.to_s}=#{v.to_s}" }
      r.gsub(/^&/, '?')
    end
  end
end
