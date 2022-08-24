class Story < ApplicationRecord

    #require "addressable/uri"


    # frozen_string_literal: true

    # Sets the <tt>ActiveStorage::Current.host</tt> attribute, which the disk service uses to generate URLs.
    # Include this concern in custom controllers that call ActiveStorage::Blob#url,
    # ActiveStorage::Variant#url, or ActiveStorage::Preview#url so the disk service can
    # generate URLs using the same host, protocol, and base path as the current request.
    




    has_many_attached :images, dependent: :destroy

    validate :acceptable_image

    

    has_many :comments, as: :commentable, dependent: :destroy
    

    #has_ancestry

    


    #before_validation :beforeValidation
    
    after_validation :getKeyFromBlobAndAddItToStoryRecord
    
    #before_save :beforeSave
    
    #around_save :aroundSave
    
    #after_save :afterSave

    before_create :convertToFriendlyDateFormat
    
    #around_create :aroundCreate
    
    #after_create :afterCreate
    
    #after_commit :afterCommit
    #after_rollback :afterRolback


    
    
    def beforeValidation

        puts "-----------beforeValidation------------"

        #selfTest(self)

        puts "-----------beforeValidation------------"


        
    end

    def beforeSave


        puts "-----------beforeSave------------"

        #selfTest(self)

        puts "-----------beforeSave------------"
    end

    def aroundSave


        puts "-----------aroundSave------------"
        #puts self.errors.full_messages
        selfTest(self)

        puts "-----------aroundSave------------"
    end

    def convertToFriendlyDateFormat

        puts "-----------beforeCreate------------"

        puts "created_at_date = " + self.created_at.to_s

        newTime = self.created_at.localtime.strftime("%b #{self.created_at.localtime.day.ordinalize}, %Y")

       
        puts "newTime = " + newTime.to_s

        

        self.date = newTime

        puts "-----------beforeCreate------------"
    end

    def aroundCreate

        puts "-----------aroundCreate------------"

        #selfTest(self)

        puts "-----------aroundCreate------------"
    end

    def afterCreate

        puts "-----------afterCreate------------"

        #selfTest(self)

        puts "-----------afterCreate------------"
    end

    def afterSave

        puts "-----------afterSave------------"

        #puts "created_at_date = " + self.created_at

        #newTime = self.created_at.strftime("%_m/%e/%Y %l:%M%P")

       
        #puts "newTime = " + newTime.to_s

        #lastRecord = Story.last

        #self.date = newTime

        
        
        
        
        
        

        #selfTest(self)


        
        puts "-----------afterSave------------"
    end

    def afterCommit

        puts "-----------afterCommit------------"
        #selfTest(self)

        puts "-----------afterCommit------------"
    end

    def afterRolback

        puts "-----------afterRolback------------"

        #selfTest(self)
        puts "-----------afterRolback------------"
    end


    def aroundSave

    end



    def acceptable_image
        return unless images.attached?
        puts "in accep img", self.images
        puts "in accep img", images.class.to_s
        
        #unless image.byte_size <= 1.megabyte
        #    errors.add(:image, "is too big")
        #end
        acceptable_types = ["image/jpeg", "image/png", "image/jpg"]
        self.images.each do |i|

            unless acceptable_types.include?(i.content_type)
                errors.add(:images, "must be a JPEG or PNG")
            end

        end

        
        
        
    end

    

    def getKeyFromBlobAndAddItToStoryRecord

        puts "------------after_validation callback begin, in getKeyFromBlobAndAddItToStoryRecord -------------------"
        
        puts "is self image attached?"
        # if self.images.attached?

            
        #     puts "yes it is, start to split url"

        #     puts self.images.class.to_s

        #     puts "url to split is " + self.images[0].url
        #     url = self.images[0].url.split("?").first
        #     puts "final selfurl is " + url.to_s

            
            
        
        
       
        #     self.url = url

        # end

        if self.images.attached?

            
            puts "yes it is, start to split url"

            tempArray = []
            self.images.each do |i|
                
                
                tempArray.push(i.url.split("?").first)
                
            
            
            
            
            end

            

            puts "final selfurl is " + tempArray.inspect
            puts "final selfurl type is " + tempArray.class.to_s

            
            
        
        
       
            self.urls = tempArray

        end


       

        puts "------------after_validation callback end -------------------"
    end

    
    
    def selfTest(x)

        #url = self.image.service_url&.split("?")&.first
        
        #puts "self.title = " + self.title

        #x.reload
            
        if x.created_at != nil
            
            puts "result is = " + x.created_at.to_s
        else
            puts "result is = nil"
        end
        
        
        
        
        
        
        
       
        

    end
end
