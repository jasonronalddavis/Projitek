





export const deleteObject = (elementId,elementUrl) => {
     //COLLECTS ID OF ELEMENT WHICH CORRESPONDS TO A PARTICULAR PROJECT OR INGREDIENT
    const element = {
        id: [...elementId]
            }
            const collectUrl = []
          elementUrl.map( e => collectUrl.push(e))

            const configObj = {
              mode: 'cors',
            credentials: "include",
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(element)
              }
               //INTERPOLATES THE collectUrl variable WHICH IS "INGREDIENT" OR "PROJECT" STRING INTO DELETE URL 
        fetch(`http://localhost:3000/api/v1/${collectUrl}/destroy`, configObj )
              .then(r => r.json())
              .then(element => {  
             //IF SUCCESSFUL, CONSOLE.LOG MESSAGE 
            console.log(element)
                })
        
          }
      