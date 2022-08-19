class AddImagesToStories < ActiveRecord::Migration[6.1]
  def change
    add_column :stories, :urls, :text, array: true, default: []
  end
end
