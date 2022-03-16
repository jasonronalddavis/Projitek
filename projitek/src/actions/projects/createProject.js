
















        export const createProject = (projectState) =>  {
     // SETTING SUBMITTED FORM STATE WITHIN OBJECT KEYS FOR API PARAMS
          const project = {
          addCat: projectState.catIsSelected,
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
    fetch("http://localhost:3000/api/v1/projects/create", configObj )
      .then(r => r.json())
      .then(project => {   
        console.log(project)
        })
        .catch(console.log())
        //CATCH ERRORS TO AVOID CODE BREAKING 
  }
