class SparksController < ApplicationController

    puts "welcome to sparks controller"
    layout 'floridablaze'
    
    STORIES_PER_PAGE = 4


    require 'json'

    
    def home
    
    
    end

    def direct
        puts "DiRECT"
        puts params[:slug]

        @directStory = Story.find_by(slug: params[:slug])
        
        
        if @directStory.blank?
            puts "@seeIfStoryExists.blank? was true, so no story was found, either bad params or no story found, redirect to root path with no params, aka homepage, and exit controller "
            redirect_to root_path
            return false
        end
        
        if @directStory.nil?
            puts "@seeIfStoryExists.blank? was true, so no story was found, either bad params or no story found, redirect to root path with no params, aka homepage, and exit controller "
            redirect_to root_path
            return false
        end

        @slug = params[:slug]
    end
    
    
    
    def index

        

        puts "============Sparks controller def index start================"

        puts "---------calling setUser from sparks controller-----------"
        
        setUser

        
        
        puts "=============  check to see if params[:path] exists AND corresponds to a story "
        
        if params[:path]
            puts "params[:path] is ========" + params[:path]
            puts "params exists, try to find story with it"
            
            @seeIfStoryExists = Story.find_by(slug: params[:path].split('/')[-1])
        
            
            
            puts "blank? ===== " + @seeIfStoryExists.blank?.to_s
            puts "nil? ====== " + @seeIfStoryExists.nil?.to_s
            
            
            if @seeIfStoryExists.blank?
                puts "@seeIfStoryExists.blank? was true, so no story was found, either bad params or no story found, redirect to root path with no params, aka homepage, and exit controller "
                redirect_to root_path
                return false
            end
            
            if @seeIfStoryExists.nil?
                puts "@seeIfStoryExists.blank? was true, so no story was found, either bad params or no story found, redirect to root path with no params, aka homepage, and exit controller "
                redirect_to root_path
                return false
            end
        
            puts "@seeIfStoryExists was true, so exit controller because itll be handled by react router instead"
            return false
        
        else
            puts "params[:path] didnt exist i guess, carry on"
            # puts "params[:path] is ========" + params[:path]
            # @path = params[:path]
            
            # @page = params.fetch(:page, 0).to_i
            @page = 0
            
            @stories = Story.order("created_at DESC").limit(STORIES_PER_PAGE).offset(@page * STORIES_PER_PAGE)
            
            puts "@page===================== " + @page.to_s  
            puts "@stories===================== " + @stories.inspect  

            @lastStory = Story.last
            @secondToLastStory = Story.second_to_last
            @thirdToLastStory = Story.third_to_last
            @fourthToLastStory = Story.order('created_at DESC').fourth()
            @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)
        

            
        end

        puts "============Sparks controller def index end================"
    end

    def story_flipper

        @newStories = Story.limit(4).offset(4).order(id: :desc)

        render json: {
            stories: @newStories,
            
        }


    end

    def story_flipper_more

        lastStoryID = params[:data][:lastStoryID]

        @newStories = Story.where("id < ?", lastStoryID).limit(4).order(id: :desc)

        render json: {
            stories: @newStories,
            howManyStories: @newStories.length
            
        }

        

    end

    def page_reverse

        puts "page_reverse----------------page"
    
        #get currentPageWidth and use that to set dynamicStoriesPerPage
        currentPageWidth = params[:data][:width]
        secondToLastStory_ID = params[:data][:secondToLastStory_ID]
        

   
        dynamicStoriesPerPage = 2
        

    

        puts "the current secondToLastStory_ID is " + params[:data][:secondToLastStory_ID].to_s

        puts "the current page width is " + params[:data][:width].to_s
        puts "the dynamicStoriesPerPage is " + dynamicStoriesPerPage.to_s
        @stories = Story.where("id < ?", secondToLastStory_ID).limit(dynamicStoriesPerPage).order(id: :desc)
        
        #if theres 3 stories per page, always return 3
        #if theres 4 stories per page always return 4
        

        if @stories.length == 0
            puts "about to return " + @stories.length.to_s + " stories"
            #no stories left, so get 2 stories from the top.
            
            @newStories = Story.limit(dynamicStoriesPerPage).order(id: :desc)
            puts " but returning " + @newStories.length.to_s + "instead"

            render json: {
                stories: @newStories,
                dynamicStoriesPerPage: dynamicStoriesPerPage,
            }
            return

        elsif @stories.length == 1
            puts "about to return " + @stories.length.to_s + " stories"

            
    

            #need to add one more from the top fort a total of 2
            @extraStories = Story.limit(1).order(id: :desc)
            @storyPackage = @stories | @extraStories
            puts " but returning = " + @storyPackage.length.to_s + " instead"
            render json: {
                stories: @storyPackage,
                dynamicStoriesPerPage: dynamicStoriesPerPage,
            }
            return

            

        elsif @stories.length == 2
            puts "about to return " + @stories.length.to_s + " stories"

               puts "rendering @stories since it was 2"
                render json: {
                    stories: @stories,
                    dynamicStoriesPerPage: dynamicStoriesPerPage,
                }
                return

            
            

       



        end

        
    end


    def page_forward

        dynamicStoriesPerPage = 2

        puts "page_forward----------------page"
    
        currentPageWidth = params[:data][:width]
        lastStory_ID = params[:data][:lastStory_ID]

        

        puts "the current lastStory_ID is " + params[:data][:lastStory_ID].to_s
        puts "the current page width is " + params[:data][:width].to_s
        puts "the dynamicStoriesPerPage is " + dynamicStoriesPerPage.to_s
        
        @stories = Story.where("id > ?", lastStory_ID).limit(dynamicStoriesPerPage).order(id: :asc)

        puts "found " + @stories.length.to_s

        @stories.each do |x|
            puts x.title
        end
        
        #if theres 3 stories per page, always return 3
        #if theres 4 stories per page always return 4
        

        if @stories.length == 0
            # puts "about to return " + @stories.length.to_s + " stories"
            # #get 3 or 4 stories from the top depending on how many stories per page
            
            # @newStories = Story.limit(dynamicStoriesPerPage).order(id: :asc)

            # puts @newStories.class.to_s
            # puts " but returning " + @newStories.length.to_s + "instead"

            # @newStories.each do |x|
            #     puts x.title
            # end

           

            render json: {
               
                numOfResults: 0
            }
            return

            
        elsif @stories.length == 1
            puts "about to return " + @stories.length.to_s + " stories"
            #@extraStories = Story.limit(1).order(id: :asc)
            #@storyPackage = @stories | @extraStories
           
            # @storyPackage.each do |x|
            #     puts x.title
            # end
            #puts " combined @extraStories" 
            # @extraStories.each do |x|
            #     puts x.title
            # end

            render json: {
                stories: @stories,
                dynamicStoriesPerPage: dynamicStoriesPerPage,
                numOfResults: 1
            }
            return
            

        elsif @stories.length == 2
          
            puts " returning next two @stories" 
            @stories.each do |x|
                puts x.title
            end

            render json: {
                stories: @stories.reverse,
                dynamicStoriesPerPage: dynamicStoriesPerPage,
                numOfResults: 2
            }
            return
            
           

       



        end

        
    end



    def get_story_info

        puts "============Sparks controller def get_article_info start================"


        puts "set user from sparks get article info start"
        setUser
        puts "set user from sparks get article info end"
        
        
        #puts " SLUG = " + params["data"]["slug"]

        @story_info = Story.find_by(id: params["data"]["storyID"])
        
        
        
        
       
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
        
        
        
        if @current_user

            #puts "found current user" + @comments.inspect
            
            

            render json: {
                
                story: @story_info,
                
                user: @current_user
            
            }

           

        else

            puts "did not find current user"
            render json: {


                article: {},
                

            }
        end
        
        puts "============Sparks controller def get_article_info end================"

    end


    def vote_up

        puts "###in vote_up in sparks ###"
        puts "...and ID is = " + params[:data][:itemID].to_s

        #set @current_user
        setUser

       
        #check that @current_user exists
        if @current_user && @current_user != {}

            puts "###verified current user, now get comment via itemID###"
            commentToVoteUp = Comment.find_by(id: params["data"]["itemID"])
            

            
            #check if @current_user has already up voted
            if !!commentToVoteUp.likes.find{|like| like.user_id == @current_user.id}

                
                puts "###found duplicate upvote so subtract one upvote instead ###"
                #user has already voted, so subtract one vote instead
                if Like.destroy_by(user_id: @current_user.id, comment_id: commentToVoteUp.id)
                
                    render json: {
                        status: "voteup_undo",
                        comment_id: commentToVoteUp.id
                    }
               
                else
                    
                    #Delete Vote Failed
                    render json: {
                        status: "red",
                    }
                
                end
            
            
            #check if @current_user has already down voted
            #subtract a downvote and add an upvote
            elsif !!commentToVoteUp.dislikes.find{|dislike| dislike.user_id == @current_user.id}
            
                
                puts "###found user had alreadt downvoted, so remove donvote b4 upvote. ###"
                if Dislike.destroy_by(user_id: @current_user.id, comment_id: commentToVoteUp.id)

                    newLike = Like.new(comment_id: commentToVoteUp.id, user_id: @current_user.id)

                    if newLike.save
                        
                        render json: {
                            status: "voteup_toggle",
                            comment_id: commentToVoteUp.id
            
                        }
               
                    else
                    
                        #Save Failed 
                        render json: {
                            status: "red"
            
                        }
                
                    end
                end
                
            else
                
                #user has NOT already voted at all, so add one vote.
                puts "## no prev votes found, engage ##"
                newLike = Like.new(comment_id: commentToVoteUp.id, user_id: @current_user.id)

                if newLike.save
                    
                    render json: {
                        status: "voteup",
                        comment_id: commentToVoteUp.id
        
                    }
               
                else
                    
                    #Save Failed 
                    render json: {
                        status: "red"
        
                    }
                
                end
            end
            
            
        else

            #@current_user not found
            render json: {
                status: "red"

            }
        
        end

    end


    
    
    def vote_down

        puts "in vote_down in sparks"
        puts "...and ID is = " + params[:data][:itemID].to_s

        #set @current_user
        setUser

       
        #check that @current_user exists
        if @current_user && @current_user != {}
            commentToVoteDown = Comment.find_by(id: params["data"]["itemID"])
            

            
            #check if @current_user has already down voted
            if !!commentToVoteDown.dislikes.find{|dislike| dislike.user_id == @current_user.id}

                #user has already voted, so subtract one vote instead
                if Dislike.destroy_by(user_id: @current_user.id, comment_id: commentToVoteDown.id)
                
                    render json: {
                        status: "votedown_undo",
                        comment_id: commentToVoteDown.id
                    }
               
                else
                    
                    #Delete Vote Failed
                    render json: {
                        status: "red",
                    }
                
                end
            
            
            #check if @current_user has already up voted
            #subtract a upvote and add a downvote
            elsif !!commentToVoteDown.likes.find{|like| like.user_id == @current_user.id}
            
                if Like.destroy_by(user_id: @current_user.id, comment_id: commentToVoteDown.id)

                    newDislike = Dislike.new(comment_id: commentToVoteDown.id, user_id: @current_user.id)

                    if newDislike.save
                        
                        render json: {
                            status: "votedown_toggle",
                            comment_id: commentToVoteDown.id
            
                        }
               
                    else
                    
                        #Save Failed 
                        render json: {
                            status: "red"
            
                        }
                
                    end
                end
                
            else
                
                #user has NOT already voted at all, so add one vote.
                newDislike = Dislike.new(comment_id: commentToVoteDown.id, user_id: @current_user.id)

                if newDislike.save
                    
                    render json: {
                        status: "votedown",
                        comment_id: commentToVoteDown.id
        
                    }
               
                else
                    
                    #Save Failed 
                    render json: {
                        status: "red"
        
                    }
                
                end
            end
            
            
        else

            #@current_user not found
            render json: {
                status: "red"

            }
        
        end

    end



    def get_comment_info
    
    
    
        puts "in get_comment_info // sparks controller--------------------------------------->>>>>> + " + params[:id].to_s
        puts "============Sparks controller def get_comment_info start================"


        #puts "set user from sparks get article info start"
        #setUser
        #puts "set user from sparks get article info end"
        
        
        puts " SLUG = " + params["data"]["slug"]

        @article_info = Story.find_by(slug: params["data"]["slug"])
        
        
        
        
       
        @fullCommentsHash = {}
        
        if @article_info.comments
            
            
            @article_info.comments.reverse.each do |c|


                #@comments = @article_info.comments.second.subtree.arrange

                # @testComments.push(c.subtree.arrange)
                @fullCommentsHash = @fullCommentsHash.merge(c.subtree.arrange)
            
            
            end
            


            

            #@testComments.push(@comments)


            

        else
            puts "@article_info.comments was false so @comments = {}"
            @comments = {}
        end
        
        
        puts " @fullCommentsHash inspect = " +  @fullCommentsHash.inspect 
        
        
        # @comments = @article_info.comments.as_json(include: {comments: 
        #                                             { include: {comments:
        #                                                 { include: {comments:
        #                                                     { include: [:comments]}
        #                                                 }}
        #                                             }}
        #                                         })

        

        


        # if @current_user

        #     #puts "found current user" + @comments.inspect
            
            

        #     render json: {
                
        #         article: @article_info,
        #         comments: Comment.json_tree(@fullCommentsHash),
        #         user: @current_user
            
        #     }

           

        # else

            #puts "did not find current user"
            render json: {


                #article: @article_info,
                comments: Comment.json_tree(@fullCommentsHash)

            }
        #end
    

    end


    def delete_pic

        puts "pp", params[:data][:picUrl]
        puts "pp", params[:data][:storyTitle]

        s = Story.find_by(title: params[:data][:storyTitle])

        
        puts "check if s.images.count > 0"
        if s.images.count > 0
            puts "images.count was > 0"
            s.images.each do |rec|

                if rec.url.split("?").first == params[:data][:picUrl]
                    puts "IT WAS A MATCH___"
                    

                    rec.destroy
                    
                    if rec.destroyed?

                        puts "rec was destroyed, now update urls array"


                        newUrls = s.urls.reject do |u|

                            u == params[:data][:picUrl]


                        end

                        puts "NEWURLS is ", newUrls.inspect
                        puts "s.urls is ", s.urls

                        s.urls = newUrls
                        s.save(validate: false)

                        puts "s.urls after save is ", s.urls
                        
                        render json: {
                            status: "green",
                            msg: "Everythings good."
                        }
                    end
                    
                end
                puts "IT WAS NOT A MATCH___"
            end
        
        else
            
            puts "There are no images in the database"
            
            render json: {
                status: "red",
                msg: "record was not found, there are no pics in db"

            }
            

        end
    end
    
    
    
    puts "farewell to sparks controller"
end