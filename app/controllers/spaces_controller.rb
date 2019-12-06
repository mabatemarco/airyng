class SpacesController < ApplicationController
  before_action :set_space, only: [:show, :update, :destroy]
  before_action :authorize_request, except: [:index, :show]

  # GET /spaces
  def index
    @spaces = Space.all.order(updated_at: :desc)

    render json: @spaces, include: :pics
  end

  # GET /spaces/1
  def show
    render json: @space, include: [:user, :schedules, :pics]
  end

  # POST /users/:user_id/spaces
  def create
    @space = @current_user.spaces.new(space_params)

    if @space.save
      render json: @space, status: :created
    else
      render json: @space.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /spaces/1
  def update
    if @space.update(space_params)
      render json: @space
    else
      render json: @space.errors, status: :unprocessable_entity
    end
  end

  # DELETE /spaces/1
  def destroy
    @space.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_space
      @space = Space.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def space_params
      params.require(:space).permit(:name, :description, :rate, :street, :city, :state, :zip, :user_id)
    end
end
