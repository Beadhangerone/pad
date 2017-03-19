class CreatePressets < ActiveRecord::Migration[5.0]
  def change
    create_table :pressets do |t|
    	t.string :name
    	# t.string :
      t.timestamps
    end
  end
end
