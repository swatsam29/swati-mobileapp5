import * as Elements from './elements.js'

export function info(title,body, closeModal){
    if (closeModal) closeModal.hide();
    Elements.modalInfobox.title.innerHTML = title;
    Elements.modalInfobox.body.innerHTML = body;
    Elements.modalInfobox.modal.show();


}