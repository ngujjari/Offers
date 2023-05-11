function findMatchingOffers(inputTags, modalJSON) {
    const matchingOfferNumbers = [];
  
    modalJSON.offers.forEach((offer) => {
      let allTagsMatch = true;
      let isAndExists = false;

      let anyTagMatches = false;
      let notContainsMatch = false;
  
      offer.TAGS.every((offerTag) => {
        const inputTagExists = inputTags.some((inputTag) => {
          if (offerTag.rule === "AND") {
            isAndExists = true;
            return inputTag.name === offerTag.name;
          } else if (offerTag.rule === "CONTAINS") {
            return inputTag.name.includes(offerTag.name);
          } else if (offerTag.rule === "NOT CONTAINS") {
            return inputTag.name.includes(offerTag.name);
          }
        });
  
        if (offerTag.rule === "AND" && !inputTagExists) {
          allTagsMatch = false;
          return false;
          //break;
        } else if (offerTag.rule === "CONTAINS" && inputTagExists) {
          anyTagMatches = true;
          return false;
          //break;
        } else if (offerTag.rule === "NOT CONTAINS" && inputTagExists) {
            notContainsMatch = true; // don't include this offer
            return false;
           // break;
        } else {
          //allTagsMatch = false;
          return true;
        }
        return true;
      });
  
      if(notContainsMatch){
        // don't do anything
      }
      else if ((allTagsMatch && isAndExists) || anyTagMatches) {
        matchingOfferNumbers.push(offer.offerNumber);
      }
    });
  
    return matchingOfferNumbers;
  }
  
  const inputJSON = {
    "TAGS": [
      {
        "name": "SAMSUNG"
      },
      {
        "name": "TV"
      },
    ]
  };
  
  const modalJSON = {
    "product": "Offers with Tags",
    "version": 3.1,
    "releaseDate": "2023-06-25T00:00:00.000Z",
    "offers": [
      {
        "id": 12345,
        "type": "WPDI",
        "offerNumber": 101,
        "TAGS": [
          {
            "name": "APPLE",
            "rule": "CONTAINS"
          },
          {
            "name": "SAMSUNG",
            "rule": "AND"
          },
          {
            "name": "TV",
            "rule": "AND"
          }
        ]
      },
      {
        "id": 98765,
        "type": "WPDI",
        "offerNumber": 102,
        "TAGS": [
          {
            "name": "TV",
            "rule": "CONTAINS"
          }
        ]
      },
      {
        "id": 67853,
        "type": "WPDI",
        "offerNumber": 103,
        "TAGS": [
          {
            "name": "LAPTOPS",
            "rule": "NOT CONTAINS"
          }
        ]
      }
    ]
  };
  
  const matchingOfferNumbers = findMatchingOffers(inputJSON.TAGS, modalJSON);
  console.log(matchingOfferNumbers); // [101, 102]
  