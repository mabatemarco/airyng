class ChangeSpaces < ActiveRecord::Migration[6.0]
  def change
    change_column_null :spaces, :name, false
    change_column_null :spaces, :street, false
    change_column_null :spaces, :city, false
    change_column_null :spaces, :state, false
    change_column_null :spaces, :zip, false

  end
end
