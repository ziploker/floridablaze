class SparksController < ApplicationController

    puts "welcome to sparks controller"
   
    
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

            @path = params[:path]
            
            @page = params.fetch(:page, 0).to_i
            
            #@stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)
            
            @lastStory = Story.last
            @secondToLastStory = Story.second_to_last
            @thirdToLastStory = Story.third_to_last
            @fourthToLastStory = Story.order('created_at DESC').fourth()
            @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)
        

            
        end

        puts "============Sparks controller def index end================"
    end



    def next_page

        puts "next----------------page"
        @page = params.fetch(:page, 0).to_i
        
        @stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)

        render json: {
                
            
            stories: @stories
        }
    end


    def get_article_info

        puts "============Sparks controller def get_article_info start================"


        puts "set user from sparks get article info start"
        setUser
        puts "set user from sparks get article info end"
        
        
        #puts " SLUG = " + params["data"]["slug"]

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
        
        
        
        
        
        # @comments = @article_info.comments.as_json(include: {comments: 
        #                                             { include: {comments:
        #                                                 { include: {comments:
        #                                                     { include: [:comments]}
        #                                                 }}
        #                                             }}
        #                                         })

        

        


        if @current_user

            #puts "found current user" + @comments.inspect
            
            

            render json: {
                
                article: @article_info,
                comments: Comment.json_tree(@fullCommentsHash),
                user: @current_user
            
            }

           

        else

            puts "did not find current user"
            render json: {


                article: @article_info,
                comments: Comment.json_tree(@fullCommentsHash)

            }
        end
        
        puts "============Sparks controller def get_article_info end================"

    end


    def vote_up

        puts "in vote_up in sparks"
        puts "...and ID is = " + params[:data][:itemID].to_s

        setUser

       
        if @current_user && @current_user != {}
            commentToVoteUp = Comment.find_by(id: params["data"]["itemID"])
            #@current_user is the user thats voting up

            
            if !!commentToVoteUp.likes.find{|like| like.user_id ==@current_user.id}

               puts "IT WAS A DUPLICATE VOTE"
               #newLike = Like.new(comment_id: commentToVoteUp.id, user_id: @current_user.id)

               Like.destroy_by(user_id: @current_user.id)

            else
                
                puts "#NO VOTE YET< CARRY ON!!"

                newLike = Like.new(comment_id: commentToVoteUp.id, user_id: @current_user.id)

                if newLike.save
                    commentToVoteUp.total_upvotes =  commentToVoteUp.total_upvotes + 1
                    
                    if commentToVoteUp.save
                        
                        render json: {
                            status: "green",
                            comment_id: commentToVoteUp.id
            
                        }
                    end

                else
                    render json: {
                        status: "red"
        
                    }
                end

            
            
            end
            
            




        else
            render json: {
                status: "red"

            }
        end


        

        puts commentToVoteUp.likes.count

    end


    def vote_down

        puts "in vote_down in sparks"
        puts "...and ID is = " + params[:data][:itemID].to_s

        setUser

       
        if @current_user && @current_user != {}
            commentToVoteDown = Comment.find_by(id: params["data"]["itemID"])
            #@current_user is the user thats voting up

            newDislike = Dislike.new(comment_id: commentToVoteDown.id, user_id: @current_user.id)

            if newDislike.save
                commentToVoteDown.total_downvotes =  commentToVoteDown.total_downvotes + 1
                
                if commentToVoteDown.save
                    
                    render json: {
                        status: "green",
                        comment_id: commentToVoteDown.id
        
                    }
                end

            else
                render json: {
                    status: "red"
    
                }
            end





        else
            render json: {
                status: "red"

            }
        end


        

        puts commentToVoteDown.likes.count

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
    
    
    
    puts "farewell to sparks controller"
end