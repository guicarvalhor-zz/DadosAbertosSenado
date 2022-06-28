import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { __values } from 'tslib';
import { GraficosService } from './grafico.service';

interface DadosGrafico {
  receitasPrevista: Number[];
  receitasArrecadadaLiquida: Number[];
  anos: Number[];
  valorPago: Number[];
  exercicio: Number[];
}

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
})

export class GraficosComponent implements OnInit {

  //criação de tipos para futura atribuição
  json: any;
  json2:any;
  chart: any;
  chart2: any;
  chart3: any;
  chart4:any;
  anos: any;
  exercicio: any;

  //construtor
  constructor(private graficosservice: GraficosService) {}

  ngOnInit(): void {
    //pegando o elemento do html para envio dos dados
    this.chart = document.getElementById('meu_primeiro_grafico');
    this.chart2 = document.getElementById('segundo_grafico');
    this.chart3 = document.getElementById('terceiro_grafico');
    this.chart4 = document.getElementById('quarto_grafico');

    //faz a função de pegar os elementos
    Chart.register(...registerables);

    //chamando as funções para carregar os dados do gráfico
    this.loadChart();
    this.loadChart2();
    this.loadChart3();
    this.loadChart4();
  }

  pegarDados(): DadosGrafico {
    //chamando a função construtora
    this.json = GraficosService.getJson();

    //chamando a função construtora
    this.json2 = GraficosService.getJson2();

    //criando as arrays para receber os valores
    let resultReceitaPrevista: number[] = [];
    let resultReceitaArrecadadaLiquida: number[] = [];
    let anos: number[] = [];
    let resultvalorpago: number[] = [];
    let resultexercicio: number[] = [];

    //loop para busca dos dados dentro do JSON de receitas
    this.json.receitas.forEach(function (element: any) {
      resultReceitaPrevista.push(parseInt(element.receitaprevista));
      resultReceitaArrecadadaLiquida.push(parseInt(element.receitaarrecadadaliquida));
      anos.push(element.Ano);
    });

    //loop para busca dos dados dentro do JSON de despesas
    this.json2.despesas.forEach(function (element: any) {
      resultvalorpago.push(parseInt(element.ValorPago));
      resultexercicio.push(element.Exercicio);
    });

    //retorno dos dados
    return {
      receitasPrevista: resultReceitaPrevista,
      receitasArrecadadaLiquida: resultReceitaArrecadadaLiquida,
      anos: anos,
      valorPago: resultvalorpago,
      exercicio: resultexercicio
    };
  }


  //função para criação do gráfico com as receitas previstas x receitas arrecadadas
  loadChart(): void {
    let dadosGrafico = this.pegarDados();
    new Chart(this.chart, {
      type: 'line',
      data: {
        labels: dadosGrafico.anos,
        datasets: [
          {
            label: 'Receitas Previstas',
            data: dadosGrafico.receitasPrevista,
            backgroundColor: ['rgba(255, 26, 104, 0.2)'],
            borderColor: ['rgba(255, 26, 104, 1)'],
            borderWidth: 1,
          },
          {
            label: 'Receitas Arrecadadas Liquidas',
            data: dadosGrafico.receitasArrecadadaLiquida,
            backgroundColor: ['rgba(65, 105, 255, 0.2)'],
            borderColor: ['rgba(65, 105, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            fullSize: true,
            align: 'start',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }
  //função para criação do gráfico com as receitas previstas
  loadChart2(): void {
    let dadosGrafico2 = this.pegarDados();
    new Chart(this.chart2, {
      type: 'bar',
      data: {
        labels: dadosGrafico2.anos,
        datasets: [
          {
            label: 'Receitas Previstas',
            data: dadosGrafico2.receitasPrevista,
            backgroundColor: ['rgba(255, 26, 104, 0.2)'],
            borderColor: ['rgba(255, 26, 104, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            fullSize: true,
            align: 'start',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }
  //função para criação do gráfico com as receitas arrecadadas
  loadChart3(): void {
    let dadosGrafico3 = this.pegarDados();
    new Chart(this.chart3, {
      type: 'bar',
      data: {
        labels: dadosGrafico3.anos,
        datasets: [
          {
            label: 'Receitas Arrecadadas Liquidas',
            data: dadosGrafico3.receitasArrecadadaLiquida,
            backgroundColor: ['rgba(65, 105, 255, 0.2)'],
            borderColor: ['rgba(65, 105, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            fullSize: true,
            align: 'start',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }
  //função para criação do gráfico com as receitas previstas
  loadChart4(): void {
    let dadosGrafico4 = this.pegarDados();
    new Chart(this.chart4, {
      type: 'line',
      data: {
        labels: dadosGrafico4.exercicio,
        datasets: [
          {
            label: 'Origem',
            data: dadosGrafico4.valorPago,
            backgroundColor: ['rgba(96, 211, 148, 0.2)'],
            borderColor: ['rgba(96, 211, 148, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            fullSize: true,
            align: 'start',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
      },
    });
  }
}
