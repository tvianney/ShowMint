<template>
    <div id="body" style="padding: 70px 0; background-color: #DDC9D7; display: flex; justify-content:center">
        <div id="left-side" class="main-box" style="display: flex ; flex-direction: column;">
            <span class="my-4">Concert Afropop, Afrobeats, Zouk</span>
            <span class="font-gothic text-8xl">TANYA ST-VAL</span>
            <span class="font-bold">sam. 24 févr. 2024 19:30</span>
            <button @click="handleActions(['displayModal', 'createPost'])" style="min-height: 45px;" type="button" class="w-fit mt-8 border border-black hover:text-gray-950 text-white bg-gray-950 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-950 font-medium text-base px-8 py-4 text-center ">Réserver votre billet</button>
            <a href="https://www.instagram.com/tanyastval.officiel/?hl=fr">
                <button style="min-height: 45px;" type="button" class="w-fit mt-2 mb-8 border border-black hover:text-white text-gray-950 bg-transparent hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-950 font-medium text-base px-8 py-4 text-center ">INSTAGRAM</button>
            </a>

            <div style="display: flex; align-items: center;">
                <img src="../assets/artiste-tanya.jpg" style="margin-right: 25px;" class="h-20 rounded-full" alt="Artiste">
                <div>
                    <span>Artiste</span>
                    <span style="display: block;" class="font-gothic text-xl">Tanya St-Val</span>
                </div>
            </div>
        </div>
        <div id="right-side" class="main-box">
            <img src="../assets/artiste-tanya.jpg" class="w-5/6 rounded-full" alt="Artiste">
            <div class="box-info border-gray-800">
                <span style="width: 50%;">Ouverture des portes</span>
                <span>19:00</span>
            </div>
            <div class="box-info border-gray-800">
                <span style="width: 50%; white-space: pre-line">Billets</span>
                <div>
                    <span>42.50 €</span>
                    <span style="display: block;">Assis/Debout Placement Libre</span>
                    <span style="display: block;">(place assise non garantie)</span>
                </div>
            </div>
            <div class="box-info border-gray-800">
                <span style="width: 50%;">Première partie</span>
                <span>D FLO</span>
            </div>
            <div class="box-info border-gray-800">
                <span style="width: 50%;">Organisateur</span>
                <span>L2NK PRODUCTION</span>
            </div>
            <div class="box-info border-gray-800 mb-4">
                <span style="width: 50%;">Site artiste(s)</span>
                <a href="https://tanyastval.com/">https://tanyastval.com/</a>
            </div>
            <div class="box-info border-gray-800 mb-4">
                <span>Tanya St-Val, vous transportera dans son univers musical créatif et unique lors de son concert évènement à la Cigale le 24 février 2024.
    Plus qu'un concert live, il s'agira d'un véritable spectacle avec un décor et une scénographie spécialement réalisé pour l'occasion ainsi qu'un moment de partage entre Tanya et son public.
    Venez redécouvrir ses tubes mémorables , intemporels et une Tanya comme vous ne l'avez jamais vu lors de son spectacle « Tanya St-Val Forever »</span>
            </div>
        </div>
    </div>
    <Modal v-if="modalDialog" @closeModal="handleActions"/>
</template>

<script>
import Modal from '../components/paymentModal.vue'
import axios from "axios";
   nisftrf
export default {
    components: {
        Modal,
    },
    data() {
        return {
            modalDialog: false,
        }
    },
    methods: {
    handleActions(actions) {
      for (const action of actions)
        if (action === 'closeModal') {
          this.modalDialog = false;
        } else if (action == 'createPost') {
          this.createPost();
        } else if (action == 'displayModal') {
          this.displayModal();
        } 
        //else if (action === 'reloadPage') {
        //   location.reload();
        // }
    },
    displayModal() {
        this.modalDialog = true;
    },
    async createPost() {
      const formData = new FormData();
      formData.append("alexandre.timal@gmail.com", "arena:555");
      const { data } = await axios.post("http://localhost:3001/ticket", formData);
      this.response = data;
    },
    beforeMount() {
        this.createPost();
    },

    },
};
</script>

<style>
  .box-info {
    display: flex;
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    margin-top: 20px;
    padding: 24px 0px 24px 0px;
  }
  .main-box {
    width: 35%;
    padding: 0 1%;
  }
</style>
