class Comment < ApplicationRecord
  include ActionView::Helpers::DateHelper
  #extend ActsAsTree::TreeView

  belongs_to :user
  belongs_to :commentable, polymorphic: true
  #has_many :comments, as: :commentable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :dislikes, dependent: :destroy
  has_ancestry


  before_create :convertToFriendlyDateFormat
  #before_create :set_comment_number
  
  

  #acts_as_tree order: "body"


  private

  
  
  def set_comment_number

    self.comment_number = user.comment_created

  end


  def self.json_tree(arrayOfHashes)

    puts "in selg jsjgfkjhgfkjhgkhgjkgkjhgkjgh"
   
    
    arrayOfHashes.map do |node, sub_nodes|
      
      
      {:id => node.id, 
        :body => node.body, 
        :created_at => node.created_at,
        :updated_at => node.updated_at,
        :original_comment_author => node.original_comment_author,
        :parent_id => node.parent_id,
        :ancestry => node.ancestry,
        :date => node.date,
        :comment_number => node.comment_number,
        :reply => node.reply,
        :user_id => node.user_id,
        :commentable_type => node.commentable_type,
        :commentable_id => node.commentable_id,
        :edit_history => node.edit_history,
        :author_avatar => node.author_avatar,
        :author_nick => node.author_nick,
        :total_upvotes => node.total_upvotes,
        :total_downvotes => node.total_downvotes,
        :comments => json_tree(sub_nodes).compact }
    end
    
  end
  
  
  
  
  def convertToFriendlyDateFormat

    puts "-----------beforeCreate------------"

    puts "created_at_date = " + self.created_at.to_s

    #newTime = self.created_at.localtime.strftime("%b #{self.created_at.localtime.day.ordinalize}, %Y")

    newTime = time_ago_in_words(self.created_at.localtime)

    puts "newTime = " + newTime.to_s

    

    self.date = newTime

    puts "-----------beforeCreate------------"
  end

end
