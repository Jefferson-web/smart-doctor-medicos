<template>
  <div class="m-4">
    <h6 class="mb-5">Información de la cita</h6>
    <div class="cita-item">
      <div class="mb-3">Nombre del Paciente</div>
      <div>{{ cita.paciente }}</div>
    </div>
    <div class="cita-item">
      <div class="mb-3">Sexo</div>
      <div>
        <span v-if="cita.sexo">Hombre</span>
        <span v-if="!cita.sexo">Mujer</span>
      </div>
    </div>
    <div class="cita-item">
      <div class="mb-3">Edad</div>
      <div>{{ cita.edad }} años</div>
    </div>

    <h6 class="my-5">Motivo de consulta</h6>
    <p>{{ cita.motivo }}</p>
    <h6 class="my-5">Archivos Adjuntos</h6>
    <img class="no-image" src="../assets/imagen.svg" alt="" width="70%" >
    <p class="text-center mt-3">Sin archivos adjuntos</p>
  </div>
</template>

<script>

import MedicoService from '../services/MedicoService';

export default {
  name: 'AtencionDetalle',
  data(){
    return {
      cita: {}
    }
  },
  methods: {
    VerDetalle(citaId){
      MedicoService.VerDetalle(citaId).then(response => {
        this.cita = response.data;
      });
    }
  },
  mounted(){
    const citaId = this.$route.params.citaId;
    this.VerDetalle(citaId);
  }
}
</script>

<style>
  .cita-item{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }
  .no-image{
    display: flex;
    margin: auto;
  }
</style>