class AddPriorityToSong < ActiveRecord::Migration
  def self.up
    add_column :songs, :priority, :boolean
  end

  def self.down
    remove_column :songs, :priority
  end
end
