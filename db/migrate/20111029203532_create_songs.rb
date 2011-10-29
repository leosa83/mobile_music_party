class CreateSongs < ActiveRecord::Migration
  def self.up
    create_table :songs do |t|
      t.integer :artist_id
      t.string :song
      t.timestamps
    end
  end

  def self.down
    drop_table :songs
  end
end
