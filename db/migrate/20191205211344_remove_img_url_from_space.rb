class RemoveImgUrlFromSpace < ActiveRecord::Migration[6.0]
  def change

    remove_column :spaces, :img_url, :text
  end
end
