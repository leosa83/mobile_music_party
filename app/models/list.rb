class List < ActiveRecord::Base
  belongs_to :song
  belongs_to :artist
  belongs_to :playlist

end
