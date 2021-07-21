import React from 'react'
import {BrowserRouter,Switch,Redirect,Route, Link} from 'react-router-dom'
import firebase, { FirebaseContext } from '../firebase'
import CreateLink from './link/createLink'
import SubmitLink from './link/submitLink'
import SearchLink from './link/searchLink'
import LinkList from './link/linkList'
import LinkDetail from './link/linkDetail'
import Login from './auth/login'
import ForgotPassword from './auth/forgotPassword'
import Header from './Header'
import useAuth from './auth/useAuth'


function App(){
    const user = useAuth();
    return (
       <BrowserRouter>
        <FirebaseContext.Provider value={{user, firebase}}>
            <div className='app-container'>
                <Header />
                <div className='app-router'>
                    <Switch>
                        <Route exact path='/' render={() =><Redirect to='/new/1'/>}/>
                        <Route path='/create' component={CreateLink}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/forgot' component={ForgotPassword} />
                        <Route path='/search' component={SearchLink}/>
                        <Route path='/top' component={LinkList}/>
                        <Route path='/new/:page' component={LinkList}/>
                        <Route path='/link/:linkId' component={LinkDetail} />
                    </Switch>
                </div>
            </div>
        </FirebaseContext.Provider>
       </BrowserRouter>
        
    );
}

export default App;