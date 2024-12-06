class Api::V1::MaintenanceServicesController < ApplicationController
  before_action :set_maintenance_service, only: %i[ show update destroy ]

  # GET /maintenance_services
  def index
    @maintenance_services = MaintenanceService.all
    render :index
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
