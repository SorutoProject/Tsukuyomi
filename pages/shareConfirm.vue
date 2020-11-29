<template>
<div>
  <div>
    <p class="text-h5">{{$t("addConfirm.share.title")}}</p>
    <p>{{$t("addConfirm.share.confirmText")}}</p>
    <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
    <tsukuyomi-card :title="newEvent.title" :date="this.$route.params.yyyymmdd" elevation="0"></tsukuyomi-card>
    <p class="text--secondary text-caption" v-html="$t('addConfirm.share.cautionText')"></p>
    <p>
      <v-btn to="/" text>
        {{$t("addConfirm.share.buttons.cancel")}}
      </v-btn>
      <v-btn @click="applyEvent" text class="teal white--text">
        <v-icon>mdi-plus</v-icon> {{$t("addConfirm.share.buttons.submit")}}
      </v-btn>
    </p>
  </div>
</div>
</template>
<script>
module.exports = {
  data() {
    return {
      newEvent: {
        year: this.$route.params.yyyymmdd.split("-")[0],
        month: this.$route.params.yyyymmdd.split("-")[1],
        date: this.$route.params.yyyymmdd.split("-")[2],
        title: this.$route.params.title
      }
    }
  },
  mounted(){
    //check whether shared events has already registered.
    const db = new Dexie("Tsukuyomi_events");
    db.version(1).stores({
      events: "title"
    });

    const self = this;
    db.events.get(this.newEvent.title).then(function(event){
      if(event !== undefined){
        if(event.date === self.$route.params.yyyymmdd){
          //if registered, move to TOP and highlight the event
          router.replace(`/?highlight=${self.$route.params.title}`)
        }    
      }
    });
  },
  methods: {
    applyEvent() {
      //Save to IndexedDB
      const db = new Dexie("Tsukuyomi_events");
      db.version(1).stores({
        events: "title"
      });

      db.events.put({
          title: this.newEvent.title,
          date: `${this.newEvent.year}-${this.newEvent.month}-${this.newEvent.date}`
        })
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
