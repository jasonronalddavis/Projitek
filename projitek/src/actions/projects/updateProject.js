

















    export const UpdateProject = (projectState,collectId) =>  {
     // SETTING SUBMITTED FORM STATE AND OBJECT ID WITHIN OBJECT KEYS FOR API PARAMS
      const project = {
        id: collectId,
        removeCat: projectState.catIsRemoved,
        addCat: projectState.catIsSelected,
        removeIng: projectState.iIsRemoved,
        addIng: projectState.iIsSelected, 
        name: projectState.name,
        total_price: projectState.total_price,
        description: projectState.description
      }
    
      const configObj = {
        mode: 'cors',
      credentials: "include",
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
              },
          body: JSON.stringify(project)
        }
      //POSTING JSON DATA TO API
  fetch("http://localhost:3000/api/v1/projects/update", configObj )
        .then(r => r.json())
        .then(project => {   
      console.log(project)
          })
  
    }
