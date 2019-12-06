class PicsController < ApplicationController
  before_action :set_pic, only: [:show, :update]

  # GET /pics
  def index
    @pics = Pic.all

    render json: @pics
  end

  # GET /pics/1
  def show
    render json: @pic
  end

  # POST /pics
  def create
    @space=Space.find(params[:space_id])
    @pic = @space.pics.new(pic_params)

    if @pic.save
      render json: @pic, status: :created
    else
      render json: @pic.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pics/1
  def update
    if @pic.update(pic_params)
      render json: @pic
    else
      render json: @pic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pics/1
  def destroy
    @pics=Space.find(params[:space_id]).pics
    @pics.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pic
      @pic = Pic.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pic_params
      params.require(:pic).permit(:img_url)
    end
end
