import React, { Component } from 'react';
import {UpdateIngredient} from "../../actions/ingredients/updateIngredient"
//IMPORTING API CALL FUNCTION TO UPDATE INGREDIENT




class EditIngredient extends Component {

    constructor(props){
      // SETTING STATE OF FETCHED DATA
        super(props);
        this.state = {
          categories: [],
          ingredients: [],
          ingredient: "",
          catIsSelected: "",
          catIsRemoved: "",
          description: "",
          price: "",
          name: "",
          Id: "",
          imageUrl: ""
        }
        //BINDING HANDLESUBMIT FOR PRACTICE WITH FUNCTION
        this.handleSubmit = this.handleSubmit.bind(this)
          }
        

  
//HANDLERS


        handleCatChange = (e) => {
        //HANDLER FOR SELECTING CATEGORIES AND SETTING STATE ARRAY FOR ADDING NEW CATEGORIES TO COLLECTION 
          if(e.target.checked === true) {
          this.setState({catIsSelected: [...this.state.catIsSelected, e.target.name]})
          }else if (e.target.checked === false){
          this.setState({catIsSelected: this.state.catIsSelected.filter( i => i !== e.target.name)})
              }
           }

        handleCatremove = (e) => {
           //HANDLER FOR SELECTING CATEGORIES AND SETTING STATE FOR REMOVING CURRENT CATEGORIES FROM COLLECTION 
          if(e.target.checked === true) {
                    this.setState({catIsRemoved: [...this.state.catIsRemoved, e.target.name]})
          }else if (e.target.checked === false){
            this.setState({catIsRemoved: this.state.catIsRemoved.filter( i => i !== e.target.name)})
          }
        }


          handleDescription = (e) =>{
            //HANDLER TO HANDLE CREATE DESCRIPTION INPUT
          this.setState({description: e.target.value})
            }

            handlePrice = (e) => {
            //HANDLER TO HANDLE CREATE PRICE INPUT
            this.setState({price: e.target.value})
            }

            handleName = (e) => {
           //HANDLER TO HANDLE CREATE NAME INPUT
           this.setState({name: e.target.value})
            }

           handleImage = (e) => {
               //HANDLER FOR CAPTURING DOM IMAGE URL VALUE
            const  image_file = e.target.files[0];
             //UTILIZING REACT FILEREADER TO CONVERT LOCAL IMAGE TO READABLE URL
             const reader = new FileReader();
             reader.readAsDataURL(image_file)
             console.log(reader)
             reader.onloadend = () => {
              const newImg = reader.result
              //SETTING STATE OF UPLOADED IMAGE
             this.setState({imageUrl: newImg})
           }
        }

      handleSubmit(e) {
         //SUBMITHANDLER WHICH CALLS UPDATE INGREDIENT FUNCTION FROM ACTION FOLDER
        const collectIngredient = []
        const ingredientProps =  [this.props]
        const collectId = []
        //INGREDIENT ID CAPTURED AND PASSED TO FUNCTION TO RETRIEVE PARTICULAR OBJECT FROM API
        ingredientProps.map(i => collectIngredient.push(i.ingredient[0]))
         collectIngredient.map( i => collectId.push(i.id))
        // UPDATE INGREDIENT FUNCTION RECIEVES STATE VALUES TO MAKE UPDATES TO API
        UpdateIngredient(this.state,collectId)
        }


//RENDER

