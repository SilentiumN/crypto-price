<template>
    <div class="font-inter p-4 bg-white rounded-none sm:rounded-lg w-full">
        <CryptoAddNewValueTicker :modelValue="newSubValue" @update:modelValue="newValue => newSubValue = newValue"/>
        <CryptoButtonPurple class="mt-3" @click="addNewSubValue">Добавить </CryptoButtonPurple>
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
        return {
            newSubValue: ''
        };
    },
    methods: {
        addNewSubValue() {
            this.$store.dispatch("cryptoCompareModule/addNewSub", [this.newSubValue.toUpperCase()])
            this.newSubValue = ""
        }
    },
};
</script>
