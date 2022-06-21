import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
let autoComplete;

function SearchLocationInput({
  passRef,
  query,
  setQuery,
  setAddressObject,
  addressObject,
}) {
  //moved to parent
  //const [query, setQuery] = useState("");

  //comming from parent too
  const autoCompleteRef = passRef;

  //load google places autocomplete script and keydown listiner
  //for when address is entered (but never selected from list) and hit enter.
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyAejSgheqbFb_ibGMf9ko902a5_FrJ0dTw&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      console.log("End the handleKeyDown listiner");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    console.log("inside Key Down Handler ================ start");
    console.log($(".pac-container .pac-item:first").text());
    console.log($(".pac-container .pac-item:first").text().length.toString());

    //if firstVale.length == 0, it means enter was hit and and  address was selected.

    if (event.keyCode == 13 || (event.keyCode == 9 && firstValue.length > 0)) {
      console.log(
        "Enter was hit, key code(" +
          event.keyCode +
          ") AND nothing was selected from the list"
      );

      var firstValue = $(".pac-container .pac-item:first").text();
      console.log("USE " + firstValue + " to do new search programatically");

      setQuery(firstValue);

      const autocomplete = new window.google.maps.places.AutocompleteService();
      var geocoder = new window.google.maps.Geocoder();

      autocomplete.getPlacePredictions(
        { input: firstValue },

        function (predictions, status) {
          console.log(
            "matching prediction is " + JSON.stringify(predictions[0])
          );
          if (status == "OK") {
            geocoder.geocode(
              {
                placeId: predictions[0].place_id,
              },
              function (responses, status) {
                if (status == "OK") {
                  var lat = responses[0].geometry.location.lat();
                  var lng = responses[0].geometry.location.lng();
                  console.log(lat, lng);
                }
              }
            );
          }
        }
      );
    } else {
      console.log(
        "Something was hit, key code(" +
          event.keyCode +
          ") AND/OR something was selected from the list "
      );
    }

    console.log("inside Key Down Handler ================ end");
  };

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["address"], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields([
      "address_components",
      "formatted_address",
      "geometry",
    ]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    console.log(
      "Inside google Change Event listiner =================== starttt"
    );

    const addressObject = autoComplete.getPlace();

    if (addressObject.formatted_address) {
      console.log(
        "ADDRESSS WAS SELECTED FROM GOOGLE LIST " +
          autoCompleteRef.current.value
      );

      const query = addressObject.formatted_address;

      updateQuery(query);
      setAddressObject(addressObject);
    } else {
      //Enter was hit before any selection was made in the google api dropdown list
      //console log partial value
      console.log(
        "ENTER WAS HIT, BUT NO ADDRESS was SELECTED" +
          autoCompleteRef.current.value
      );

      //will be handled by keydown listiner
    }
    console.log("Inside google Change Event listiner=================== enddd");
  }

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
}

export default SearchLocationInput;
