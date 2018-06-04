import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  Documento: Array<any>;
  constructor() { }

  ngOnInit(): void {
    this.Documento = new Array<any>();
  }

  form_submit(f: NgForm) {

    const res = this.validarCNPJ(f.form.controls.cnpj.value);
    console.log(f.form.controls.cnpj.value.toString());
    this.Documento.push( {
      cnpj: f.form.controls.cnpj.value,
      valido: res ? 'Válido' : 'Inválido',
      nome: f.form.controls.nome.value,
      endereco: f.form.controls.endereco.value,
      situacao: f.form.controls.situacao.value ? 'Ativa' : 'Inativa',
      ramo: f.form.controls.ramo.value
    });
    console.log(this.Documento);
    console.log('Resultado: ' + res);

  }

  validarCNPJ(cnpj) {
    console.log('entrou...' + cnpj);
      cnpj = cnpj.replace(/[^\d]+/g, '');
      if (cnpj === '') {
       return false;
    }
      // tslint:disable-next-line:triple-equals
      if (cnpj.length != 14) {
          console.log('tamanho: ' + cnpj.length);
          return false;
      }
      // Elimina CNPJs invalidos conhecidos
      if (cnpj === '00000000000000' ||
          cnpj === '11111111111111' ||
          cnpj === '22222222222222' ||
          cnpj === '33333333333333' ||
          cnpj === '44444444444444' ||
          cnpj === '55555555555555' ||
          cnpj === '66666666666666' ||
          cnpj === '77777777777777' ||
          cnpj === '88888888888888' ||
          cnpj === '99999999999999') {
          return false;
          }
      // Valida DVs
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      const digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      // tslint:disable-next-line:triple-equals
      if (resultado != digitos.charAt(0)) {
        console.log('resultado: ' + resultado);
        console.log('digitos: ' + digitos.charAt(0));
          return false;
      }
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
              pos = 9;
        }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      // tslint:disable-next-line:triple-equals
      if (resultado != digitos.charAt(1)) {
            return false;
      }
      return true;

  }
}
