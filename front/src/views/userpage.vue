<template>
  <div class="flex items-center justify-center my-28 flex-col">
    <div class="bg-white overflow-hidden shadow rounded-lg border w-2/5">
      <div class="flex items-center px-5">
        <img
          src="../assets/nyan-cat.webp"
          class="h-14 rounded-full"
          alt="User Logo"
        />
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">GOAT Reza</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Pdg de POC</p>
        </div>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Reza Rahemtola
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              reza.rahemtola@poc-innovation.fr
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Phone number</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              07 82 51 61 98
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              60 chemin du chat<br />
              Nyan cat Avenue
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="my-10 w-2/5 font-medium">
      <span class="text-5xl">Places de Concerts</span>
    </div>
    <div
      v-for="user in users"
      :key="user.id"
      class="flex px-5 align-center justify-start bg-white overflow-hidden shadow rounded-lg border w-2/5"
    >
      <img
        :src="user.image"
        class="h-20 rounded-full mt-5 ml-5"
        alt="Flowbite Logo"
      />
      <div class="ml-10">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ user.name }}
          </h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Description</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ user.description }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userpage",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    console.time("Loading Users");
    axios
      .get("http://localhost:3001/ticket/martin@gmail.com")
      .then((res) => (this.users = res.data))
      .finally(() => console.timeEnd("Loading Users"));
  },
};
</script>
