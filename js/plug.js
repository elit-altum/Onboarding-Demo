console.log("Plus is in");
import { startRun } from "./execute.js";

const plugModal = document.getElementById("plug_box-modal");

let isModalOpen = false,
  isRun = false;

const openPlugModal = () => {
  plugModal.style.display = "block";
  isModalOpen = true;
  if (!isRun) {
    startRun();
    isRun = true;
  }
};

const closePlugModal = () => {
  plugModal.style.display = "none";
  isModalOpen = false;
};

const togglePlugModal = () => {
  if (isModalOpen) {
    closePlugModal();
  } else {
    openPlugModal();
  }
};

document.getElementById('start-plug-btn').addEventListener('click', () => {
  togglePlugModal();
});