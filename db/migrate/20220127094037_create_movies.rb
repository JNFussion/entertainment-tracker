class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies do |t|
      t.string :tmdb_id
      t.boolean :monitoring
      t.integer :state

      t.timestamps
    end
  end
end
