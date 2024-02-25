<template>
    <Header></Header>
    <div>
        <RouterView></RouterView>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/navbar.vue';
import Footer from './components/footer.vue';
</script>
