<template>
    <div class="bg-gray-100 min-h-screen min-w-screen">
        <div class="sm:px-6 sm:pt-6">
            <CryptoAddNewValueBox />
        </div>
        <div class="px-4 pt-4 sm:px-6 pb-16 sm:pb-0">
            <CryptoSearchBox />
            <div
                class="flex flex-row flex-wrap items-start gap-4 mt-4.5 mb-6"
            >
                <CryptoRatesCard />
                <CryptoRatesCard />
                <CryptoRatesCard />
                <CryptoRatesCard />
                <CryptoRatesCard />
            </div>
            <div class="font-inter flex items-center justify-between bg-white sm:bg-transparent py-3 px-4 sm:px-0 border-t border-solid border-gray-200 fixed sm:relative bottom-0 left-0 right-0" >
                <span
                    class="text-sm leading-5 font-normal text-gray-700 hidden sm:block"
                    >Показано 6 результатов из 10</span
                >
                <div class="w-full flex justify-between sm:w-fit">
                    <CryptoButtonGray class="sm:mr-3">Назад</CryptoButtonGray>
                    <CryptoButtonGray>Далее</CryptoButtonGray>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CryptoAddNewValueBox from "@/components/CryptoAddNewValueBox.vue";
import CryptoSearchBox from "@/components/CryptoSearchBox.vue";
import CryptoRatesCard from "@/components/CryptoRatesCard.vue";
import CryptoButtonGray from "@/components/CryptoButtonGray.vue";

export default {
    name: "App",
    components: {
        CryptoAddNewValueBox,
        CryptoSearchBox,
        CryptoRatesCard,
        CryptoButtonGray,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>

<style></style>
