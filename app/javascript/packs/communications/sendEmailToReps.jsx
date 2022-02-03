import axios from 'axios'


const sendEmailToReps = (setIsButtonLoading, results, setSendEmailsToRepFlashMsg, recaptchaResponse, addressLineOne, addressLineTwo) => {
    
    
    
    //send googles response to registrations#google
    console.log("sendEmailsToReps start");
    

    axios.post("/send/emails", {
          
      data: { 
        gtoken: "test_data_from_sendEmailToReps",
        ztoken: results,
        rtoken: recaptchaResponse,
        addressLineOne: addressLineOne,
        addressLineTwo: addressLineTwo
        
      }
    })
    .then(response => {

      console.log("sendEmailToReps response is", response)

      setIsButtonLoading(false);

      setSendEmailsToRepFlashMsg(response.data.msg)
    //   if (response.data.status == "green"){

    //     props.handleSuccessfulAuth(response.data)
    //     console.log("result from google signin axios call", response.data.error)
      
    //   }else if (response.data.status == "pink"){

    //     console.log("result from google signin axios call", response.data.error)

    //   }else{

    //     console.log("result from google signin axios call, this should never happen")
    //   }
        
        
    }).catch(error => {
      
      //console.log("articleErrors", error)
    })
  }

  export default sendEmailToReps