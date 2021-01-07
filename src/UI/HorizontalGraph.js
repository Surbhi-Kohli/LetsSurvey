import React ,{ useState, useEffect } from 'react';
import classes from './HorizontalGraph.module.css';

const HorizontalGraph=(props)=>{
 // let totalVotes=0;
   const [totalVotes,setTotalVotes]=useState(0);
   const [graphs,setGraphs]=useState("");
  useEffect(() => {
              // totalVotes = props.options.reduce((total, res) => {
              //  return total + res.count;
              // }, 0);
         let total=props.options.reduce((total, res) => {
           return total + res.count;
           }, 0);
           
           setTotalVotes(total);
          setGraphs(props.options.map(val => {
            
            let width = 0;
            if(total>0)
            width=(val.count/total) * 100;
            let style = {
              width: width + "%"
            };
            return (
              <section className={classes.barGraphMain}>

                <div className={classes.upperRow}>
                  <div>{val.name}</div>
                  <div></div>
                  <div>{Math.round(width)}%</div>
                </div>
                <div className={classes.row}>
                  <div></div>
                  <div className={classes.barOuter}>
                  <div className={classes.bar} style={style}></div>
                  </div>
                  <div></div>
                </div>
                <div className={classes.lastRow}>{val.count} Votes</div>
              </section>
              
            );
          }));
        },[props]);

    return(
        <div style={{'margin':'5px'}}>
            
               <div key="1" style={{'width':'80%','margin':'auto'}}>
               <div className={classes.cardTop}><h4>{props.question}</h4> <h4>Total Votes:{totalVotes}</h4></div>
              
               {graphs?graphs.map(gp=>(<div style={{'height':'100px'}}>{gp}</div>)):''}
             </div>
               {/* <Grid.Column key="2" style={{'width':'20%'}}>
               <Card.Group className={classes.uiCards}>
                 <Card>
                  <Card.Header className={classes.voteCountHeader}> {totalVotes} Votes</Card.Header>
                </Card>
              </Card.Group>
              </Grid.Column> */}
            
        </div>
    );
}

export default HorizontalGraph;