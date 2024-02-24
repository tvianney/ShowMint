<template>
    <div>
        <img class="h-60 w-full px-96 py-10" src="../assets/la-cigale_logo_red.svg" alt="">
    </div>

    <Carousel/>

    <div class="pt-[80px] px-[200px] pb-[40px] mb-40">
        <div class="flex justify-items-center">
            <!-- <div class="-rotate-90 text-5xl text-nowrap">A L'AFFICHE</div> -->
            <div class="h-[450px] w-[350px] mr-12"> <img class="object-cover h-full hover:scale-110 transition duration-1000" src="../assets/tanya.jpg" alt="">
                <p class="text-sm text-center mt-8">CONCERT | AFROPOP</p>
                <p class="text-semibold text-5xl font-gothic text-center mt-2">TANYA ST-VAL</p>
                <p class="text-sm text-center mt-1 font-semibold">SAM. 24 FÉVR. | 19:30</p>
            </div>
            <div class="h-[450px] w-[350px] mr-12 "> <img class="object-cover h-full hover:scale-110 transition duration-1000" src="../assets/benny.jpg" alt="">
                <p class="text-sm text-center mt-8">SPECTACLE | HUMOUR, SKETCHS</p>
                <p class="text-semibold text-5xl font-gothic text-center mt-2">BENNY</p>
                <p class="text-sm text-center mt-1 font-semibold">DIM. 25 FÉVR. | 14:00 </p>
            </div>
            <div class="h-[450px] w-[350px] mr-12"> <img class="object-cover h-full hover:scale-110 transition duration-1000" src="../assets/seung-yull-nah.jpg" alt="">
                <p class="text-sm text-center mt-8">CONCERT | JAZZ, BLUES, GROOVE</p>
                <p class="text-semibold text-5xl font-gothic text-center mt-2">YOUN SUN NAH</p>
                <p class="text-sm text-center mt-1 font-semibold">LUN. 26 FÉVR. | 20:00</p>
            </div>
            <div class="h-[450px] w-[350px] mr-12"> <img class="object-cover h-full hover:scale-110 transition duration-1000" src="../assets/later.jpg" alt="">
                <p class="text-sm text-center mt-8">CONCERT | VARIÉTÉ/CHANSON</p>
                <p class="text-semibold text-5xl font-gothic text-center mt-2">LATER</p>
                <p class="text-sm text-center mt-1 font-semibold">MAR. 27 FÉVR. | 20:00</p>
            </div>
        </div>
    </div>

</template>

<script>
import Carousel from '../components/carousel.vue'
export default {
    components: {
        Carousel
    },
    name: 'Home',
};
</script>
