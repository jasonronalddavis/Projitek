import React, { Component } from 'react';
import {UpdateProject} from "../../actions/projects/updateProject"
//IMPORTING API CALL FUNCTION TO UPDATE PROJECT
//MOUNTED ON ProjectsContainer


class EditProject extends Component {

    constructor(props){
        super(props);
        // SETTING STATE OF FETCHED DATA
        this.state = {
          categories: [],
          ingredients: [],
          catIsSelected: "",
          catIsRemoved: "",
          iIsSelected: "",
          iIsRemoved: "",
          projects: [],
          ingIsSelected: "",
          description: "",
          total_price: "",
          name: "",
          Id: "",
        }
        //BINDING HANDLESUBMIT  FOR PRACTICE WITH FUNCTION
        this.handleSubmit = this.handleSubmit.bind(this)
          }
        

//HANDLERS



        handleCatChange = (e) => {
      //HANDLER FOR SELECTING CATEGORIES AND SETTING STATE FOR ADDING NEW CATEGORIES TO COLLECTION 
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


        handleIchange = (e) => {
       //HANDLER FOR SELECTING INGREDIENTS AND SETTING STATE FOR ADDING CURRENT INGREDIENTS TO COLLECTION 
        if(e.target.checked === true) {
            this.setState({iIsSelected: [...this.state.iIsSelected, e.target.name]})
        }else if (e.target.checked === false){
            this.setState({iIsSelected: this.state.iIsSelected.filter( i => i !== e.target.name)})
            }
            }


      handleIremove = (e) => {
         //HANDLER FOR SELECTING INGREDIENTS AND SETTING STATE FOR REMOVING CURRENT INGREDIENTS FROM COLLECTION 
        if(e.target.checked === true) {
            this.setState({iIsRemoved: [...this.state.iIsRemoved, e.target.name]})
          }else if (e.target.checked === false){
           this.setState({iIsRemoved: this.state.iIsRemoved.filter( i => i !== e.target.name)})
             }
          }


      handleDescription = (e) =>{
     //HANDLER TO HANDLE CREATE DESCRIPTION INPUT
      this.setState({description: e.target.value})
        }

      handleTotalPrice = (e) => {
       //HANDLER TO HANDLE CREATE TOTAL PRICE INPUT
      this.setState({total_price: e.target.value})
        }

        handleName = (e) => {
        //HANDLER TO HANDLE CREATE NAME INPUT
          this.setState({name: e.target.value})
          }

        handleSubmit(e) {
         //SUBMITHANDLER WHICH CALLS UPDATE PROJECT FUNCTION FROM ACTION FOLDER
          const collectProject = []
          const projectProps =  [this.props]
          const collectId = []
        //PROJECT ID CAPTURED AND PASSED TO FUNCTION TO RETRIEVE PARTICULAR OBJECT FROM API
          projectProps.map(p => collectProject.push(p.project[0]))
          collectProject.map( p => collectId.push(p.id))
          UpdateProject(this.state,collectId)
        }


//RENDER

    render() {
      //PERSISTING PROP VALUES WITHIN ARRAYS FOR EASIER ITERATION
      const iIsSelected = this.state.iIsSelected
      const iIsRemoved = this.state.iIsRemoved
      const catIsSelected = this.state.catIsSelected
      const catIsRemoved = this.state.catIsRemoved
      const projectProps =  [this.props]
      const collectProject = []
      const collectIngredients = []
      const collectCategories = []
      const projectIngredients = []
      const projectCategories = []
      projectProps.map(p => collectProject.push(p.project[0]))
      projectProps.map(p => p ? collectIngredients.push(p.ingredients): null)
      projectProps.map(p => p ? collectCategories.push(...p.categories): null)
      collectProject.map(p => p ? projectIngredients.push(...p.ingredients) : null)
       collectProject.map(p => p ? projectCategories.push(...p.categories) : null)
      

    return (
        <div className="editProject">  

        <h1 className="EditProjectHeader">Edit Project</h1>

      <form onSubmit={(e) => this.handleSubmit(e)}  
      //BEGINNING OF FORM WHICH CONTAINS ONSUBMIT HANDLER
      className="editProjectForm">

        <h3> Project Name: </h3>
        {collectProject.map(p => p ?<div key={p.id}><h2>{p.name} </h2><h4>new name:</h4>
        <input 
        //INPUT FIELD FOR ACCEPTING NEW NAME ATTRIBUTE
        type="text"  
        id= "edit-project-name" 
        value={this.value} 
        //HANDLER FOR PERSISTING NEW NAME TO STATE
        onChange={this.handleName} 
        placeholder={p.name}/> </div> : null)}


        <h2> Categories: </h2>
      
        <h3> Project Categories: </h3>
        <h4> Check To Remove </h4>
        <ul //MAPPING THROUGH SELECTED PROJECT CATEGORIES
        className="listYourCatEdit">{projectCategories.map( c => <li key={c.id}>
        <h4 className="yourCatEditName">{c.name} </h4>
        <input
        //CHECKBOX FEILD FOR REMOVING SELECTED CATEGORIES
        type="checkbox"
        className="EditYourCatCheck"
        checked={this.catIsRemoved} 
        name={c.name}
        value={c.name}
        id={c.id}
        //HANDLER FOR ACCEPTING CHECKED VALUES 
        onChange={(e) => this.handleCatremove(e)}
        />
        </li> )}</ul><br></br>


      <h3> All Categories: </h3>
      <h4> Check To Add More </h4>
        <ul //MAPPING THROUGH ALL CATEGORIES 
        className="listYourCatEdit">{collectCategories.map( c => <label key={c.id}>
        <h4 className="yourCatEditName">{c.name} </h4>
        <input
         //CHECKBOX FEILD FOR ADDING SELECTED CATEGORIES
        type="checkbox"
        className="EditYourCatCheck"
        checked={this.catIsSelected} 
        name={c.name}
        value={c.name}
        id={c.id}
         //HANDLER FOR ACCEPTING CHECKED VALUES 
        onChange={(e) => this.handleCatChange(e)}/>
        </label> )}</ul><br></br>



      <h2> Ingredients: </h2>
      <div className="editIngList">
      <h3> Project ingredients</h3>
      <h4> check to remove </h4><br></br>
      <ul 
      //MAPPING THROUGH SELECTED PROJECT INGREDIENTS
      className="listYourIngEdit"> {projectIngredients.map( i => 
     <div className="editYourIng" key={i.id}>
      <h4 className= "editYourIngName"> {i.name} </h4>
     <input
      //CHECKBOX FEILD FOR REMOVING SELECTED CATEGORIES
     className="checkYourIng"
     type="checkbox"
       checked={this.iIsRemoved} 
       name={i.name}
      value={i.name}
      id={i.id}
       //HANDLER FOR ACCEPTING CHECKED VALUES 
      onChange={(e) => this.handleIremove(e)}/>
    </div>)}</ul>


        <h2>Check To Add More </h2>
        <ul //MAPPING THROUGH ALL INGREDIENTS 
        className="EditCIlist" >{ collectIngredients[0].map( i => 
        <div key={i.id}>
        <h3>{i.name}</h3>
        <input 
         //CHECKBOX FEILD FOR ADDING SELECTED CATEGORIES
        type="checkbox" 
        checked={this.iIsSelected} 
        className="EditCheckBoxIng" 
          name={i.name}
          value={i.name}
          id={i.id}
         //HANDLER FOR ACCEPTING CHECKED VALUES 
          onChange={(e) => this.handleIchange(e)}/>
          </div>)}
        </ul>
      </div>


        <h3> Project Description: </h3>
        {collectProject.map(p => p ? <textarea 
        //DISPLAYS CURRENT DESCRIPTION ATTRIBUTES
        id= "place-holder-description" 
        defaultValue={p.description} 
        placeholder={p.description}/> : null)}

        <h3> Edit Below </h3>
        {collectProject.map(p => p ? <textarea 
        id= "project-description" 
        value={this.state.description} 
        //HANDLER FOR ACCEPTING NEW DESCRIPTION ATTRIBUTES
        onChange={this.handleDescription}placeholder={p.description}/> : null)}


          <h3> Tolal Estimated Cost: </h3>
          {collectProject.map(p => p ? <input 
          //DISPLAYS CURRENT TOTAL_PRICE ATTRIBUTES
          type="number"
           step="any" 
           id= "total_price" 
           defaultValue={p.total_price} 
            placeholder={p.total_price}/> : null)}<br></br><br></br>

            <h3> Edit Below </h3>
            {collectProject.map(p => p ? <input 
            type="number" 
            step="any" id= 
            "total_price"
             value={this.state.total_price}
             //HANDLER FOR ACCEPTING NEW TOTAL_PRICE ATTRIBUTES
              onChange={this.handleTotalPrice} 
              placeholder={p.total_price}/> : null)}<br></br><br></br>

            <input type="submit"  
            //END OF FORM
            value="Update Project"/>
  </form>
        </div>
      );
    }


  }
  


  export default EditProject;