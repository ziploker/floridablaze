class AddRecipientToCommunications < ActiveRecord::Migration[6.1]
  def change
    add_column :communications, :recipient, :string
  end
end
