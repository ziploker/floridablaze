class CreateCommunications < ActiveRecord::Migration[6.1]
  def change
    create_table :communications do |t|
      t.string        :date
      t.string        :com_type
      t.string        :recipient
      t.string        :status
      t.references    :user, foreign_key: true
      t.string        :postgrid_id
      t.text          :paypal_full_object
      t.text          :postgrid_full_object
      t.timestamps
    end
  end
end
