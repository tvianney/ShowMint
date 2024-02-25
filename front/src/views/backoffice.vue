<template>
  <div class="my-10 w-100 font-medium flex justify-center">
    <span class="text-5xl">Créez votre nouvel événement</span>
  </div>
  <div class="flex items-center justify-center my-28 flex-col">
    <form class="max-w-sm mx-auto">
      <div class="mb-6">
        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de places</label>
        <input v-model="formInfo.nbPlaces" type="number" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-6">
        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'artiste</label>
        <input v-model="formInfo.artistName" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-6">
        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'événement</label>
        <input v-model="formInfo.eventName" type="number" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="mb-6">
        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description de l'événement</label>
        <input v-model="formInfo.metadataDescription" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <div class="flex items-center mb-4">
        <input id="checkbox-1" v-model="formInfo.refundable" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
        <label for="checkbox-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Les places sont-elles remboursables ?</label>
      </div>
      <div class="flex items-center mb-4">
        <input id="checkbox-2" v-model="formInfo.transferable" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >
        <label for="checkbox-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Les places sont-elles transférables ?</label>
      </div>
    </form>
    <button @click.once="createEvent" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Validée</button>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        formInfo: {
          nbPlaces: 0,
          artistName: '',
          eventName: '',
          metadataDescription: '',
          refundable: false,
          transferable: false,
        },
      };
    },
    methods: {
      createEvent() {
        const eventData = {
          nbPlaces: this.formInfo.nbPlaces,
          metadataName: this.formInfo.artistName,
          eventId: this.formInfo.eventName,
          isRefundable: this.formInfo.refundable,
          isTransferable: this.formInfo.transferable,
          metadataDescription: this.formInfo.metadataDescription,
          imgUrl: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/405976904_936715654492722_8136109242289614325_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Glbb36kTUWcAX_OT2_o&_nc_ht=scontent-cdg4-2.xx&oh=00_AfDzgINo0CAb6t3upbJ5rco_6Mq3n5K5MzMA_Okiak2E-Q&oe=65E07DF0',
        };
        axios.post("http://localhost:3001/event", eventData)
        .then(response => {
          console.log("Event created successfully!", response.data);
        })
        .catch(error => {
          console.error("error creating the event", error);
        });
      }
    },
  };
</script>
