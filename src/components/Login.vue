<template>
  <div class="c-login">
    <img
      class="logo"
      src="../assets/smart_doctor_logo.png"
      alt=""
      width="150px"
    />
    <h1 class="titulo">Iniciar Sesión <span class="medicos-label">Medicos</span></h1>
    <v-form>
      <v-text-field
        v-model="login.email"
        label="Correo electrónico"
      ></v-text-field>
      <v-text-field
        v-model="login.contrasena"
        label="Contraseña"
        type="password"
      ></v-text-field>
      <br /><br />
      <button
        type="button"
        v-on:click="Login"
        class="btn-login"
        :disabled="loading"
      >
        <div>Iniciar Sesión</div>
        <i class="fas fa-chevron-right" v-if="!loading"></i>
        <i class="fas fa-circle-notch" v-if="loading"></i>
      </button>
    </v-form>
    <div class="mt-5">¿Aún no estas registrado? <router-link to="/registro-medico">Registrarse</router-link></div>
  </div>
</template>

<script>

import MedicoService from '../services/MedicoService';
import TokenService from '../services/TokenService';

export default {
    name: 'Login',
    data(){
        return {
            login: {
                email: "",
                contrasena: ""
            },
            loading: false
        }
    },
    methods: {
        Login(){
            if(this.login.email != "" && this.login.contrasena != ""){
                MedicoService.LoginMedico(this.login).then(response => {
                  const { medico, token } = response.data;
                  TokenService.setToken(token);
                  TokenService.setMedico(medico);
                  this.$router.replace("/inicio");
                });
            } else {
                alert("Complete todos los campos");
            }
        }
    }
}
</script>

<style>
.titulo {
  font-weight: 300 !important;
  letter-spacing: 0.5px !important;
  margin-top: 50px;
  margin-bottom: 50px;
}
.c-login {
  margin: 60px 40px;
}
.medicos-label{
    position: absolute;
    font-size: 15px;
}
.btn-login {
  background: #6664c9;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 15px 25px;
  border-radius: 15px;
}
.btn-login:hover {
  transition: 0.3s ease-in-out all;
  background: #5857c4;
}
</style>