


    
    
           //ASYNCHRONOUS FETCH TO ALL INGREDIENTS INSTANCES FROM API

      
      export const fetchIngredients = () => {
    
        return fetch("http://localhost:3000/api/v1/ingredients", {
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
          //RETURN INSTANCE.DATA IF FETCH IS SUCCESSFUL
              const ingredients = response.data
              return (ingredients)
            }
          })
          .catch(console.log())
       //CATCH ERRORS TO AVOID CODE BREAKING 
    }
    
    
  