class SessionsController < ApplicationController

    #sets @current_user if session[:id] exists
    #include CurrentUserConcern
    
    
    
    
    ####################  LOGIN  ###############################




    
    
   
    
  
    
    def create   
        
        puts "in sessions#create=================="

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
                    status: "orange", 
                    error: {auth: ["Account not active yet, check email or "]}
                }
            end

        else
            render json: {
                status: "pink", 
                error: {auth: ["Email or password is incorrect."]}
            }
        end
    end

    ################# check if user is logged in ###########
    def logged_in

        #puts @current_user.inspect
        puts "---------calling setUser from sessions controller-----------"

        setUser

        if @current_user && @current_user.email_confirmed == "true"

            
            
            render json: {
                
                logged_in: true,
                user: @current_user
            }
        else
            render json: {
                logged_in: false
            }
        end
    end

    
    ################# Log user da fk out ###########
    def logout
        reset_session
        cookies.delete(:auth_token)
        render json: {
            
            status: 200, 
            logged_out: true
        }
    end

    def login
    end
end
