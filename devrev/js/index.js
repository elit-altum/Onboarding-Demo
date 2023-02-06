import { tour } from "./tour.js";

const steps = [
  {
    type: "click",
    tooltipText: "Click here to see all your conversations",
    id: "inbox",
    on: "right",
  },
  {
    type: "click",
    tooltipText: "Click here to open the conversation",
    id: "first-conv",
    on: "top",
  },
  {
    type: "point",
    id: "chat-comments",
    text: "View the customer interaction for full context here. Or send a message.",
    on: "left",
  },
  {
    type: "click",
    tooltipText: "Click here to link a ticket",
    id: "link-tickets-btn",
    on: "left",
  },
  {
    type: "point",
    id: "tkt-title",
    text: "Fill and provide all the necessary details",
    on: "left",
  },
  {
    type: "fill",
    id: "tkt-title",
    text: "GET API calls for payments failing",
    runNext: true,
  },
  {
    type: "fill",
    id: "tkt-description",
    text: "Multiple customer reports of GET requests failing with error code 503 on the payments API in production. Customer reports say POST requests seems to work fine.",
  },
  {
    type: "point",
    id: "tkt-attributes",
    text: "DevRev intelligently fills information like severity, owner etc.",
    on: "left",
  },
  {
    type: "click",
    tooltipText: "Click here to create the ticket",
    id: "submit-ticket-btn",
    on: "left",
    func: () => {
      document.getElementById("no_tkt_text").style.display = "none";
      document.getElementById("ticket_show").style.display = "block";
      document.getElementById("ticket-box").style.display = "none";
    },
  },
  {
    type: "point",
    id: "ticket_show",
    text: "The attached ticket is now linked to the conversation for all future references",
    on: "left",
  },
];

tour.start();

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

steps.reduce(async (p, step, index) => {
  await p;
  if (step.type === "click") {
    return new Promise((resolve) => {
      tour.addStep({
        text: step.tooltipText,
        classes: "flex items-center justify-center text-center",
        attachTo: {
          element: "#" + step.id,
          on: step.on,
        },
      });
      if (index > 0) tour.next();
      document.getElementById(step.id).addEventListener(
        "click",
        () => {
          if (step.hasOwnProperty("func")) {
            step.func();
          }
          resolve();
          if (index === steps.length - 1) {
            console.log("complete");
            tour.complete();
          }
        },
        { once: true }
      );
    });
  } else if (step.type === "fill") {
    if (step?.runNext) {
      tour.next();
    }
    return new Promise((resolve) => {
      const elem = document.getElementById(step.id);
      elem.innerHTML = "";
      typeWriter(elem, step.text, 0, 30, resolve);
    });
  } else if (step.type === "point") {
    console.log(step);
    tour.addStep({
      text: step.text,
      classes: "flex items-center justify-center text-center",
      attachTo: {
        element: "#" + step.id,
        on: step.on,
      },
      buttons: [
        {
          action() {
            return this.next();
          },
          text: "Next",
        },
      ],
    });
    if (index === steps.length - 1) tour.next();
    return Promise.resolve();
  }
}, Promise.resolve());
