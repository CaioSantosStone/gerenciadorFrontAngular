import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { TokenApiService } from './tokenApi.service';

@Injectable()
export class CredentiationService {
    constructor(
        private http: Http,
        private tokenApiService: TokenApiService
    ) {
    }

    createCredentiation(obj) {
        return this.http.post(`${environment.URL_BASE}/is/credentiation`, obj, this.tokenApiService.jwt()).map((response: Response) => response.json());
    }

    getEntityType() {
        return this.http.get(`${environment.URL_BASE}/web/entity-type-info`).map((response: Response) => response.json());
    }


    getEntitiLink(link) {
        return this.http.get(`${environment.URL_BASE}/is/entity-link/${link}`, this.tokenApiService.jwt()).map((response: Response) => response.json());
    }

    getCredentiationEntityAlter(link) {
        return this.http.get(`${environment.URL_BASE}/is/credentiation/get-credentiation-entity-alter/${link}`, this.tokenApiService.jwt()).map((response: Response) => response.json());
    }


    getInitialCredentiation() {
        return this.http.get(`${environment.URL_BASE}/is/credentiation/get-initial-credentiation`, this.tokenApiService.jwt()).map((response: Response) => response.json());
    }

    queryCredentiation(obj) {
        return this.http.post(`${environment.URL_BASE}/is/credentiation/query-credentiation`, obj, this.tokenApiService.jwt()).map((response: Response) => response.json());
    }

    //validadores favor nao mexer :) declarar funcoes sobre os validadores
    validCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;

        return true;
    }
    validaCPF(cpf) {
        var strCPF = cpf.replace(/[.-]/g, '')

        if (strCPF.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
    validEmail(mail) {
        var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/); if (typeof (mail) == "string") { if (er.test(mail)) { return true; } } else if (typeof (mail) == "object") { if (er.test(mail.value)) { return true; } } else { return false; }
    }


}

