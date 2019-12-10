class ChangeTypeOfRateInSchedules < ActiveRecord::Migration[6.0]
  def change
    change_column :schedules, :rate, :integer
  end
end
