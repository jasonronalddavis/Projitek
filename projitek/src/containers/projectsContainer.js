import React, { Component } from 'react';
import {fetchProjects} from "../actions/projects/fetchProjects"
//IMPORTING API CALL FUNCTION TO FETCH ALL PROJECTS
import{createProject} from "../actions/projects/createProject"
//IMPORTING CREATE PROJECTS FROM API
import EditProject from "../components/projects/editProject"
//IMPORTING EDIT FUNCTIONALITY FROM COMPONENTS FOLDER
import {fetchIngredients} from "../actions/ingredients/fetchIngredients"
//IMPORTING API CALL FUNCTION TO FETCH ALL INGREDIENTS
import {fetchCategories} from "../actions/categories/fetchCategories"
//IMPORTING API CALL FUNCTION TO FETCH ALL CATEGORIES
import ViewProject from "../components/projects/viewProject"
//IMPORTING VIEW FUNCTIONALITY FROM COMPONENTS FOLDER
import DeleteElement from "./deleteElement"
//IMPORTING DELETE FUNCTIONALITY FROM CONTAINERS FOLDER


class ProjectsContainer extends Component {

 //STATE

    constructor(props){
        super(props);
        // SETTING STATE OF FETCHED DATA
        this.state = {
          //DISPLAY BOX IMAGE URL FOR 'ALL PROJECTS' 
          pBoxUrl: require('../assets/images/pbox1.png'),
          categories: "",
          ingredients: [],
          catIsSelected: "",
          iIsSelected: "",
          projects: [],
          project: "",
          setProj: true,
          description: "",
          grabUrl: "projects",
          name: "", 
          total_price: "",
          toggleDel: false
            }
          }
        
          componentDidMount(){
            //ANIMATED EFFECT FOR 'ALL PROJECTS' BOX CONTAINER
            window.addEventListener('scroll', () => this.handleScroll());
            //CONFIGURING PROMISE FROM FETCHED API TO RESOLVE DATA ACCESS ISSUES
            Promise.resolve(fetchProjects()).then(value => 
              value.map( v => this.setState(prevState => ({projects: [...prevState.projects, v.attributes]}))       
            ))
            Promise.resolve(fetchIngredients()).then(value =>  
             value.map( v => this.setState(prevState => ({ingredients: [...prevState.ingredients, v.attributes]}))    
              ))
            Promise.resolve(fetchCategories()).then(value =>    
               value.map( v => this.setState(prevState => ({categories: [...prevState.categories, v.attributes]}))
                ))
          //MAY NOT BE NECESSARY POSSIBLY REMOVING
          // const booleanProps = [this.props]
          // booleanProps.map(p => this.setState({setProj: p.props.toggleProj}))  
               }
        
  //HANDLERS 
       
        handleScroll = (e) => {
          let that = this;
          function myScript(){
            //var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            //SETTING scrollY EQUAL TO WINDOW SCROLL VALUE
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
          //CONDITONAL RENDERING TO SIFT THROUGH PHOTOS DEPENDING ON WINDOW SCROLL VALUE
          //TO CREATE A SLIGHT ANIMATED EFFECT WITH ALL PROJECTS BOX CONTAINER
        if(scrollY > 100) {
          that.setState({ pBoxUrl: require('../assets/images/pbox1.png')});     
        } else if (scrollY > 50) {
          that.setState({ pBoxUrl: require('../assets/images/pbox2.png')});
        } else if (scrollY > 20) {
            that.setState({ pBoxUrl: require('../assets/images/pbox3.png')});
        }
        }
        window.addEventListener("scroll", myScript);
        }



      //HANDLER FOR HANDLING CATEGORY CHECKBOX CHECKED VALUES
       handleCatChange = (e) => {
        if(e.target.checked === true) {
          this.setState({catIsSelected: [...this.state.catIsSelected, e.target.name]})
            }else if (e.target.checked === false){
              this.setState({catIsSelected: this.state.catIsSelected.filter( i => i !== e.target.name)})
                }
              }

      //HANDLER FOR HANDLING INGREDIENT CHECKBOX CHECKED VALUES
        handleIngChange = (e) => {
          if(e.target.checked === true) {
           this.setState({iIsSelected: [...this.state.iIsSelected, e.target.name]})
              }else if (e.target.checked === false){
                this.setState({iIsSelected: this.state.iIsSelected.filter( i => i !== e.target.name)})
                  }
                  }


            //HANDLER FOR SELECTING A PARTICULAR PROJECT BY ID VALUE 
            //AND APPLYING A FITER FUNCTION TO RETURN MATCHING PROJECT
        handleProject = (e) => {
         const filterProject = e.target
          const projectId =  filterProject.getAttribute("id")
             const parseVal = parseInt(projectId)
             const project = this.state.projects.filter( p => p.id === parseVal)
              const collectProject = []
              project.map( p => collectProject.push(p))
               this.setState({project: [...collectProject]})
                 this.setState({toggleDel: true})
                 }

                 //HANDLER TO HANDLE CREATE NAME INPUT
              handleName = (e) => {
                this.setState({name: e.target.value})
              }

