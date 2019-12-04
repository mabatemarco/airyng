class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.text :img_url
      t.string :about_me
      t.string :text

      t.timestamps
    end
  end
end
