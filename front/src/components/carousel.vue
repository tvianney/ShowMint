<template>
  <div v-for="(slide, index) in slides" :key="index" :class="{ 'hidden': index !== activeIndex, 'block': index === activeIndex }" class="flex flex-row h-[560px] cursor-default">
      <div class="w-3/5">
          <img class="object-none h-full" src="/home/vianney/POC/Aleph/ShowMint/front/src/assets/dog-1.jpg" :alt="slide.artist">
      </div>
        <div class="w-1/2" :class="slide.backgroundColor">
            <div class="m-12">
                <div>
                    <p class="font-semibold text-sm">{{ slide.date }}</p>
                </div>
                <div class="mt-8 mb-8">
                    <h1 class="text-8xl font-gothic">{{ slide.artist }}</h1>
                </div>
                <div class="h-16 w-60 bg-black relative text-white hover:bg-white hover:text-black cursor-pointer">
                    <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-nowrap">INFOS & RÉSERVATION</p>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      activeIndex: 0,
      slides: [
        {
          image: "/home/vianney/POC/Aleph/ShowMint/front/src/assets/dog-1.jpg",
          date: 'DIM. 2 JUIN | 20:00',
          artist: 'DOGSTAR',
          backgroundColor: 'bg-dogstar'
        },
        {
          image: '/assets/alice.jpg',
          date: 'VEN. 8 MARS | 20:00',
          artist: 'ALICE',
          backgroundColor: 'bg-alice'
        },
        {
          image: '/assets/doug.jpg',
          date: 'JEU. 23 MAI | 20:00',
          artist: 'THE DOUG',
          backgroundColor: 'bg-doug'
        }
      ]
    };
  },
  mounted() {
    setInterval(this.nextSlide, 7000);
  },
  methods: {
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    }
  }
};
</script>