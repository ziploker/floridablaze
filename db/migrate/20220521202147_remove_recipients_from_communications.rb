class RemoveRecipientsFromCommunications < ActiveRecord::Migration[6.1]
  def change
    remove_column :communications, :recipients, :string
  end
end
