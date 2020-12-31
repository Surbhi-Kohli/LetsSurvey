import * as actionTypes from "../actions/actionTypes";
const initialFormState = {
  pollForm: {
    question: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder:
          "Type Your Question,e.g What's your favourite ice-cream flavour?"
      },
      value: "",
      uniqId: "question",
      valid: false,
      validation: {
        required: true
      }
    },
    options: [
      {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Option1"
        },
        removable: false,
        value: "",
        uniqId: 0,
        valid: false,
        validation: {
          required: true
        }
      },
      {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Option2"
        },
        removable: false,
        value: "",
        uniqId: 1,
        valid: false,
        validation: {
          required: true
        }
      }
    ]
  },
  surveyPath:"",
  spinner:false,
};
const updateArray = (arr, action) => {
  return arr.map((item, index) => {
    console.log(index);
    console.log(action.optionId);
    if (index !== action.optionId) {
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      value: action.event.target.value
    };
  });
};
const reducer = (state = initialFormState, action) => {
  switch (action.type) {
    case actionTypes.ADD_OPTION:
      let len = state.pollForm.options.length;
      return {
        ...state,
        pollForm: {
          ...state.pollForm,
          options: state.pollForm.options.concat({
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Option" + (len + 1)
            },
            removable: true,
            value: "",
            uniqId: len,
            valid: false
          })
        }
      };
    case actionTypes.DELETE_OPTION:
      let id = action.id;
      let newArray = state.pollForm.options.filter(res => {
        console.log(res.uniqId);
        console.log(id);
        if (res.uniqId != id) {
          return true;
        }
      });
      return {
        ...state,
        pollForm: {
          ...state.pollForm,
          options: newArray
        }
      };
    case actionTypes.FORM_DATA_CHANGED:
      if (action.optionId != "question") {
        let options=[...state.pollForm.options]
          return {
            ...state,
            pollForm: {
              ...state.pollForm,
              options:updateArray(options,action)
            }
           }
      }
      return {
        ...state,
        pollForm: {
          ...state.pollForm,
          [action.inputElement]: {
            ...state.pollForm[action.inputElement],
            value: action.event.target.value
          }
        }
      }
      case actionTypes.SUBMIT_FORM_START:
      return {
        ...state,
        spinner:true
      }
      case actionTypes.SUBMIT_FORM_END:
      return {
        ...state,
        spinner:false
      }
      case actionTypes.SUBMIT_FORM_SUCCESS:
      return{
        ...state,
        surveyPath:action.newSurveyPath
      }
    default:
      return state;
  }
};

export default reducer;
