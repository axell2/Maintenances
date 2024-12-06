# == Schema Information
#
# Table name: cars
#
#  id           :bigint           not null, primary key
#  model        :string
#  plate_number :string
#  year         :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Car < ApplicationRecord
  #relations 
  has_many :maintenance_services, dependent: :destroy
  #validations
  validates :model, :plate_number, :year, presence:true
  validates :plate_number, uniqueness: true
  validates :year, inclusion: { in: 1900..Time.now.year, message: "must be between 1900 and #{Time.now.year}" }
end
