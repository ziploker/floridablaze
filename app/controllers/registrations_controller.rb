class RegistrationsController < ApplicationController

    puts "/////// welcome to the registrations controller /////////"

   
    require 'mailgun-ruby'
       
    ####################  SIGN_UP  ###############################
    def create

        puts "in the registration controllers create function =============="
        
        mailgun_api = Rails.application.credentials.dig(:MAILGUN_API)
        
        
        token = SecureRandom.urlsafe_base64.to_s
        
        # First, instantiate the Mailgun Client with your API key
        mg_client = Mailgun::Client.new mailgun_api
        
        
        @user = User.new(user_params)
        @user.confirm_token = token

        puts "just did User.new and added user.confirm_token, any errors => " + @user.errors.messages.to_s

        if @user.save

            puts "@user.save was true !!"
            # Define your message parameters
            message_params =  { 
                
                from: 'admin@mg.floiridablaze.io',
                to:   @user.email,
                "h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
                "h:Reply-To": "FlordaBlaze Staff <admin@floridablaze.io>",
                subject: 'Welcome to floridablaze.io',
                html:    "
                
                    <html>
                        <body>
                            <h1> Hi #{@user.full_name},</h1>
                            
                            <p> Thank you for registering at Floridablaze<br>
                            Please navigate to the link below to activate your account<br><br>

                            #{confirm_email_registration_url(@user.confirm_token)}<br></p>

                            <p>Thank you,<br>

                            
                            <em>-Floridablaze Team</em></p><br><br><br>

                            If You wish to unsubscribe click <a href=%unsubscribe_url%>HERE</a>

                        </body>
                    </html>"

            }

            
            
            
            

            # Send your message through the client
            
            mg_client.send_message 'mg.floridablaze.io', message_params

            result = mg_client.get("mg.floridablaze.io/events", {:event => 'delivered'})
            
            ##session["user_id"] = @user.id
            
            render json: {

                
                status: "green",
                user: @user,
                error: {auth: ["Success!!! click the link in the email we sent you."]},
                mgResult: result
            }
        
        else
            
            if @user.errors.messages
                render json: {
                
                    status: "pink",
                    error: {auth: [@user.errors.full_messages[0]]},
                    mgResult: result
                
                }
            else
                render json: {
                    
                    status: "pink",
                    error: {auth: ["something went wrong"]},
                    mgResult: result
                
                }
            end
        end


        puts "leaving the registration controllers create function =============="

    end



    def resend

        puts "in the registration controllers resend function =============="
        
        ###sendgrid_api = Rails.application.credentials.dig(:SENDGRID_API)
        mailgun_api = Rails.application.credentials.dig(:MAILGUN_API)
        
        mg_client = Mailgun::Client.new mailgun_api
        
        token = SecureRandom.urlsafe_base64.to_s
        
        @user = User.find_by(email: params[:user][:email].downcase)
        
        @user.confirm_token = token
        
        

        puts "errors: " + @user.errors.messages.to_s

        if @user.save

            # using SendGrid's Ruby Library
            # https://github.com/sendgrid/sendgrid-ruby



            message_params =  { from: 'admin@mg.floiridablaze.io',
                to:   @user.email,
                "h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
                "h:Reply-To": "FlordaBlaze Staff <admin@floridablaze.io>",
                subject: 'Welcome to floridablaze.io',
                html:    "
                
                <html>
                        <body>
                            <h1> Hi #{@user.first},</h1>
                            
                            <p> Thank you for registering at Floridablaze<br>
                            Please navigate to the link below to activate your account<br><br>

                            #{confirm_email_registration_url(@user.confirm_token)}<br></p>

                            <p>Thank you,<br>

                            
                            <em>-Floridablaze Team</em></p><br><br><br>

                            If You wish to unsubscribe click <a href=%unsubscribe_url%>HERE</a>

                        </body>
                    </html>"
            }

            mg_client.send_message 'mg.floridablaze.io', message_params

            result = mg_client.get("mg.floridablaze.io/events", {:event => 'delivered'})

            #session["user_id"] = @user.id
            
            render json: {

                
                status: "green",
                user: @user,
                error: {auth: ["Success!!! click the link in the email we sent you."]},
                mgResult: result
            }
        
        else
            
            if @user.errors.messages
                render json: {
                
                    status: "pink",
                    error: {auth: [@user.errors.full_messages[0]]},
                    mgResult: result
                
                }
            else
                render json: {
                    
                    status: "pink",
                    error: {auth: ["something went wrong"]},
                    mgResult: result
                
                }
            end
        end

        puts "leaving the registration controllers resend function =============="

    end

    
    
    
    ####################  when they click the link in the email  ##########
    def confirm_email

        puts "in the registration controllers confirm_email function =============="

        @user = User.find_by_confirm_token(params[:confirm_token])
        
        if @user.present? 
            
            @user.email_confirmed = "true"
            @user.confirm_token = nil
            @user.save!(:validate => false)
            
            puts "Your email has been confirmed"
            redirect_to "https://www.floridablaze.io"
            
        else
            
            puts "Sorry. can't find account or its already verified."
            redirect_to "https://www.floridablaze.io"
            
        end

        puts "leaving the registration controllers confirm_email function =============="

    end


    ####################  when they edit account details  ##########
    def update


        puts "in the registration controllers edit function =============="

        
        @user = User
            .find_by(email: params[:user][:email])
            #.try(:authenticate, params["user"][:oldPassword])

        if @user.present?

            puts "user present"
            
            if @user.email_confirmed == "true"

                puts "email has been confirmeddd"
            
                
                puts "#if email is being updated, send confirmation to new email"
                if @user.email.downcase != params["user"][:email].downcase
                    puts "0909"

                    puts 'email is different'

                    @user.email_confirmed == "false"
                    token = SecureRandom.urlsafe_base64.to_s
                    @user.confirm_token = token
                    @user.email = params["user"][:email].downcase
                    
                    #if names are different, save new names
                    if (@user.full_name != params["user"][:full_name])
                        @user.full_name = params["user"][:full_name]
                    end

                    if (@user.nick != params["user"][:nick])
                        @user.nick = params["user"][:nick]
                    end

                    if (@user.opt_in != params["user"][:opt_in])
                        @user.opt_in = params["user"][:opt_in]
                    end

                    if (@user.avatar != params["user"][:avatar])
                        @user.avatar = params["user"][:avatar]
                    end
                    
                    
                    

                    #################################################################3

                    mailgun_api = Rails.application.credentials.dig(:MAILGUN_API)
        
        
                    # First, instantiate the Mailgun Client with your API key
                    mg_client = Mailgun::Client.new mailgun_api
                    
                    
                   
                    puts "just sent confirm to new email and added user.confirm_token, any errors => " + @user.errors.messages.to_s

                    if @user.save!

                        puts "@user.save was true !!"
                        # Define your message parameters
                        message_params =  { 
                            
                            from: 'admin@mg.floiridablaze.io',
                            to:   @user.email,
                            "h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
                            "h:Reply-To": "FlordaBlaze Staff <admin@floridablaze.io>",
                            subject: 'Welcome to floridablaze.io',
                            html:    "
                            
                                <html>
                                    <body>
                                        <h1> Hi #{@user.full_name},</h1>
                                        
                                        <p> You have elected to change your email address at Floridablaze.io<br>
                                        Please navigate to the link below to confirm change<br><br>

                                        #{confirm_email_registration_url(@user.confirm_token)}<br></p>

                                        <p>Thank you,<br>

                                        
                                        <em>-Floridablaze Team</em></p><br><br><br>

                                        If You wish to unsubscribe click <a href=%unsubscribe_url%>HERE</a>

                                    </body>
                                </html>"

                        }

                        
                        
                        
                        

                        # Send your message through the client
                        
                        mg_client.send_message 'mg.floridablaze.io', message_params

                        result = mg_client.get("mg.floridablaze.io/events", {:event => 'delivered'})
                        
                        ##session["user_id"] = @user.id
                        
                        render json: {

                            
                            status: "green",
                            user: @user,
                            error: {auth: ["Success!!! click the link in the email we sent you."]},
                            mgResult: result
                        }
                    
                    else
                        
                        if @user.errors.messages
                            render json: {
                            
                                status: "pink",
                                error: {auth: [@user.errors.full_messages[0]]},
                                mgResult: result
                            
                            }
                        else
                            render json: {
                                
                                status: "pink",
                                error: {auth: ["something went wrong"]},
                                mgResult: result
                            
                            }
                        end
                    end


                    ##################################################################3
                    
                   
                
                
                

                    
                else

                    puts "---------------------bingo"

                    #if @user.update(user_params.except(:oldPassword))
                    if @user.update(user_params)

                        puts "bingooo"
                    
                        render json:{
                            status: "green",
                            logged_in: true,
                            user: @user,
                            error: { success: ["Changes saved!"]}
                        }
                    else
                        puts "bingaaa"
                        render json:{
                            status: "pink",
                            logged_in: true,
                            user: @user,
                            error: {auth: [@user.errors.full_messages[0]]}
                        }

                    end
                end
                
            else
                
                render json: {
                    status: "pink", 
                    error: { auth: ["Account not active yet, check email and click link"]}
                }
            end

            
        else
            render json: {
                status: "pink", 
                error: { auth: ["Current password is wrong. "]}
            }
        end
    end
        
    










    def forgot
    
        # check if email is present
        if params[:user][:email].blank? 
            
            return render json: {
                status: "pink",
                error: {auth: ["Email can't be blank"]}
            }
        
        end

        email = params[:user][:email].downcase
        puts email
        @user = User.find_by(email: email) 

        if @user.present?
            @user.generate_password_token!
            
            host = ""
            theLink = ""
            
            if Rails.env.production?
                host = "https://www.floridablaze.io"
            else
                host = "127.0.0.1:3000"
            end
            
            theLink = host + "/change_pw/" + @user.reset_password_token
            
            sendgrid_api = Rails.application.credentials.dig(:SENDGRID_API)
            
            email = SendGrid::Mail.new
            email.from = Email.new(email: 'admin@Floridablaze.io', name: "Floridablaze Team")
            
            email.subject = "** floridablaze password reset **"

            per = Personalization.new

            per.add_to(Email.new(email: @user.email, name: @user.first))
            #per.add_cc(Email.new(email: @user.email, name: 'cc'))
            #per.add_bcc(Email.new(email: @user.email, name: 'bcc'))
            per.add_substitution(Substitution.new(key: "user_name", value: @user.first))

            per.add_substitution(Substitution.new(key: "reset_link", value: theLink))

            email.add_personalization(per)

            #email.add_content(Content.new(type: 'text/plain', value: 'some text here user_name'))
            email.add_content(Content.new(type: 'text/html', value: '
                
                <html>
                    <body>
                        <h1> Hi user_name,</h1>
                        <p> To change your Floridablaze password please click on the link below.<br><br>

                        reset_link<br></p>

                        <p>Thank you,<br>
                        <em>-Floridablaze Team</em></p>

                    </body>
                </html>'))
                    
                    
                

            #email.template_id = "6ede18bb-2eba-4958-8a57-43a58a559a0a"
            sg = SendGrid::API.new(api_key: sendgrid_api)

            response = sg.client.mail._('send').post(request_body: email.to_json)

            puts response.status_code.to_s
            puts response.body.to_s
            puts response.headers.to_s
            
            render json: {
                
                status: "green",
                error: {auth: ["Please check the email we just sent you."]}
            }
        
        else
            
            render json: {
                status: "pink",
                error: {auth: ["Email address not found."]}
            }

        end
    end

    
    
    def reset
        

        if params[:token].blank?
            return render json: {
                
                status: "pink",
                error: {auth: ["Token not present"]}
            }
        end

        token = params[:token].to_s

        user = User.find_by(reset_password_token: token)

        if user.present? && user.password_token_valid?
        
            
            if user.reset_password!(params[:user][:password])
                render json: {
                    status: "green",
                    error: {auth: ["Password change successful!!"]}
                }
            else
                render json: {
                    status: "pink",
                    error: {auth: [user.errors.full_messages[0]]}
                }
            end
        else
            render json: {
                status: "pink",
                error: {auth:  ["Link not valid or expired. Try generating a new link."]}
            }
        end
    end


    def start_newsletter

        puts params[:body][:payload]

        

        newNewsletter = Newsletter.new(email: params[:body][:payload])

        if newNewsletter.save


            render json: {
                    
                status: "green",
                error: {auth: ["success"]}
            }

        else

            render json: {
                    
                status: "red",
                error: newNewsletter.errors.full_messages[0]
            }
           


        end
    end

    def facebook

        #puts "in REGISTRATION#FACEBOOK checking input " + JSON.parse(request.headers['Authorization']).inspect

        infoObj = JSON.parse(request.headers['Authorization'])
        
        # email = infoObj["email"]
        # name = infoObj["name"]
        # first_name = infoObj["name"].split.first
        # last_name = infoObj["name"].split[1..-1].join(' ')
        # nick = infoObj["name"].split.first
        # picture = infoObj["picture"]["data"]["url"]

        # puts "EXTRACTED email is = " + email + " " + name + " " + picture + " " + first_name + " " + last_name + " " + nick
        # first_name = payload['given_name']
        # last_name = payload['family_name']
        # email_is_verified = payload['email_verified']
        # picture = payload['picture']
    


        user = User.find_or_create_by(email: infoObj["email"]) do |u|
           
            u.email = infoObj["email"]
            u.password = SecureRandom.hex(8)
            u.full_name = infoObj["name"] 
            u.email_confirmed = "true"
            u.avatar_url = infoObj["picture"]["data"]["url"]
            u.nick = infoObj["name"].split.first
            u.auth_token = SecureRandom.urlsafe_base64
    
        end


        if user.valid?

            cookies.permanent[:auth_token] = user.auth_token

            render json:{
                
                status: "green",
                logged_in: true,
                user: user,
                error: "You have successfully logged in !!"
            }

            

        else

            render json: {
                status: "pink", 
                error: "Facebook account error, try again?"
            }
        end
    
    end

    def google

        require 'jwt'


        googleClient = Rails.application.credentials.dig(:GOOGLE_OAUTH_CLIENT_ID)

        facebookAppId = Rails.application.credentials.dig(:FACEBOOK_APPID)
        
        puts "zzni " + request.headers['Authorization']

        #validate google sign in response from google
        validator = GoogleIDToken::Validator.new
        
        begin

            
            payload = validator.check(request.headers['Authorization'], googleClient)
            
            #puts "payLOAD is = " + payload.to_s
            
            # email = payload['email']
            # first_name = payload['given_name']
            # last_name = payload['family_name']
            # email_is_verified = payload['email_verified']
            # picture = payload['picture']


            
            user = User.find_or_create_by(email: payload['email']) do |u|
           
                u.email = payload['email']
                u.password = SecureRandom.hex(8)
                u.full_name = payload['given_name'] + payload['family_name'] 
                u.email_confirmed = payload['email_verified'] ? "true" : "false"
                u.avatar_url = payload['picture']
                u.nick = payload['given_name']
                u.auth_token = SecureRandom.urlsafe_base64
        
            end


            if user.valid?

                cookies.permanent[:auth_token] = user.auth_token

                render json:{
                    
                    status: "green",
                    logged_in: true,
                    user: user,
                    error: "You have successfully logged in !!"
                }

                

            else

                render json: {
                    status: "pink", 
                    error: "Email validation via Google not done yet"
                }
            end
            

        
        
        
        rescue GoogleIDToken::ValidationError => e
            puts "Cannot validate: #{e}"
        end






    end

    
    
    
    private

    def user_params
        
        if params[:user][:email]
            params[:user][:email].downcase!
        end

        
        
        params.require(:user).permit(:full_name, :avatar, :email, :password_digest, :password, :email_confirmed, :confirm_token, :nick, :opt_in, :auth_token)
    end


    puts "/////// Farewell to the registrations controller /////////"

end
