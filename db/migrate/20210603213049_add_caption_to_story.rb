class AddCaptionToStory < ActiveRecord::Migration[6.1]
  def change
    add_column :stories, :caption, :text
  end
end
