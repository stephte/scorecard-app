class Course < ApplicationRecord
  has_many :tees
  has_many :scorecards

  def par
    super.split(",").map { |val| val.to_i }
  end

  def par=(par)
    super(par.join(","))
  end

end
