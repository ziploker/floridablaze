class AddFormattedDateToCommunications < ActiveRecord::Migration[6.1]
  def change

    add_column :communications, :formatted_date, :string
  end
end
