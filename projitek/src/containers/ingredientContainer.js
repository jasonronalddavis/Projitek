import React, { Component } from 'react';
import {fetchIngredients} from "../actions/ingredients/fetchIngredients"
//IMPORTING API CALL FUNCTION TO FETCH ALL INGREDIENTS
import {fetchCategories} from "../actions/categories/fetchCategories"
//IMPORTING API CALL FUNCTION TO FETCH ALL CATEGORIES
import{createIngredient} from "../actions/ingredients/createIngredient"
//IMPORTING CREATE INGREDIENT FROM API
import EditIngredient from "../components/ingredients/editIngredient"
//IMPORTING EDIT FUNCTIONALITY FROM COMPONENTS FOLDER
import ViewIngredient from "../components/ingredients/viewIngredient"
//IMPORTING VIEW FUNCTIONALITY FROM COMPONENTS FOLDER
import DeleteElement from "./deleteElement"
//IMPORTING DELETE FUNCTIONALITY FROM CONTAINERS FOLDER





class IngredientsContainer extends Component {



//STATE  
    constructor(props){
        super(props);
       // SETTING STATE OF FETCHED DATA
        this.state = {
         //DISPLAY BOX IMAGE URL FOR 'ALL PROJECTS' 
          iBoxUrl: require('../assets/images/ingredientBox1.png'),
          categories: [],
          catIsSelected: "",
         ingredient: "",
         ingredients: [],
         //WITH EXTENDED FUNCTIONALITY I MAY STORE IMAGES ON GOOGLE API PLATFORM
         imageUrl: "",
         setIng: false,
         name: "",
         description: "",
         price: "",
         grabUrl: "ingredients",
         toggleDel: false,
         IngUrl: true 
        }
          }
        
          componentDidMount(){
          //ANIMATED EFFECT FOR 'ALL INGREDIENT BOX' CONTAINER
            window.addEventListener('scroll', () => this.handleScroll());
           //CONFIGURING PROMISE FROM FETCHED API TO RESOLVE DATA ACCESS ISSUES
            Promise.resolve(fetchCategories()).then(value =>    
              value.map( v => this.setState(prevState => ({categories: [...prevState.categories, v.attributes]}))
              ))
              Promise.resolve(fetchIngredients()).then(value =>  
                value.map( v => this.setState(prevState => ({ingredients: [...prevState.ingredients, v.attributes]}))    
                    ))
             //MAY NOT BE NECESSARY POSSIBLY REMOVING
          // const booleanProps = [this.props]
          // booleanProps.map(p => this.setState({setIng: p.props.toggleIng}))  

          }
        

 //HANDLERS 

        handleScroll = (e) => {
          let that = this;
          function myScript(){
            // var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
           //    var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            //SETTING scrollY EQUAL TO WINDOW SCROLL VALUE
        if(scrollY > 100) {
          that.setState({ iBoxUrl: require('../assets/images/ingredientBox1.png')});     
        } else if (scrollY > 50) {
          that.setState({ iBoxUrl: require('../assets/images/ingredientBox2.png')});
        } else if (scrollY > 20) {
            that.setState({ iBoxUrl: require('../assets/images/ingredientBox3.png')});
        }
        }
        window.addEventListener("scroll", myScript);
        }


      //HANDLER FOR HANDLING CATEGORY CHECKBOX CHECKED VALUES
        handleCatChange = (e) => {
          console.log(e.target.checked)
        if(e.target.checked === true) {
          this.setState({catIsSelected: [...this.state.catIsSelected, e.target.name]})
          }else if (e.target.checked === false){
          this.setState({catIsSelected: this.state.catIsSelected.filter( i => i !== e.target.name)})
            }
         }

            //HANDLER FOR SELECTING A PARTICULAR INGREDIENT BY ID VALUE 
            //AND APPLYING A FITER FUNCTION TO RETURN MATCHING INGREDIENT
         handleIngredient = (e) => {
          const filterIngredient = e.target
          const ingredientId =  filterIngredient.getAttribute("id")
           const parseVal = parseInt(ingredientId)
          const ingredient = this.state.ingredients.filter( i => i.id === parseVal)
          const collectIngredient = []
          ingredient.map( i => collectIngredient.push(i))
          this.setState({ingredient: [...collectIngredient]}) 
          this.setState({toggleDel: true})      
          }


      //HANDLER FOR CAPTURING DOM IMAGE URL VALUE
        handleImage = (e) => {
         const  image_file = e.target.files[0];
         const reader = new FileReader();
         //UTILIZING REACT FILEREADER TO CONVERT LOCAL IMAGE TO READABLE URL
         reader.readAsDataURL(image_file)
         reader.onloadend = () => {
          const newImg = reader.result
          //SETTING STATE OF UPLOADED IMAGE
        this.setState({imageUrl: newImg})
        //debugger;
      }
        }

