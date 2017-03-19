class CreateSounds < ActiveRecord::Migration[5.0]
  def change
    create_table :sounds do |t|
    	t.belongs_to :presset, index: true
    	t.integer :key
    	t.string :source
      t.timestamps
    end
  end
end
