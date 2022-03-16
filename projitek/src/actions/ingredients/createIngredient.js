















      // FUNCTION FOR ASYNCHRONOUS FETCH TO CREATE INGREDIENT CONTROLLER FROM API


      export const createIngredient = (ingredientState) =>  {
     // SETTING SUBMITTED FORM STATE WITHIN OBJECT KEYS FOR API PARAMS
         const ingredient = {
          addCat: ingredientState.catIsSelected,
          name: ingredientState.name,
          price: ingredientState.price,
          description: ingredientState.description,
          imageUrl: ingredientState.imageUrl
        }

        const configObj = {
          mode: 'cors',
        credentials: "include",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(ingredient)
          }
    //POSTING JSON DATA TO API
    fetch("http://localhost:3000/api/v1/ingredients/create", configObj )
          .then(r => r.json())
          .then(ingredient => {   
        console.log(ingredient)
            })
           //CATCH ERRORS TO AVOID CODE BREAKING 
           .catch(console.log())
      }
    