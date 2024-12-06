json.id @car.id
json.plate_number @car.plate_number
json.model @car.model
json.year @car.year

# Incluyendo los servicios de mantenimiento
json.maintenance_services @car.maintenance_services do |service|
  json.id service.id
  json.date service.date
  json.status service.status
  json.description service.description
end