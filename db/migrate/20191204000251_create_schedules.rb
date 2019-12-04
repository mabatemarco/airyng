class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :booked
      t.references :space, null: false, foreign_key: true

      t.timestamps
    end
  end
end
