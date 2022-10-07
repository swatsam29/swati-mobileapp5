import { routing } from './controller/route.js'
import * as FirebaseAuth from './controller/firebase_auth.js'


window.onload = ()=> {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    routing(pathname, hash);
}

FirebaseAuth.addEventListeners();

