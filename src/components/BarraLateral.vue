<template>
    <header>
        <h1 class="titulo">
            Info Tracker
        </h1>
    </header>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'BarraLateral'
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
.titulo {
    color: aliceblue;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 30px;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>