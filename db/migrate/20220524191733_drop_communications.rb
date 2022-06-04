class DropCommunications < ActiveRecord::Migration[6.1]
  def change

   

    drop_table :communications do |t|
      t.string        :date
      t.string        :com_type
      t.string        :recipient
      t.string        :status
      t.references    :user, foreign_key: true
      t.string        :postgrid_id
      t.json          :paypal_full_object, default: {}
      t.json          :postgrid_full_object, default: {}
      t.timestamps
    end
  end
end
