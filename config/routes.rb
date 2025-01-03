Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  Rails.application.routes.draw do
  

    resources :stories do
      resources :comments
    end
  
    resources :comments do
      resources :comments
    end
  
    resources :sessions, only: [:create]
    resources :registrations, only: [:create], param: :confirm_token do
      member do
        get :confirm_email
      end
    end
  
    resources :registrations, only: [:update]
    
  
    delete :logout, to: "sessions#logout"
    get :logged_in, to: "sessions#logged_in"
    
    post '/lookup', to: 'lookups#incoming'
    post '/forward', to: 'sparks#page_forward'
    post '/reverse', to: 'sparks#page_reverse'
    post '/story_flipper', to: 'sparks#story_flipper'
    post '/story_flipper/more', to: 'sparks#story_flipper_more'
    post '/send/emails', to: 'lookups#sendEmailToReps'

    post '/send/letters', to: 'lookups#sendLetterToReps'

    
    get '/send/populateCommunications', to: 'lookups#populateCommunications'
    
    get '/send/get_logs', to: 'lookups#get_logs'
    post '/send/getLetterPreview', to: 'lookups#getLetterPreview'

    post '/stories/:id/edit', to: 'stories#edit'
    
    
    put '/registrations/:id', to: 'registrations#update'
    post '/registrations/forgot', to: 'registrations#forgot'
    post '/registrations/resend', to: 'registrations#resend'
    post '/registrations/newsletter', to: 'registrations#start_newsletter'
    post '/registrations/:token/reset', to: 'registrations#reset', as: 'registrations_reset'
    
    post '/blog/get_story_info', to: 'sparks#get_story_info'
    post '/blog/get_comment_info', to: 'sparks#get_comment_info'
  
    post '/blog/vote_up', to: 'sparks#vote_up'
    post '/blog/vote_down', to: 'sparks#vote_down'
    post '/blog/delete_pic', to: 'sparks#delete_pic'
    get  '/blog/:id/get_story_info_v2', to: 'stories#get_story_info_v2'

    post '/auth/rgsi', to: 'registrations#google'
    post '/auth/rfsi', to: 'registrations#facebook'

    #get '/blog/:slug', to: 'sparks#direct'
    
    #get 'blog/:id', to: 'sparks#index'
    
    
    get '/ziploker/edit/:id', to: 'stories#edit'
    get '/ziploker', to: 'stories#new'
    
  
     #admin login to add new stories
     get '/ziploker/login', to: 'stories#admin_login', as: 'admin_login'
    
     post '/ziploker/verify', to: 'stories#create_admin'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
    
    root :to => "sparks#index"
  
    match '*path', to: 'sparks#index', via: :all
  
  
  end
  
end
