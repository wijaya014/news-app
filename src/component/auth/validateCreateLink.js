export default function ValidateCreateLink(values){
    let errors = {}

    if(!values.description){
        errors.description = 'description required';
    }else if(values.description.lenght <=10){
        errors.description = 'description at least 11 characters';
    }

    if(!values.url){
        errors.url = 'url required'
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = 'invalid url'
    }

    return errors;
}