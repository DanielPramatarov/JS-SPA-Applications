import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {getDetails, deleteItem} from '../api/data.js';

const detailsTemplate = (item, isOwner, onDelete, logged) => html`
<section id="details-page" class="details">
            <div class="pet-information">
                <h3>Name: ${item.name}</h3>
                <p class="type">Type: ${item.type}</p>
                <p class="img"><img src=${item.imageUrl}></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this pet )  -->
                   
                    ${isOwner ? html`
                    <a class="button" href="/edit/${item._id}">Edit</a>
                    <a  @click=${onDelete} class="button" href="#">Delete</a>`
                     : html``} 

                    ${logged!= null ? html`<a class="button" href="#">Like</a>`
                     : html``} 
                    
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current pet ) -->
                   
                    
                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
						<img class="hearts" src="/images/heart.png">
						<span id="total-likes">Likes: 0</span>
					</div>
					<!-- Bonus -->
                </div>
            </div>
            <div class="pet-description">
                <h3>Description:</h3>
                <p>${item.description}</p>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const item = await getDetails(id);
    const myId = sessionStorage.getItem('userId');
    const ownerValidate =  myId===item._ownerId;
    const logged = sessionStorage.getItem('authToken');

    ctx.render(detailsTemplate(item,ownerValidate , onDelete,logged));
    
    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed){
            deleteItem(item._id);
            ctx.page.redirect('/');
        }
    }



}