import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { News, Obj } from 'src/resources/news';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  pageNumber: number;
  obj: Obj = new Obj();
  maxPages: number;
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: any;
  lineChartColors: Color[];
  data: number[] = [];
  label: string[] = [];
  key: string = 'pageData_';


  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
    private readonly storageService: StorageService,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageNumber = +params['pageNumber'];
      console.log(this.key+this.pageNumber);
      let data = this.storageService.retrieve(this.key + this.pageNumber);
      if (data !== undefined) {
        this.init(JSON.parse(data));
      } else {
        this.dataService.getDataByPageNumber(this.pageNumber).subscribe((obj) => {
          this.init(obj);
        });
      }
    });
  }

  upVote(objectID: string) {
    this.obj.hits.find((row) => row.objectID === objectID).points = this.obj.hits.find((row) => row.objectID === objectID).points + 1;
    this.storageService.store(this.key + this.pageNumber, JSON.stringify(this.obj));
  }

  hideRow(objectID: string) {
    this.obj.hits = this.obj.hits.filter((rows) => rows.objectID !== objectID);
    //let index = this.lineChartLabels.indexOf(objectID);
    this.lineChartData = this.lineChartData.filter((data) => data.label !== objectID);
    this.lineChartLabels = this.lineChartLabels.filter((label) => label !== objectID);
    this.storageService.store(this.key + this.pageNumber, JSON.stringify(this.obj));
  }

  init(obj: Obj) {
    this.maxPages = obj.nbPages;
    this.data = [];
    this.label = [];
    obj.hits.forEach((row) => {
      this.data.push(row.points);
      this.label.push(row.objectID);
      let diff_time = Math.ceil((Date.now().valueOf() / 1000) - row.created_at_i);
      if (diff_time < 60) {
        row.diff_time = diff_time + ' seconds ago';
      } else {
        if (diff_time / 60 < 60) {
          row.diff_time = Math.floor(diff_time / 60) + ' minutes ago';
        } else {
          if ((diff_time / 60) / 60 < 24) {
            row.diff_time = Math.floor((diff_time / 60) / 60) + ' hours ago';
          } else {
            row.diff_time = Math.floor((((diff_time / 60) / 60)) / 24) + ' days ago';
          }
        }
      }
    });
    this.obj = obj as Obj;
    this.storageService.store(this.key + this.pageNumber, JSON.stringify(this.obj));
    this.lineChartData = [
      { data: this.data },
    ];

    this.lineChartLabels = this.label;

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Votes'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'ID'
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      }
    };

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.28)',
      },
    ];

    /* lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line'; */
  }

}
