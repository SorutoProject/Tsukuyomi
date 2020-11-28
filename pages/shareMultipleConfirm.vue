<template>
<div>
  <div>
    <p class="text-h5">{{$t("addConfirm.shareMultiple.title")}}</p>
    <p>{{$t("addConfirm.shareMultiple.confirmText")}}</p>
    <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
    <!--events list-->
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="event in newEvents"
          :key="event.title"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <tsukuyomi-card
            :title="event.title"
            :date="event.date"
          ></tsukuyomi-card>
        </v-col>
      </v-row>
    </v-container>
    <p class="text--secondary text-caption" v-html="$t('addConfirm.shareMultiple.cautionText')"></p>
    <p>
      <v-btn to="/" text>
        {{$t("addConfirm.shareMultiple.buttons.cancel")}}
      </v-btn>
      <v-btn @click="applyEvent" text class="teal white--text" :loading="loading">
        <v-icon>mdi-plus</v-icon> {{$t("addConfirm.shareMultiple.buttons.submit")}}
      </v-btn>
    </p>
  </div>
</div>
</template>
<script>
module.exports = {
  data() {
    return {
      newEvents: [],
      loading:false
    }
  },
  mounted(){
    //build newEvents
    //eventsSet Format: date1||eventTitle1||date2||eventTitle2||...

    const eventsSet = this.$route.params.eventsSet.split("||");
    let events = [];
    for(let i = 0; i < eventsSet.length; i = i+2){
      const event = {
        date:eventsSet[i],
        title:eventsSet[i+1]
      }
      events.push(event);
    }
    this.newEvents = events;
  },
  methods: {
    applyEvent() {
      //Show Loading Animation Circle
      this.loading = true;
      //Save to IndexedDB
      const db = new Dexie("Tsukuyomi_events");
      db.version(1).stores({
        events: "title"
      });

      db.events.bulkPut(this.newEvents)
        .then(() => {
          router.replace("/");
        })
        .catch(e => {
          alert(e)
          throw e;
        });
    }
  },
  components: {
    "tsukuyomi-card": httpVueLoader("../components/tsukuyomi/tsukuyomi-card.vue")
  }
}
</script>
