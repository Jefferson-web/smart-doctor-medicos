<template>
  <div class="atenciones-agendadas">
    <div class="header">
      <router-link class="link-regreso" to="/inicio"
        ><i class="fas fa-arrow-left"></i
      ></router-link>
      <span>Agendar cita</span>
    </div>
    <div class="c-cita mb-1" v-for="(cita, index) in citas" :key="index">
      <img src="../assets/medico.png" alt="" />
      <div>
        <div class="c_nombre_medicos">{{ cita.paciente }}</div>
        <div class="c_sexo_edad">
          <span v-if="cita.sexo">Hombre</span>
          <span v-if="!cita.sexo">Mujer</span>
          <span>, {{ cita.edad }} años</span>
        </div>
        <div class="c_fecha_hora">
          {{ cita.fecha }} | {{ cita.hora_inicio }} hrs.
        </div>
        <div class="c_estado">
          <div v-if="!cita.atendido" class="estado estado__pendiente">
            <i class="far fa-clock"></i>
            <span>Pendiente</span>
          </div>
          <div v-if="cita.atendido" class="estado estado__completado">
            <i class="far fa-check-circle"></i>
            <span>Completado</span>
          </div>
        </div>
      </div>
      <router-link class="link-detalle" :to="'/atencion-detalle/' + cita.citaId"><i class="fas fa-chevron-right"></i></router-link>
      <button v-on:click="Atender(cita.citaId)" class="camera"><i class="fas fa-video"></i></button>
    </div>

    <div v-if="citas.length == 0" class="sin-indicaciones">
      <img src="../assets/doctors.svg" alt="doctors" width="80%" />
      <p class="mt-5">Sin atenciones agendadas.</p>
    </div>

  </div>
</template>

<script>
import MedicoService from "../services/MedicoService";
import TokenService from "../services/TokenService";

export default {
  name: "AtencionesAgendadas",
  data(){
      return {
          citas: []
      }
  },
  methods: {
    ListarCitasAgendadas(medicoId) {
      MedicoService.ListarCitasAgendadas(medicoId)
        .then((response) => {
            this.citas = this.formatearFecha(response.data);
            console.log(this.citas);
        })
        .catch((e) => console.log(e));
    },
    Atender(citaId){
      MedicoService.MarcarComoAtendido(citaId).then(response => {
        this.citas = this.citas.filter(cita => cita.citaId != response.data.citaId);
      })
      .catch(e => console.log(e))
    },
    formatearFecha(citas){
          return citas.map(cita => {
              let fecha = (new Date(cita.fecha)).toDateString();
              cita.fecha = fecha.substring(8, 10) + " " + fecha.substring(0, 3);
              let time = (new Date(cita.hora_inicio)).toLocaleTimeString().substring(0, 5);
              cita.hora_inicio = time;
              return cita;
          });
      },
  },
  mounted() {
    const medicoId = TokenService.getMedicoId();
    this.ListarCitasAgendadas(medicoId);
  },
};
</script>

<style>
.atenciones-agendadas {
  background: #f8f8f8;
  height: 100%;
}
.sin-citas{
        height: calc(100vh - 57px - 80px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .citas-agendadas{
        background: #f8f8f8;
        height: 100%;
    }
    .c-cita{
        background: white;
        padding: 15px;
        display: flex;
        justify-content: start;
        gap: 20px;
        position: relative;
    }
    .c-cita img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .c_nombre_medicos{
        font-weight: 600;
        font-size: 16px;
    }
    .c_sexo_edad{
        color: #858585;
        font-size: 13px;
    }
    .c_fecha_hora{
        color: #858585;
        font-size: 13px;
    }
    .c_estado .estado{
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        margin-top: 5px;
    }
    .estado__pendiente{
        color: #ff7986;
    }
    .estado__completado{
        color: #4792fc;
    }
    .link-detalle{
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 20px;
    }
    .camera{
      color: #6664c9;
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
        .sin-indicaciones{
        height: calc(100vh - 57px - 80px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>