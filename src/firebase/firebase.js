import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Login from '../component/auth/login'
import firebaseConfig from './config'


class Firebase(){
    constructor(){
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore()
    }

    async register(name, email, password){
        const newUser = this.auth.createUserWithEmailAndPassword(email, password);
        return await newUser.user.updateProfile({
            displayName : name;
        })
    }

    async login(email, password){
        return await this.auth.signWithEmailAndPassword();
    }
}

const firebase = new Firebase();

export default firebase;