                //HANDLER TO HANDLE CREATE TOTAL PRICE INPUT
              handleTotalPrice = (e) => {
                this.setState({total_price: e.target.value})
                }

               //HANDLER TO HANDLE CREATE DESCRIPTION INPUT
              handleDescription = (e) =>{
               this.setState({description: e.target.value})
               }

              handleSubmit(e) {
             //SUBMITHANDLER WHICH CALLS CREATE PROJECT FUNCTION FROM ACTION FOLDER
              createProject(this.state)
              window.location.reload();

              }

//RENDER

    render() {
      //CONTAINS CREATE FORM AND MOUNTED VIEW/EDIT COMPONENTS BASED ON CONDITION OF SYATE BOOLEANS
      const booleanProps = [this.props]
        const projBoolean = []
        booleanProps.map(p =>  projBoolean.push(p.props.toggleProj)) 
        //PERSISTING PROP VALUES WITHIN AN ARRAY FOR EASIER ITERATION
      return (

      <div className="projectsContainer"> 
  
       <div className="listProjects" > {this.state.projects.map( p =>  <ul key={p.id}><h3 id={p.id} 
          //LISTS ALL PROJECTS WITHIN A UL. ONCLICK HANDLER ENABLES VIEW AND EDIT COMPONENT FOR SELECTED PROJECT
          className="selectProject" onClick={(e)=> this.handleProject(e)} >{p.name} </h3> </ul>)}</div>

       <form //BEGINNING OF FORM WHICH CONTAINS ONSUBMIT HANDLER
            onSubmit={(e) => this.handleSubmit(e)} 
            className="projectForm">

         <h1>Create Project</h1>

         <h3> ProjectName: </h3>
        <input type="text" id="project-name"
           //NAMEHANDLER
          value={this.value} 
            onChange={this.handleName}/><br></br>

        <h3 className="createCatHeader"> Select Categories: </h3>
            <div className="listCreateCat">
              {[...this.state.categories].map( c => <ul key ={c.id}>
                <h4 className="CreateCatName">  {c.name}</h4>
              <input  
               //MAPPING THROUGH CATEGORY INSTANCES AND RETURNING NAME VALUES FOR CHECKBOX
                type="checkbox"
                className="CheckBoxCat"
                checked={this.catIsSelected} 
                name={c.name}
                value={c.name}
                id={c.id}
                //CATEGORY HANDLER
                onChange={(e) => this.handleCatChange(e)}/>           
                </ul> )}</div><br></br><br></br>

        <h2 className="createProjHeader"> Select Ingredients </h2>
            <div className="CheckBoxProj">
            {this.state.ingredients.map( (i,index) => <ul key={i.id}>
            <h4 className="listCreateProj">   {i.name}</h4>
            <input  
            //MAPPING THROUGH INGREDIENT INSTANCES AND RETURNING NAME VALUES FOR CHECKBOX
                type="checkbox"
                className="CheckBoxI"
                checked={this.catIsSelected} 
                name={i.name}
                 value={i.name}
                  id={index}
                 //INGREDIENT HANDLER
                 onChange={(e) => this.handleIngChange(e)}/>           
                 </ul> )}
                 </div>

          <h3> ProjectDescription: </h3>
              <textarea id="project-description" 
              //LESS DYNAMIC FORM INPUT AS DESCRIPTION IS A DIRECT ATTRIBUTE AND NOT A COMPLEX RELATIONSHIP OBJECT
              value={this.state.description} 
              onChange={this.handleDescription}/>

          <h3> Tolal Estimated Cost: </h3>
            <input 
            //LESS DYNAMIC FORM INPUT AS TOTAL COST IS A DIRECT ATTRIBUTE AND NOT A COMPLEX RELATIONSHIP OBJECT
            type="number" 
            step="any" id="total_price" 
            value={this.state.total_price}
            onChange={this.handleTotalPrice}/><br></br>
            <br></br>
            
            <input type="submit" 
             //END OF FORM
            value="Submit"/>
            </form>

            <img className="pBox" id="pBox"  
            //BACKGROUND IMAGE ENCAPSULATING ALL DISPLAYED PROJECT INSTATNCES 
            src={this.state.pBoxUrl} />

            {booleanProps.map(p => 
            //CONDITIONAL RENDERING FOR PASSING STATE TO PROPS WITHIN DELETE COMPONENT, IF A PROJECT IS SELECTED.
            this.state.toggleDel === true && p.props.toggleProjDel === true ? <DeleteElement {...this.state}/> : null )}

            {[...projBoolean].map(p =>  p === true ? <ViewProject key={p.id} {...this.state} /> : null ) //CONDITIONAL RENDERING FOR MOUNTING VIEW COMPONENT IF A PROJECT IS SELECTED.
             }
             
              <EditProject //CONDITIONAL RENDERING FOR PASSING STATE TO PROPS WITHIN EDIT COMPONENT, IF A PROJECT IS SELECTED.
              {...this.state}/>           
           </div>
        
           );
         }
      }
  




  export default ProjectsContainer;