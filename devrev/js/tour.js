const tour = new Shepherd.Tour({
  defaultStepOptions: {
    scrollTo: { behavior: "smooth", block: "center" },
  },
});

tour.addStep({
  text: `Welcome to the DevRev app.`,
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

// tour.start()

export {tour};
