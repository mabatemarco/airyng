class User < ApplicationRecord
  has_secure_password
  validates :password, length: { minimum: 6 }, on: :create
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :spaces, dependent: :destroy
  has_many :reviews
  has_many :schedules
end
