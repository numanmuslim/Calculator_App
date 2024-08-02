<template>
  <div class="text-center pa-4">
    <v-bottom-sheet v-model="sheet" height="60%" inset>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon v-bind="activatorProps"><v-icon>mdi-history</v-icon></v-btn>
      </template>
      <v-card style="box-shadow: none">
        <v-toolbar style="background-color: whitesmoke">
          <v-btn icon="mdi-close" @click="sheet = false"></v-btn>
          <v-toolbar-title>History</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="$store.dispatch('clearHistory')"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </v-toolbar-items>
        </v-toolbar>
        <v-list v-if="hasHistory" lines="two" subheader>
          <v-list-item
            v-for="(item, index) in history"
            :key="index"
            class="history-item"
            @click="historyItemClick(index)"
          >
            <v-list-item-title class="expression">{{
              item.expression
            }}</v-list-item-title>
            <v-list-item-subtitle class="result">{{
              item.result
            }}</v-list-item-subtitle>
            <template #append>
              <v-btn icon @click.stop="removeHistoryItem(index)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        <p v-else class="ma-2">There's no history yet.</p>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  emit: ["historyItemClick"],
  data() {
    return {
      sheet: false,
    };
  },
  computed: {
    history() {
      return this.$store.getters.history;
    },
    hasHistory() {
      return this.$store.getters.hasHistory;
    },
  },
  methods: {
    historyItemClick(ind) {
      this.sheet = false;
      this.$emit("historyItemClick", ind);
    },
    removeHistoryItem(ind) {
      this.$store.dispatch("removeHistoryItem", { ind });
    },
  },
};
</script>

<style>
.v-bottom-sheet__content {
  background-color: white;
}

.history-item .expression {
  font-size: 0.9rem;
  color: grey;
  /* text-align: right; */
  margin-right: 1%;
}

.history-item .result {
  /* text-align: right; */
  font-weight: 1000;
  font-size: 1.25rem;
  color: #000000;
  margin-top: 1%;
  margin-right: 1%;
}
</style>
