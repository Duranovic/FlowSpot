/* 
 Sometimes we get error response from the server where a message is nested within 4-5 levels
 e.g. error -> auth_token, error => error => error => error (actual message)
 So, instead of reaching the message this way: error.error.error.error, we hould use this method 
 which will recursivly get through the object and get the message for us
*/
 export const extractErrorMessage = (error: any):any => {
  if(!error.error){
    return error;
  }
  return extractErrorMessage(error.error);
}