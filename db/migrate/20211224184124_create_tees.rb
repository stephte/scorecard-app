class CreateTees < ActiveRecord::Migration[6.1]
  def change
    create_table :tees do |t|
      t.string :name
      t.string :yardages
      t.integer :order_number
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
