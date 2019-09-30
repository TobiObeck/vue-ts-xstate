<template>
  <div class="toggle">
    <span class="debug">
      debug information:
      <!-- don't write debug code like this -->
      <!-- this is only for demonstration purposes of xstate -->
      <br />
      <span>this.current.value: {{ this.current.value }}</span>
      <br />
      <span>current.matches("active")? {{ current.matches("active") }}</span>
      <br />
      <span>current.matches("inactive")? {{ current.matches("inactive")? 'Yap' : 'Nope' }}</span>
    </span>
    <br />
    <br />
    <h3>Toggle Component</h3>
    <button @click="clickHandle">toggle</button>
    <span
      class="state-indicator"
      :class="{ 'is-ok-green': isActive, 'is-danger': !isActive }"
    >{{ getStatusText }}</span>
    <br />
    <br />
    <span v-if="toggleService.id === 'toggleWithMessage'">
      <strong>Counter:</strong>
      {{ this.current.context.counter }}
    </span>
    <br />
    <strong>Status Message:</strong>
    {{ this.current.context.message }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { interpret } from "xstate";
import { toggleMachine } from "./ToggleMachine.ts";
import { toggleMachineWithMessage } from "./ToggleMachineWithMessage.ts";

export default Vue.extend({
  name: "Toggle",
  data() {
    return {
      toggleService: interpret(toggleMachine),
      current: toggleMachine.initialState
      // swap out these two line to try the other machine
      // toggleService: interpret(toggleMachineWithMessage),
      // current: toggleMachineWithMessage.initialState
    };
  },
  created() {
    // Start service on component creation
    this.toggleService
      .onTransition(state => {
        this.current = state;
      })
      .start();
  },
  computed: {
    isActive() {
      return this.current.matches("active");
    },
    getStatusText() {
      return this.isActive ? "On" : "Off";
    }
  },
  methods: {
    clickHandle() {
      this.toggleService.send("TOGGLE");
    }
  }
});
</script>

<style scoped>
.toggle {
  width: 50%;
}
.state-indicator {
  margin: 8px;
  padding: 6px;
  border-radius: 8px;
  width: 100%;
  font-weight: bold;
}
.is-ok-green {
  background-color: limegreen;
  border: solid lawngreen 1px;
  color: white;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 255, 4, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 255, 4, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 255, 4, 1);
}
.is-danger {
  background-color: red;
  border: solid black 2px;
  border-radius: 4px;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(241, 5, 5, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(241, 5, 5, 1);
  box-shadow: 0px 0px 10px 0px rgba(241, 5, 5, 1);
}
.debug {
  font-size: 10px;
}
</style>
