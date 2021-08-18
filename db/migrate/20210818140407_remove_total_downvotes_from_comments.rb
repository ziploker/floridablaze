class RemoveTotalDownvotesFromComments < ActiveRecord::Migration[6.1]
  def change
    remove_column :comments, :total_downvotes, :integer
  end
end
