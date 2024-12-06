class CreateMaintenanceServices < ActiveRecord::Migration[7.1]
  def change
    create_table :maintenance_services do |t|
      t.references :car, null: false, foreign_key: true
      t.string :description
      t.string :status
      t.datetime :date

      t.timestamps
    end
  end
end
