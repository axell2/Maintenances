Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001' # Reemplaza con la URL de tu aplicación React

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options],
      expose: ['Authorization']
  end
end