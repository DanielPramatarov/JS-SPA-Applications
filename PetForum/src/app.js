import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {homePage} from './views/home.js';
import {loginPage} from './views/login.js';
// import {logoutPage} from './views/logout.js';
// import {catalogPage} from './views/catalog.js';
import {detailsPage} from './views/details.js';
import {createPage} from './views/create.js';
import {editPage} from './views/edit.js';
import {mypets} from './views/mypets.js';





import * as api from './api/data.js';
import { logout } from './api/api.js';
import {registerPage} from './views/register.js';
window.api = api;
export const main = document.getElementById('site-content');

page("/",decoration, homePage);
page('/login', decoration, loginPage);
page('/register', decoration, registerPage);
// page('/logout', decoration, logoutPage);
page('/details/:id', decoration, detailsPage);
page('/mypets', decoration, mypets);
page('/create', decoration, createPage);
page('/edit/:id', decoration, editPage);






setUserNav();

page.start();



document.querySelector('#user > a:nth-child(4)').addEventListener('click', async () => {

    await logout();
    page.redirect('/');
    setUserNav();    
})





function decoration(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();

}

function setUserNav(){
    const userEmail = sessionStorage.getItem('email');
    if (userEmail != null){
        document.querySelector('div#user > span').textContent = `Welcome, ${userEmail}`;
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}