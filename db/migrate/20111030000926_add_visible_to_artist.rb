class AddVisibleToArtist < ActiveRecord::Migration
  def self.up
    add_column :artists, :visible, :boolean
  end

  def self.down
    remove_column :artists, :visible
  end
end
