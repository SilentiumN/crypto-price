<template>
    <div class="relative w-full max-w-456">
        <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
            <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
            </svg>
        </div>
        <input
            type="search"
            id="default-search"
            class="p-3 pl-11 w-full text-base text-gray-500 bg-white rounded-lg border border-solid border-gray-300 shadow-sm outline-none font-inter"
            placeholder="Найти тикер"
            v-model="searchValue"
        />
        
    </div>
</template>

<script>
export default {
    computed: {
        searchValue: {
            get() {
                return this.$store.state.cryptoCompareModule.filterValue
            },
            set(newValue) {
                this.$store.dispatch("cryptoCompareModule/updateFilteredSubName", newValue.toUpperCase())
            }
        }
    }
};
</script>

