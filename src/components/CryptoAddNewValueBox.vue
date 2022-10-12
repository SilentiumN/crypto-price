<template>
    <div class="font-inter p-4 bg-white rounded-none sm:rounded-lg w-full">
        <CryptoAddNewValueTicker />
        <CryptoButtonPurple class="mt-3">Добавить </CryptoButtonPurple>
    </div>
</template>

<script>
import CryptoButtonPurple from "./CryptoButtonPurple.vue";
import CryptoAddNewValueTicker from "./CryptoAddNewValueTicker.vue";

export default {
    components: {
        CryptoButtonPurple,
        CryptoAddNewValueTicker,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
