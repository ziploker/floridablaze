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
    #post '/:page', to: 'sparks#next_page'
    
    put '/registrations/:id', to: 'registrations#update'
    post '/registrations/forgot', to: 'registrations#forgot'
    post '/registrations/resend', to: 'registrations#resend'
    post '/registrations/newsletter', to: 'registrations#start_newsletter'
    post '/registrations/:token/reset', to: 'registrations#reset', as: 'registrations_reset'
    
    post '/blog/get_article_info', to: 'sparks#get_article_info'
    post '/blog/get_comment_info', to: 'sparks#get_comment_info'
  
    post '/blog/vote_up', to: 'sparks#vote_up'
    post '/blog/vote_down', to: 'sparks#vote_down'

    post '/rgsi', to: 'registrations#google'

    #get '/blog/:slug', to: 'sparks#direct'
    
    #get 'blog/:id', to: 'sparks#index'
    
    
    get '/ziploker/edit/:id', to: 'stories#edit'
    get '/ziploker', to: 'stories#new'
    
  
    
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
    
    root :to => "sparks#index"
  
    match '*path', to: 'sparks#index', via: :all
  
  
  end
  
end
