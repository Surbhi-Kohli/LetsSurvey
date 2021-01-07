import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { withRouter,Redirect } from "react-router-dom";
import { Button,  Dimmer, Loader} from "semantic-ui-react";
import { connect } from "react-redux";
import Input from "../../UI/Input/Input";
import * as actions from "../../store/actions/index";
import classes from "./CreatePoll.module.css";
class CreatePoll extends Component {

  submitForm=()=>{
       let options = this.props.pollForm.options.map(op => ({"name":op.value,"count":0}));
       let ques= this.props.pollForm.question.value;
       try{
        this.props.submitHandler(ques,options)
       }
       catch(err){
         console.log(err)
       };
    
  }
  render() {
    console.log("in render of createPoll");
    const formElementsArray = [];
    for (let key in this.props.pollForm) {
      if (key == "options")
      { 
        for (let key2 in this.props.pollForm[key]) {
          formElementsArray.push({
            id: key2,
            name:"options",
            config: this.props.pollForm[key][key2]
          });
        }
      }
        
      else
        formElementsArray.push({
          name:"question",
          id: key,
          config: this.props.pollForm[key]
        });
    }
    console.log(formElementsArray);
    if (this.props.surveyPath) {
      console.log("in this if condition");
      console.log(this.props.surveyPath);
      return <Redirect to={{pathname:`${this.props.match.url}AllSurveys/${this.props.surveyPath}`}}/>;
    }
    let form = (
      <Form>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              uniqId={formElement.config.uniqId}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              removable={formElement.config.removable}
              delOption={() => this.props.deleteOption(formElement.config.uniqId)}
              lenOfOptions={this.props.options.length}
              onChange={(event)=>this.props.dataChangedHandler(event,formElement.config.uniqId,formElement.name)}
            />
          );
        })}
        <div className={classes.addOptions} >
          <Button basic color="teal" onClick={this.props.addOption} content="Add More Options" disabled={this.props.options.length==10} />
        </div>
        <Button primary onClick={this.submitForm}>Create Poll</Button>
      </Form>
    );
    return <div>{form}
    <Loader active={this.props.active}></Loader></div>;
  }
}

const mapStateToProps = state => {
 
  return { pollForm: state.pollForm ,
            options:state.pollForm.options,
           active:state.spinner,
           surveyPath:state.surveyPath };
};

const mapDispatchToProps = dispatch => {
  return {
    addOption: () => dispatch(actions.addOption()),
    deleteOption: id => dispatch(actions.deleteOption(id)),
    dataChangedHandler:(event,opId,inputEl)=> dispatch(actions.formDataChanged(event,opId,inputEl)),
    submitHandler:(ques,options)=>dispatch(actions.formSubmit(ques,options))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreatePoll));
