class CreateStories < ActiveRecord::Migration[6.1]
  def change
    create_table :stories do |t|
      t.string :title
      t.string :keywords
      t.text :body
      t.string :url
      t.string :date
      t.string :topic
      t.string :slug
      t.string :author_nick
      t.string :author_avatar

      t.timestamps
    end
  end
end
