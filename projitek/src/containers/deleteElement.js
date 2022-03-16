import React, { Component } from 'react';
import {deleteObject} from "../actions/deleteObject"
//FETCHED DELETEOBJECT FUNCTION FROM ACTIONS FOLDER

//MOUNTED ON PROJECTS AND INGREDIENT CONTAINER

class DeleteElement extends Component {

     
    handleDelete = (e) => {
      //HANDLER CAPTURES PROJECT/INGREDIENT PROPS AND PASSES IT TO DELETE OBJECT FUNTION WITHIN ACTIONS FOLDER
         const elementProps = [this.props]
         const collectElement = []
          elementProps.map(p =>  collectElement.push(p.ingredient || p.project) )
          collectElement.map( eL => console.log([...eL.map(e => e)]))
          const elementId = collectElement.map( eL => [...eL.map(e => e.id)])
          const elementUrl = elementProps.map( e => e.grabUrl)
          //grabUrl IS A STATE WITHIN BOTH I AND P CONTAINERS CONTAINING A STRING TO INDICATE OBJECT TYPE "INGREDIENT/PROJECT"
          //DELETE OBJECT FUNCTION RECIEVES NAME OF grabUrl TYPE(PROJECT/INGREDIENT) TO BE INTERPOLATED BY API URL
          deleteObject(elementId,elementUrl)
          window.location.reload()
        }

      takeMeBack = (e) => {
        //RELOADS THE SCREEN UPON "TAKE ME BACK PROMPT"
         window.location.reload()
        }

    render() {
       
      return (
        <div //UPON MOUNTING, USER IS VISITED BY 3 POMPTS TO DECIDE WETHER TO DELETE OBJECT OR RETURN TO PREVIOUS SCREEN
        className="DeleteContainer">
        <img //DISPLAY MESSAGE "ARE YOU SURE?"
        className="AreYouSure" alt="i-image" src={require('../assets/images/AreYouSurePrompt.png')} />
        <img //RELOADS THE SCREEN UPON "TAKE ME BACK PROMPT"
        className="TakeMeBack" onClick={this.takeMeBack} alt="i-image" src={require('../assets/images/TakeMeBackPrompt.png')} />
        <img //OPT TO DELETE OBJECT PROMPT"
        className="deletePrompt" onClick={this.handleDelete} alt="i-image" src={require('../assets/images/deletePrompt.png')} />
        </div>
      )}

  }
  




  export default DeleteElement;