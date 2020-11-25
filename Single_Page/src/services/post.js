import { stringify } from 'qs';




var url = 'https://us-central1-react-interview-b6875.cloudfunctions.net/post';




export async function edit(params) {
  // console.log("service.js")
  var data = params;
  let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
       "Content-Type": "application/json; encoding=utf-8",
       "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  }
  


  var target = url+'/edit';

  // console.log(loginUrl)
  return fetch(target, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error
    })
  
}


export async function deletePost(params) {
  console.log("service.js")
  var data = params;
  let options = {
    method: 'PUT',
    mode: 'cors',
    headers: {
       
       "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":  "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Method":  "PUT",
     
       
    },
    body: {}
  }
  // console.log(data)


  var target = url+'/'+data['id'];

  // console.log(loginUrl)
  return fetch(target, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error
    })
  
}


export async function search(params) {
  // console.log("service.js")
  var data = params;
  let options = {
    method: 'POST',
    mode: 'cors',
    headers: {
       "Content-Type": "application/json; encoding=utf-8"
    },
    body: JSON.stringify(data)
  }
  // console.log(data)


  var target = url+'/search';

  // console.log(loginUrl)
  return fetch(target, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error
    })
  
}

