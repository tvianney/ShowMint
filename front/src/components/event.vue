<template>
    <div id="body" style="margin: 100px 0; background-color: #DDC9D7; display: flex; justify-content:center">
        <div id="left-side" class="main-box" style="display: flex; flex-direction: column;">
            <span class="my-4">Concert Afropop, Afrobeats, Zouk</span>
            <span class="text-xl font-bold my-4">TANYA ST-VAL</span>
            <span class="my-4 font-bold">sam. 24 févr. 2024 19:30</span>
            <button style="min-height: 45px;" type="button" class="mx-4 border border-black hover:text-white text-gray-950 bg-transparent hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-950 font-medium text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Réserver votre billet</button>
            <button style="min-height: 45px;" type="button" class="mx-4 border border-black hover:text-gray-950 text-white bg-white hover:bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-950 font-medium text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">INSTAGRAM</button>
            <div>
                <img src="../assets/artiste-tanya.jpg" class="w-10 rounded-full" alt="Artiste">
                <div>
                    <span>Artiste</span>
                    <span style="display: block;">Tanya St-Val</span>
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
                    <span style="display: block;">Assis/Debout Placement Libre (place assise non garantie)</span>
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
            <div class="box-info border-gray-800">
                <span style="width: 50%;">Site artiste(s)</span>
                <a href="https://tanyastval.com/">https://tanyastval.com/</a>
            </div>
            <span>Tanya St-Val, vous transportera dans son univers musical créatif et unique lors de son concert évènement à la Cigale le 24 février 2024.
Plus qu'un concert live, il s'agira d'un véritable spectacle avec un décor et une scénographie spécialement réalisé pour l'occasion ainsi qu'un moment de partage entre Tanya et son public.
Venez redécouvrir ses tubes mémorables , intemporels et une Tanya comme vous ne l'avez jamais vu lors de son spectacle « Tanya St-Val Forever »</span>
        </div>
    </div>
</template>

<style>
  .box-info {
    display: flex;
    border-style: solid;
    border-width: 1px 0px 1px 0px;
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    margin-top: 020px;
    margin-bottom: 0px;
    padding: 24px 0px 24px 0px;
  }
  .main-box {
    width: 35%;
    padding: 0 1%;
  }
</style>