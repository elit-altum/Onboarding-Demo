console.log("Plug is in");

import { tour } from "./tour.js";
tour.start();

const steps = [
  {
    type: "suggested",
    text: "Hey, the payments API is failing",
    tooltipText: "Your customers can type their queries here."
  },
  {
    type: "received",
    sentBy: "Michael Machado",
    text: "Thanks for reporting! Could you please tell me a bit more about it?",
  },
  {
    type: "suggested",
    text: "We are getting 503 errors on GET requests but POST requests seem to work fine.",
    tooltipText: "Interact with them directly for maximum engagement."
  },
  {
    type: "received",
    sentBy: "Michael Machado",
    text: "Thanks for the information! Let me get back to you in the evening with the progress and the fixes made.",
  },
  {
    type: "end",
  },
];

const chat = document.getElementById("chat_box");

const changeSampleToText = (id, resolve) => {
  const elem = document.getElementById(id);
  elem.classList.remove("plug_box-chat-suggested");
  elem.classList.add("plug_box-chat-sent");
  resolve();
};

const getNewSuggestedHTML = (text, id) => {
  return `<div class="plug_box-chat-suggested" id="${id}">
    <p>${text}</p>
  </div>`;
};

const getNewReceivedHTML = (text, sentBy) => {
  return `<div class="plug_box-chat-received">
  <div class="profile-details">
  </div>
  <div class="text-details">
    <p class="text-details__name">${sentBy}</p>
    <p class="text-details__text">${text}</p>
  </div>
</div>`;
};

const getNewSentHtml = (text) => {
  return `<div class="plug_box-chat-sent">
    <p>${text}</p>
  </div>`;
};

const typeWriter = (elem, text, index, speed, resolve) => {
  if (index < text.length) {
    elem.innerHTML += text.charAt(index);
    index++;
    setTimeout(() => {
      typeWriter(elem, text, index, speed, resolve);
    }, speed);
  } else {
    resolve();
  }
};

// steps.reduce(async (p, step, index) => {
//   await p;
//   if (step.type === "suggested") {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         chat.innerHTML += getNewSuggestedHTML(step.text, `text_id-${index}`);
//         var btn = document.getElementById(`text_id-${index}`);
//         btn.addEventListener(
//           "click",
//           function (e) {
//             btn.classList.remove("plug_box-chat-suggested");
//             btn.classList.add("plug_box-chat-sent");
//             resolve();
//           },
//           { once: true }
//         );
//       }, 1500);
//     });
//   } else if (step.type === "received") {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         chat.innerHTML += getNewReceivedHTML(step.text, step.sentBy);
//         resolve();
//       }, 2000);
//     });
//   }
// }, Promise.resolve());

const startRun = () => {
  steps.reduce(async (p, step, index) => {
    await p;
    if (step.type === "suggested") {
      return new Promise((resolve) => {
        tour.addStep({
          text: step.tooltipText,
          classes: "flex items-center justify-center text-center",
          attachTo: {
            element: "#plug-input",
            on: "right",
          },
        });
        tour.next();

        setTimeout(async () => {
          const box = document.getElementById("editor-input-text");
          const submitBtn = document.getElementById("editor-input-submit");
          submitBtn.disabled = true;

          const textCompletePromise = new Promise((resolve) => {
            typeWriter(box, step.text, 0, 30, resolve);
          });

          await textCompletePromise;

          submitBtn.disabled = false;
          submitBtn.addEventListener(
            "click",
            (e) => {
              box.innerText = "";
              chat.innerHTML += getNewSentHtml(step.text);
              resolve();
            },
            { once: true }
          );
        }, 1500);
      });
    } else if (step.type === "received") {
      return new Promise((resolve) => {
        setTimeout(() => {
          chat.innerHTML += getNewReceivedHTML(step.text, step.sentBy);
          if (index === steps.length - 2) {
            tour.addStep({
              text: `Let's move to DevRev to see how it looks to Michael`,
              classes: "flex items-center justify-center text-center",
              buttons: [
                {
                  action() {
                    return window.location.href = 'devrev/index.html';
                  },
                  text: "Next",
                },
              ],
            });
            tour.next();
          }
          resolve();
        }, 2000);
      });
    }
  }, Promise.resolve());
};

export { startRun };
