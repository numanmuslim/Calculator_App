<template>
  <v-app @keydown.enter.prevent>
    <div class="d-flex flex-column pa-3" style="height: 15vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 10vh">
            <v-app-bar app color="transparent" dark>
              <v-toolbar-title
                ><v-icon class="pa-0">mdi-calculator</v-icon
                >Calculator</v-toolbar-title
              >
              
            </v-app-bar>
          </v-responsive>
        </v-col>
      </v-row>
    </div>
      <div class="d-flex flex-column pa-3" style="height: 15vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 10vh">
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
      <div class="d-flex flex-column pa-3" style="height: 15vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 10vh">
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
    <div class="d-inline-flex flex-column pa-3" style="height: 55vh">
      <v-row>
        <v-col style="padding: 0.15%;" v-for="button in buttons" :key="button" cols="3">
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
import { computed } from "vue";
import { useDisplay } from "vuetify";


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
  setup() {
    const { name } = useDisplay();

    const height = computed(() => {
      // console.log(name._object.height)
      const displayHeight = name._object.height;
      if (450 > displayHeight) return "8vh";
      else if (450 <= displayHeight && displayHeight < 500) return "8.3vh";
      else if (500 <= displayHeight && displayHeight < 550) return "8.5vh";
      else if (550 <= displayHeight && displayHeight <= 600) return "8.8vh";
      else if (600 <= displayHeight && displayHeight < 650) return "9.1vh";
      else if (650 <= displayHeight && displayHeight < 700) return "9.5vh";
      else if (700 <= displayHeight && displayHeight < 750) return "9.6vh";
      else if (750 <= displayHeight && displayHeight <= 850) return "9.7vh";
      else if (1000 <= displayHeight && displayHeight <= 1280) return "10.3vh";
      else if (1280 <= displayHeight) return "10.6vh";
      else return "10vh";
    });
    //   console.log(height.value)
    return { height };
  },
};
</script>

<style>

.v-application {
  background-color: #f3f3f3;
}
.v-text-field input {
    font-size: 1.5rem;
    font-weight: bolder;
}

@media (min-height: 551px) and (max-height: 650px) {
  .v-text-field input,
  .v-textarea textarea {
    font-size: 1.4rem;
  }
}

@media (min-height: 651px) and (max-height: 750px) {
  .v-text-field input,
  .v-textarea textarea {
    font-size: 1.6rem;
  }
}

@media (min-height: 751px) and (max-height: 850px) {
  .v-text-field input,
  .v-textarea textarea {
    font-size: 1.8rem;
  }
}

@media (min-height: 851px) and (max-height: 1000px) {
  .v-text-field input,
  .v-textarea textarea {
    font-size: 2rem;
  }
}

@media (min-height: 1001px) {
  .v-text-field input,
  .v-textarea textarea {
    font-size: 2.2rem;
  }
}

</style>
