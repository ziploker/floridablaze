class LookupsController < ApplicationController
    #require 'pry'
    require 'httparty'
    require 'json'
    require 'hash_dot'
    require 'mailgun-ruby'
    #require './lib/web_scraper.rb'
    require 'nokogiri'

    require "uri"
    require "net/http"
    
    
    
  
      
    
    #googleapi 1of1 to get latitude and longitude
    #openstates 1of3 to get legislator info (image url, name, email, ocid) based on lat and lng
    #openstates 2of3 to get aditional info (party affiliation) based on legistlator "ocid" 
    #openstates 3of3 to get aditional info (party affiliation) based on legistlator "ocid" 
    
    
    #(1of3) openstates querie based on lat / lng
    def openStatesQueryBuilderPrimary (lat, lng)
  
      return "{
        people(latitude: "+lat+", longitude: "+lng+", first: 100) {
          edges {
            node {
              name
              image
              id
              sortName
              familyName
              givenName
              currentMemberships {
                id
              }
              links {
                note
                url
              }
              contactDetails {
                type
                value
                note
                label
              }
              chamber: currentMemberships(classification: [\"upper\", \"lower\"]) {
  
                post {
                  label
                  division{
                    name
                  }
                }
                organization {
                  name
                  classification
                  parent {
                    name
                  }
                }
              }
            }
          }
        }
      }
      "
    
    end
  
  
    #(2of3) and (3of3) openstates queries /one call for each legislator
    def openStatesQueryBuilderSecondary(ocid)
  
      return '{
        person(id:"' + ocid + '"){
          name
          contactDetails {
            note
            type
            value
          }
          otherNames {
            name
          }
          sources {
            url
          }
          currentMemberships {
            organization {
              name
            }
          }
        }
      }'
    end
  
    
    def hasWhiteSpace(string) 
      
      puts "in hasWhiteSpace method "
      puts "string is = "+ string
      if string.index(' ') == nil
        puts "no spaces"
      else
        puts "has a space in the string"
      end
      
    end

    
  
    
    
    #incoming form submission from react front end
        def  incoming
  
  
      #object to be sent to frontend
      sendToFrontEnd = {"one" => {"resultFromFlorida" => "true", "name" => "", "firstName" => "", "lastName" => "", "image" => "", "id" => "", "email" => "", "chamber" => "", "party" => "", "parent" => "", "district" => "", "fullDistrict" => "", "fullDistrictTrunk" => "", "address" => "", "classification" => ""}, "two" => {"name" => "", "firstName" => "", "lastName" => "", "image" => "", "id" => "", "email" => "", "chamber" => "", "party" => "", "parent" => "", "district" => "", "fullDistrict" => "", "fullDistrictTrunk" => "", "address" => "", "classification" => ""}}
  
  
      #disable any views being rendered
      #head :ok
      
      
      #working query from json.strinigfy react front end, cant replicate with rails to_json because it keeps escaping \"\" in the start 
      #of the string '{\"query\"'
        q = '{"query":" {\n    people(latitude: 29.136800, longitude: -83.048340, first: 100) {\n      edges {\n        node {\n          name\n          image\n          id\n          sortName\n          familyName\n          givenName\n          currentMemberships {\n            id\n          }\n          links {\n            note\n            url\n          }\n          contactDetails {\n            type\n            value\n            note\n            label\n          }\n          chamber: currentMemberships(classification: [\"upper\", \"lower\"]) {\n            organization {\n              name\n              classification\n              parent {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n\n\n\n\n"}'
      
      
  
      #get api keys 

      @googleGeoApiUr = Rails.application.credentials.dig(:GOOGLE_API)
      @googleSearchApi = Rails.application.credentials.dig(:GOOGLE_SEARCH_API)
      @openstatesApi = Rails.application.credentials.dig(:OPENSTATES_API)
      
           
      
      #get info from react front end form, used for google api call
      @address = params[:lookup][:address]
      #@zipcode = params[:lookup][:zipcode]
      puts "=====================start: got info from front end=================="
      puts "Address is = " + @address.to_s
      
      @address = "\""+@address+"\""
      puts @address.to_s
      #puts "zipcode is = " + @zipcode.to_s
      puts "=====================end: got info from front end=================="
  
      #puts 'https://maps.googleapis.com/maps/api/geocode/json?address='+@address+'&key='+@googleGeoApi
      #google api call, get latitude and longitude based off user input (address/zipcode) 
      #googleResponse = HTTParty.get('https://maps.googleapis.com/maps/api/geocode/json?address='+@address+'&key='+@googleGeoApi).to_dot
      #puts googleResponse
      
      #@lat = googleResponse.results[0].geometry.location.lat.to_s
      #@lng = googleResponse.results[0].geometry.location.lng.to_s
  
      @lat = params[:lookup][:lat].to_s
      @lng = params[:lookup][:lng].to_s
      puts "=====================start: google api call results=================="
      puts "lat = " + @lat
      puts "lng = " + @lng
      puts @openstatesApi
      puts "=====================end: google api call results=================="
      
      
      
      
      #get openstates query 1of3 and convert it to json
      #should return info for 1 house and 1 senate legislator
      primaryOpenStatesQuery = openStatesQueryBuilderPrimary(@lat, @lng).to_json

      puts "qqq " + primaryOpenStatesQuery
      primaryOpenStatesResponse = HTTParty.get('https://openstates.org/graphql', {
  
          method: 'POST',
          
          headers: { "Content-Type" => "application/json",
                      "X-API-KEY" => "#{@openstatesApi}"},
          
          body: '{"query" : '+ primaryOpenStatesQuery + '}'
      }).to_dot
  
      puts "=====================start: openstates query 1of3 =================="
      puts primaryOpenStatesResponse.to_yaml
      puts "=====================end: openstates query 1of3=================="
  
  
      #update the hash thatll be sent to front end

      counter = 0
      #4451 Northwest 31st Avenue, Oakland Park, FL, USA

      puts "class is ===== " + primaryOpenStatesResponse.data.people.edges[-2].inspect
      
      
      #method 1 of 2 of getting both state reps from state and national rep array
      numberOfRepsFound = 0

      primaryOpenStatesResponse.data.people.edges.map{|record|
      
        
        #this "should" skip national reps and end up with two state reps 
        if record.node.chamber[0].organization.parent.name != "US Congress"
          puts "some non US Congress item was found in map"
          
          if counter == 0
            

            
            puts "counter was 0"
            sendToFrontEnd["one"]["name"] =  record.node.name.gsub('\\"', '')
            sendToFrontEnd["one"]["firstName"] =  record.node.givenName
            sendToFrontEnd["one"]["lastName"] =  record.node.familyName
            sendToFrontEnd["one"]["image"] =  record.node.image
            sendToFrontEnd["one"]["id"] =  record.node.id
            sendToFrontEnd["one"]["chamber"] =  record.node.chamber[0].organization.name
            sendToFrontEnd["one"]["classification"] =  record.node.chamber[0].organization.classification
            sendToFrontEnd["one"]["parent"] =  record.node.chamber[0].organization.parent.name
            sendToFrontEnd["one"]["district"] =  record.node.chamber[0].post.label
            sendToFrontEnd["one"]["fullDistrict"] =  record.node.chamber[0].post.division.name

            copyOfFullDistrictOne = record.node.chamber[0].post.division.name.dup
            
            if copyOfFullDistrictOne.split(" ") == 5
              sendToFrontEnd["one"]["fullDistrictTrunk"] = copyOfFullDistrictOne.gsub!(/(\d+|(district))/,"").rstrip
            else
              sendToFrontEnd["one"]["fullDistrictTrunk"] = copyOfFullDistrictOne
            end

            record.node.contactDetails.each do |object|
        
              if object.type === "address" && object.note === "Capitol Office"
                
                sendToFrontEnd["one"]["address"] =  object.value
                break
              end
        
            end



            record.node.contactDetails.each do |object|
        
              if object.type === "email" && object.value.exclude?("%") && object.value.include?("@flsenate.gov") || object.value.include?("@myfloridahouse.gov")
                
                sendToFrontEnd["one"]["email"] =  object.value
                break
              end
        
            end

            numberOfRepsFound = numberOfRepsFound + 1
      
          elsif counter == 1
            puts "counter was 1"
        
            sendToFrontEnd["two"]["name"] =  record.node.name.gsub('\\"', '')
            sendToFrontEnd["two"]["firstName"] =  record.node.givenName
            sendToFrontEnd["two"]["lastName"] =  record.node.familyName
            sendToFrontEnd["two"]["image"] =  record.node.image
            sendToFrontEnd["two"]["id"] =  record.node.id
            sendToFrontEnd["two"]["chamber"] =  record.node.chamber[0].organization.name
            sendToFrontEnd["two"]["classification"] =  record.node.chamber[0].organization.classification
            sendToFrontEnd["two"]["parent"] =  record.node.chamber[0].organization.parent.name
            sendToFrontEnd["two"]["district"] =  record.node.chamber[0].post.label
            sendToFrontEnd["two"]["fullDistrict"] =  record.node.chamber[0].post.division.name

            copyOfFullDistrictTwo = record.node.chamber[0].post.division.name.dup

            if copyOfFullDistrictTwo.split(" ") == 5
              sendToFrontEnd["two"]["fullDistrictTrunk"] = copyOfFullDistrictTwo.gsub!(/(\d+|(district))/,"").rstrip
            else
              sendToFrontEnd["two"]["fullDistrictTrunk"] = copyOfFullDistrictTwo
            end

            record.node.contactDetails.each do |object|
        
              if object.type === "address" && object.note === "Capitol Office"
                
                sendToFrontEnd["two"]["address"] =  object.value
                break
              end
        
            end


            record.node.contactDetails.each do |object|
        
              if object.type === "email" && object.value.exclude?("%") && object.value.include?("@flsenate.gov") || object.value.include?("@myfloridahouse.gov")
                
                sendToFrontEnd["two"]["email"] =  object.value
                break
              end
        
            end

            numberOfRepsFound = numberOfRepsFound + 1

          end

          counter = counter + 1
        
        
        
        
        end

        
        
        
      }

      puts "number of reps found was " + numberOfRepsFound.to_s

      # if less than 2 state reps were found, try method 2
      if numberOfRepsFound < 2

        #4451 Northwest 31st Avenue, Oakland Park, FL, USA
        puts "----------------in method two of getting both state reps from full reps list array"


        record = primaryOpenStatesResponse.data.people.edges[-1]

        sendToFrontEnd["one"]["name"] =  record.node.name.gsub('\\"', '')
        sendToFrontEnd["one"]["firstName"] =  record.node.givenName
        sendToFrontEnd["one"]["lastName"] =  record.node.familyName
        sendToFrontEnd["one"]["image"] =  record.node.image
        sendToFrontEnd["one"]["id"] =  record.node.id
        sendToFrontEnd["one"]["chamber"] =  record.node.chamber[0].organization.name
        sendToFrontEnd["one"]["classification"] =  record.node.chamber[0].organization.classification
        sendToFrontEnd["one"]["parent"] =  record.node.chamber[0].organization.parent.name
        sendToFrontEnd["one"]["district"] =  record.node.chamber[0].post.label
        sendToFrontEnd["one"]["fullDistrict"] =  record.node.chamber[0].post.division.name

        copyOfFullDistrictOne = record.node.chamber[0].post.division.name.dup

        if copyOfFullDistrictOne.split(" ") == 5
          sendToFrontEnd["one"]["fullDistrictTrunk"] = copyOfFullDistrictOne.gsub!(/(\d+|(district))/,"").rstrip
        else
          sendToFrontEnd["one"]["fullDistrictTrunk"] = copyOfFullDistrictOne
        end


        record.node.contactDetails.each do |object|
    
          if object.type === "address" && object.note === "Capitol Office"
            
            sendToFrontEnd["one"]["address"] =  object.value
            break
          end
    
        end



        record.node.contactDetails.each do |object|
    
          if object.type === "email" && object.value.exclude?("%") && object.value.include?("@flsenate.gov") || object.value.include?("@myfloridahouse.gov")
            
            sendToFrontEnd["one"]["email"] =  object.value
            break
          end
    
        end

        #######################################################

        record = primaryOpenStatesResponse.data.people.edges[-2]

        sendToFrontEnd["two"]["name"] =  record.node.name.gsub('\\"', '')
        sendToFrontEnd["two"]["firstName"] =  record.node.givenName
        sendToFrontEnd["two"]["lastName"] =  record.node.familyName
        sendToFrontEnd["two"]["image"] =  record.node.image
        sendToFrontEnd["two"]["id"] =  record.node.id
        sendToFrontEnd["two"]["chamber"] =  record.node.chamber[0].organization.name
        sendToFrontEnd["two"]["classification"] =  record.node.chamber[0].organization.classification
        sendToFrontEnd["two"]["parent"] =  record.node.chamber[0].organization.parent.name
        sendToFrontEnd["two"]["district"] =  record.node.chamber[0].post.label
        sendToFrontEnd["two"]["fullDistrict"] =  record.node.chamber[0].post.division.name

        copyOfFullDistrictTwo = record.node.chamber[0].post.division.name.dup

        if copyOfFullDistrictTwo.split(" ") == 5
          sendToFrontEnd["two"]["fullDistrictTrunk"] = copyOfFullDistrictTwo.gsub!(/(\d+|(district))/,"").rstrip
        else
          sendToFrontEnd["two"]["fullDistrictTrunk"] = copyOfFullDistrictTwo
        end


        record.node.contactDetails.each do |object|
    
          if object.type === "address" && object.note === "Capitol Office"
            
            sendToFrontEnd["two"]["address"] =  object.value
            break
          end
    
        end


        record.node.contactDetails.each do |object|
    
          if object.type === "email" && object.value.exclude?("%") && object.value.include?("@flsenate.gov") || object.value.include?("@myfloridahouse.gov")
            
            sendToFrontEnd["two"]["email"] =  object.value
            break
          end
    
        end



      end
    
      
  
      # sendToFrontEnd["one"]["name"] =  primaryOpenStatesResponse.data.people.edges[0].node.name.gsub('\\"', '')
      # sendToFrontEnd["one"]["firstName"] =  primaryOpenStatesResponse.data.people.edges[0].node.givenName
      # sendToFrontEnd["one"]["lastName"] =  primaryOpenStatesResponse.data.people.edges[0].node.familyName
      # sendToFrontEnd["one"]["image"] =  primaryOpenStatesResponse.data.people.edges[0].node.image
      # sendToFrontEnd["one"]["id"] =  primaryOpenStatesResponse.data.people.edges[0].node.id
      # sendToFrontEnd["one"]["chamber"] =  primaryOpenStatesResponse.data.people.edges[0].node.chamber[0].organization.name
      # sendToFrontEnd["one"]["parent"] =  primaryOpenStatesResponse.data.people.edges[0].node.chamber[0].organization.parent.name
      # sendToFrontEnd["one"]["district"] =  primaryOpenStatesResponse.data.people.edges[0].node.chamber[0].post.label
      
      
      
      
      #temp = primaryOpenStatesResponse.data.people.edges[0].node.chamber[0].post.division.name.dup
      #puts "temppp " + temp
      #puts "3sendToFrontEnd === " + sendToFrontEnd["one"]["fullDistrict"]
      #puts "4sendToFrontEnd === " + sendToFrontEnd["one"]["fullDistrict"].gsub!(/(\d+|(district))/,"").rstrip

      
  
      #fullDistrictTrunk = temp.gsub!(/(\d+|(district))/,"").rstrip
      #fullDistrictTrunk = "fullDistricTrunk1of2"
      #puts "4sendToFrontEnd === " + sendToFrontEnd["one"]["fullDistrict"]
      #sendToFrontEnd["one"]["fullDistrictTrunk"] = fullDistrictTrunk
      #puts "5sendToFrontEnd === " + sendToFrontEnd["one"]["fullDistrict"]
  
      
  
  
  
      # sendToFrontEnd["two"]["name"] =  primaryOpenStatesResponse.data.people.edges[1].node.name.gsub('\\"', '')
      # sendToFrontEnd["two"]["firstName"] =  primaryOpenStatesResponse.data.people.edges[1].node.givenName
      # sendToFrontEnd["two"]["lastName"] =  primaryOpenStatesResponse.data.people.edges[1].node.familyName
      # sendToFrontEnd["two"]["image"] =  primaryOpenStatesResponse.data.people.edges[1].node.image
      # sendToFrontEnd["two"]["id"] =  primaryOpenStatesResponse.data.people.edges[1].node.id
      # sendToFrontEnd["two"]["chamber"] =  primaryOpenStatesResponse.data.people.edges[1].node.chamber[0].organization.name
      # sendToFrontEnd["two"]["parent"] =  primaryOpenStatesResponse.data.people.edges[1].node.chamber[0].organization.parent.name
      # sendToFrontEnd["two"]["district"] =  primaryOpenStatesResponse.data.people.edges[1].node.chamber[0].post.label
      # sendToFrontEnd["two"]["fullDistrict"] =  primaryOpenStatesResponse.data.people.edges[1].node.chamber[0].post.division.name
  
      #temp = primaryOpenStatesResponse.data.people.edges[1].node.chamber[0].post.division.name
      #fullDistrictTrunk = temp.gsub!(/(\d+|(district))/,"").rstrip
      #fullDistrictTrunk = "fullDistricTrunk2of2"

      #sendToFrontEnd["two"]["fullDistrictTrunk"] = fullDistrictTrunk
      
      
      
      
      
      
      # primaryOpenStatesResponse.data.people.edges[0].node.contactDetails.each do |object|
        
      #   if object.type === "email" && object.value.exclude?("%") && object.value.include?("@flsenate.gov") || object.value.include?("@myfloridahouse.gov")
          
      #     sendToFrontEnd["one"]["email"] =  object.value
      #     break
      #   end
  
      # end
  
      # primaryOpenStatesResponse.data.people.edges[1].node.contactDetails.each do |object|
        
      #   if object.type === "email" && object.value.exclude?("%") && object.value.include?("@flsenate.gov") || object.value.include?("@myfloridahouse.gov")
          
      #     sendToFrontEnd["two"]["email"] =  object.value
      #     break
      #   end
  
      # end


      
  
      
      
      puts "=====================start: update hash with results from query =================="
      puts sendToFrontEnd
      puts "=====================end: update hash with results from query =================="
      
      puts "return if results are not from florida"
  
      if sendToFrontEnd["one"]["parent"] != "Florida Legislature" && sendToFrontEnd["two"]["parent"] != "Florida Legislature"
        
        sendToFrontEnd["one"]["resultFromFlorida"] = "false"

        puts "=====================start: update hash with results from query =================="
        puts sendToFrontEnd
        puts "=====================end: update hash with results from query =================="
        render json: sendToFrontEnd.to_json
        return
      end
      
  
      #get openstates query 2of3 and convert it to json
      #should return adl info for house and/or senate legislator
      openStatesQuery2of3 = openStatesQueryBuilderSecondary(sendToFrontEnd["one"]["id"]).to_json
      openStatesResponse2of3 = HTTParty.get('https://openstates.org/graphql', {
  
          method: 'POST',
          
          headers: { "Content-Type" => "application/json",
                      "X-API-KEY" => "#{@openstatesApi}"},
          
          body: '{"query" : '+ openStatesQuery2of3 + '}'
      }).to_dot
      
      
      puts "=====================start: openstates query 2of3 =================="
      puts openStatesResponse2of3
      puts "=====================end: openstates query 2of3=================="
      
  
      #if email one is blank, look for email in this other query
      if sendToFrontEnd["one"]["email"].blank?
        puts "==================== ...double checking for email one =========================="
        openStatesResponse2of3.data.person.contactDetails.each do |object|
        
          if object.type === "email"
            puts "==================== ...email one found in second query =========================="
            puts "============ ...the email found is = " + object.value + " ============"
            sendToFrontEnd["one"]["email"] =  object.value
            break
            
          end
          
        end
        puts "==================== ...email one NOT found in second query =========================="
      end
  
      
      #get party affiliation
      openStatesResponse2of3.data.person.currentMemberships.each do |object|
      
        if object.organization.name === "Democratic"
          sendToFrontEnd["one"]["party"] = "Democrat"
        elsif object.organization.name === "Republican"
          sendToFrontEnd["one"]["party"] = "Republican"
        end
      end
  
  
  
      #get openstates query 3of3 and convert it to json
      #should return adl info for house and/or senate legislator
      openStatesQuery3of3 = openStatesQueryBuilderSecondary(sendToFrontEnd["two"]["id"]).to_json
      openStatesResponse3of3 = HTTParty.get('https://openstates.org/graphql', {
  
          method: 'POST',
          
          headers: { "Content-Type" => "application/json",
                      "X-API-KEY" => "#{@openstatesApi}"},
          
          body: '{"query" : '+ openStatesQuery3of3 + '}'
      }).to_dot
      
      
      puts "=====================start: openstates query 3of3 =================="
      puts openStatesResponse3of3
      puts "=====================end: openstates query 3of3=================="
      
     
      
      #if email two is blank, look for email in this other query
      if sendToFrontEnd["two"]["email"].blank?
        puts "==================== ...double checking for email two =========================="
        openStatesResponse3of3.data.person.contactDetails.each do |object|
        
          if object.type === "email"
            puts "==================== ...email two found in second query =========================="
            puts "============ ...the email found is = " + object.value + " ============"
            sendToFrontEnd["two"]["email"] =  object.value
            break
            
          end
          
        end
        puts "==================== ...email two NOT found in second query =========================="
      end
  
      #get party affiliation
      openStatesResponse3of3.data.person.currentMemberships.each do |object|
        
        
          if object.organization.name === "Democratic"
            sendToFrontEnd["two"]["party"] = "Democrat"
          elsif object.organization.name === "Republican"
            sendToFrontEnd["two"]["party"] = "Republican"
          end
      end
      
      
      puts "=====================start: update hash with results from query =================="
      puts sendToFrontEnd
      puts "=====================end: update hash with results from query =================="
  
  
  
      puts" ================= handle missing Senate Emails =================" 
      #handle moissing Senate emails
      #scrape other website to get missing Senate email **smh
      if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "Senate" || sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "Senate"
      
        puts "handeling missing senate emails ....."
        puts "sendToFrontEnd[one][email].blank? = " + sendToFrontEnd["one"]["email"].blank?.to_s
        puts "sendToFrontEnd[one][chamber] = " + sendToFrontEnd["one"]["chamber"].to_s
        puts "sendToFrontEnd[two][email].blank? = " + sendToFrontEnd["two"]["email"].blank?.to_s
        puts "sendToFrontEnd[otwone][chamber] = " + sendToFrontEnd["two"]["chamber"].to_s
        puts "staaaart #scrape other website to get missing email **smh "
      
        #find out if SEnate is in one or two
        whereIsSenate = ""
        if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "Senate"
          whereIsSenate = "one"
        elsif sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "Senate"
          whereIsSenate = "two"
        end
        puts "whereisSenate is = " + whereIsSenate
        
        @name = sendToFrontEnd["#{whereIsSenate}"]["name"]
  
        #search_phrase_encoded = URI::encode(@name)ERB::Util.url_encode

        search_phrase_encoded = ERB::Util.url_encode(@name)
  
        senateSite = "flsenate.gov"
        houseSite = "myfloridahouse.gov"
        #puts "https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3Agmzwtwcebd3&siteSearch=#{senateSite}&key=#{@googleGeoApiUr}"
        thc = HTTParty.get("https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3Agmzwtwcebd3&siteSearch=#{senateSite}&key=#{@googleGeoApiUr}")
      
        if thc["searchInformation"]["totalResults"] != "0"
          theLink = thc["items"][0]["link"]
  
  
          doc = HTTParty.get(theLink)
        
          @parse_page = Nokogiri::HTML(doc)
  
          puts "=================nokogiri parse results====================="
          #puts @parse_page
          
          selector = "//a[starts-with(@href, \"mailto:\")]/@href"
  
          nodes = @parse_page.xpath selector
  
          address = nodes.collect {|n| n.value[7..-1]}
  
          puts address
  
          sendToFrontEnd["#{whereIsSenate}"]["email"] = address
         
        else
          puts "there were no match results"
        end
        
      end
      
      
      
      
      
      puts" ================= handle missing House Emails if blank =================" 
      if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "House" || sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "House"
        
        puts "handeling missing House emails ....."
        puts "sendToFrontEnd[one][email].blank? = " + sendToFrontEnd["one"]["email"].blank?.to_s
        puts "sendToFrontEnd[one][chamber] = " + sendToFrontEnd["one"]["chamber"].to_s
        puts "sendToFrontEnd[two][email].blank? = " + sendToFrontEnd["two"]["email"].blank?.to_s
        puts "sendToFrontEnd[two][chamber] = " + sendToFrontEnd["two"]["chamber"].to_s
      
        
        
        #set "whereIsHouse" variable
        whereIsHouse = ""
        if sendToFrontEnd["one"]["email"].blank? && sendToFrontEnd["one"]["chamber"] === "House"
          whereIsHouse = "one"
        elsif sendToFrontEnd["two"]["email"].blank? && sendToFrontEnd["two"]["chamber"] === "House"
          whereIsHouse = "two"
        end
        puts "whereishouse is = " + whereIsHouse
      
  
        
        #if first and last names are not blank and have no spaces in them, use it to build the missing email -firstName.lastName@myfloridahouse.gov'
        if sendToFrontEnd["#{whereIsHouse}"]["firstName"] != "" && sendToFrontEnd["#{whereIsHouse}"]["lastName"] != "" && hasWhiteSpace( sendToFrontEnd["#{whereIsHouse}"]["firstName"]) == nil && hasWhiteSpace(sendToFrontEnd["#{whereIsHouse}"]["lastName"]) == nil
          
          puts "trying to build house email with first and lastName"  
          
          
          #if first name has space get first part, before the space
          if sendToFrontEnd["#{whereIsHouse}"]["firstName"].split(" ").length > 1
            houseEmail = sendToFrontEnd["#{whereIsHouse}"]["firstName"].split(" ")[0] + "." +sendToFrontEnd["#{whereIsHouse}"]["lastName"]+ "@myfloridahouse.gov"
          else
            houseEmail = sendToFrontEnd["#{whereIsHouse}"]["firstName"]+ "." +sendToFrontEnd["#{whereIsHouse}"]["lastName"]+ "@myfloridahouse.gov"
          end
            sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
        
        
        
        #if middle name exists in the full name
        elsif sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ").length == 3 && sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[1].length < 4
          
          puts "name is made up of three strings and middle name less than 4 characters"
          puts "trying to build house email with by removing middle name from full name"
          
          
          houseEmail = sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[0]+ "." +sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[2]+ "@myfloridahouse.gov"
          sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
        
        #if name has a middle name with two double quotes
        elsif sendToFrontEnd["#{whereIsHouse}"]["name"].count('"') == 2  
          
          puts "name in here is = " + sendToFrontEnd["#{whereIsHouse}"]["name"]
          puts sendToFrontEnd["#{whereIsHouse}"]["name"].class.to_s
          
          houseEmail = sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[0] + "." + sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ").length - 1]+ "@myfloridahouse.gov"
          sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
  
        #if fullname consists from just first and last
        elsif sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ").length == 2
          puts "trying to build house email with full name"
  
          houseEmail = sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[0]+ "." +sendToFrontEnd["#{whereIsHouse}"]["name"].split(" ")[1]+ "@myfloridahouse.gov"
          sendToFrontEnd["#{whereIsHouse}"]["email"] = houseEmail
        else
          puts "build house email with scraper"
          
  
          @name = sendToFrontEnd["#{whereIsHouse}"]["name"].to_s
  
          #@name = @name.gsub /"/, ''
          #@name = @name.split(" ")[0] + " " + @name.split(" ")[@name.split(" ").length - 1]
  
          #search_phrase_encoded = URI::encode(@name)

          search_phrase_encoded = ERB::Util.url_encode(@name)
          puts search_phrase_encoded
          
          #puts "https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3A7hraibewjhe&siteSearch=lobbytools.com&key=#{@googleGeoApiUr}"
          #thc = HTTParty.get("https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3A7hraibewjhe&siteSearch=lobbytools.com&key=#{@googleGeoApiUr}")
        
          #puts "link is = " + "https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3A7hraibewjhe&siteSearch=lobbytools.com&key=#{@googleSearchApi}"
          
          thc = HTTParty.get("https://www.googleapis.com/customsearch/v1?q=#{search_phrase_encoded}&cx=003645805095083477600%3A7hraibewjhe&siteSearch=lobbytools.com&key=#{@googleSearchApi}")

          
         
          puts thc
  
          theLink = thc["items"][0]["link"]
  
          doc = HTTParty.get(theLink)
        
          @parse_page = Nokogiri::HTML(doc)
  
          puts "=================nokogiri parse results====================="
          puts @parse_page
          
          selector = "//a[starts-with(@href, \"mailto:\")]/@href"
  
          nodes = @parse_page.xpath selector
  
          address = nodes.collect {|n| n.value[7..-1]}
  
          puts address
  
          sendToFrontEnd["#{whereIsHouse}"]["email"] = address[0]
  
          
        end
        
       
  
        puts "house email scraper done, email results below"
        puts "email one is = " + sendToFrontEnd["one"]["email"].to_s
        puts "email two is = " + sendToFrontEnd["two"]["email"].to_s
      
      
      else
        puts "House email OK"
      end
      
      puts "====================final object start======="
      puts sendToFrontEnd.as_json
      puts "====================final object start======="
      
      
      sendToFrontEndJson = sendToFrontEnd.as_json

      #hash used to verify sendToFrontEndJson is same when it coms back to Lookup@sendEmailToReps
      hash = Digest::SHA1.hexdigest(JSON.generate(sendToFrontEndJson) + "amsterdamAL")

      #add hash to json
      sendToFrontEndJson["hash"] = hash

     
      
      puts "end ========== about to send to frontend"
      render json: sendToFrontEndJson
  
        
  
  end

  def getHeader(datas, whichOne)


    puts "datas is = " + datas.inspect

    puts "datas is whichOne = " + whichOne

    
    
    if datas[:"#{whichOne}"][:chamber] != "" && datas[:"#{whichOne}"][:chamber] == "Senate"

      
      if datas[:"#{whichOne}"][:lastName] != ""

        return "Dear Senator " + datas[:"#{whichOne}"][:lastName]
        
      else
          
        return "Dear Senator " + datas[:"#{whichOne}"][:name]
  
      end

    
    elsif datas[:"#{whichOne}"][:chamber] != "" && datas[:"#{whichOne}"][:chamber] == "House"

      if datas[:one][:lastName] != ""

        return "Dear Representative " + datas[:"#{whichOne}"][:lastName]
        
      else
          
        return "Dear Representative " + datas[:"#{whichOne}"][:name]
  
      end
    
    else

      return ""

    end
    
    
    # }else if (whichTabIsActive === 2){

    #   if (results.two.chamber !== undefined && results.two.chamber == "Senate"){

    #     if(results.two.lastName != ""){

    #       return <h3>Dear Senator {results.two.lastName}, </h3>
        
    #     }else{
          
    #       return <h3>Dear Senator {results.two.name}, </h3>
  
    #     }

    #   }else if (results.two.chamber !== undefined && results.two.chamber == "House"){

    #     if(results.two.lastName != ""){

    #       return <h3>Dear Representative {results.two.lastName}, </h3>
        
    #     }else{
          
    #       return <h3>Dear Representative {results.two.name}, </h3>

    #     }  
    #   }else{

    #     return null
    #   }
    # }else{
    #   return null
    # }
    



  end
 
  
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////                    ////////////////////////
  #///////////////    EMail           ////////////////////////
  #///////////////                    ////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  def sendEmailToReps

    recaptchaSecret = Rails.application.credentials.dig(:RECAPTCHA_SECRET)

    puts 'Lookup#sendEmailToReps start------------'
    puts '--------==--------'
    puts "current user set to ... " + @current_user.inspect
    puts "running setUser from lookups#sendemailtoreps"
    puts setUser
    puts "current user set to ... " + @current_user.inspect
    
    if @current_user && @current_user != {}
      
      puts "current user email confirmed set to ... " + @current_user.email_confirmed.to_s
    
    
      #get data from params
      resultsSentBackFromReact = params[:data][:ztoken]
      hashSentBackFromReact = params[:data][:ztoken][:hash]
      recaptchaResultsSentBackFromClientToBeChecked = params[:data][:rtoken]
      addressLineOne = params[:data][:addressLineOne]
      addressLineTwo = params[:data][:addressLineTwo]

    
      #compute new hash and compare it to original hash to make sure data hasnt been altered
      resultsSentBackFromReactEdit = resultsSentBackFromReact.except(:hash)
      newlyComputedHash = Digest::SHA1.hexdigest(JSON.generate(resultsSentBackFromReactEdit.as_json) + "amsterdamAL")

      if newlyComputedHash === hashSentBackFromReact



        recaptchaVerificationResults = HTTParty.get("https://www.google.com/recaptcha/api/siteverify?secret=#{recaptchaSecret}&response=#{recaptchaResultsSentBackFromClientToBeChecked}", {

          method: 'POST',
          
          headers: { "Content-Type" => "application/json"}
        
        }).to_dot



          puts "resoooooooooooooooonse recaptcha verifier = " + recaptchaVerificationResults.inspect
          puts recaptchaVerificationResults.success
          
          if recaptchaVerificationResults.success == true


            puts "email one is " + resultsSentBackFromReact[:one][:email]
            puts "name one is " + resultsSentBackFromReact[:one][:name]
            puts "email two is " + resultsSentBackFromReact[:two][:email]
            puts "name two is " + resultsSentBackFromReact[:two][:name]

            
            #getHeader(resultsSentBackFromReact, "one");
            #getHeader(resultsSentBackFromReact, "two");

          
            mailgun_api = Rails.application.credentials.dig(:MAILGUN_API)
            
            mg_client_one = Mailgun::Client.new mailgun_api
            mg_client_two = Mailgun::Client.new mailgun_api
            
            
            message_params_one =  { from: 'ziploker@hotmail.com',
              to:   'amsterdamAL@gmail.com',
              "h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
              "h:Reply-To": "ziploker@hotmail.com",
              subject: 'We need a more sensible approach to marijuana laws.',
              html:    "
              
              <html>
                      <body>
                          <h4> #{getHeader(resultsSentBackFromReact, "one")},</h4>
                          
                          <p>
                          
                          I am a constituent of #{resultsSentBackFromReact[:one][:fullDistrict]} district #{resultsSentBackFromReact[:one][:district]}. I am writing to urge you to support legalizing and regulating marijuana for adults. Many other states are currently benefiting from this common sense approach. Why is our state lagging behind?
                          </p>
                          <p>
                          Prohibition has never worked and causes an increase in unregulated sales. Legalizing marijuana for recreational use would virtually eliminate the black market, create thousands of jobs in a growing industry and bring in millions of dolars of tax revenue.
                          </p>
                          <p>
                          As a Legislator, you are in a position where you can make a difference. Can i count on you to end marijuana prohibition?
                          </p>
                          <br/>
                          
                          Sincerely,<br/>
                          #{@current_user.full_name} r<br/>
                          #{addressLineOne}<br/>
                          #{addressLineTwo}<br/><br/><br/>

                          <h6>If You wish to unsubscribe click <a href=%unsubscribe_url%>HERE</a></h6>

                      </body>
                  </html>"
          }





          message_params_two =  { from: 'ziploker@hotmail.com',
              to:   'amsterdamAL@gmail.com',
              "h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
              "h:Reply-To": "ziploker@hotmail.com",
              subject: 'We need a more sensible approach to marijuana laws.',
              html:    "
              
              <html>
                      <body>
                          <h4> #{getHeader(resultsSentBackFromReact, "two")},</h4>
                          
                          <p>
                          
                          I am a constituent of #{resultsSentBackFromReact[:two][:fullDistrict]} district #{resultsSentBackFromReact[:two][:district]}. I am writing to urge you to support legalizing and regulating marijuana for adults. Many other states are currently benefiting from this common sense approach. Why is our state lagging behind?
                          </p>
                          <p>
                          Prohibition has never worked and causes an increase in unregulated sales. Legalizing marijuana for recreational use would virtually eliminate the black market, create thousands of jobs in a growing industry and bring in millions of dolars of tax revenue.
                          </p>
                          <p>
                          As a Legislator, you are in a position where you can make a difference. Can i count on you to end marijuana prohibition?
                          </p>
                          <br/>
                          
                          Sincerely,<br/>
                          #{@current_user.full_name} r<br/>
                          #{addressLineOne}<br/>
                          #{addressLineTwo}<br/><br/><br/>

                          <h6>If You wish to unsubscribe click <a href=%unsubscribe_url%>HERE</a></h6>

                      </body>
                  </html>"
          }

          mg_client_one.send_message 'mg.floridablaze.io', message_params_one
          mg_client_two.send_message 'mg.floridablaze.io', message_params_two

          result_one = mg_client_one.get("mg.floridablaze.io/events", {:event => 'delivered'}) 
          result_two = mg_client_two.get("mg.floridablaze.io/events", {:event => 'delivered'}) 

            
            
            
            
            
            
            
            
            
            
            
            render json: {
              status: "green",
              msg: "sending emails... complete",
              result_one: result_one,
              result_two: result_two
            }

          else
            render json: {
              status: "red",
              msg: "Something went wrong, try again"
            }

          end
        
      
      else
        
        render json: {
          status: "red",
          msg: "Something went wrong, try again"
        }
      
      end
    
    else
      puts "unable to check @current_user bcuz user doesn't exist"
      render json: {
          
        status: "red",
        msg: "Please log in first."}
    end

    
    
      
    puts 'Lookup#sendEmailToReps end------------'

  end






  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////                    ////////////////////////
  #///////////////    $$$$$$$$$$      ////////////////////////
  #///////////////                    ////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////
  #///////////////////////////////////////////////////////////

  def sendLetterToReps

    puts "in lookups#sendLetterToReps start, check params"
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "params[:data][:ppResults] is " + params[:data][:ppResults].inspect
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "params[:data][:infoOnReps] is  " + params[:data][:infoOnReps].inspect
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "params[:data][:buyerDetails] is  " + params[:data][:buyerDetails].inspect
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "create User object based on paypal results"
    
    mailgun_api = Rails.application.credentials.dig(:MAILGUN_API)
    token = SecureRandom.urlsafe_base64.to_s
    mg_client = Mailgun::Client.new mailgun_api
    
    newAutoUser = User.new do |u|
      u.email = params[:data][:buyerDetails][:payer][:email_address].downcase
      u.full_name = params[:data][:buyerDetails][:payer][:name][:given_name] + " " + params[:data][:buyerDetails][:payer][:name][:surname]
      u.password = "luc1dd0t"
      u.isAdmin = false
      u.email_confirmed = "false" 
      u.opt_in = false
      u.nick = params[:data][:buyerDetails][:payer][:name][:given_name]
      u.confirm_token = token
    end
    
    if newAutoUser.save
      puts "newAutoUser was created!!"
    else
      puts "newAutoUser was not created!!"
    end

    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "Building letters.................."
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    
    puts "RepsOne name is " + params[:data][:infoOnReps][:one][:name].to_s
    puts "RepsTwo name is " + params[:data][:infoOnReps][:two][:name].to_s
    puts "Buyer email is" + params[:data][:buyerDetails][:payer][:email_address].to_s
    puts "///////////////"
    
    mainAddressArray = params[:data][:infoOnReps][:one][:address].split(';')
    mainAddressArrayTwo = params[:data][:infoOnReps][:two][:address].split(';')
    #example output mainAddressArray = ["1401 The Capitol"," 402 South Monroe Street","Tallahassee, FL 32399-1300"]
   
    mainAddress = mainAddressArray[-2].strip.to_s
    mainAddressTwo = mainAddressArrayTwo[-2].strip.to_s
    #example output mainAddress = "402 South Monroe Street"
    puts "mainAddress = " + mainAddress
    puts "mainAddressTwo = " + mainAddressTwo

    city = mainAddressArray[-1].strip.split(",")[0].to_s
    cityTwo = mainAddressArrayTwo[-1].strip.split(",")[0].to_s
    puts "city = " + city
    puts "cityTwo = " + cityTwo

    state = mainAddressArray[-1].strip.split(",")[-1].split(" ")[0].to_s
    stateTwo = mainAddressArrayTwo[-1].strip.split(",")[-1].split(" ")[0].to_s
    puts "state = " + state
    puts "stateTwo = " + stateTwo

    zipcode = mainAddressArray[-1].strip.split(",")[-1].split(" ")[-1].to_s
    zipcodeTwo = mainAddressArrayTwo[-1].strip.split(",")[-1].split(" ")[-1].to_s
    puts "zipcode = " + zipcode
    puts "zipcodeTwo = " + zipcodeTwo
    puts "///////////////"
    puts "///////////////"
    puts "creating 3 contacts with postgrid"
    
    theResponse = HTTParty.post('https://api.postgrid.com/print-mail/v1/contacts', {
      
      headers: { "X-API-KEY" => "test_sk_bdtSYVYM6FcpKoZFnMqBvu"},
      #headers: { "X-API-KEY" => "live_sk_aH2amUCijs56V3eW3hExvN"},

      body: {
        "firstName": params[:data][:infoOnReps][:one][:name],
        "addressLine1": mainAddress, 
        "countryCode": "US",
        "country": "US",
        "provinceOrState": state,
        "postalOrZip": zipcode,
        "city": city,
        "description": params[:data][:infoOnReps][:one][:fullDistrictTrunk]
      }
    }).to_dot


    theResponseTwo = HTTParty.post('https://api.postgrid.com/print-mail/v1/contacts', {
      headers: { "X-API-KEY" => "test_sk_bdtSYVYM6FcpKoZFnMqBvu"},
        #headers: { "X-API-KEY" => "live_sk_aH2amUCijs56V3eW3hExvN"},

      body: {
        "firstName": params[:data][:infoOnReps][:two][:name],
        "addressLine1": mainAddressTwo, 
        "countryCode": "US",
        "country": "US",
        "provinceOrState": stateTwo,
        "postalOrZip": zipcodeTwo,
        "city": cityTwo,
        "description": params[:data][:infoOnReps][:two][:fullDistrictTrunk]
      }
    }).to_dot


    theResponseThree = HTTParty.post('https://api.postgrid.com/print-mail/v1/contacts', {
  
      headers: { "X-API-KEY" => "test_sk_bdtSYVYM6FcpKoZFnMqBvu"},
      #headers: { "X-API-KEY" => "live_sk_aH2amUCijs56V3eW3hExvN"},

      body: {
        "firstName": params[:data][:buyerDetails][:payer][:name][:given_name] + " " + params[:data][:buyerDetails][:payer][:name][:surname],
        "addressLine1": params[:data][:buyerDetails][:purchase_units][0][:shipping][:address][:address_line_1],
        "addressLine2": params[:data][:buyerDetails][:purchase_units][0][:shipping][:address][:address_line_2], 
        "countryCode": "US",
        "country": "US",
        "provinceOrState": params[:data][:buyerDetails][:purchase_units][0][:shipping][:address][:admin_area_1],
        "postalOrZip": params[:data][:buyerDetails][:purchase_units][0][:shipping][:address][:postal_code],
        "city": params[:data][:buyerDetails][:purchase_units][0][:shipping][:address][:admin_area_2]
      }
    }).to_dot

    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    
    puts "contact 1of3" + theResponse.to_yaml
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "contact 2of3" + theResponseTwo.to_yaml
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "contact 3of3" + theResponseThree.to_yaml
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    

    contactRepOne = theResponse.id
    contactRepTwo = theResponseTwo.id
    contactBuyer = theResponseThree.id
    
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"
    puts "SENDING letters.................."
    puts "///////////////"
    puts "///////////////"
    puts "///////////////"

    theResponseLetterOne = HTTParty.post('https://api.postgrid.com/print-mail/v1/letters', {
      
      headers: { "X-API-KEY" => "test_sk_bdtSYVYM6FcpKoZFnMqBvu"},
      #headers: { "X-API-KEY" => "live_sk_aH2amUCijs56V3eW3hExvN"},

      body: {
        # id 	string 	A unique ID prefixed with letter_
        #"id": contactRepOne,
        # object 	string 	Always letter
        # status 	string 	See Tracking
        # imbStatus 	string or null 	See Intelligent-Mail Tracking
        # live 	boolean 	true if this is a live mode letter else false
        # description 	string or null 	Optional line describing this letter
        # sendDate 	Date 	Date when the letter will be sent
        # to 	Contact 	The recipient of this letter
        "to": contactRepOne,
        # from 	Contact 	The sender of this letter
        "from": contactBuyer,

        "addressPlacement": "insert_blank_page",
        
        # html 	string or null 	The raw html provided for this letter, if any
        # template 	string or null 	A Template ID, if any
        # uploadedPDF 	string or null 	A signed link to the original PDF uploaded for this letter, if any
        # addressPlacement 	string 	One of top_first_page or insert_blank_page
        # color 	boolean 	Whether the letter will be printed in color
        # doubleSided 	boolean 	Whether the letter will be printed double-sided
        # envelopeType 	string 	One of standard_double_window or flat
        # url 	string or null 	Signed link to a preview of this letter order
        # pageCount 	number or null 	Number of pages produced for this letter
        # mergeVariables 	object or null 	See Merge Variables
        # metadata 	object or null 	See Metadata

        "html": 
          '<div style="margin: 50px">

            <h2>Dear {{to.firstName}},</h2>
            
            <p>
              I am a constituent of ( <i> {{to.description}} </i>). I am writing to urge you to support legalizing and regulating marijuana for adults.
              Many other states are currently benefiting from this common sense approach. 
              Why is our state lagging behind?
            </p>
            <p>
            
              Prohibition has never worked and causes an increase in unregulated sales. Legalizing 
              marijuana for recreational use would virtually eliminate the black market, create
              thousands of jobs in a growing industry and bring in millions of dolars of tax
              revenue.
            </p>
            <p>

              As a Legislator, you are in a position where you can make a difference. 
              Can i count on you to end marijuana prohibition?
            </p>

            <div className="closing">
              Sincerely, <br />
              <sub>{{from.firstName}}</sub> <br />
              <sub>{{from.addressLine1}} {{from.addressLine2}}</sub> <br />
              <sub>{{from.city}}, {{from.provinceOrState}}  {{from.postalOrZip}}</sub> <br />
            </div>
          </div>
        '
      }
      
    }).to_dot



    theResponseLetterTwo = HTTParty.post('https://api.postgrid.com/print-mail/v1/letters', {
    
          
            
      headers: { "X-API-KEY" => "test_sk_bdtSYVYM6FcpKoZFnMqBvu"},
      #headers: { "X-API-KEY" => "live_sk_aH2amUCijs56V3eW3hExvN"},

      body: {
    
        # id 	string 	A unique ID prefixed with letter_
        #"id": contactRepOne,
        # object 	string 	Always letter
        # status 	string 	See Tracking
        # imbStatus 	string or null 	See Intelligent-Mail Tracking
        # live 	boolean 	true if this is a live mode letter else false
        # description 	string or null 	Optional line describing this letter
        # sendDate 	Date 	Date when the letter will be sent
        # to 	Contact 	The recipient of this letter
        "to": contactRepTwo,
        # from 	Contact 	The sender of this letter
        "from": contactBuyer,

        "addressPlacement": "insert_blank_page",
        
        # html 	string or null 	The raw html provided for this letter, if any
        # template 	string or null 	A Template ID, if any
        # uploadedPDF 	string or null 	A signed link to the original PDF uploaded for this letter, if any
        # addressPlacement 	string 	One of top_first_page or insert_blank_page
        # color 	boolean 	Whether the letter will be printed in color
        # doubleSided 	boolean 	Whether the letter will be printed double-sided
        # envelopeType 	string 	One of standard_double_window or flat
        # url 	string or null 	Signed link to a preview of this letter order
        # pageCount 	number or null 	Number of pages produced for this letter
        # mergeVariables 	object or null 	See Merge Variables
        # metadata 	object or null 	See Metadata

      "html": '<div style="margin: 50px">

        <h2>Dear {{to.firstName}},</h2>
        <p>
          I am a constituent of (
          <i>
          
            {{to.description}}
          
          </i>
          ). I am writing to urge you to support legalizing and regulating marijuana for adults.
          Many other states are currently benefiting from this common sense approach. 
          Why is our state lagging behind?

          </p>
          <p>
          
          Prohibition has never worked and causes an increase in unregulated sales. Legalizing 
          marijuana for recreational use would virtually eliminate the black market, create
          thousands of jobs in a growing industry and bring in millions of dolars of tax
          revenue.
          </p>
          <p>

          As a Legislator, you are in a position where you can make a difference. 
          Can i count on you to end marijuana prohibition?


          
          
        </p>

        <div className="closing">
          Sincerely, <br />
          <sub>{{from.firstName}}</sub> <br />
          <sub>{{from.addressLine1}} {{from.addressLine2}}</sub> <br />
          <sub>{{from.city}}, {{from.provinceOrState}}  {{from.postalOrZip}}</sub> <br />
        
        
          
        
        </div>
        </div>'
      }
    
  }).to_dot


  
  puts "///////////////"
  puts "///////////////"
  puts "///////////////"

  puts "theResponseLetterOne = " + theResponseLetterOne.to_s

  puts "///////////////"
  puts "///////////////"
  puts "///////////////"

  puts "theResponseLetterTwo = " + theResponseLetterTwo.to_s

  puts "///////////////"
  puts "///////////////"
  puts "///////////////"



  puts "date from postgrid = " + theResponseLetterOne["sendDate"]
  puts "com_type = " + theResponseLetterOne["object"]
  puts "recipients = " + theResponseLetterOne["to"]["firstName"]
  puts "status = " + theResponseLetterOne["status"]
  puts "postgrid_id = " + theResponseLetterOne["id"]
  puts "full_object = " + theResponseLetterOne.to_s
  puts "///////////////////"
  puts "date from postgrid = " + theResponseLetterTwo["sendDate"]
  puts "com_type = " + theResponseLetterTwo["object"]
  puts "recipients = " + theResponseLetterTwo["to"]["firstName"]
  puts "status = " + theResponseLetterTwo["status"]
  puts "postgrid_id = " + theResponseLetterTwo["id"]
  
  puts "full_object = " + theResponseLetterTwo.to_s

  puts "/////////////////// communicate with post grid start"


  puts "///////////////////////////////////"
  puts "///////////////////////////////////"
  puts "/////   start new + save   ////////"
  puts "///////////////////////////////////"


  com1  = newAutoUser.communications.new do |u|

    u.date = theResponseLetterOne["sendDate"]
    u.com_type = theResponseLetterOne["com_type"]
    u.recipient = theResponseLetterOne["recipient"]
    u.status = theResponseLetterOne["status"]
    u.postgrid_id = theResponseLetterOne["postgrid_id"]
    u.full_object = theResponseLetterOne["full_object"]



  end

  if com1.save!

    puts "ENTIRE save was successfull"

  else

    puts "1 yard line, save was not successfull"

  end


  puts "send paypal reciept to newAutoUser!!"
  message_params =  { 
      
    from: 'admin@mg.floiridablaze.io',
    to:   newAutoUser.email,
    "h:List-Unsubscribe": "<mailto:admin@floridablaze.io?subject=unsubscribe>",
    "h:Reply-To": "FlordaBlaze Staff <admin@floridablaze.io>",
    subject: 'Welcome to floridablaze.io',
    html:    "
        
    <html>
      <body>
        <h1> Hi #{newAutoUser.full_name},</h1>
        
        <p> Thank you for registering at Floridablaze<br>
          Please navigate to the link below to activate your account<br><br>

          #{confirm_email_registration_url(newAutoUser.confirm_token)}<br>
        </p>

        <p>Thank you,<br>
          <em>-Floridablaze Team</em>
        </p>
        
        <br><br><br>

        If You wish to unsubscribe click <a href=%unsubscribe_url%>HERE</a>

      </body>
    </html>"
  }

  mg_client.send_message 'mg.floridablaze.io', message_params
  result = mg_client.get("mg.floridablaze.io/events", {:event => 'delivered'})

  puts " end of auto user create, result from mg = " + result.to_s





  end  
  
  
  
  
    private
    
      def event_params
        
        params.require(:lookup).permit(:address, :zipcode, :test)


       end
end
  
