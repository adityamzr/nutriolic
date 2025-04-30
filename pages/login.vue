<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="flex flex-col justify-center items-center p-4">
      <!-- Modal Kosong -->
      <EmptyFieldModal v-if="showEmptyFieldModal" @close="showEmptyFieldModal = false" />
      <!-- Modal Account Exist -->
      <AccountExistModal v-if="showAccountExistModal" @close="showAccountExistModal = false" />
      <!-- Modal Server Error -->
      <ServerErrorModal v-if="showServerErrorModal" @close="showServerErrorModal = false" />

      <!-- <LilitaText class="text-stroke-4 text-6xl">MULAI</LilitaText> -->
      <div class="h-52 lg:h-72 w-80 lg:w-[450px] bg-rose-300 relative flex flex-col justify-center items-center">
        <input v-model="username" class="mb-4 p-2 text-white text-xs lg:text-xl focus:border-white focus:text-white bg-sky-600 rounded-xl w-2/3 lg:w-3/4 h-10 lg:h-16 placeholder:text-center placeholder:text-white lg:placeholder:text-xl" placeholder="Masukan Nama" type="text">
        <input v-model="userClass" class="mb-4 p-2 text-white text-xs lg:text-xl focus:border-white focus:text-white bg-sky-600 rounded-xl w-2/3 lg:w-3/4 h-10 lg:h-16 placeholder:text-center placeholder:text-white lg:placeholder:text-xl" placeholder="Masukan Kelas" type="text">
        <button @click="handleLogin()" class="w-fit lg:w-fit py-2 px-4 rounded-full bg-sky-600">
          <LilitaText class="text-stroke-2 lg:text-stroke-3 text-4xl lg:text-6xl">Masuk</LilitaText>
        </button>
        <Element src="/element/potato.png" customClass="absolute left-[-30px] top-[-40px] w-24"/>
        <Element src="/element/strawberry.png" customClass="absolute left-[-30px] bottom-[-30px] w-24"/>
        <Element src="/element/brocoli.png" customClass="absolute right-[-40px] top-[-40px] w-24"/>
        <Element src="/element/egg.png" customClass="absolute right-[-30px] bottom-[-30px] w-24"/>
      </div>
    </div>
    <div class="absolute right-2 lg:right-10 bottom-[-60px] lg:-bottom-20">
      <ChefRight class="w-40 md:w-52 lg:w-96"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const apiUrl = useRuntimeConfig().public.API_BASE_URL

// Modal visibility states
const showEmptyFieldModal = ref(false);
const showServerErrorModal = ref(false);
const showAccountExistModal = ref(false);

// Input fields
const username = ref('');
const userClass = ref('');

const handleLogin = async () => {
  if (!username.value.trim() || !userClass.value.trim()) {
    showEmptyFieldModal.value = true;
    return;
  }

  const payload = {
    username: username.value,
    class: userClass.value,
  };

  try {
    const res = await fetch(`${apiUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if(data.error?.code === 400){
      showAccountExistModal.value = true;
      return;
    }

    if (!res.ok) throw new Error('Server error');

    const expiresAt = Date.now() + (7200 * 1000);
    localStorage.setItem('token', data.token);
    localStorage.setItem('expires_at', expiresAt);

    router.push('/menu');
  } catch (err) {
    console.error(err);
    showServerErrorModal.value = true;
  }
};
</script>
