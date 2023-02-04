console.log("Plug is in");

const steps = [
  {
    type: "suggested",
    text: "Hey, the API is not working",
  },
  {
    type: "received",
    sentBy: "Michael Machado",
    text: "sure give me more context",
  },
  {
    type: "suggested",
    text: "I am getting 503 errors on GET requests but POST requests work fine.",
  },
  {
    type: "received",
    sentBy: "Michael Machado",
    text: "Thanks for the information and reporting the issue! We would resolve it by today midnight!",
  },
  {
    type: "suggested",
    text: "Great! Thanks for the quick response, how can I track the progress?",
  },
  {
    type: "received",
    sentBy: "Michael Machado",
    text: "I can share the ticket with you! Please hold for sometime",
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
    steps.reduce(async (p, step) => {
        await p;
        if (step.type === "suggested") {
          return new Promise((resolve) => {
            console.log(step);
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
              resolve();
            }, 2000);
          });
        }
      }, Promise.resolve());
}


