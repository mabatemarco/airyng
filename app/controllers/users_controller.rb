class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy user_spaces]
  before_action :authorize_request, except: :create

  # GET /users
  def index
    @users = User.all

    render json: @users, status: :ok
  end

  # GET /users/1
  def show
    @user = User.find(params[:id])
    render json: @user, include: [{ spaces:  {include: [:schedules, :pics]}  }, {schedules: {include: :space}}]
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      @token = encode({ user_id: @user.id, username: @user.username })
      render json: { user: @user, token: @token }, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :img_url, :about_me, :name)
  end
end
