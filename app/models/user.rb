class User < ApplicationRecord
  has_many :movies
  has_many :tvs
end
