import React, { Component } from 'react';


//MOUNTED ON IngredientsContainer
//STATELESS COMPONENT


class ViewIngredient extends Component {


        

    render() {
     //PERSISTING PROP VALUES WITHIN ARRAYS FOR EASIER ITERATION
      const ingredientProps =  [this.props]
      const collectIngredient = []
      const ingredientCategories = []
      ingredientProps.map(i => collectIngredient.push(i.ingredient[0]))
      collectIngredient.map(i => i ? ingredientCategories.push(...i.categories) : null)

    return (
    <div className="viewIngredient">  

    <h1>View Ingredient</h1>

    <h3> Project Name: </h3>
    {collectIngredient.map(i => i ? 
    //DISPLAYS SELECTED INGREDIENT'S NAME
    <h2 key={i.id}>{i.name}</h2> : null)}


    {collectIngredient.map(i => i ? <img 
    //DISPLAYS SELECTED INGREDIENT'S IMAGE
    key={i.id}
    className="ViewIngImage" 
    alt="i-image" 
    src={i.image_url} /> : null)}


    <h3> Ingredient Categories: </h3>
    <ul //DISPLAYS SELECTED INGREDIENT'S CATEGORIES IN UL LIST
    className="ViewIngCatList">{ingredientCategories.map( c => 
    <div key={c.id}>
    {c.name}
    </div>
    )}</ul>


      <h3 className="ViewIngDesHeader"> Ingredient Description: </h3>
      {collectIngredient.map(i => i ? <p 
      //DISPLAYING INGREDIENT'S DESCRIPTION
      className="ViewIngDes" key={i.id}> {i.description}</p> : null)}


      <h3> Price: </h3>
      {collectIngredient.map(i => i ? 
       //DISPLAYING INGREDIENT'S PRICE
      <input type="number"
      key={i.id}
      step="any" 
      id= "price" 
      defaultValue={i.price}/> : null)}<br></br><br></br>


        </div>
      );
    }





  }
  




  export default ViewIngredient;