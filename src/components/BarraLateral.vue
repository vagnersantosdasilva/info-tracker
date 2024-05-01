<template>
  <aside class="menu">
    <p class="menu-label">Principal</p>
    <ul class="menu-list">
      <li v-for="(item,index) in generalLinks" :key="index">
        <router-link :to="{ path: item.path }" class="link">
          {{ item.text }}
        </router-link>
      </li>
    </ul>
    </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

interface LinkItem {
  path: string;
  text: string;
}
export default defineComponent({
  name: 'BarraLateral',
  setup() {
    
    const generalLinks: LinkItem[] = [
      { path: '/', text: 'Tarefas' },
      { path: '/projetos', text: 'Projetos' },
    ];


    return { generalLinks };
  },
});
</script>

<style scoped>

aside{
  border-right: 1px solid #e8e8f3;
  height: 98vh;
  max-height: 98vh;
  padding: 15px;
  overflow-y: auto;
}

/* .link {
  color: #fff;
  font-size: 25px;
  margin: 10px;
  gap: 3px;

} */

.link:hover {
  color: #2c355f;
}

.link.router-link-active {
  color: #ffffff;
  background-color: #4f4b83;
}


</style>