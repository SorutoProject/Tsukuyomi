<template>
  <div>
    <p>
      <v-btn to="/new" text>
        <v-icon>mdi-plus</v-icon>
        　新しいイベントを作成
      </v-btn>
    </p>
    <span class="text-h6">イベントリスト</span>
    <!--loader-->
    <p class="text-center" v-if="isPending">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </p>

    <v-container fluid v-if="events.length > 0 && !isPending">
      <v-row dense>
        <v-col
          v-for="event in events"
          :key="event.title"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <tsukuyomi-card
            :title="event.title"
            :date="event.date"
            removable="true"
            sharable="true"
          ></tsukuyomi-card>
        </v-col>
      </v-row>
    </v-container>
    <p
      v-if="events.length === 0 && !isPending"
      class="text-center text--scondary"
    >
      イベントは登録されていません
    </p>
  </div>
</template>
<script>
module.exports = {
  components: {
    "tsukuyomi-card": httpVueLoader(
      "../components/tsukuyomi/tsukuyomi-card.vue"
    ),
  },
  data() {
    return {
      events: [],
      isPending: true,
    };
  },
  mounted() {
    //Get events from DB
    const db = new Dexie("Tsukuyomi_events");
    db.version(1).stores({
      events: "title",
    });

    const self = this;
    db.events.toArray((events) => {
      self.events = events;
      self.isPending = false;
    });
  }
};
</script>