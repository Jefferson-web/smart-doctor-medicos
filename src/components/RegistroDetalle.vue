<template>
  <div>
    <div class="header">
      <router-link class="link-regreso" to="/inicio"
        ><i class="fas fa-arrow-left"></i
      ></router-link>
      <span>Detalle de la atención</span>
    </div>
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
      <div class="titulo-agregar">
        <h6>Recetas</h6>
        <button class="btn-agregar" v-on:click="ActivarFormReceta">+</button>
      </div>
      <ul>
        <li v-for="(receta, index) in recetas" :key="index">
          {{ receta.cantidad }}: {{ receta.nombre_medicamento }} cada
          {{ receta.horas }} horas {{ receta.frecuencia }}
        </li>
      </ul>
      <p v-if="recetas.length == 0">No hay recetas</p>
      <v-form v-if="formRecetaActivado">
        <v-text-field
          v-model="receta.nombre_medicamento"
          label="Nombre de medicamento"
        ></v-text-field>
        <v-text-field
          v-model="receta.cantidad"
          label="Cantidad"
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="receta.frecuencia"
          label="Frecuencia"
        ></v-text-field>
        <v-text-field v-model="receta.horas" label="Horas"></v-text-field>
        <v-text-field
          v-model="receta.observacion"
          label="Observacion"
        ></v-text-field>
        <div class="row">
          <div class="col text-center">
            <button
              type="button"
              class="btn btn-danger btn-receta"
              v-on:click="DesactivarFormReceta"
            >
              Cancelar
            </button>
          </div>
          <div class="col text-center">
            <button
              type="button"
              class="btn btn-primary btn-receta"
              v-on:click="RegistrarReceta"
            >
              Registrar
            </button>
          </div>
        </div>
        <br />
      </v-form>

      <div class="titulo-agregar">
        <h6>Diagnosticos</h6>
        <button class="btn-agregar" v-on:click="ActivarFormDiagnostico">
          +
        </button>
      </div>
      <ul>
        <li v-for="(diagnostico, index) in diagnosticos" :key="index">
          {{ diagnostico.descripcion }}
        </li>
      </ul>
      <p v-if="diagnosticos.length == 0">No hay diagnosticos</p>
      <v-form v-if="formDiagnosticoActivado">
        <v-text-field
          v-model="diagnostico.descripcion"
          label="Ingrese el diagnostico"
        ></v-text-field>
        <div class="row">
          <div class="col text-center">
            <button
              type="button"
              class="btn btn-danger btn-receta"
              v-on:click="DesactivarFormDiagnostico"
            >
              Cancelar
            </button>
          </div>
          <div class="col text-center">
            <button type="button" class="btn btn-primary btn-receta" v-on:click="RegistrarDiagnostico">
              Registrar
            </button>
          </div>
        </div>
        <br>
      </v-form>
      <div class="titulo-agregar">
        <h6>Indicaciones</h6>
        <button class="btn-agregar" v-on:click="ActivarFormIndicacion">
          +
        </button>
      </div>
      <ul>
        <li v-for="(indicacion, index) in indicaciones" :key="index">
          {{ indicacion.descripcion }}
        </li>
      </ul>
      <p v-if="indicaciones.length == 0">No hay indicaciones</p>
      <v-form v-if="formIndicacionActivado">
        <v-text-field
          v-model="indicacion.descripcion"
          label="Ingrese la indicacion"
        ></v-text-field>
        <div class="row">
          <div class="col text-center">
            <button
              type="button"
              class="btn btn-danger btn-receta"
              v-on:click="DesactivarFormIndicacion"
            >
              Cancelar
            </button>
          </div>
          <div class="col text-center">
            <button type="button" class="btn btn-primary btn-receta" v-on:click="RegistrarIndicacion">
              Registrar
            </button>
          </div>
        </div>
        <br>
      </v-form>
    </div>
  </div>
</template>

<script>
import MedicoService from "../services/MedicoService";

