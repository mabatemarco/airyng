class CreatePics < ActiveRecord::Migration[6.0]
  def change
    create_table :pics do |t|
      t.text :img_url
      t.references :space, null: false, foreign_key: true

      t.timestamps
    end
  end
end
