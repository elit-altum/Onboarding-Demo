const tour = new Shepherd.Tour({
  defaultStepOptions: {
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

tour.addStep({
  text: `Welcome to the DevRev Demo, let's get started!`,
  classes: "flex items-center justify-center text-center",
  buttons: [
    {
      action() {
        return this.next();
      },
      text: "NEXT",
    },
  ],
});

tour.addStep({
  text: "Click here to open the PLuG widget where your customers can converse with your front desk",
  attachTo: {
    element: "#start-plug-btn",
    on: "top",
  },
});

export { tour };
