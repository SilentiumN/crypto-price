<template>
    <div class="w-full sm:w-custom-2 lg:w-custom-3 2xl:w-custom-4" v-if="cryptoPrice != 0">
        <div
            class="flex flex-col items-start py-5 px-4 bg-white border border-solid border-gray-300 rounded-lg font-inter transition-all"
            
            :class="{'ring ring-gray-900': cryptoName === activeSubNameGraph}"
            
        >
            <div
                class="text-sm leading-5 font-medium text-gray-900 flex justify-between w-full"
            >
                {{ cryptoName }}
                <button @click="deleteSub" ref="deleteButton">
                    <svg
                        class="w-4 h-4 text-gray-400"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.8335 4.83333L13.1107 14.9521C13.0484 15.8243 12.3227 16.5 11.4483 16.5H4.55203C3.67763 16.5 2.9519 15.8243 2.8896 14.9521L2.16683 4.83333M6.3335 8.16667V13.1667M9.66683 8.16667V13.1667M10.5002 4.83333V2.33333C10.5002 1.8731 10.1271 1.5 9.66683 1.5H6.3335C5.87326 1.5 5.50016 1.8731 5.50016 2.33333V4.83333M1.3335 4.83333H14.6668"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div class="text-4xl leading-10 font-normal text-gray-900 w-full cursor-pointer" @click="setGraph">
                {{ cryptoPrice + "$" }}
            </div>
        </div>
        <CryptoGraph v-if="windowWidth < 640 && cryptoName === activeSubNameGraph" class="mt-3"/>
    </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
    components: {
        CryptoGraph: defineAsyncComponent(() =>
            import("@/components/CryptoGraph.vue")
        ),
    },
    methods: {
        deleteSub() {
            
            this.$store.dispatch(
                "cryptoCompareModule/deleteSub",
                this.cryptoName
            );
        },
        setGraph() {
            this.$store.dispatch(
                "cryptoCompareModule/setGraph",
                this.cryptoName
            );
           
        },

    },
    props: {
        cryptoName: {
            type: String,
            require: true,
        },
        cryptoPrice: {
            type: Number,
            require: true,
        },
        graphLarge: {
            type: Boolean,
            require: true,
        },
    },
    computed: {
        activeSubNameGraph() {
            return this.$store.state.cryptoCompareModule.activeSubNameGraph;
        },
        windowWidth() {
            return this.$store.state.cryptoCompareModule.windowWidth;
        },
    },
};
</script>
