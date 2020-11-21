<template>
    <div>
        <p><v-btn to="/new" text>
            <v-icon>mdi-plus</v-icon>
            新しいイベントを作成
        </v-btn></p>
        <v-container fluid>
            <v-row dense>
                <v-col
                    v-for="event in events"
                    :key="event.title"
                    cols="3"
                >
                    <tsukuyomi-card :title="event.title" :date="event.date"></tsukuyomi-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
module.exports = {
    components:{
        "tsukuyomi-card":httpVueLoader("../components/tsukuyomi/tsukuyomi-card.vue")
    },
    data(){
        return {
            events:[]
        }
    },
    mounted(){
        //Get events from DB
        const db = new Dexie("Tsukuyomi_events");
        db.version(1).stores({
            events:"title"
        });

        const self = this;
        db.events.toArray(events => {
            self.events = events;
        });
    }
}
</script>