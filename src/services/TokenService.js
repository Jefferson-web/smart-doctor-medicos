class TokenService {

    setToken(token){
        localStorage.setItem("token", token);
    }

    getToken(){
        return localStorage.getItem("token");
    }

    setMedico(medico){
        localStorage.setItem("medico", JSON.stringify(medico));
    }

    getMedico(){
        return JSON.parse(localStorage.getItem("medico"));
    }

    getMedicoId(){
        const medico = this.getMedico();
        return medico.medicoId;
    }

    get isAuthenticate(){
        return !!localStorage.getItem("token");
    }

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("medico");
    }

}

export default new TokenService();