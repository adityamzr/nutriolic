<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="border-2 w-[80%] h-[60%] p-4">
      <!-- <Button class="mt-4" variant="primary" @click="handleButtonClick('full')">Full Screen</Button>
      <Button class="mt-4 mx-3" variant="secondary" @click="handleButtonClick('minimize')">Minimize</Button> -->
      <div class="flex justify-center absolute top-0 left-1/2 -translate-x-1/2">
        <Element src="/element/nutriolic-title.svg" customClass="h-[140px] md:h-32 lg:h-48" />
        <span class="absolute top-28 text-sm font-semibold">Pembelajaran Nutrisi Interaktif</span>
      </div>
      <Element src="/element/milk.gif" customClass="absolute left-[120px] bottom-20 w-16" />
      <Element src="/element/cereal.gif" customClass="absolute left-[140px] bottom-14 w-28" />
      <div class="absolute right-2 bottom-[-60px]">
        <ChefRight/>
      </div>
    </div>
    <button @click="handleClick" class="absolute bottom-20 w-36 py-2 px-4 rounded-full bg-red-200">
      <LilitaText class="text-stroke-2">Login</LilitaText>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleButtonClick = (type) => {
  const element = document.documentElement;

  if (type === "full") {
    (element.requestFullscreen || element.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen)?.call(element);
  } else {
    if(!!document.fullscreenElement) (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen)?.call(document);
  }
}

const handleClick = () => {
  router.push("/login");
};
</script>