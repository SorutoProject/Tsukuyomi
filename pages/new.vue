<template>
    <div>
        <div class="text-h5">
            <p><v-btn icon elevation="0" to="/">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>　
            新しいイベントを作成</p></div>
            <v-text-field v-model="newEvent.title" label="イベントの名称" placeholder="例：文化祭"></v-text-field>
        <v-row justify="center">            
            <v-date-picker v-model="newEvent.date" full-width locale="ja-jp"></v-date-picker>
        </v-row>
        <v-btn @click="submit" :disabled="newEvent.title == '' || newEvent.date == ''"><v-icon>mdi-plus</v-icon> イベントを作成</v-btn>
    </div>
</template>
<script>
module.exports = {
    data:function(){
        return {
            "newEvent":{
                "title":"",
                "date":""
            }
        }
    },
    methods:{
        submit(){
            router.push(`/add/${this.newEvent.date}/${this.newEvent.title}`);
        }
    }
}
</script>