      handleName = (e) => {
        //HANDLER FOR SETTING STATE OF NAME ATTRIBUTE
        this.setState({name: e.target.value})
          }

       //HANDLER TO HANDLE CREATE PRICE INPUT
        handlePrice = (e) => {
        this.setState({price: e.target.value})
            }

         //HANDLER TO HANDLE CREATE DESCRIPTION INPUT
        handleDescription = (e) =>{
        this.setState({description: e.target.value})
            }

       //SUBMITHANDLER WHICH CALLS CREATE INGREDIENT FUNCTION FROM ACTION FOLDER
        handleSubmit(e) {
         createIngredient(this.state)
         window.location.reload();
            }
  


//RENDER

    render() {
     //CONTAINS CREATE FORM AND MOUNTED VIEW/EDIT COMPONENTS BASED ON CONDITION OF SYATE BOOLEANS
    const booleanProps = [this.props]
      const ingBoolean = []
      const delBoolean = []
      booleanProps.map(p =>  ingBoolean.push(p.props.toggleIng)) 
      booleanProps.map(p =>  delBoolean.push(p.props.toggleDel)) 
      //PERSISTING PROP VALUES WITHIN AN ARRAY FOR EASIER ITERATION

      return (
        <div className="ingredientsContainer">

        <ul className="listIngredients"> {this.state.ingredients.map( i =>  
         //LISTS ALL INGREDIENTS WITHIN A UL. ONCLICK HANDLER ENABLES VIEW AND EDIT COMPONENT FOR SELECTED PROJECT
        <div key={i.id}> <h3 id={i.id} className="selectIngredient" 
        onClick={(e)=> this.handleIngredient(e)} >{i.name} </h3> </div>)}</ul>

        <form //BEGINNING OF FORM WHICH CONTAINS ONSUBMIT HANDLER
        className="ingredientForm"
        onSubmit={(e) => this.handleSubmit(e)}>
        

          <h1>Create Ingredient</h1>

          <h3> Ingredient Name: </h3>
          <input    //INPUT FIELD FOR NAME ATTRIBUTE
          type="text" 
          id="ingredientt-name" 
          value={this.value} 
          onChange={this.handleName}/><br></br>

          <h3> Categories: </h3>
          <ul className="IngListCat">
          {this.state.categories.map( (c,index) => <label key={index}>
          <h4 className="IngCheckName" > {c.name} </h4>
            <input //MAPPING THROUGH CATEGORY INSTANCES AND RETURNING NAME VALUES FOR CHECKBOX
            type="checkbox"
           className="IngCheckBoxCat"
            checked={this.catIsSelected} 
            name={c.name}
            value={c.name}
            id={index}
            //CATEGORY HANDLER
            onChange={(e) => this.handleCatChange(e)}/>       
          </label> )}
            </ul>

      <h2>Upload Image:</h2>
          <img className="imagePreview" 
          alt={""}
          src={this.state.imageUrl}></img><br></br><br></br>
          <input //IMAGE UPLOAD INPUT
             type="file" 
             name="image_file" 
             id="imageInput" 
             accept="image/*"
             //HANDLER FOR HANDLING IMAGE INPUT 
             onChange={(e) => this.handleImage(e)}/><br></br>


          <h3> Ingredient Description: </h3>
          <textarea id="ingredient-description" 
          //LESS DYNAMIC FORM INPUT AS DESCRIPTION IS A DIRECT ATTRIBUTE AND NOT A COMPLEX RELATIONSHIP OBJECT
             value={this.state.description} 
             //HANDLER FOR CAPTURING DESCRIPTION
             onChange={this.handleDescription}/>
            
            <h3> Price: </h3>
            <input 
            //LESS DYNAMIC FORM INPUT AS PRICE IS A DIRECT ATTRIBUTE AND NOT A COMPLEX RELATIONSHIP OBJECT
            type="number"
            step="any" id="price"
             value={this.state.price} 
             onChange={this.handlePrice}/><br></br>

          <br></br><input type="submit" 
          //END OF FORM
          value="Submit"/>
      </form>

          <img className="iBox" 
          //BACKGROUND IMAGE ENCAPSULATING ALL DISPLAYED INGRDIENT INSTATNCES 
          id="iBox" 
          src={this.state.iBoxUrl} alt='bg' />

          {booleanProps.map(p => 
          //CONDITIONAL RENDERING FOR PASSING STATE TO PROPS WITHIN DELETE COMPONENT, IF INGREDIENT IS SELECTED.
            this.state.toggleDel === true && p.props.toggleIngDel === true ? <DeleteElement {...this.state}/> : null )}

          {[...ingBoolean].map(i => i === true ? <ViewIngredient {...this.state}/> : null ) }
          
          <EditIngredient 
          //CONDITIONAL RENDERING FOR PASSING STATE TO PROPS WITHIN EDIT COMPONENT, IF INGREDIENT IS SELECTED.
           {...this.state}/>
        </div>
          );
        }
      }
  




  export default IngredientsContainer;