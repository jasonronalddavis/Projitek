


    
    
           //ASYNCHRONOUS FETCH TO ALL PROJECT INSTANCES FROM API
      
      export const fetchProjects = () => {
    
          return fetch("http://localhost:3000/api/v1/projects", {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            'Accept': 'application/json'
            },    
          })
            .then(r => r.json())
            .then(response => {
              if (response.error){
                alert(response.error)
              } else {
                const projects = response.data
                return (projects)
              }
            })
            .catch(console.log())
        
      }
      
      
    