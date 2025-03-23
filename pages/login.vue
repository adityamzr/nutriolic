<template>
  <div class="relative h-screen w-full flex justify-center items-center overflow-hidden">
    <div class="flex flex-col justify-center items-center p-4">
      <LilitaText class="text-stroke-4 text-6xl">LOGIN</LilitaText>
      <div class="h-40 w-80 bg-rose-300 relative flex flex-col justify-center items-center">
        <input class="mb-2 p-2 focus:border-white bg-sky-600 rounded-xl h-10 placeholder:text-center placeholder:text-white" placeholder="Enter your name" type="text" name="name" id="inputName">
        <input class="mt-2 p-2 focus:border-white bg-sky-600 rounded-xl h-10 placeholder:text-center placeholder:text-white" placeholder="Enter your class" type="text" name="class" id="inputClass">
        <Element src="/element/potato.png" customClass="absolute left-[-30px] top-[-40px] w-24"/>
        <Element src="/element/strawberry.png" customClass="absolute left-[-30px] bottom-[-30px] w-24"/>
        <Element src="/element/brocoli.png" customClass="absolute right-[-40px] top-[-40px] w-24"/>
        <Element src="/element/egg.png" customClass="absolute right-[-30px] bottom-[-30px] w-24"/>
      </div>
    </div>
    <div class="absolute right-2 bottom-[-60px]">
      <ChefRight/>
    </div>
  </div>
</template>