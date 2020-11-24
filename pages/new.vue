<template>
    <div>
        <div class="text-h5">
            <p><v-btn icon elevation="0" v-on:click="goBack">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn> 
            {{$t("new.newEventText")}}</p>
        </div>
            <p>
                <v-text-field
                    v-model="newEvent.title"
                    :label="$t('new.titleTextBox.label')"
                    :placeholder="$t('new.titleTextBox.placeholder')"
                    counter="50"
                    maxlength="50"
                    clearable    
                ></v-text-field>
            </p>
            <p>
                <span class="text-caption">{{$t("new.startDateText")}}</span><br>     
                <v-date-picker
                v-model="newEvent.date"
                :locale="userLang"
                :day-format="date => new Date(date).getDate()"
                :min="today"
                ></v-date-picker>
            </p>
            <p>
                <v-btn @click="submit" :disabled="newEvent.title === '' || newEvent.date === ''" class="teal white--text"><v-icon>mdi-plus</v-icon> {{$t("new.submitText")}}</v-btn>
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
            "today":"",
            "userLang":navigator.language
        }
    },
    mounted(){
        const today = new Date();
        this.today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    },
    methods:{
        submit(){
            router.push(`/add/${this.newEvent.date}/${this.newEvent.title}`);
        },
        goBack(){
            router.go(-1);
        }
    }
}
</script>