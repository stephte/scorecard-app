class Scorecard < ApplicationRecord
  belongs_to :course
  has_many :players, dependent: :delete_all
  accepts_nested_attributes_for :players, allow_destroy: true
  before_create :create_player

  # card_name returns "My New Card" if its null
  def card_name
    super && super || "My New Scorecard"
  end

  # my hacky version of the serializer, because I didn't like how
  # FastJsonapi formatted the Scorecard object
  def jsonify
    self.to_json(
      except: [:created_at, :updated_at],
      :include => [
        :course => {
          :include => [:tees => { only: [:order_number, :name, :yardages] }],
          only: [:name, :tees, :par]
        },
        :players => {
          only: [:id, :name, :scores]
        }
      ]
    )
  end

  private

  # add a new player to the card upon creation
  def create_player
    self.players.empty? && self.players = [Player.new]
  end
end
