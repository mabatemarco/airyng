class AddRateToSchedules < ActiveRecord::Migration[6.0]
  def change
    add_column :schedules, :rate, :float
  end
end
