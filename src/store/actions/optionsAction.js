import * as actions from "./actionTypes";
import firebase from "../../firestore";
export const addOption=()=>{
    return { type:actions.ADD_OPTION};
}

export const deleteOption=(id)=>{
    return { type:actions.DELETE_OPTION, id};
}
export const formDataChanged=(event,opId,inputEl)=>{
    return { type:actions.FORM_DATA_CHANGED, event:event,optionId:opId,inputElement:inputEl}
}

export const formDataSubmitStart=()=>{
    return { type:actions.SUBMIT_FORM_START};
}

export const formDataSubmitEnd=()=>{
    return { type:actions.SUBMIT_FORM_END};
}
export const formDataSubmitSuccess=(res)=>{
    return { type:actions.SUBMIT_FORM_SUCCESS ,newSurveyPath:res};
}
 export const formSubmit=(ques,options)=>{
     return (dispatch)=>{
         dispatch(formDataSubmitStart);
           const db = firebase.firestore();
           db.collection("Survey")
             .add({
               question:ques,
               options: options
             })
             .then(res => {
               console.log(res.path);
               dispatch(formDataSubmitSuccess(res.path));
             })
             .catch(e => {
               console.log(e);
               dispatch(formDataSubmitEnd());
             });

     }
    
 }
