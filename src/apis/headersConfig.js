
export  const headerConfigApplication = {
    headers: {
        "Content-type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }; 
  
  
  export  const headerConfigForm = {
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }; 
  
  export  const headerConfigFormData = {
    headers: {
        "Content-Type": 'multipart/form-data',
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  }; 