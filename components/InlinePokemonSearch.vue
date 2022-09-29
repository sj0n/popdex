<script setup lang="ts">
let name = ref('');
let url = ref('');
watch(name, (newName) => {
    url.value = `/pokemon/${newName}`;
})
</script>
<template>
    <form :action="url" method="get" class="form-control" :name="name">
        <input type="text" id="name" placeholder="Search a pokemon, e.g. pikachu" class="input-text" v-model="name">
    </form>
</template>
<style scoped>
.input-text {
    margin-left: auto;
}

@media screen and (max-width: 49rem) {
    .input-text {
        margin-right: auto;
    }
}
</style>