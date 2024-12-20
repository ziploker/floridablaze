class StoriesController < ApplicationController

  puts "welcome to stories controller"


  skip_before_action :verify_authenticity_token, raise: false

  layout "admin"
  def index
      
  end

  
  def new

    puts "//////////// stories controller // def new --START/////////////////"
    setUser
    
    puts "check if current user exists"
    if @current_user
      
      puts "current user found, setting logged in"
      @loggedInStatus = "LOGGED_IN"
    
    else
      
      puts "current user NOT found, setting Not logged in"
      @loggedInStatus = "NOT_LOGGED_IN"
      
    end

    puts "//////////// stories controller // def new --END/////////////////"
    
      
  end

  
  
  def update
    puts "//////////// stories controller // def update --START/////////////////"
  
    
    
    puts "find Story with params[:id] of " + params[:id].to_s
    @story = Story.find(params[:id])

    if @story.blank?
      puts "couldn't find any stories"

    else

      puts "found story ===== " + @story.inspect
      puts "start to update story========"

      if @story.update(event_params)
        puts "Story updated successfully"
        redirect_to '/blog/' + params[:event][:slug]
        
      else
        #render 'edit'
        puts "Story did not update for some reason"
      end


    end

    

    puts "//////////// stories controller // def update --END/////////////////"

  end

  
  def create

    
    puts "|||||||||||||||enter stories controller create|||||||||||||||||||||"

    puts "---------calling setUser from stories controller-----------"
    setUser

    puts "||||||||||||||||  create new story and add params ||||||||||||||"
    
    puts "MY_ORIGINAL_PARAMS ", params.to_yaml
    
    
    imga = params["images"]
    puts "imga --- ", imga.to_yaml

   

    extractImages = params.extract!("images")
    puts "extractImages --- ", extractImages.to_yaml
    
    params["event"]["images"] = imga

    puts "new Combined??? ", params.to_yaml
    

    params.extract!("controller")

    params.extract!("action")
    
    puts "wtfffff now?", params.to_yaml
    np = params["event"]
    puts "wtfffff now final?", np.to_yaml
    np.permit!
    puts "wtfffff", np.to_yaml
    story = Story.new(np)
    story.author_avatar = @current_user.avatar_url
    
    
    puts "story create about to begin save"
    if story.save!
      
      puts "story save! was true"
      render json: story
    
    else
      
      render nothing: true, status: :bad_request
      puts story.errors.full_messages
    
    end
    
 
    puts "|||||||||||||||exit stories controller create|||||||||||||||||||||"

  end
    
    

  def edit
    
    puts "|||||||||||||||enter stories controller edit|||||||||||||||||||||"

    setUser
    if @current_user
      @loggedInStatus = "LOGGED_IN"
      @story2edit = Story.find(params[:id])
      
      
    else
      @loggedInStatus = "NOT_LOGGED_IN"
      redirect_to "/login"
      
    end

    puts "STORY2EDIT iS ", @story2edit.inspect

    puts"{}{}{}}{}{}{}{}{{}}"

    puts "iNCOMMING PARAMS are ", params.inspect

    puts "MY_ORIGINAL_PARAMS ", params.inspect
    
    
    imga = params["images"]

   

    extractImages = params.extract!("images")
    
    #params["event"]["images"] = imga
    

    params.extract!("controller")

    params.extract!("action")
    
    puts "wtfffff now?", params.inspect
    np = params["event"]
    puts "wtfffff now final?", np.inspect
    np.permit!
    puts "wtfffff", np.inspect

    @story2edit.images.attach(imga)



    puts "****************** images.count is", @story2edit.images.count
    @story2edit.update(np)
    puts "****************** images.count is", @story2edit.images.count

    puts "|||||||||||||||enter stories controller edit|||||||||||||||||||||"

  end

  def show

    puts inside STORY#SHOW
      
  end

  def admin_login

    @testData = "yomamma"
  end

  def create_admin  
        
    puts "in sessions#create_admin=================="

    puts "user email is = " + params["user"]["email"].downcase
    puts "user PW is = " + params["user"][:password].strip
    #search for user email and try to auth...
    user = User
        .find_by(email: params["user"]["email"].downcase)
        .try(:authenticate, params["user"][:password])

        puts "user that was found is = " + user.inspect

    
    if user.present?

        puts "user present? " + user.present?.to_s
        
        
        
        puts "-------------------------user was present"
        if user.email_confirmed == "true"
            
            
            puts "-------------------------user email confirmed"

            puts "in gen token-------------"
    
            #user[:auth_token] = SecureRandom.urlsafe_base64
            #user.save!

            someRandomNumber = SecureRandom.urlsafe_base64

            puts "about to update generated token---------"
            user.update_columns(auth_token: someRandomNumber)


            puts "just updated auth token to DB-------------"  

                puts "gen token is =========== " + user[:auth_token].to_s
            
            if params["user"]["rememberMe"]


                puts "------------------------rememberMe was checked"
                cookies.permanent[:auth_token] = user.auth_token
            else
                puts "------------------------rememberMe was NOT checked"
                cookies[:auth_token] = user.auth_token
            end
            
            # puts "-------------------------and email is confirmed"
            # session[:user_id] = user.id
            # puts "-------------------------user.id is " + user.id.to_s
            render json:{
                
                status: "green",
                logged_in: true,
                user: user,
                error: {success: ["You have successfully logged in !!"]}
            }
            
        else
            render json: {
                status: "pink", 
                error: {auth: ["Account not active yet, check email and click link"]}
            }
        end

    else
        render json: {
            status: "pink", 
            error: {auth: ["Email or password is bad is incorrect."]}
        }
    end
end

def get_story_info_v2

  puts "============Stories controller def get_story_info_V2 start================"


  puts "set user from stories get article info start"
  setUser
  puts "set user from stories get article info end"
  
  puts params.to_s
  #puts " SLUG = " + params["data"]["slug"]

  @story_info = Story.find_by(id: params["id"].to_i)

  puts "666666666666666666" + @story_info.title
  
  
  
  
 
  # @fullCommentsHash = {}
  
  # if @article_info.comments
      
      
  #     @article_info.comments.reverse.each do |c|


  #         #@comments = @article_info.comments.second.subtree.arrange

  #         # @testComments.push(c.subtree.arrange)
  #         @fullCommentsHash = @fullCommentsHash.merge(c.subtree.arrange)
      
      
  #     end
      


      

  #     #@testComments.push(@comments)


      

  # else
  #     puts "@article_info.comments was false so @comments = {}"
  #     @comments = {}
  # end
  
  
  # puts " @fullCommentsHash inspect = " +  @fullCommentsHash.inspect 
  
  
  
  ##if @current_user

      #puts "found current user" + @comments.inspect
      
      

      render json: {
          
          story: @story_info,
          
          user: @current_user
      
      }

     

  # # else

  # #     puts "did not find current user"
  # #     render json: {


  # #         article: {},
          

  # #     }
  # # end
  
  puts "============Stories controller def get_story_info_V2 end================"

end

  
  
  private
    
    def event_params

      puts "inside event_params", params.inspect
      params.require(:event).permit(:title, :slug, :keywords, :body, :images [], :url, :urls [], :topic, :author_avatar, :caption, :description, :alt)
    end


  puts "farewell to stories controller"

  end
  