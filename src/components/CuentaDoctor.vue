<template>
  <div>
      <p>Ingresa los datos de la cuenta bancaria que has elegido para recibir tus honorarios de forma mensual.
          "Smart doctor no se hace responsable de la informacion ingresada incorrectamente por el usuario"
      </p>
      <v-form ref="form">
          <p>Nombre</p>
          <v-text-field
            v-model="model"
            label="First name"
          ></v-text-field>
          <p>DNI</p>
          <v-text-field
            v-model="model"
            label="DNI"
          ></v-text-field>
          <p>Correo electrónico</p>
          <v-text-field
            v-model="model"
            label="Correo electrónico"
          ></v-text-field>
          <p>Número de cuenta bancaria</p>
          <v-text-field
            v-model="model"
            label="Cuenta bancaria"
          ></v-text-field>
       </v-form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>