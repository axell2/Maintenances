json.array! @cars do |car|
  json.id car.id
  json.plate_number car.plate_number
  json.model car.model
  json.year car.year
end