import { Machine } from "xstate";

export const toggleMachine = Machine({
  id: "toggle",
  initial: "inactive",
  context: {
    message:
      "This is the default message." +
      "Try out the `toggleMachineWithMessage` " +
      "to see message changes on state transitions"
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: { on: { TOGGLE: "inactive" } }
  }
});
