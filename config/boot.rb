Gem.clear_paths
require 'rubygems'
gem 'bundler' #koz added http://stackoverflow.com/questions/2282969/rails3-server-and-bundler-error-uninitialized-constant-bundler-nameerror
# Set up gems listed in the Gemfile.
gemfile = File.expand_path('../../Gemfile', __FILE__)
begin
  ENV['BUNDLE_GEMFILE'] = gemfile
  require 'bundler'
  Bundler.setup
rescue Bundler::GemNotFound => e
  STDERR.puts e.message
  STDERR.puts "Try running `bundle install`."
  exit!
end if File.exist?(gemfile)