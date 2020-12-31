import React from 'react';
import { Input ,TextArea, Button, Icon} from 'semantic-ui-react';

import classes from './Input.module.css';
const input=(props)=>{
    let inputElement=null;
    let classCss=[];
    if(props.uniqId<(props.lenOfOptions-1))
    {
      classCss.push(classes.disableHover)
    }
    else
    {
      classCss.push(classes.icon)
    }
   
    switch(props.elementType)
    {
        case ('input'):
        if(props["removable"])
        inputElement= <Input onChange={props.onChange} className={classes.inputElement} style={{'width':'180px'}}
        icon={<Icon className={classCss.join(' ')} name='remove' disabled={props.uniqId==props.uniqId<(props.lenOfOptions-1)} inverted circular link onClick={props.delOption}
        />}
        {...props.elementConfig} value={props.value}/>
          else
        inputElement=<Input onChange={props.onChange} {...props.elementConfig} value={props.value}/>;
        break;
        case ('textarea'):
        inputElement=<textarea onChange={props.onChange} className={classes.inputElement} {...props.elementConfig} value={props.value}/>
        break;
        case('checkbox'):
        inputElement=<input type="checkbox" checked={props.onChange} onChange={props.handleInputChange}/>
        case('radio'):
        inputElement=<input type="radio" id={props.id} checked={props.checked} onChange={props.onChange}/>
  
        break;
        default:
        inputElement=<Input onChange={props.onChange} {...props.elementConfig} value={props.value} />;
        break;
    }
   
    return (
    <div className={classes.Input}>
        {inputElement}
   </div>
)
}

export default input;