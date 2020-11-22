<template>
<div>
     <div class="text-h5">
            <p><v-btn icon elevation="0" to="/" text>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>　
            イベントの詳細</p>
        </div>
    <p>あと<span v-text="remainDayCount" class="text--primary text-h6"></span>日</p>
    <p>{{$route.params.title}}</p>
</div>
</template>
<script>
module.exports = {
    data(){
        return {
            remainDayCount: 0
        }
    },
    mounted(){
        //Calclate how many days
        const now = (new Date()).getTime();
        const target = (new Date(this.$route.params.yyyymmdd)).getTime();

        this.remainDayCount = Math.ceil((target - now) / (1000*60*60*24));
    }
}
</script>