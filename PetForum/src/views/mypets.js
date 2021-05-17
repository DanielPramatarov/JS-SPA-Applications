import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getMineCatalog} from '../api/data.js';




const profileTemplate = (items) => html`
<section id="my-pets-page" class="my-pets">
            <h1>My Pets</h1>
            
            ${items.length>0 ? 
    html` <ul class="my-pets-list">
        ${items.map(memTempl)}
    </ul>` : html`<p class="no-pets">No pets in database!</p>`}

           
               
 </section>`;

const memTempl = (item) => html`
     <li class="otherPet">
                    <h3>Name: ${item.name}</h3>
                    <p>Type: ${item.type}</p>
                    <p class="img"><img src=${item.imageUrl}></p>
                    <a class="button" href="/details/${item._id}">Details</a>
    </li>`;

export async function mypets(ctx) {
    const id = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username');
    const items= await getMineCatalog();
    

   

    ctx.render(profileTemplate(items));
    

}