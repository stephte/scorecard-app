class Player < ApplicationRecord
  belongs_to :scorecard

  #getter, returns "New Player" if name is null
  def name
    super && super || "New Player"
  end

  # getter, returns new array if it doesnt exist
  def scores
    if super
      super.split(",").map { |val| val.to_i }
    else
      Array.new(18,0)
    end
  end

  #setter
  def scores=(scores)
    super(scores.join(","))
  end
  
end
