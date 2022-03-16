

















    export const UpdateIngredient = (ingredientState,collectId) =>  {
     // SETTING SUBMITTED FORM STATE AND OBJECT ID WITHIN OBJECT KEYS FOR API PARAMS
    const ingredient = {
      id: collectId,
      removeCat: ingredientState.catIsRemoved,
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
      //POSTING DATA TO BACKEND API 
       fetch("http://localhost:3000/api/v1/ingredients/update", configObj )
        .then(r => r.json())
          .then(ingredient => {   
           console.log(ingredient)
        })
        .catch(console.log())
        //CATCH ERRORS TO AVOID CODE BREAKING 
  }
