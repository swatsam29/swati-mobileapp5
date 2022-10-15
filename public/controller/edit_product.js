import * as CloudFunctions from '../controller/cloud_functions.js'
import * as CloudStorage from '../controller/cloud_storage.js'
import * as Util from '../viewpage/util.js'
import * as Constants from '../model/constants.js'
import * as Elements from '../viewpage/elements.js'

let imageFile2Upload;

export function addEventListeners(){

    Elements.formEditProduct.imageButton.addEventListener('change', e=>{
        imageFile2Upload = e.target.files[0];
        if(!imageFile2Upload){
            Elements.formEditProduct.imageTag.removeAttribute('src');
            alert('Image selection canceled. Image will not be updated');
            return;
        }
        const reader= new FileReader();
        reader.readAsDataURL(imageFile2Upload);
        reader.onload = () => Elements.formEditProduct.imageTag.src = reader.result;
    })

    Elements.formEditProduct.form.addEventListener('submit', async e => {
        e.preventDefault();
    })
}


export async function edit_product(docId){
    let product;
    try{
        product = await CloudFunctions.getProductById(docId);
        if (!product){
            Util.info('getProductById error', 'No Product found by the id');
            return;
        }
    }catch(e){
        if (Constants.DEV) console.log(e);
        Util.info('getProductById error', JSON.stringify(e));
        return;
    }

    // show product 
    Elements.formEditProduct.form.docId.value = product.docId;
    Elements.formEditProduct.form.imageName.value = product.imageName;
    Elements.formEditProduct.form.name.value = product.name;
    Elements.formEditProduct.form.price.value = product.price;
    Elements.formEditProduct.form.summary.value = product.summary;
    Elements.formEditProduct.imageTag.src = product.imageURL;
    Elements.formEditProduct.imageButton.value = null;
    imageFile2Upload = null;

    Elements.modalEditProduct.show();
    
}

export async function delete_product(docId, imageName){
    //1. delete doc, 2. delete image
    const r = confirm('Press OK to delete');
    if (!r) return;
    try{
        await CloudFunctions.deleteProductDoc(docId);
        await CloudStorage.deleteProductImage(imageName);
        document.getElementById(`card-${docId}`).remove();
        Util.info('Deleted', `${docId} has been deleted`);
    }catch(e){
        if (Constants.DEV) console.log(e);
        Util.info('Delete product error', JSON.stringify(e));

    }

}