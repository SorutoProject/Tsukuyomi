<template>
  <div>
    <p class="text-h5"><v-btn icon elevation="0" v-on:click="goBack">
      <v-icon>mdi-arrow-left</v-icon></v-btn> {{$t("shareMultiple.title")}}</p>
    <p>
      <v-btn text v-on:click="share">
        <v-icon>mdi-share-all</v-icon>
        　{{$t("shareMultiple.buttons.share")}}
      </v-btn>
    </p>
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
            checkable="true"
          ></tsukuyomi-card>
        </v-col>
      </v-row>
    </v-container>
    <p
      v-if="events.length === 0 && !isPending"
      class="text-center text--secondary"
    >
      {{ $t("shareMultiple.noEventsFoundText") }}
    </p>
    <!--no selected snackbar-->
    <v-snackbar v-model="noSelected" timeout="3000">
      {{$t("shareMultiple.noSelected")}}
    </v-snackbar>
    <!--copied snackbar-->
    <v-snackbar v-model="copied" timeout="3000">
      {{$t("shareMultiple.urlCopied")}}
    </v-snackbar>

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
      copied:false,
      noSelected:false
    };
  },
  mounted() {
    //Get events from DB
    const db = new Dexie("Tsukuyomi_events");
    db.version(1).stores({
      events: "title",
    });

    const self = this;
    db.events
      .orderBy("title")
      .sortBy("date")
      .then((events) => {
        //extract events only in the future
        const eventsFiltered = events.filter((event) => {
          const now = new Date();
          now.setHours(0, 0, 0);
          const target = new Date(event.date);
          target.setHours(0, 0, 0);

          const remainDayCount = Math.ceil(
            (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );

          if(remainDayCount >= 0){
            return true;
          }else{
            return false;
          }
        });

        self.events = eventsFiltered;
        self.isPending = false;
      });
  },
  methods:{
    goBack(){
      router.go(-1);
    },
    share(){
      //extract events from checked cards
      const checkedElems = document.querySelectorAll(`.tsukuyomi-card[data-checked="true"]`);
      if(checkedElems.length === 0){
        this.noSelected = true; //show no selected message
        return;
      }
      let events = [];
      checkedElems.forEach(function(elem){
        events.push(elem.dataset.date);
        events.push(elem.dataset.title);
      });

      //copy multiple sharing url to clipboard
      //make a textbox
      const copyForm = document.createElement("input");
      //set URL
      copyForm.value = new URL("./", location.href).href + "#/sm/" + encodeURIComponent(events.join("||"));
      //append to <body>
      document.body.appendChild(copyForm);

      //select text in copyForm
      copyForm.select();
      //Exec copy
      document.execCommand("copy");
      //remove copyForm
      copyForm.remove();

      //show copied message
      this.copied = true;
    }
  }
};
</script>
