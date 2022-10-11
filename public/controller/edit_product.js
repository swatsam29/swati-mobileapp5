import * as CloudFunctions from '../controller/cloud_functions.js'
import * as CloudStorage from '../controller/cloud_storage.js'
import * as Util from '../viewpage/util.js'
import * as Constants from '../model/constants.js'


export async function edit_product(docId){
    console.log('Edit', docId);
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