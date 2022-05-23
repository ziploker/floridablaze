class AddFullObjectToCommunicationsTypeJson < ActiveRecord::Migration[6.1]
  def change
    add_column :communications, :full_object, :json, default: {}
  end
end
