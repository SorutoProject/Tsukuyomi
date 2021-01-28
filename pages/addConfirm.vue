<template>
    <div>
        <div>
            <p>{{$t("addConfirm.add.confirmText")}}</p>
            <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
            <tsukuyomi-card :title="newEvent.title" :date="this.$route.params.yyyymmdd" elevation="0"></tsukuyomi-card>
            <p class="text--secondary text-caption" v-html="$t('addConfirm.add.cautionText')"></p>
            <p>
                <v-btn to="/new" text>
                    {{$t("addConfirm.add.buttons.cancel")}}
                </v-btn>
                <v-btn @click="applyEvent" text class="yellow darken-4 white--text">
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
                title: this.$route.params.title,
                isExist:false
            }
        }
    },
    created(){
        const self = this;
    },
    mounted(){
        //Update Title
        tsukuyomi.app.changeTitle(this.$t("addConfirm.add.title"));
    },
    methods: {
        applyEvent(){
            //Save to IndexedDB
            tsukuyomi.db.events.put({
                id:tsukuyomi.generateId(),
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
