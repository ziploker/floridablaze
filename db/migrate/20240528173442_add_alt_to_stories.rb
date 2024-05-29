class AddAltToStories < ActiveRecord::Migration[7.0]
  def change
    add_column :stories, :alt, :string, :default => ""
  end
end
