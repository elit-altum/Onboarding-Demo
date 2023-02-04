console.log('Plus is in');
const plugModal = document.getElementById('plug_box-modal')

let isModalOpen = false;

const openPlugModal = () => {
    plugModal.style.display = 'block'
    isModalOpen = true;
    startRun()
}

const closePlugModal = () => {
    plugModal.style.display = 'none'
    isModalOpen = false
}

const togglePlugModal = () => {
    if(isModalOpen) {
        closePlugModal()
    } else {
        openPlugModal();
    }
}