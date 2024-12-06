

json.array! @maintenance_services do |maintenance|
  
  json.id maintenance.id
  json.description maintenance.description
  json.status maintenance.status
  json.date maintenance.date
  json.plate_number maintenance.car.plate_number
end