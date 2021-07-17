import React from 'react'
import {BrowserRouter,Switch,Redirect,Route, Link} from 'react-router-dom'
import CreateLink from './link/createLink'
import SubmitLink from './link/submitLink'
import SearchLink from './link/searchLink'
import LinkList from './link/linkList'
import LinkDetail from './link/linkDetail'
import Login from './auth/login'
import ForgotPassword from './auth/forgotPassword'
import Header from './Header'


function App(){
    return(
        <BrowserRouter>
            <div className='app-container'>
                <Header/>
                <div className='route-container'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/new/1'/>} />
                        <Route path='/create' component={CreateLink} />
                        <Route path='/login' component={Login}/>
                        <Route path='/forgot' component={ForgotPassword} />
                        <Route path='/search' component={SearchLink}/>
                        <Route path='/top' component={LinkList} />
                        <Route path='/new/:page' component={LinkList}/>
                        <Route path='/new/:page' component={LinkDetail}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        
    )
}

export default App;