export default {
  name: "RegistroDetalle",
  data() {
    return {
      citaId: 0,
      cita: {},
      recetas: [],
      diagnosticos: [],
      indicaciones: [],
      formRecetaActivado: false,
      formDiagnosticoActivado: false,
      formIndicacionActivado: false,
      receta: {
        citaId: 0,
        nombre_medicamento: "",
        cantidad: 0,
        frecuencia: "",
        horas: 0,
        observacion: "",
      },
      diagnostico: {
        citaId: 0,
        descripcion: "",
      },
      indicacion: {
        citaId: 0,
        descripcion: "",
      },
    };
  },
  methods: {
    VerDetalle(citaId) {
      MedicoService.VerDetalle(citaId)
        .then((response) => {
          this.cita = response.data;
        })
        .catch((e) => console.log(e));
    },
    ActivarFormReceta() {
      this.formRecetaActivado = true;
    },
    DesactivarFormReceta() {
      this.formRecetaActivado = false;
    },
    ListarRecetas(citaId) {
      MedicoService.ListarRecetas(citaId)
        .then((response) => {
          this.recetas = response.data;
        })
        .catch((e) => console.log(e));
    },
    FormularioRecetaValido() {
      return (
        this.receta.nombre_medicamento != "" &&
        this.receta.cantidad != 0 &&
        this.receta.frecuencia != "" &&
        this.receta.horas != 0
      );
    },
    RegistrarReceta() {
      if (this.FormularioRecetaValido()) {
        this.receta.citaId = this.citaId;
        MedicoService.RegistrarReceta(this.receta)
          .then((response) => {
            this.recetas.push(response.data);
            this.receta = {
              citaId: 0,
              nombre_medicamento: "",
              cantidad: 0,
              frecuencia: "",
              horas: 0,
              observacion: "",
            };
            this.formRecetaActivado = false;
          })
          .catch((e) => console.log(e));
      } else {
        alert("Complete el formulario");
      }
    },
    ListarIndicaciones(citaId) {
      MedicoService.ListarIndicaciones(citaId)
        .then((response) => {
          this.indicaciones = response.data;
        })
        .catch((e) => console.log(e));
    },
    ListarDiagnosticos(citaId) {
      MedicoService.ListarDiagnosticos(citaId)
        .then((response) => {
          this.diagnosticos = response.data;
        })
        .catch((e) => console.log(e));
    },
    ActivarFormDiagnostico() {
      this.formDiagnosticoActivado = true;
    },
    ActivarFormIndicacion() {
      this.formIndicacionActivado = true;
    },
    DesactivarFormDiagnostico(){
        this.formDiagnosticoActivado = false;
    },
    DesactivarFormIndicacion(){
        this.formIndicacionActivado = false;
    },
    RegistrarIndicacion(){
        this.indicacion.citaId = this.citaId;
        MedicoService.RegistrarIndicacion(this.indicacion).then(response => {
            this.indicaciones.push(response.data);
            this.formIndicacionActivado = false;
            this.indicacion = {
                citaId: 0,
                descripcion: "",
            };
        })
        .catch(e => console.log(e));
    },
    RegistrarDiagnostico(){
        this.diagnostico.citaId = this.citaId;
        MedicoService.RegistrarDiagnostico(this.diagnostico).then(response => {
            this.diagnosticos.push(response.data);
            this.formDiagnosticoActivado = false;
            this.diagnostico = {
                citaId: 0,
            descripcion: ""
            }
        })
    }
  },
  mounted() {
    this.citaId = this.$route.params.citaId;
    this.VerDetalle(this.citaId);
    this.ListarRecetas(this.citaId);
    this.ListarIndicaciones(this.citaId);
    this.ListarDiagnosticos(this.citaId);
  },
};
</script>

<style>
.cita-item {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
}
.no-image {
  display: flex;
  margin: auto;
}
.titulo-agregar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-agregar {
  color: white;
  background: #4792fc;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 1px 1px 5px rgb(156, 156, 156);
  transition: ease 0.5s all;
}
.btn-agregar:hover {
  background: #3589ff;
}
.btn-receta {
  color: white !important;
}
</style>