<template>
    <div
        class="w-full h-60 sm:h-72  p-5 bg-white rounded-lg"
    >
        <div class="w-full h-full flex gap-0.5 overflow-x-scroll items-end no-scrollbar" ref="graphContainer">
            <div
                v-for="(line, index) in graph"
                :key="index"
                class="w-custom-graph-sm sm:w-custom-graph-md bg-yellow-300 flex-none"
                :style="{ height: 'calc(100% + ' + line + '%)' }"
            />
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    methods: {},
    computed: {
        graph() {
            return this.$store.getters[
                "cryptoCompareModule/graphAtPercentage"
            ];
        },
    },
    watch: {
        graph() {
            this.$refs.graphContainer.scrollLeft = this.$refs.graphContainer.scrollWidth
        }
    }
};
</script>
<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none; 
}
</style>