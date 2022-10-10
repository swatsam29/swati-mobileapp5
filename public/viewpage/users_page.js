import * as Elements from './elements.js'
import { routePathnames } from '../controller/route.js';

export function addEventListeners(){

    Elements.menuUsers.addEventListener('click', ()=> {
        history.pushState(null, null, routePathnames.USERS);
        users_page();
    });
}

export function users_page(){
    Elements.root.innerHTML = '<h1>Users Page</h1>'
}