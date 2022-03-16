import React, { Component } from 'react';



//MOUNTED ON ProjectsContainer
//STATELESS COMPONENT


class ViewProject extends Component {

           

    render() {
     //PERSISTING PROP VALUES WITHIN ARRAYS FOR EASIER ITERATION
    const projectProps =  [this.props]
    const collectProject = []
    const collectIngredients = []
    const projectIngredients = []
    const projectCategories = []
    projectProps.map(p => collectProject.push(p.project[0]))
    projectProps.map(p => p ? collectIngredients.push(p.ingredients): null)
    collectProject.map(p => p ? projectIngredients.push(...p.ingredients) : null)
    collectProject.map(p => p ? projectCategories.push(...p.categories) : null)

    return (

      <div >
      <h1 className="ViewProjectHeader">View Project</h1>
      <div className="viewProject">  


      <h3> ProjectName: </h3>
      {collectProject.map(p => p ?
      //DISPLAYS SELECTED PROJECT'S NAME
      <h2 key={p.id}>{p.name}</h2> : null)}

      <h3> Categories: </h3>
      <ul //DISPLAYS SELECTED PROJECT'S CATEGORIES  
      >{projectCategories.map( (c) => 
      <li key={c.id}>
      {c.name}
      </li>
      )}</ul>


    <h3> Your ingredients</h3>
      <ul className="ViewProjIngList" > {projectIngredients.map( i => 
      //MAPPING THROUGH SELECTED PROJECT'S INGREDIENTS IN UL LIST
      <li key={i.id} className="ViewProjIng">
      <h4 className="ViewProjIngName">{i.name}</h4>
      <img className="ViewProgIngImg" 
      //DISPLAYING INGREDIENT IMAGE
      src={i.image_url} />
    </li>)} 
    </ul><br></br>

      <h3 className="ViewProjDesHeader"> Project Description: </h3>
      {collectProject.map(p => p ? <p 
      //DISPLAYING PROJECT'S DESCRIPTION
      key={p.id}
      className="ViewProjDes"> 
      {p.description}</p> : null)}

      <h3> Tolal Estimated Cost: </h3>
      {collectProject.map(p => p ? <input
       //DISPLAYING PROJECT'S TOTAL_PRICE 
       key={p.id}
      type="number" 
      step="any" 
      id= "total_price" 
      defaultValue={p.total_price}/> : null)}<br></br><br></br>
        </div>
        </div>
      );
    }





  }
  




  export default ViewProject;