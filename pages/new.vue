<template>
    <div>
        <div class="text-h5">
            <p><v-btn icon elevation="0" to="/" text>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>　
            新しいイベントを作成</p></div>
            <p>
                <v-text-field
                    v-model="newEvent.title"
                    label="イベントの名称"
                    placeholder="例：文化祭"
                    counter="50"
                    maxlength="50"
                    clearable    
                ></v-text-field>
            </p>
            <p>
                <span class="text-caption">イベント開始日</span><br>     
                <v-date-picker
                v-model="newEvent.date"
                locale="ja-jp"
                :day-format="date => new Date(date).getDate()"
                :min="today"
                ></v-date-picker>
            </p>
            <p>
                <v-btn @click="submit" :disabled="newEvent.title == '' || newEvent.date == ''"><v-icon>mdi-plus</v-icon> イベントを作成</v-btn>
            </p>
        
    </div>
</template>
<script>
module.exports = {
    data(){
        return {
            "newEvent":{
                "title":"",
                "date":""
            },
            "today":""
        }
    },
    mounted(){
        const today = new Date();
        this.today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    },
    methods:{
        submit(){
            router.push(`/add/${this.newEvent.date}/${this.newEvent.title}`);
        }
    }
}
</script>