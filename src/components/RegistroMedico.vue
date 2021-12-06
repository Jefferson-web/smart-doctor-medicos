<template>
  <div class="m-4">
    <h2>Inicia tu consultorio Digital</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae vero
      delectus, animi itaque libero debitis!
    </p>
    <form action="">
      <div class="mb-3">
        <label for="txtNombres">Nombres</label>
        <input
          type="text"
          class="form-control"
          v-model="medico.nombres"
          id="txtNombres"
        />
      </div>
      <div class="mb-3">
        <label class="mb-2" for="txtResidencias">Residencia</label>
        <select
          name=""
          class="form-select"
          id="txtResidencias"
          v-model="medico.residenciaId"
        >
          <option value="0" selected>Seleccionar</option>
          <option
            v-for="(residencia, index) in residencias"
            :key="index"
            :value="residencia.residenciaId"
          >
            {{ residencia.pais }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="mb-2" for="txtEspecialidades">Especialidad</label>
        <select
          name=""
          class="form-select"
          id="txtEspecialidades"
          v-model="medico.especialidadId"
        >
          <option value="0" selected>Seleccionar</option>
          <option
            v-for="(especialidad, index) in especialidades"
            :key="index"
            :value="especialidad.especialidadId"
          >
            {{ especialidad.nombre }}
          </option>
        </select>
      </div>

      <p>Sexo</p>
      <div class="d-flex justify-content-around">
        <div>
          <input type="radio" id="one" :value="true" v-model="medico.sexo" />
          <label for="one" class="ml-3">Hombre</label>
        </div>
        <div>
          <input type="radio" id="two" :value="false" v-model="medico.sexo" />
          <label for="two" class="ml-3">Mujer</label>
        </div>
      </div>
    <br>

    <div class="mb-3">
        <label for="txtEdad">Edad</label>
        <input
          type="number"
          class="form-control"
          v-model="medico.edad"
          id="txtEdad"
        />
      </div>

      <div class="mb-3">
        <label for="txtColegiatura">Número de colegiatura</label>
        <input
          type="text"
          class="form-control"
          v-model="medico.CMP"
          id="txtColegiatura"
        />
      </div>
      <div class="mb-3">
        <label for="txtCelular">Celular</label>
        <input
          type="text"
          class="form-control"
          v-model="medico.celular"
          id="txtCelular"
        />
      </div>
      <div class="mb-3">
        <label for="txtEmail">Email</label>
        <input
          type="text"
          class="form-control"
          v-model="medico.email"
          id="txtEmail"
        />
      </div>
      <div class="mb-3">
        <label for="txtContraseña">Contraseña</label>
        <input
          type="password"
          class="form-control"
          v-model="medico.contrasena"
          id="txtContraseña"
        />
      </div>
      <div class="mb-3">
        <label for="txtDescripcion">Descripción</label>
        <textarea
          name=""
          class="form-control"
          id="txtDescripcion"
          cols="30"
          v-model="medico.descripcion"
          rows="2"
        ></textarea>
      </div>
      <br>
      <button
        type="button"
        v-on:click="Registrarse"
        class="btn-login"
      >
        <div>Registrarse</div>
        <i class="fas fa-chevron-right"></i>
      </button>
    </form>
  </div>
</template>

<script>
import MedicoService from "../services/MedicoService";

export default {
  name: "RegistroMedico",
  data() {
    return {
      residencias: [],
      especialidades: [],
      medico: {
        especialidadId: 0,
        residenciaId: 0,
        nombres: "",
        CMP: "",
        celular: "",
        descripcion: "",
        edad: 0,
        sexo: true,
        email: "",
        contrasena: "",
      },
    };
  },
  methods: {
    ListarResidencias() {
      MedicoService.ListarResidencias()
        .then((response) => {
          this.residencias = response.data;
          console.log(this.residencias);
        })
        .catch((e) => console.log(e));
    },
    ListarTodasLasEspecialidades() {
      MedicoService.ListarTodasLasEspecialidades()
        .then((response) => {
          this.especialidades = response.data;
          console.log(this.especialidades);
        })
        .catch((e) => console.log(e));
    },
    Registrarse(){
      MedicoService.RegistrarMedico(this.medico).then(response => {
        this.$router.replace("/login");
        console.log(response);
      })
      .catch(e => console.log(e));
    }
  },
  mounted() {
    this.ListarResidencias();
    this.ListarTodasLasEspecialidades();
  },
};
</script>

<style>
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