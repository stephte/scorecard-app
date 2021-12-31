class Tee < ApplicationRecord
  belongs_to :course

  def yardages
    super.split(",").map { |val| val.to_i }
  end

  def yardages=(yardages)
    super(yardages.join(","))
  end
  
end
