class Communication < ApplicationRecord
    belongs_to :user





    # before_create :addFormattedDate


    # def addFormattedDate
 
    #     puts "-----------addFormattedDate_START------------"
    
        
    
        
     
    #     if self.date == nil
     
    #        self.formatted_date = self.date.to_date.strftime("%b %e, %Y")
    #     end
    
    #     puts "New date is " + self.formatted_date
     
    #     puts "-----------addFormattedDate_END------------"
     
    #  end

    

end
