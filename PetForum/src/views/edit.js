import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {editRecord, getDetails} from '../api/data.js';


const editTemplate = (item, onSubmit) => html`
<section id="edit-page" class="edit">
            <form @submit=${onSubmit} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Pet</legend>
                    <p class="field">
                        <label for="name">Name</label>
                        <span class="input">
                            <input type="text" name="name" id="name" value=${item.name} >
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">${item.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value=${item.imageUrl}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value=${item.type}>
                                <option value="cat" >Cat</option>
                                <option value="dog" >Dog</option>
                                <option value="parrot">Parrot</option>
                                <option value="reptile">Reptile</option>
                                <option value="other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;



export async function editPage(ctx) {
    const id = ctx.params.id;
    const item = await getDetails(id);
    ctx.render(editTemplate(item, onSubmit))

    console.log(item);

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            type: formData.get('type'),
        }


        try {
            if (!data.name || !data.description || !data.imageUrl || !data.type ) {
                throw new Error('All fields are required!')
                }

            await editRecord(item._id, data);
            ctx.setUserNav();
            ctx.page.redirect(`/details/${item._id}`);
            
        } catch (error) {
            alert(error.message);
        }
    }
}