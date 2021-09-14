class CommentsController < ApplicationController
    puts "[][][][][][][][][ welcome to comments controller ][][][][][]"
    #before_action :find_commentable, only: :create
    #before_action :set_comment, only: [:edit, :update, :destroy, :history]
    #before_action :authenticate_user!

    #before_action :find_commentable
    #before_action :set_comment
    

    def create

        

        puts "===========in comments controller, create function ==============="



        find_commentable
        puts "running setuser from comment controller, create action"
        setUser
        #things needed to post comment
        # ID of article

        ##things needed to post comment on a comment
        # ID of Comment

        # @comment = params['event']['comment']
        # @articleID = params['event']['articleID']
        # @commentID = params['event']['commentID']

        # @author_nick = params['event']['author_nick']
        # @author_avatar = params['event']['author_avatar']

        # s = Story.find_by(id: @articleID)

        # s.comments.create!(body: @comment, author_nick: @author_nick, author_avatar: @author_avatar, user_id: @current_user.id)

       
        # @comments = s.comments.as_json(include: [:comments])
        
        # render json: {


        #     #article: @article_info,
        #     comments: @comments
        # }



        puts "about to save comment, check if current user==================="
        if @current_user

            puts "current user found, build and save comment"

            
            @comment = @commentable.comments.build(comment_params)

            @comment.user = @current_user

            @comment.reply = true  if params[:event][:comment_id]

            if @comment.commentable_type == "Comment"
                
                puts "@com is a " + @comment.inspect
                @comment.parent_id = @commentable.id
            end

            @comment.save!

            puts "build and save comment commplete!!"

            @article_info = Story.find_by(id: params[:event][:story_id])

           

        
            # # # @comments = s.comments.as_json(include: {comments: 
            # # # { include: {comments:
            # # #     { include: {comments:
            # # #         { include: {comments:
            # # #             { include: {comments:
            # # #                 { include: [:comments]}
            # # #             }}
            # # #         }}
            # # #     }}
            # # # }}

            #@comments = s.comments.serializable_hash(include: [:comments]) 

            @fullCommentsHash = {}
            @article_info.comments.reverse.each do |c|


                #@comments = @article_info.comments.second.subtree.arrange

                # @testComments.push(c.subtree.arrange)
                @fullCommentsHash = @fullCommentsHash.merge(c.subtree.arrange)
            
            
            end
           



            
        
            
            render json: {


                #article: @article_info,
                comments: Comment.json_tree(@fullCommentsHash),
                newCommentId: @comment.id
            }

        
        
        
        else


            puts "current user not found, send login message"

        end

    puts "===========out comments controller, create function ==============="
    end


    def edit
        set_comment
    end


    def update 
        set_comment
    end

    def destroy
        set_comment
    end

    def history 
        set_comment
    end


    private

    def comment_params

        puts "params inspect " + params.inspect

        #params = params[:event].except(:type, :comment_id, :story_id)
        
        params.require(:event).permit(:event, :body, :author_avatar, :author_nick, :user_id, :original_comment_author)
        #params.require(:event).permit(:event, :body, :story_id, :author_nick, :user_id)
    end

    def find_commentable

        puts "in comments controller, find_commentable 'before action' ==========="
        #comment
        if params[:event][:type] == "comment"
            puts "params[:event][:comment_id] was true so @commentable will be a comment reply"
            @commentable = Comment.find_by_id(params[:event][:comment_id])
        elsif (params[:event][:type] == "story")
            
            puts "params[:event][:story_id] was true so @commentable will be a story reply"

            @commentable = Story.find(params[:event][:story_id])
        else


            puts "neither params[:event][:story_id] or params[:event][:comment_id] was true WTFFF"
        end
        puts "out of comments controller, find_commentable before action ==========="

        #post
    end

    def set_comment 
        puts "in comments controller, set_comment before action ==========="

        @comment = Comment.find(params[:id])
        puts "out of comments controller, set_comment before action ==========="

    end

    puts "[][][][][][][][][ farewell to comments controller ][][][][][]"
end
