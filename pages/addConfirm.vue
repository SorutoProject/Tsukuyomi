<template>
    <div>
        <div v-if="!isShare">
            <p class="text-h5">イベントの作成確認</p>
            <p>次のイベントを作成しますか？</p>
            <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
            <tsukuyomi-card :title="newEvent.title" :date="this.$route.params.yyyymmdd" elevation="0"></tsukuyomi-card>
            <p class="text--secondary text-caption">このページが外部サイトのリンクなどから表示された場合、このイベントは、他のユーザーが作成したものです。<br>このイベントを追加することによる損害などについて、開発者は一切の責任を負いません。</p>
            <p>
                <v-btn to="/new" text>
                    キャンセル
                </v-btn>
                <v-btn @click="applyEvent">
                  <v-icon>mdi-plus</v-icon> イベントを作成
                </v-btn>
            </p>
        </div>
        <div v-if="isShare">
            <p class="text-h5">イベントの共有</p>
            <p>次の共有されたイベントをイベントリストに追加しますか？</p>
            <!--<p>タイトル：{{newEvent.title}}</p>
            <p>イベント開始日：{{newEvent.year}}年{{newEvent.month}}月{{newEvent.date}}日</p>-->
            <tsukuyomi-card :title="newEvent.title" :date="this.$route.params.yyyymmdd" elevation="0"></tsukuyomi-card>
            <p class="text--secondary text-caption">このイベントは、他のユーザーが作成したものです。<br>このイベントを追加することによる損害などについて、開発者は一切の責任を負いません。</p>
            <p>
                <v-btn to="/" text>
                    キャンセル
                </v-btn>
                <v-btn @click="applyEvent" text class="teal white--text">
                  <v-icon>mdi-plus</v-icon> イベントを追加
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
            },
            isShare: this.$route.params.share !== undefined
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
    },
    components:{
        "tsukuyomi-card":httpVueLoader("../components/tsukuyomi/tsukuyomi-card.vue")
    }
}
</script>