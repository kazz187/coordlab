require 'mechanize'
class Twitter < ActiveRecord::Base
  def icon_url name
    agent.user_agent_alias = 'Mac Safari'
    agent.get("https://twitter.com/#{name}").at('.ProfileAvatar-image')['src']
  rescue
    ''
  end

  def agent
    @agent ||= Mechanize.new
  end
end
