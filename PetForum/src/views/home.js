// import {html} from '../../node_modules/lit-html/lit-html.js';

import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCatalog } from "../api/data.js";

const homeTemplate = (items) => html`
  <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${items.length>0 ? 
    html`<ul class="other-pets-list">
        ${items.map(itemTemplate)}
    </ul>` : html`<p class="no-pets">No pets in database!</p>`}

    
  </section>
`;

const itemTemplate = (item) => html` 
<li class="otherPet">
  <h3>Name: ${item.name}</h3>
  <p>Type: ${item.type}</p>
  <p class="img"><img src=${item.imageUrl} /></p>
  <a class="button" href="/details/${item._id}">Details</a>  
  
</li>`;

export async function homePage(ctx) {
  const data = await getCatalog();
  ctx.render(homeTemplate(data));
  ctx.setUserNav();
}
