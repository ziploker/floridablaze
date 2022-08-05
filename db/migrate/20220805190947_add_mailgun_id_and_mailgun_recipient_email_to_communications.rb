class AddMailgunIdAndMailgunRecipientEmailToCommunications < ActiveRecord::Migration[6.1]
  def change
    
    add_column :communications, :mailgun_id, :string
    add_column :communications, :mailgun_recipient_email, :string
  end
end
