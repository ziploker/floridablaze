class User < ApplicationRecord

    has_one_attached :avatar
    has_many :comments, dependent: :destroy
    has_many :communications, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :dislikes, dependent: :destroy
    has_secure_password
    
    validates_presence_of :full_name, :on=> :create
    
    validates_presence_of :email, :on=> :create
    validates_uniqueness_of :email
    
    
    validates :password, :presence => true,
                            :confirmation => true,
                            :length => {:within => 6..40},
                            :on => :create
    
        

    validates :avatar, content_type: ['image/png', 'image/jpg', 'image/jpeg'],
        dimension: { width: { max: 200 }, height: { max: 200 } }
               
    #after_validation :getKeyFromBlobAndAddItToStoryRecord
    #before_save :downcase_fields
    
    #def downcase_fields
        #self.email.downcase!
    #end

    before_create :ifNickIsBlankMakeItFirstName

    before_create :addDefaultAvatarToActiveStorage

    

    #before_create :generate_token_for_cookie



    










    #########

    def comment_created
        self.number_of_comments = number_of_comments + 1
        save
        return number_of_comments
    end
    
    def generate_password_token!
        puts "in GPTTT"
        puts "generate_token " + generate_token
        self.reset_password_token = generate_token
        self.reset_password_sent_at = Time.now.utc
    
        puts "new token is " + self.reset_password_token.to_s
        save!
        end
        
    def password_token_valid?
        (self.reset_password_sent_at + 4.hours) > Time.now.utc
    end
    
    def reset_password!(password)
        self.reset_password_token = nil
        self.password = password
        save!
    end
    
    
    
    
    
    
    
    private
    
    def generate_token
        SecureRandom.hex(10)
    end



    ###########################


    
   
 
    
    def generate_token_for_cookie

        puts "in gen token--USER MODEL-----------"
        
        self[:auth_token] = SecureRandom.urlsafe_base64

        puts "gen token is =========== " + self[:auth_token].to_s
        
    end
    
    def getKeyFromBlobAndAddItToStoryRecord
 
       puts "------------after_validation callback begin for user -------------------"
 
    # #    if self.avatar.attached?

        
        
    # #     puts "-------------self.avatar.url----" + self.avatar.url.to_s
        
    # #    # processedLink = URI.parse(URI.encode(self.avatar.url.strip))
          
      
        
    # #     url = self.avatar.url.split("?").first

          

       
    # #       puts "url = " + url
          
          
          
       
    # #       self.avatar_url = url
 
       end
 
 
      
 
       puts "------------after_validation callback end -------------------"
   end
     
 
   def ifNickIsBlankMakeItFirstName
 
    puts "-----------beforeCreatePartII------------"

    puts 'daaallleee'

    
 
    if self.nick == nil
 
       self.nick = self.full_name.split(" ")&.first
    end

    puts "NewselfNick is " + self.nick
 
    puts "-----------beforeCreatePartII------------"
 
 end

 def addDefaultAvatarToActiveStorage
    self.avatar.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'man3.png')), filename: 'man3.png', content_type: 'image/png')

 end
    
end
