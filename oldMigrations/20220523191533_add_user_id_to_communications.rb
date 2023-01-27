class AddUserIdToCommunications < ActiveRecord::Migration[6.1]
  def change
    add_column :communications, :user_id, :integer

  end
end
