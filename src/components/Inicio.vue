<template>
  <div class="fondo-inicio">
    <div class="header-inicio">
      <div class="c-logo">
        <img src="../assets/logo_blanco.png" alt="" />
      </div>
      <div class="c-info-medico">
        <img src="../assets/medico.png" alt="" width="70px" />
        <div>
          <div class="nombre_medico">Hola Dr(a) {{ medico.nombres }}</div>
          <div class="especialidad_medico">{{ medico.especialidad }}</div>
          <div class="cmp_medico">CMP: {{ medico.cmp }}</div>
        </div>
      </div>
    </div>
    <div class="m-4">
      <h6 class="mb-4">¿QUÉ HAREMOS HOY?</h6>
      <router-link to="/atenciones-agendadas" class="c-card">
        <img src="../assets/calendario.png" alt="" />
        <div>
          <div class="c-card-titulo">Atenciones agendadas</div>
          <div class="c-card-descripcion">Revisa tus citas programadas</div>
        </div>
      </router-link>
      <router-link to="/registro-atenciones" class="c-card">
        <img src="../assets/atenciones.png" alt="" />
        <div>
          <div class="c-card-titulo">Registro de Atenciones</div>
          <div class="c-card-descripcion">Historial de pacientes atendidos</div>
        </div>
      </router-link>
      <router-link to="/" class="c-card">
        <img src="../assets/reloj.png" alt="" />
        <div>
          <div class="c-card-titulo">Mi Horario</div>
          <div class="c-card-descripcion">Decide tu programación</div>
        </div>
      </router-link>
    </div>
    <button class="btn-logout" v-on:click="Logout"><i class="fas fa-sign-out-alt"></i></button>
  </div>
</template>

<script>
import TokenService from "../services/TokenService";

export default {
  name: "Inicio",
  data() {
    return {
      medico: {},
    };
  },
  methods: {
    Logout(){
      TokenService.logout();
      this.$router.replace("/login");
    }
  },
  mounted() {
    this.medico = TokenService.getMedico();
  },
};
</script>

<style>
.btn-logout{
  color: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #6664c9;
  border-radius: 50%;
}
.c-card{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  display: block;
  text-decoration: none;
  display: flex;
  gap: 20px;
}
.c-card-descripcion{
  font-size: 14px;
  color: gray;
}
.c-card-titulo{
  color: black;
  font-weight: 600;
}
.c-card img{
  width: 40px;
  height: 40px;
}
.header-inicio {
  background: #6664c9;
  padding: 20px;
  color: white;
}
.nombre_medico {
  font-weight: 300;
  color: rgb(241, 241, 241);
}
.c-logo img {
  width: 150px;
  margin-bottom: 20px;
}
.c-info-medico {
  display: flex;
  gap: 30px;
}
.especialidad_medico {
  font-weight: 600;
  font-size: 14px;
}
.cmp_medico {
  font-size: 14px;
}
.fondo-inicio {
  background: #f8f8f8;
  height: 100%;
}
</style>