class ChangeNullSchedules < ActiveRecord::Migration[6.0]
  def change
    change_column_null :schedules, :start_time, false
    change_column_null :schedules, :end_time, false
    change_column_null :schedules, :rate, false
  end
end
