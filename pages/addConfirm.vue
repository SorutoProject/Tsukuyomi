<template>
    <div>
        <div>
            <p class="text-h5">{{$t("addConfirm.add.title")}}</p>
            <p>{{$t("addConfirm.add.confirmText")}}</p>
            <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
            <tsukuyomi-card :title="newEvent.title" :date="this.$route.params.yyyymmdd" elevation="0"></tsukuyomi-card>
            <p class="text--secondary text-caption" v-html="$t('addConfirm.add.cautionText')"></p>
            <p>
                <v-btn to="/new" text>
                    {{$t("addConfirm.add.buttons.cancel")}}
                </v-btn>
                <v-btn @click="applyEvent">
                  <v-icon>mdi-plus</v-icon> {{$t("addConfirm.add.buttons.submit")}}
                </v-btn>
            </p>
        </div>
    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            newEvent:{
                year:this.$route.params.yyyymmdd.split("-")[0],
                month:this.$route.params.yyyymmdd.split("-")[1],
                date:this.$route.params.yyyymmdd.split("-")[2],
                title: this.$route.params.title
            }
        }
    },
    methods: {
        applyEvent(){
            //Save to IndexedDB
            const db = new Dexie("Tsukuyomi_events");
            db.version(1).stores({
                events:"title"
            });

            db.events.put({
                title: this.newEvent.title,
                date: `${this.newEvent.year}-${this.newEvent.month}-${this.newEvent.date}`
            })
            .then(()=>{
                router.replace("/");
            })
            .catch(e => {
                alert(e)
                throw e;
            });
        }
    }
}
</script>
