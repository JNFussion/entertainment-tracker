class Tv < ApplicationRecord
  belongs_to :user

  enum state: {
    NotWatched: 0,
    plan_to_watch: 1,
    watched: 2,
    abandoned: 3,
  }
end
