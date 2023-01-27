class AddPostgridIdToCommunications < ActiveRecord::Migration[6.1]
  def change
    add_column :communications, :postgrid_id, :string
  end
end
