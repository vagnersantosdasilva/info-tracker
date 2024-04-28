<template>
  <main class="columns is-gepless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <RouterView></RouterView>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import Tarefas from './views/Tarefas.vue'
export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
  },
})
</script>
<style scoped>
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
</style>
