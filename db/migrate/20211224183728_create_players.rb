class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.string :name
      t.string :scores
      t.belongs_to :scorecard, null: false, foreign_key: true

      t.timestamps
    end
  end
end
