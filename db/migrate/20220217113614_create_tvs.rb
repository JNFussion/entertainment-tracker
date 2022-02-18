class CreateTvs < ActiveRecord::Migration[7.0]
  def change
    create_table :tvs do |t|
      t.string :tmdb_id
      t.boolean :monitoring
      t.integer :state
      t.references :user

      t.timestamps
    end
  end
end
