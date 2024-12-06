class Api::V1::MaintenanceServicesController < ApplicationController
  before_action :set_maintenance_service, only: %i[ show update destroy ]
  before_action :authorize_request

  # GET /maintenance_services
  def index

    status = params[:status]
    plate_number = params[:plate_number]

    maintenance_services = MaintenanceService.all

    if status.present?
      @maintenance_services = maintenance_services.where(status: status)
    end

    if plate_number.present?
      @maintenance_services = maintenance_services.joins(:car).where(cars: { plate_number: plate_number })
    end
    
    @maintenance_services =  MaintenanceService.paginate(page: params[:page].to_i, per_page: 10)

    if status.present? or plate_number.present?
      render json: {
        services: @maintenance_services,
        total_pages: @maintenance_services.total_pages
      }
    else
      render :index
    end
  end

  # GET /maintenance_services/1
  def show
    render :show
  end

  # POST /maintenance_services
  def create
    @maintenance_service = MaintenanceService.new(maintenance_service_params)

    if @maintenance_service.save
      render :show, status: :created
    else
      render json: @maintenance_service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /maintenance_services/1
  def update
    if @maintenance_service.update(maintenance_service_params)
      render json: @maintenance_service
    else
      render json: @maintenance_service.errors, status: :unprocessable_entity
    end
  end

  # DELETE /maintenance_services/1
  def destroy
    @maintenance_service.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_maintenance_service
      @maintenance_service = MaintenanceService.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def maintenance_service_params
      params.require(:maintenance_service).permit(:car_id, :description, :status, :date)
    end
end
