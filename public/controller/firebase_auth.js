import { 
    getAuth, signInWithEmailAndPassword, 
} from "https://www.gstatic.com/firebasejs/9.3.3/firebase-auth.js";

import * as Elements from '../viewpage/elements.js'



export function addEventListeners(){

    Elements.formSignin.addEventListener('submit', e => {
        e.preventDefault();
        const email = e.target.email.value; 
        const password= e.target.password.value;
    });

}

