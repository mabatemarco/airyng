class Schedule < ApplicationRecord
  belongs_to :space
  belongs_to :user, optional: true
end
