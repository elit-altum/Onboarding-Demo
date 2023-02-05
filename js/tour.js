const tour = new Shepherd.Tour({
  defaultStepOptions: {
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

tour.addStep({
  text: `Creating a Shepherd tour is easy. too!\
  Just create a \`Tour\` instance, and add as many steps as you want.`,
  id: "creating",
  classes: "flex items-center justify-center text-center",
  buttons: [
    {
      action() {
        return this.next();
      },
      text: "Next",
    },
  ],
  id: "creating",
});

tour.addStep({
  text: `Click here to start using PLuG\
  Just create a \`Tour\` instance, and add as many steps as you want.`,
  classes: "flex items-center justify-center text-center",
  attachTo: {
    element: '#start-plug-btn',
    on: 'top'
  }
});

export {tour};
