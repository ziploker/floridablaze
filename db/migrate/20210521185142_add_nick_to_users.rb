class AddNickToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :nick, :string
  end
end
