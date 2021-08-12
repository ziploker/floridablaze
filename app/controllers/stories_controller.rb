class StoriesController < ApplicationController

  puts "welcome to stories controller"


  skip_before_action :verify_authenticity_token, raise: false

  
  def index
      
  end

  
  def new

    puts "//////////// stories controller // def new --START/////////////////"

    
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
    
    
    story = Story.new(event_params)
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


    if @current_user
      @loggedInStatus = "LOGGED_IN"
      @story2edit = Story.find(params[:id])
      
      
    else
      @loggedInStatus = "NOT_LOGGED_IN"
      redirect_to "/login"
      
    end

    puts "|||||||||||||||enter stories controller edit|||||||||||||||||||||"

  end

  def show
      
  end
  
  
  private
    
    def event_params
      params.require(:event).permit(:title, :slug, :keywords, :body, :image, :url, :topic, :author_avatar, :caption)
    end


  puts "farewell to stories controller"

  end
  