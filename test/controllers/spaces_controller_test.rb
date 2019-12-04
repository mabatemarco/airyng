require 'test_helper'

class SpacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @space = spaces(:one)
  end

  test "should get index" do
    get spaces_url, as: :json
    assert_response :success
  end

  test "should create space" do
    assert_difference('Space.count') do
      post spaces_url, params: { space: { city: @space.city, description: @space.description, img_url: @space.img_url, name: @space.name, rate: @space.rate, state: @space.state, street: @space.street, user_id: @space.user_id, zip: @space.zip } }, as: :json
    end

    assert_response 201
  end

  test "should show space" do
    get space_url(@space), as: :json
    assert_response :success
  end

  test "should update space" do
    patch space_url(@space), params: { space: { city: @space.city, description: @space.description, img_url: @space.img_url, name: @space.name, rate: @space.rate, state: @space.state, street: @space.street, user_id: @space.user_id, zip: @space.zip } }, as: :json
    assert_response 200
  end

  test "should destroy space" do
    assert_difference('Space.count', -1) do
      delete space_url(@space), as: :json
    end

    assert_response 204
  end
end
