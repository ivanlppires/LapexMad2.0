<template>
    <v-card elevation="0" class="ma-0 pa-0" border>
        <v-card-title class="bg-teal-darken-3">
            <v-icon>{{ props.icon }}</v-icon>
            {{ props.title }}
        </v-card-title>
        <v-card-subtitle class="bg-grey-lighten-3 pa-3 font-italic">
            {{ props.subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <p v-for="(p, index) in props.text" :key="index" v-text="p"></p>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
// props
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    text: {
        type: Array,
        required: true
    }
})
</script>
<style scoped>
p {
    text-align: justify;
    padding: 0 0 1rem 0;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>