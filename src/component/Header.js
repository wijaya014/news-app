import React from 'react'
import {withRouter,NavLink} from 'react-router-dom'

function Header(){
    return(
        <div className='header'>
           <div className='flex'>
               <img src='logo.png' alt='logo name' className='logo'/>
                <NavLink to='/' className='header-title'>
                    Url123
                </NavLink>
                <NavLink to='/' className='header-link'>
                    news
                </NavLink>
                <NavLink to='/top' className='header-link'>
                    Top
                </NavLink>
                <NavLink to='/search' className='header-link'>
                    Search
                </NavLink>
                <NavLink to='/create' className='header-link'>
                    Submit
                </NavLink>
           </div>
                
            <div className='flex'>
                <NavLink to='/login' className='header-link'>
                    login
                </NavLink>
            </div>
        </div>
    )
}

export default withRouter(Header);