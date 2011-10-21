# Load the rails application
require File.expand_path('../application', __FILE__)

ENV['GEM_PATH'] = '/usr/lib/ruby/gems/1.8'; ENV['GEM_HOME'] = "#{ENV['HOME']}/.gems"

# Initialize the rails application
MobileMusicParty::Application.initialize!
