<template>
  <v-app @keydown.enter.prevent style="background-color: #f3f3f3">
    <div class="d-flex flex-column pa-3" style="height: 16vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 16vh">
            <v-app-bar app color="transparent" flat>
              <v-toolbar-title
                ><v-icon class="pa-0">mdi-calculator</v-icon>
                Calculator
              </v-toolbar-title>
              <history-dialog
                @historyItemClick="historyItemClick"
              ></history-dialog>
            </v-app-bar>
          </v-responsive>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex flex-column pa-3" style="height: 13vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 13vh">
            <v-textarea
              v-model="upperDisplay"
              readonly
              reverse
              variant="plain"
            />
          </v-responsive>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex flex-column pa-3" style="height: 20vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 20vh">
            <v-text-field
              v-model="displayFormated"
              readonly
              reverse
              variant="plain"
            />
          </v-responsive>
        </v-col>
      </v-row>
    </div>
    <div class="d-inline-flex flex-column pa-3" style="height: 51vh">
      <v-row>
        <v-col
          style="padding: 0.15%"
          v-for="button in buttons"
          :key="button"
          cols="3"
        >
          <base-button
            @inp="input"
            :value="button"
            :isDisable="disable_btn && checkDisableBtn(button)"
          ></base-button>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import calculatorMixin from "./mixins/calculator";
import BaseButton from "./ui/BaseButton.vue";
import HistoryDialog from "./ui/HistoryDialog.vue";

export default {
  components: {
    BaseButton,
    HistoryDialog,
  },
  mixins: [calculatorMixin],
  methods: {
    checkDisableBtn(button) {
      if (this.disable_btn_list.find((btn) => button === btn)) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  },
};
</script>

<style>
.v-text-field input {
  font-size: 1.5rem;
  font-weight: bolder;
}

@media (max-height: 300px) {
  .v-textarea textarea {
    font-size: 0.8rem;
  }
  .v-text-field input {
    font-size: 1.1rem;
  }
}
</style>
