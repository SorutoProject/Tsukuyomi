<template>
  <div>
    <div v-if="!isPending">
      <p class="text-h5">{{ $t("addConfirm.share.title") }}</p>
      <p>{{ $t("addConfirm.share.confirmText") }}</p>
      <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
      <tsukuyomi-card
        :title="newEvent.title"
        :date="this.$route.params.yyyymmdd"
        elevation="0"
      ></tsukuyomi-card>
      <p
        class="text--secondary text-caption"
        v-html="$t('addConfirm.share.cautionText')"
      ></p>
      <p>
        <v-btn to="/" text>
          {{ $t("addConfirm.share.buttons.cancel") }}
        </v-btn>
        <v-btn @click="applyEvent" text class="teal white--text">
          <v-icon>mdi-plus</v-icon> {{ $t("addConfirm.share.buttons.submit") }}
        </v-btn>
      </p>
    </div>
    <div v-if="isPending" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      isPending:true,
      newEvent: {
        year: this.$route.params.yyyymmdd.split("-")[0],
        month: this.$route.params.yyyymmdd.split("-")[1],
        date: this.$route.params.yyyymmdd.split("-")[2],
        title: this.$route.params.title,
      },
    };
  },
  mounted() {
    //check whether shared events has already registered.
    const db = new Dexie("Tsukuyomi_events");
    db.version(1).stores({
      events: "title",
    });

    const self = this;
    db.events.get(this.newEvent.title).then(function (event) {
      if (event !== undefined) {
        if (event.date === self.$route.params.yyyymmdd) {
          //if registered, move to TOP and highlight the event
          //check if in the future or past
          const now = new Date();
          now.setHours(0, 0, 0);
          const target = new Date(event.date);
          target.setHours(0, 0, 0);

          const remainDayCount = Math.ceil(
            (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          );
          //future
          if(remainDayCount >= 0) router.replace(`/?highlight=${self.$route.params.title}`);
          //past
          else router.replace(`/past?highlight=${self.$route.params.title}`);
        }
      }else{
        self.isPending = false;
      }
    });
  },
  methods: {
    applyEvent() {
      //Save to IndexedDB
      const db = new Dexie("Tsukuyomi_events");
      db.version(1).stores({
        events: "title",
      });

      db.events
        .put({
          title: this.newEvent.title,
          date: `${this.newEvent.year}-${this.newEvent.month}-${this.newEvent.date}`,
        })
        .then(() => {
          router.replace("/");
        })
        .catch((e) => {
          alert(e);
          throw e;
        });
    },
  },
};
</script>
