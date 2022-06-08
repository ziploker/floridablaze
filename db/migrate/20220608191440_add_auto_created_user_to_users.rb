class AddAutoCreatedUserToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :userCreatedAutomatically, :boolean, default: :false
  end
end
