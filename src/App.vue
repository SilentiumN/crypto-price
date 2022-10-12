<template>
    <CryptoPriceApp />
</template>

<script>
import CryptoPriceApp from "@/components/CryptoPriceApp.vue";

export default {
    name: "App",
    components: {
        CryptoPriceApp,
    },
    data() {
        return {
          ws: null
        };
    },
    mounted() {},
    methods: {
        
    },
};
</script>

<style></style>
