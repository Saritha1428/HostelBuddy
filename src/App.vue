<template>
  <div id="app">
    

    
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style> 




.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
  width: 100%;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
