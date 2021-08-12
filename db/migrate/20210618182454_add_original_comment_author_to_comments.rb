class AddOriginalCommentAuthorToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :original_comment_author, :string
  end
end
