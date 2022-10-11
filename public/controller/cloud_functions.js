import { 
    getFunctions, httpsCallable, connectFunctionsEmulator,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-functions.js"

import { Product } from "../model/product.js";

const functions = getFunctions();

//setup for emulator
const hostname = window.location.hostname;
if(hostname == 'localhost' || hostname == '127..0.0.1'){
    connectFunctionsEmulator(functions, hostname, 5001);
}

const cfn_addProduct = httpsCallable(functions, 'cfn_addProduct');
export async function addProduct(product){
    const result=  await cfn_addProduct(product);
    return result.data;
}

const cfn_getProductList = httpsCallable(functions, 'cfn_getProductList');
export async function getProductList(){
    const products = [];
    const result=  await cfn_getProductList({});
    result.data.forEach(element =>{
        const p = new Product(element);
        p.set_docId(element.docId);
        products.push(p);
    });
    return products; 
}

const cfn_deleteProductDoc = httpsCallable (functions, 'cfn_deleteProductDoc');
export async function deleteProductDoc(docId){
    await cfn_deleteProductDoc(docId);
}

const cfn_getProductById = httpsCallable (functions, 'cfn_getProductById');
export async function getProductById(docId){
    const result= await cfn_getProductById(docId);
    if (result.data){
        const product = new Product(result.data);
        product.set_docId(result.data.docId);
        return product;
    }else {
        return null; 
    }
}

