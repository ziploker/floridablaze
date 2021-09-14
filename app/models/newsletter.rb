class Newsletter < ApplicationRecord

    validates_presence_of :email, :on=> :create
    validates_uniqueness_of :email
end
