class BookedDefaultOnSchedules < ActiveRecord::Migration[6.0]
  def change
    change_column_default :schedules, :booked, from: nil, to: false
  end
end
