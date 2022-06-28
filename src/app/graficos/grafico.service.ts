import { Injectable } from '@angular/core';
import * as dados from 'src/app/graficos/dados.json';
import * as despesa from 'src/app/graficos/dados_despesa.json';

@Injectable({ providedIn: 'root' })

//classe para ler os dados do JSON
export class GraficosService {

  //criação de uma array para guardar os valores
  json = [];

  //método estático para leitura dos dados de receita no JSON importado 
  static getJson() {
    let dadosGrafico = (dados as any).default;
    return dadosGrafico;
  }

  //lista de anos filtrados no JSON de receitas
  static filtroJson(ano: number) {
    let dados = this.getJson();
    let resultado = dados.filter(
      (element: { Ano: number }) => element.Ano === ano
    );
    return resultado;
  }

  //método estático para leitura dos dados de despesas no JSON importado 
  static getJson2() {
    let dadosGraficoDespesa = (despesa as any).default;
    return dadosGraficoDespesa;
  }

}
