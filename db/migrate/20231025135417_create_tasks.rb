class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :description
      t.integer :story_point
      t.integer :status
      t.belongs_to :user
      t.timestamps
    end
  end
end
