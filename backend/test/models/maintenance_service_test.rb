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
require "test_helper"

class MaintenanceServiceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
