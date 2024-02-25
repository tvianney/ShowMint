<template>
    <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>
    <div class="fixed inset-0 z-50 flex justify-center items-center">
        <div class="max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden" style="height: 490px; width:400px;">
            <div class="px-6 py-4 bg-gray-900 text-white">
                <h1 class="text-lg font-bold">Credit Card</h1>
            </div>
            <div class="px-6 py-4" v-if="!loading">
                <div class="px-6 py-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="card-number">Card Number</label>
                        <input class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="card-number" type="text" placeholder="**** **** **** ****">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="expiration-date">Expiration Date</label>
                        <input class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="expiration-date" type="text" placeholder="MM/YY">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="cvv">CVV</label>
                        <input class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cvv" type="text" placeholder="***">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="cvv">Cardholder Name</label>
                        <input class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Full Name">
                    </div>
                    <button @click="payNow(); getTicket();" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">Pay Now</button>
                </div>
            </div>
            <div class="flex justify-center items-center h-full" v-else>
                <div class="loader"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['closeModal'],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    closeModal() {
      const actions = ['closeModal', 'reloadPage'];
      this.$emit('closeModal', actions);
    },
    payNow() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.closeModal();
      }, 3000);
    },
    getTicket() {
      const eventData = {
        email: 'rezaclient@gmail.com',
        eventId: 'arena:555',
      };
      axios.post("http://localhost:3001/ticket", eventData)
      .then(response => {
        console.log("Ticket created successfully", response.data);
      })
      .catch(error => {
        console.error("Error creating the ticket", error);
      });
    }
  },
};
</script>

<style>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