    render() {
   //PERSISTING PROP VALUES WITHIN ARRAYS FOR EASIER ITERATION
    const ingredientProps =  [this.props]
    const collectIngredient = []
    const collectCategories = []
    const Categories = []
    const  ingredientCategories = []
    ingredientProps.map(i => collectIngredient.push(i.ingredient[0]))
     ingredientProps.map(i => i ? collectCategories.push(...i.categories): null)
    ingredientProps.map(i => i ? Categories.push(...i.categories) : null)
     collectIngredient.map(i => i ? ingredientCategories.push(...i.categories) : null)

  return (
      <div className="editIngredient">  
      <h1 className="EditIngredientHeader">Edit Ingredient</h1>

        <form onSubmit={(e) => this.handleSubmit(e)}  
 //BEGINNING OF FORM WHICH CONTAINS ONSUBMIT HANDLER
        className="editIngredientForm">

        <h3> Ingredient Name: </h3>
        {collectIngredient.map(i => i ?<div   id={i.io}><h2>{i.name} </h2><h4>new name:</h4>
        <input type="text" 
       //INPUT FIELD FOR ACCEPTING NEW NAME ATTRIBUTE
        id= "edit-Ing-edit--name" 
        value={this.value}
         //HANDLER FOR PERSISTING NEW NAME TO STATE
        onChange={this.handleName}
        placeholder={i.name}/> </div> : null)}


      <h2> Categories: </h2>
      <h3> Ingredient Categories: </h3>
      <h4> Check To Remove </h4>
      <ul //MAPPING THROUGH SELECTED INGREDIENT CATEGORIES
      className="listYourCatEdit">{ingredientCategories.map( c => <label>
      <h4 className="IngCatEditName">{c.name} </h4>
        <input
        //CHECKBOX FEILD FOR REMOVING SELECTED CATEGORIES
        type="checkbox"
          className="EditYourCatCheck"
          checked={this.catIsRemoved} 
          name={c.name}
          value={c.name}
          id={c.id}
          //HANDLER FOR ACCEPTING CHECKED VALUES
          onChange={(e) => this.handleCatremove(e)}/>
        </label> )}</ul><br></br>


      <h3> All Categories: </h3>
      <h4> Check To Add More </h4>
        <ul  //MAPPING THROUGH ALL CATEGORIES 
         className="listIngCatEdit">{Categories.map( c => <label>
        <h4 className="addCatEditName">{c.name} </h4>
        <input
         //CHECKBOX FEILD FOR ADDING SELECTED INGREDIENTS
        type="checkbox"
        className="EditIngCatCheck"
        checked={this.catIsSelected} 
        name={c.name}
        value={c.name}
        id={c.id}
        //HANDLER FOR ACCEPTING CHECKED VALUES 
        onChange={(e) => this.handleCatChange(e)}/>
        </label> )}</ul><br></br>



          {collectIngredient.map(i => i ? <img 
          //MAPPING THROUGH SELECTED IMAGE PROPS AND DISPLAYING IMAGE_URL
         // CONDITIONAL RENDERING TO PREVENT UNDEFINED OR TYPEERROR ATTRIBUTE UPON MOUNTING
          alt="ipvw" 
          className="imagePreview" 
          src={i.image_url}/> : null)}

          <h3> Edit Below </h3>      
          <img 
          //IMAGE UPLOAD PREVIEW 
          className="uploadPreview"
           src={this.state.imageUrl} 
           alt="imgUrl" />

            <input 
            //INPUT FOR SELECTING NEW IMAGE
            type="file" 
            name="image_file" 
            id="imageInput" 
            accept="image/*" 
            //HANDLER FOR SELECTING NEW IMAGE AND SETTING TO STATE
            onChange={(e) => this.handleImage(e)}/>


        <h3> Ingredient Description: </h3>
        {collectIngredient.map(i => i ? <textarea 
        //DISPLAYS CURRENT DESCRIPTION ATTRIBUTES
        id= "place-holder-description" 
        defaultValue={i.description}
         placeholder={i.description}/> : null)}

        <h3> Edit Below </h3>
        {collectIngredient.map(i => i ? <textarea 
        id= "Ing-edit--description" 
        value={this.state.description} 
         //HANDLER FOR ACCEPTING NEW DESCRIPTION ATTRIBUTES
        onChange={this.handleDescription}
        placeholder={i.description}/> : null)}


          <h3> Price </h3>
          {collectIngredient.map(i => i ? <input 
           //DISPLAYS CURRENT TOTAL_PRICE ATTRIBUTES
          type="number" step="any" 
          id= "price" 
          defaultValue={i.price}  
          placeholder={i.price}/> : null)}<br></br><br></br>

          <h3> Edit Below </h3>
          {collectIngredient.map(i => i ? 
          <input
           //HANDLER FOR ACCEPTING NEW TOTAL_PRICE ATTRIBUTES
           type="number" 
          step="any" 
          id= "price" 
          value={this.state.price} 
          onChange={this.handlePrice} 
          placeholder={i.price}/> : null)}<br></br><br></br>


          <input type="submit"  
     //END OF FORM
          value="Update Ingredient"/>
      </form>

        </div>
      );
    }




  }
  




  export default EditIngredient;