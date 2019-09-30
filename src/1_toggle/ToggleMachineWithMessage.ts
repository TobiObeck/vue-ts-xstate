import { Machine, actions, assign } from "xstate";

export const toggleMachineWithMessage = Machine(
  {
    id: "toggleWithMessage",
    initial: "inactive",
    context: {
      message: "This is the default message",
      counter: 0
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: "active",
            actions: assign({
              message: context => "Everything is fine!"
            })
          }
        }
      },
      active: {
        on: {
          TOGGLE: {
            target: "inactive",
            actions: [
              "log",
              "fancyLog",
              assign({ counter: context => context.counter + 1 }),
              assign({
                message: context =>
                  "WARNING! Some unauthorized individual deactivated the green light!" +
                  " CODE: " +
                  (context.counter % 2)
              }),
              assign({ counter: context => context.counter + 1 }),
              assign({ counter: context => context.counter + 1 })
            ]
          }
        }
      }
    }
  },
  {
    actions: {
      setMyFanceActivateMessage: (context, event) => {
        console.log("activating...");

        //return assign({ message: context => context.message + 1 }),
      },
      log: (context, event) => {
        console.log("logging:", context, event.type);
      },
      fancyLog: (context, event) => {
        console.log("%c fancy warning log! ", "color: #000000; background: #ff0000");
      }
    }
  }
);
