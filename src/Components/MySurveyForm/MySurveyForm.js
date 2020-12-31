import React ,{useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import firebase from "../../firestore";
import Graph from "../../UI/HorizontalGraph";
import { Card } from 'semantic-ui-react';
import Input from "../../UI/Input/Input";
import classes from "./MySurveyForm.module.css";
function usePersistenceState(key,defaultValue)
{
  const [message,setMessage]=useState(
    window.localStorage.getItem(key)||defaultValue
  );
  useEffect(()=>{
    window.localStorage.setItem(key,message);
  },[message]);
  return [message,setMessage];
}
function MySurveyForm(){
    const [survey,setSurvey]=useState([]);
    const [optionChosen,setOptionChosen]=useState("");
    const [message,setMessage]=usePersistenceState("Response",[]);
    const [found,setFound]=useState(false);
    const [foundOption,setFoundOption]=useState("");
    const { id } = useParams();
    useEffect(()=>{
        function callData(){
            const db = firebase.firestore();
            db.collection(`Survey`).doc(id)
            .get()
            .then(doc=>{
                let arr=doc.data();
                console.log(arr);
                setSurvey(arr);
            })
        }
        callData();
        
    },[message]);

    useEffect(()=>{
        console.log("2nd useEffect");
        let foundOrNot;
        if(message.length>0)
        {
          foundOrNot=JSON.parse(message).find(element => element.question == survey.question);
           console.log("is foundOrNot");
          console.log(foundOrNot)
          if(foundOrNot)
        {  
            setFound(true)
            setFoundOption(foundOrNot.optionChosen);
        } 
        } 
    });
     
    function copyToClipboard()
    {
        console.log(window.location.href);
        navigator.clipboard.writeText(window.location.href);
    }
     
    function checkedHandler(val){
       return val===optionChosen
    }
    let changeHandler=(val)=>{
         console.log("change handler for radio ")
         setOptionChosen(val);
    }
    let submitForm=()=>{
        const db = firebase.firestore();
       let result= db.collection("Survey").doc(id);
       result.get()
       .then(function(doc) {
        console.log("Cached document data:", doc.data());
        let ques=doc.data().question;
      let ops=doc.data().options.map(val=>
            { 
                if(val.name==optionChosen)
                {
                    val.count++;
                }
                return val;
            });
            console.log(ops);
         
            result.update({"options":ops})
          .then(function(res) {
              console.log(res);
              setSurvey({question:ques,options:ops})
              console.log(message);

              let msg;
              if(message.length>0)
              msg=JSON.parse(message).concat([{"question":ques,"optionChosen":optionChosen}]);
              else
              msg=message.concat([{"question":ques,"optionChosen":optionChosen}]);
              console.log(msg);
              setMessage(JSON.stringify(msg));
              console.log("parsed msg is ");
              console.log(message);
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    })
        console.log(result);
    }
    if(survey.options)
    {  
        return ( <div className={classes.mySurvey}>
                 <div><input readOnly type="text" value={window.location.href} style={{width:"500px"}} id="myInput"/>
                 <button onClick={copyToClipboard}>Copy text</button></div>
                    {
                        !found?( <div className={classes.form}>
                            <Card className={classes.formCard}>
                            <h3>{survey.question}</h3> 
                            {    
                                survey.options.map((option,i)=>
                                (<section className={classes.option} key={i}><div className={classes.checkBox}><Input id={i}  
                                      elementType="radio" checked={option.name===optionChosen}
                                      onChange={()=>changeHandler(option.name)}/></div><div className={classes.optionValue}><h3>{option.name}</h3></div></section>)
                                      ) }
                              <button style={{width:'80px',margin:'auto',backgroundColor:'#8abaae',color:'white',padding:"3px"}} className={classes.button} onClick={submitForm}>Submit</button>
                            </Card>
                        </div>):
                        ( <div className={classes.result}>
                          <h2>You voted {foundOption} for this survey </h2>
                         <div className={classes.graph}><Card className={classes.myCard}><Graph options={survey.options} question={survey.question}/></Card></div>
                         </div>)
                    } 
                  </div>
                )
    }
return null;
     
}

export default MySurveyForm;