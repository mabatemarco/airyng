class UserDefaults < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :about_me, from: nil, to: ''
    change_column_default :users, :img_url, from: nil, to: ''

  end
end
