class Api::V1::AuthController < ApplicationController
  def login
    @user = User.find_by(email: user_params[:email])
    if @user&.authenticate(user_params[:password])  
      token = JsonWebToken.encode_token(@user.id)  
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def signup
    @user = User.create(user_params)

    if @user.save
      token = JsonWebToken.encode_token(@user.id)
      render json: { token: token }, status: :created
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
