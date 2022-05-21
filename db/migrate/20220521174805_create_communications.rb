class CreateCommunications < ActiveRecord::Migration[6.1]
  
  def change
    create_table :communications do |t|
      t.string :date
      t.string :com_type
      t.string :recipients, array:true, default: []
      t.string :status
      t.text :full_object

      t.timestamps
    end
  end
end
