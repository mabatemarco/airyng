class Space < ApplicationRecord
  belongs_to :user
  has_many :schedules, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :pics, dependent: :destroy

end
