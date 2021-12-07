import http from '../http-common';

class MedicoService {

    LoginMedico(login){
        return http.post('/Account/LoginMedico', login);
    }

    ListarCitasAgendadas(medicoId){
        return http.get(`/GestionarAtenciones/ListarCitas/${medicoId}`);
    }

    VerDetalle(citaId){
        return http.get(`/GestionarAtenciones/VerDetalles/${citaId}`);
    }

    MarcarComoAtendido(citaId){
        return http.post(`/GestionarAtenciones/MarcarComoAtendido/${citaId}`);
    }

    RegistroPacientes(medicoId){
        return http.get(`/GestionarAtenciones/RegistroPacientes/${medicoId}`);
    }

    ListarRecetas(citaId){
        return http.get(`/DetalleCita/ListarRecetas/${citaId}`);
    }

    RegistrarReceta(receta){
        return http.post('/DetalleCita/RegistrarReceta', receta);
    }

    ListarDiagnosticos(citaId){
        return http.get(`/DetalleCita/ListarDiagnosticos/${citaId}`);
    }

    ListarIndicaciones(citaId){
        return http.get(`/DetalleCita/ListarIndicaciones/${citaId}`);
    }

    RegistrarIndicacion(indicacion){
        return http.post(`/DetalleCita/RegistrarIndicacion`, indicacion);
    }

    RegistrarDiagnostico(diagnostico){
        return http.post(`/DetalleCita/RegistrarDiagnostico/`, diagnostico);
    }

    ListarResidencias(){
        return http.get('/AfiliacionMedicos/ListarResidencias'); // Lista de residencias
    }

    ListarTodasLasEspecialidades(){
        return http.get('/AfiliacionMedicos/ListarTodasLasEspecialidades');
    }

    RegistrarMedico(medico){
        return http.post('/AfiliacionMedicos/RegistrarMedico', medico);
    }
    
}

export default new MedicoService();