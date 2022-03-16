


    
    
      //FUNCTION FOR ASYNCHRONOUS FETCH TO ALL CATEGORY INSTANCES FROM API
      
      export const fetchCategories = () => {
    
        return fetch("http://localhost:3000/api/v1/categories", {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          'Accept': 'application/json'
          },    
        })
          .then(r => r.json())
            //CONVERT RESPONSE TO JSON
          .then(response => {
            if (response.error){
              alert(response.error)
            } else {
              const categories = response.data
              //RETURN INSTANCE.DATA IF FETCH IS SUCCESSFUL
              return (categories)
            }
          })
          .catch(console.log())
            //CATCH ERRORS TO AVOID CODE BREAKING     
       }
    
    
  