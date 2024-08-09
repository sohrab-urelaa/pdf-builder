<template>
    <div class="bg-red-400">{{ name }} {{ lastName }}</div>
</template>

<script>
export default {
    name: "Greet",
    data() {
        return {
            name: "Md Sohel Rana",
        };
    },
    props: {
        name: String,
        lastName: String,
    },
};
</script>

<style scoped></style>
