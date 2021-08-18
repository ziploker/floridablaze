class AddTotalDownvotesToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :total_downvotes, :integer, default: 0
  end
end
