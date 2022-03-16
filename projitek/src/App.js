import './App.css';
//MOUNTING APP STYLE 
import React, { Component } from 'react';
//MOUNTNG  PROJECT STYLE  
import './projectStyle.css';
//MOUNTING INGREDIENT STYLE
import './ingredientStyle.css';
import ProjectsContainer from "./containers/projectsContainer"
import IngredientsContainer from "./containers/ingredientContainer"

//MOUNTNG  PROJECTS AND INGREDIENTS CONTAINER

    class  App extends Component  {

      constructor(props){
      super(props);
      this.state = {
      backgrndUrl: require('./assets/images/background1.png'),
      //BOOLEAN ATTRIBUTES RESPONSIBLE FOR TOGGLING DELETE, 
      //SHOW PROJECT AND SHOWN INGREDIENT FUNTIONALITY
      // BOOLEANS ARE UTILIZED BY CHILD AND GRANDCHILD COMPONENTS
      toggleIng: false,
      toggleProj: true,
      toggleProjDel: false,
      toggleIngDel: false
      }
    }

    componentDidMount(){
        window.addEventListener('scroll', () => this.handleScroll());
      //APPLYING HANDLER TO BACKGROUND IMAGE SCROLL ZOOM EEFECT USING ANIMATED IMAGERY
      }



  handleScroll = (e) => {
      let that = this;
      function myScript(){
      //var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      //scrollY REPRESENTS WINDOW SCROLL VALUES  
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      //CONDITIONAL RENDERING TO SIFT THROUGH IMAGES BASED ON SCROLL VALUE 
    if(scrollY > 100) {
      that.setState({ backgrndUrl: require('./assets/images/background1.png')});     
      } else if (scrollY > 50) {
        that.setState({ backgrndUrl: require('./assets/images/background2.png')});
      } else if (scrollY > 20) {
         that.setState({ backgrndUrl: require('./assets/images/background3.png')});
        }
          }
          window.addEventListener("scroll", myScript);
        }

      //HANDLER FOR TOGGLING SHOW INGREDIENT OR PROJECT BASED ON ELEMENT CLICK
      //SETS BOTH BOOLEAN STATES TO FALSE BEFORE SETTING ACQUIRED NAME VALUE TO TRUE
      setValue = (e) => {
      const eVal = e.target
      const name = eVal.getAttribute("name")
      this.setState({toggleIng: false})
      this.setState({toggleProj: false})
      this.setState({[name]: true})
      } 

      //SETS toggleIngDel OR toggleProjDel  STATE TO TRUE DEPENDING ON BOTH VIEW ATTRIBUTES RETURNING TRUE
      //IN OTHER WORDS, IF AN ELEMENT WITHIN THE STORY OR INGREDIENT LIST IS CLICKED, RENDER DELETE COMPONENT
      //CLICKABLE ELEMENTS ARE LOCATED WITHIN INGREDIENTS AND PROJECTS CONTAINER. THEY UTILIZE PASSED DOWN BOOLEAN PROPS. 
      setDelete = (e) => {
      this.state.toggleIng === true ? this.setState({toggleIngDel: true}) : this.setState({toggleProjDel: true})
      }



    render() {
      //CONTAINS  <IngredientsCountainer/> AND <ProjectsContainer/>  COMPONENTS 
      //CONATINS IMAGE BACKGROUND ELEMENT
      //CONTAINS BUTTONS FOR SHOWING AND DELETING PROJECTS OR INGREDIENTS. 
  return (
    <div  className="App">
      <img className="Bckgrnd" id="bckgrnd"   src={this.state.backgrndUrl} alt='bg' />
      <ProjectsContainer props={this.state}/>
      <IngredientsContainer props={this.state}/>
      <img className="ProjectButton" name="toggleProj" onClick={(e) => this.setValue(e)} src={require('./assets/images/ProjectButton.png')} alt="projectbutton"/>
      <img className="IngredientButton" name="toggleIng" onClick={(e) => this.setValue(e)} src={require('./assets/images/IngredientButton.png')} alt="ingredientbutton"/>
      <img className="DeleteButton" name="toggleDel" onClick={(e) => this.setDelete(e)} src={require('./assets/images/DeleteBttn.png')} alt="deletebutton"/>
      <img className="Logo" id="bckgrnd"  src={require('./assets/images/projitek logo.png')} alt='bg' />

    </div>
       );

    }

}

export default App;
