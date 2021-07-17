import React from 'react'
import UseFormValidation from './useFormValidation';
import validateLogin from './validate';

const INITIAL_STATE = {
    name:'',
    email:'',
    password:''
}

function Login(props){
    const {} = UseFormValidation(INITIAL_STATE, validateLogin);
    return(
        <div>
            <h2 className='mv3'>Login</h2>
            <form className='flex flex-column'>
                <input 
                    type='teks' 
                    name='' 
                    value=''
                    placeholder='username'
                    autoComplete='off'
                    />
                <input 
                    type='teks' 
                    name='' 
                    value=''
                    placeholder='email'
                    autoComplete='on'
                    />
                <input 
                    type='password' 
                    name='' 
                    value=''
                    placeholder='password'
                    />
                    <button className='pointer-button'>Submit</button>
            </form>

        </div>
    )
}

export default Login;