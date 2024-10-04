<script setup lang="ts">
const route = useRoute();
const { data, status } = await useLazyFetch(
    `/api/pokemon/${route.params.name}/spawn`,
);
const locations = data.value as {
    ok: boolean;
    response: {
        location_name: string;
        min_level: number;
        max_level: number;
        method: string;
    }[];
};
</script>

<template>
    <p v-if="status === 'pending'">Loading!</p>
    <template v-else>
        <h2 class="mb-4 text-4xl font-semibold">Locations</h2>
        <div class="location-wrapper mb-8 gap-6">
            <div v-for="spawn of locations.response"
                class="flex flex-col rounded-[10px] bg-teal-700 p-4 text-slate-50 dark:bg-teal-200 dark:text-slate-800">
                <p class="mb-2 font-semibold">{{ spawn.location_name }}</p>
                <div class="mt-auto flex gap-2">
                    <template v-if="spawn.min_level === spawn.max_level">
                        <span
                            class="rounded-xl bg-neutral-100 px-2 py-1 text-sm text-neutral-950 dark:bg-teal-800 dark:text-neutral-100">
                            Level {{ spawn.min_level }}
                        </span>
                    </template>
                    <template v-else>
                        <span
                            class="rounded-xl bg-neutral-100 px-2 py-1 text-sm text-neutral-950 dark:bg-teal-800 dark:text-neutral-100">
                            Level {{ spawn.min_level }} - {{ spawn.max_level }}
                        </span>
                    </template>
                    <span
                        class="rounded-xl bg-neutral-100 px-2 py-1 text-sm text-neutral-950 dark:bg-teal-800 dark:text-neutral-100">
                        {{ spawn.method }}
                    </span>
                </div>
            </div>
        </div>
    </template>
</template>

<style scoped>
.location-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
