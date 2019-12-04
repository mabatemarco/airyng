class RemoveRateFromSpaces < ActiveRecord::Migration[6.0]
  def change

    remove_column :spaces, :rate, :integer
  end
end
