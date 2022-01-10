class LookupsController < ApplicationController
    #require 'pry'
    require 'httparty'
    require 'json'
    require 'hash_dot'
  
    #require './lib/web_scraper.rb'
    require 'nokogiri'
    
    
  
      
    
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
    def incoming
  
  
      #object to be sent to frontend
      sendToFrontEnd = {"one" => {"resultFromFlorida" => "true", "name" => "", "firstName" => "", "lastName" => "", "image" => "", "id" => "", "email" => "", "chamber" => "", "party" => "", "parent" => "", "district" => "", "fullDistrict" => "", "fullDistrictTrunk" => "", "address" => ""}, "two" => {"name" => "", "firstName" => "", "lastName" => "", "image" => "", "id" => "", "email" => "", "chamber" => "", "party" => "", "parent" => "", "district" => "", "fullDistrict" => "", "fullDistrictTrunk" => "", "address" => ""}}
  
  
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
      primaryOpenStatesResponse.data.people.edges.map{|record|
      
        
      
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
            sendToFrontEnd["one"]["parent"] =  record.node.chamber[0].organization.parent.name
            sendToFrontEnd["one"]["district"] =  record.node.chamber[0].post.label
            sendToFrontEnd["one"]["fullDistrict"] =  record.node.chamber[0].post.division.name
            sendToFrontEnd["one"]["fullDistrictTrunk"] = record.node.chamber[0].post.division.name.gsub!(/(\d+|(district))/,"").rstrip


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
      
          elsif counter == 1
            puts "counter was 1"
        
            sendToFrontEnd["two"]["name"] =  record.node.name.gsub('\\"', '')
            sendToFrontEnd["two"]["firstName"] =  record.node.givenName
            sendToFrontEnd["two"]["lastName"] =  record.node.familyName
            sendToFrontEnd["two"]["image"] =  record.node.image
            sendToFrontEnd["two"]["id"] =  record.node.id
            sendToFrontEnd["two"]["chamber"] =  record.node.chamber[0].organization.name
            sendToFrontEnd["two"]["parent"] =  record.node.chamber[0].organization.parent.name
            sendToFrontEnd["two"]["district"] =  record.node.chamber[0].post.label
            sendToFrontEnd["two"]["fullDistrict"] =  record.node.chamber[0].post.division.name
            sendToFrontEnd["two"]["fullDistrictTrunk"] = record.node.chamber[0].post.division.name.gsub!(/(\d+|(district))/,"").rstrip

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

          counter = counter + 1
        
        
        
        
        end
        #puts "output of the map{}{}{} " + record.node.chamber[0].organization.parent.name

        
      
      }

      
  
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

 
  
  
  def sendEmailToReps

    puts 'Lookup#sendEmailToReps start------------'

    #get data from params
    resultsSentBackFromReact = params[:data][:ztoken]
    hashSentBackFromReact = params[:data][:ztoken][:hash]

    
    #compute new hash and compare it to original hash to make sure data hasnt been altered
    resultsSentBackFromReactEdit = resultsSentBackFromReact.except(:hash)
    newlyComputedHash = Digest::SHA1.hexdigest(JSON.generate(resultsSentBackFromReactEdit.as_json) + "amsterdamAL")

    if newlyComputedHash === hashSentBackFromReact
      render json: {
        
      status: "green"}
    
    else
      render json: {
        
      status: "red"}
    end
    
      
    puts 'Lookup#sendEmailToReps end------------'

  end
    
  
  
  
  
      private
      
      def event_params
        params.require(:lookup).permit(:address, :zipcode, :test)
      end
  end
  