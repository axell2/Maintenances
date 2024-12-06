class Api::V1::CarsController < ApplicationController
  before_action :set_car, only: %i[ show update destroy ]
  before_action :authorize_request

  # GET /cars
  def index
    @cars = Car.paginate(page: params[:page], per_page: 20) || []
    @cars.inspect
    render :index
  end

  # GET /cars/1
  def show
    render :show
  end

  # POST /cars
  def create
    @car = Car.new(car_params)

    if @car.save
      render :show, status: :created
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cars/1
  def update
    if @car.update(car_params)
      render json: @car
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cars/1
  def destroy
    @car.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car
      @car = Car.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_params
      params.require(:car).permit(:plate_number, :model, :year)
    end
end
