require 'faraday'
require 'pry'
require 'pp'
class Search < ActiveRecord::Base
  def iqon_item(options = {})
    r = iqon_endpoint.get("/item/#{Parameter.new(options).to_s}")
    JSON.parse(r.body)
  end

  def iqon_endpoint
    Faraday.new('http://api.thefashionhack.com')
  end

  class Parameter
    INDEED_KEYS = %w(controller action resource).freeze

    def initialize options
      @options = options
      INDEED_KEYS.each { |k| @options.delete(k) unless @options[k].nil? }
    end

    def to_s
      return '' if @options.nil?
      r = @options.inject("") { |r, (k, v)| "#{r}&#{k.to_s}=#{v.to_s}" }
      r.gsub(/^&/, '?')
    end
  end
end
