class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    #include CurrentUserConcern

    def setUser

        puts "===========setUser Start==========="
        
        puts "check if auth_token exists in cookies[:auth_token]"
        if cookies[:auth_token]
            puts "auth_token found!! its " + cookies[:auth_token]
            puts "check if user exists with that auth_token"

            if User.find_by_auth_token(cookies[:auth_token])
                
                puts "user found!! setting @current_user"
                @current_user = User.find_by_auth_token!(cookies[:auth_token])
                puts "current user set to ... " + @current_user.inspect
            end
        
        
        else

            puts "auth_token not found"
            
        end
       
       
       
       
       puts "===========setUser end==========="    end
end
