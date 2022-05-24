class DropCommunications < ActiveRecord::Migration[6.1]
  def change

    drop_table :communications
  end
end
