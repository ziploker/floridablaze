class AddTotalUpvotesToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :total_upvotes, :integer, default: 0
  end
end
