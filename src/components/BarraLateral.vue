<template>
  <div>
    <header>
        <h1 class="titulo">
            Info Tracker
        </h1>
        <nav class="panel mt-5">
            <ul>
              <li>
                <RouterLink to="/" class="link">
                  <i class="fas fa-tasks"></i>Tarefas
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/projetos" class="link">
                  <i class="fas fa-project-diagram"></i>Projetos
                </RouterLink>
              </li>
            </ul>
        </nav>
    </header>
    
    </div>
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

.panel li {
    margin: 8px 0;
    gap: 5px;
    display: flex;
    justify-content: center;
    text-align: center;
}
.link {
    color: #fff;
    font-size: 25px;
    margin: 10px;
    gap: 3px;
    
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>