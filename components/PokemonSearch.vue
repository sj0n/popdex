<script setup lang="ts">
import { ref, watch } from 'vue';
let name = ref('');
let url = ref('');
watch(name, (newName) => {
    url.value = `/pokemon/${newName}`;
})
</script>
<template>
    <form :action="url" method="get" class="form-control">
        <input type="text" id="name" placeholder="Search a pokemon, e.g. pikachu" class="input-text" v-model="name">
    </form>
</template>
<style scoped>
.input-text {
    margin-left: auto;
    margin-right: auto;
}
</style>