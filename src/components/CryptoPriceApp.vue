<template>
    <div class="bg-gray-100 min-h-screen min-w-screen">
        <div class="sm:px-6 sm:pt-6">
            <CryptoAddNewValueBox />
        </div>
        <div
            class="px-4 pt-4 sm:px-6 pb-16 sm:pb-0"
            v-if="connecting === 'success'"
        >
            <CryptoSearchBox />
            <div
                v-if="cryptoSubNameLength != 0"
                class="flex flex-row flex-wrap items-start gap-4 mt-4.5 mb-6"
            >
                <CryptoRatesCard
                    v-for="cryptoItem in cryptoSubNameInPage"
                    :key="cryptoItem"
                    :cryptoName="cryptoItem"
                    :cryptoPrice="cryptoPrice[cryptoItem]"
                />
            </div>
            <CryptoGraph v-if="windowWidth >= 640 && activeSubNameGraph" />
            <div
                class="font-inter flex items-center justify-between bg-white sm:bg-transparent py-3 px-4 sm:px-0 border-t border-solid border-gray-200 fixed sm:relative bottom-0 left-0 right-0"
                v-if="cryptoSubNameLength != 0"
            >
                <span
                    class="text-sm leading-5 font-normal text-gray-700 hidden sm:block"
                    >Показано {{ cryptoSubNameVisibleLength }} результатов из
                    {{ cryptoSubNameLength }}</span
                >
                <div class="w-full flex justify-between sm:w-fit">
                    <CryptoButtonGray
                        class="sm:mr-3"
                        @click="decreasePage"
                        :disabled="page === 1"
                        >Назад</CryptoButtonGray
                    >
                    <CryptoButtonGray
                        @click="incrementPage"
                        :disabled="page === maxPage"
                        >Далее</CryptoButtonGray
                    >
                </div>
            </div>
        </div>
        <div
            v-else-if="connecting === 'loading'"
            class="font-inter flex items-center justify-center p-4 text-lg text-gray-700 transition-all"
        >
        <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="40"
                height="40"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                class="animate-spin"
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="rgb(55, 65, 81)"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                ></circle>
            </svg>
            Идет загрузка
        </div>
        <div
            v-else
            class="font-inter flex items-center justify-center p-4 text-lg text-gray-700 transition-all text-center"
        >
            Ошибка при соединении с сервером. Одновременно может быть не более
            одного клиента.
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
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
        CryptoGraph: defineAsyncComponent(() =>
            import("@/components/CryptoGraph.vue")
        ),
    },
    mounted() {
        this.$store.dispatch("cryptoCompareModule/openWebSocket");
        this.updateWindowWidth();
        window.addEventListener("resize", this.updateWindowWidth);
    },
    unmounted() {
        window.removeEventListener("resize", this.updateWindowWidth);
    },
    methods: {
        incrementPage() {
            this.$store.dispatch("cryptoCompareModule/updatePage", "increment");
        },
        decreasePage() {
            this.$store.dispatch("cryptoCompareModule/updatePage", "decrease");
        },
        updateWindowWidth() {
            this.$store.dispatch(
                "cryptoCompareModule/updateWindowWidth",
                window.innerWidth
            );
        },
    },
    computed: {
        cryptoPrice() {
            return this.$store.state.cryptoCompareModule.cryptoSubValue;
        },
        page() {
            return this.$store.state.cryptoCompareModule.page;
        },
        maxPage() {
            return this.$store.getters["cryptoCompareModule/maxPage"];
        },
        cryptoSubNameLength() {
            return this.$store.getters[
                "cryptoCompareModule/filteredCryptoSubName"
            ].length;
        },
        cryptoSubNameVisibleLength() {
            return this.$store.getters[
                "cryptoCompareModule/cryptoSubNameVisibleLength"
            ];
        },
        cryptoSubNameInPage() {
            return this.$store.getters[
                "cryptoCompareModule/cryptoSubNameInPage"
            ];
        },
        activeSubNameGraph() {
            return this.$store.state.cryptoCompareModule.activeSubNameGraph;
        },
        windowWidth() {
            return this.$store.state.cryptoCompareModule.windowWidth;
        },
        connecting() {
            return this.$store.state.cryptoCompareModule.connecting;
        },
    },
};
</script>
