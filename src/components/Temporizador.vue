<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="cronometroExecutando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroExecutando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import  Cronometro from './Cronometro.vue'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Temporizador',
    components:{
        Cronometro
    },
    events:['finalizarCronometro'],
    methods: {
        iniciar() {
            this.cronometroExecutando = true
            this.cronometro = setInterval(()=>{
                this.tempoEmSegundos +=1
            }, 1000)
        },
        finalizar () {
            this.cronometroExecutando = false
            clearInterval(this.cronometro)
            this.$emit('finalizarCronometro',this.tempoEmSegundos)
            this.tempoEmSegundos = 0  
        }
    },
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroExecutando: false
        }
    },
   
})
</script>