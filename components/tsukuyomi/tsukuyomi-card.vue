<template>
    <div>
        <v-card>
            <v-card-text>
                あと<span class="display-1 text-h3 text--primary">{{remainDayCount}}</span>日
                
                <v-card-title>{{title}}</v-card-title>
                <v-card-subtitle>{{date}}</v-card-subtitle>
            </v-card-text>
            <v-card-actions>
                <v-btn :to="'/detail/' + date + '/' +title" text>詳細を確認</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
module.exports = {
    props:["title", "date"],
    data(){
        return {
            "remainDayCount":0
        }
    },
    mounted(){
        //Calclate how many days
        const now = (new Date()).getTime();
        const target = (new Date(this.date)).getTime();

        this.remainDayCount = Math.ceil((target - now) / (1000*60*60*24));
    }
}
</script>