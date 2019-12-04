class CreateSpaces < ActiveRecord::Migration[6.0]
  def change
    create_table :spaces do |t|
      t.string :name
      t.text :description
      t.integer :rate
      t.string :street
      t.string :city
      t.string :state
      t.integer :zip
      t.text :img_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
