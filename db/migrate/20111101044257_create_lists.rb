class CreateLists < ActiveRecord::Migration
  def self.up
    create_table :lists do |t|
      t.integer :playlist_id
      t.integer :artist_id
      t.integer :song_id
      t.timestamps
    end
  end

  def self.down
    drop_table :lists
  end
end
