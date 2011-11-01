class SwitchPlaylistDataType < ActiveRecord::Migration
  def self.up
    remove_column :playlists, :playlist
    add_column :playlists, :playlist, :string
  end

  def self.down
  end
end
