import React from 'react'

function UseFormValidation(initialState,validate,authenticate){
    const[values, setValues] = React.useState(initialState);
    const[isSubmitting, setIsSubmitting] = React.useState(false);
    const[errors, setErrors] = React.useState({});

    React.useEffect(() =>{
       if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0;
            if(noErrors){
                authenticate();
                setIsSubmitting(false);
            }
       }
       
    },[errors])

    function handleChange(event){
        event.persist();
        setValues(previousValues =>({
            ...previousValues,
            [event.target.name] : event.target.value
        }))
    }

    function handleBlur(){
        const validationError = validate(values);
        setErrors(validationError);
    }

    function handleSubmit(event){
        event.preventDefault();
        const validationError = validate(values);
        setErrors(validationError);
        setIsSubmitting(true);
    }

    return {handleChange, handleBlur, handleSubmit, values, isSubmitting, errors}
}

export default UseFormValidation;