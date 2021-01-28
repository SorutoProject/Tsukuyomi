<template>
  <div>
    <p>
      <v-btn text @click="share">
        <v-icon>mdi-share-all</v-icon>　{{$t("shareMultiple.buttons.share")}}
      </v-btn>
      <v-btn text @click="selectAll">
        {{$t("shareMultiple.buttons.selectAll")}}
      </v-btn>
      <v-btn text @click="deselect" color="red">
        {{$t("shareMultiple.buttons.deselect")}}
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
  data() {
    return {
      events: [],
      isPending: true,
      copied:false,
      noSelected:false
    };
  },
  mounted() {
    //Update Title
    tsukuyomi.app.changeTitle(this.$t("shareMultiple.title"));

    //Get events from DB
    const self = this;
    tsukuyomi.db.events
      .orderBy("id")
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
    },
    selectAll(){
      document.querySelectorAll(".tsukuyomi-card:not([data-checked]) .tsukuyomi-card-check").forEach(function(check){
        check.click();
      });
    },
    deselect(){
      document.querySelectorAll(".tsukuyomi-card[data-checked] .tsukuyomi-card-check").forEach(function(check){
        check.click();
      });
    }
  }
};
</script>
