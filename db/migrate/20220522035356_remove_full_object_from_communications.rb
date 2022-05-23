class RemoveFullObjectFromCommunications < ActiveRecord::Migration[6.1]
  def change
    remove_column :communications, :full_object
  end
end
