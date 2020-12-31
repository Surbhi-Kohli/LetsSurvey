import React,{useEffect,useState} from "react";
import { Card,Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import firebase from "../../firestore";
import Graph from "../../UI/HorizontalGraph";
import classes from "./AllSurveys.module.css";
function AllSurveys(props){
 const [surveys,setSurvey]=useState([]);
  useEffect(()=>{
     
    const db = firebase.firestore();
    db.collection(`Survey`)
    .get()
    .then(doc=>{
     
       let arr= doc.docs.map(entry=>{
         let obj={
       path:entry.Sf.key.path.segments[6], value:entry.data()}
      return obj});
      
    
       setSurvey(arr);

    })
  },[])
return(
    <div className={classes.survey}>
    {  
        surveys.map(survey=><NavLink to={`/LetsSurvey/AllSurveys/Survey/`+survey.path}><div  style={{'width':'650px','margin':'5px'}}><Card style={{'width':'90%','margin':'auto'}}><Graph options={survey.value.options} question={survey.value.question}></Graph></Card></div></NavLink>)
    }
    </div>
)
    
}
export default AllSurveys;