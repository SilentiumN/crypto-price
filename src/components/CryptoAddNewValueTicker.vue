<template>
    <div class="flex flex-col bg-white shadow-sm border border-solid border-gray-300 rounded-md py-3 px-2 w-full max-w-440">
        <label class="text-xs text-gray-700"> Тикер</label>
        <input class="text-base text-gray-500 outline-0 font-inter" placeholder="Например DOGE" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
        };
    },
    methods: {},
    props: {
        modelValue: {
            type: String,
            required: true
        }
    }
};
</script>

<style>
</style>