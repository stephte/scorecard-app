class CreateScorecards < ActiveRecord::Migration[6.1]
  def change
    create_table :scorecards do |t|
      t.string :card_name
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
