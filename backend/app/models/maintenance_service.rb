# == Schema Information
#
# Table name: maintenance_services
#
#  id          :bigint           not null, primary key
#  date        :datetime
#  description :string
#  status      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  car_id      :bigint           not null
#
# Indexes
#
#  index_maintenance_services_on_car_id  (car_id)
#
# Foreign Keys
#
#  fk_rails_...  (car_id => cars.id)
#
class MaintenanceService < ApplicationRecord
  #relations
  belongs_to :car
  #validations
  validates :description, :date, presence: true
  validates :date,  comparison: { less_than_or_equal_to: -> { Date.today }, message: "must be today or in the past" }
  #state machine for maintences
  include AASM
  
  aasm column: :status do
    state :pending, initial: true
    state :in_progress
    state :completed
    
    event :to_progress do
      transitions from: :pending, to: :in_progress
    end

    event :to_complete do
      transitions from: :in_progress, to: :completed
    end
  
  end
end
