class RemoveIndexSchedule < ActiveRecord::Migration[6.0]
  def change
    remove_index :schedules, :user_id
  end
end
