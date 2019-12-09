class RemoveStartDateFromSchedules < ActiveRecord::Migration[6.0]
  def change

    remove_column :schedules, :start_time, :datetime

    remove_column :schedules, :end_time, :datetime
    add_column :schedules, :date, :date
    add_column :schedules, :start_time, :time
    add_column :schedules, :end_time, :time
  end
end
