import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { StorageService } from 'src/services/storage.service';
import { Obj } from 'src/resources/news';
import { DataService } from 'src/services/data.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let storageService: StorageService;
  let obj: Obj;
  let dataService: DataService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    obj = {
      "hits": [
        {
          "created_at": new Date(),
          "title": "Stephen Hawking has died",
          "url": "http://www.bbc.com/news/uk-43396008",
          "author": "Cogito",
          "points": 6015,
          "num_comments": 436,
          "created_at_i": 1520999430,
          "objectID": "16582136",
          "diff_time": null
        },
        {
          "created_at": new Date(),
          "title": "A Message to Our Customers",
          "url": "http://www.apple.com/customer-letter/",
          "author": "epaga",
          "points": 5771,
          "num_comments": 967,
          "created_at_i": 1455698317,
          "objectID": "11116274",
          "diff_time": null,
        },
      ],
      "nbPages": 50,
    }
    storageService = <StorageService>{
      store(key, value) {

      }
    }
    dataService = <DataService>{
      getDataByPageNumber(pageNumber): Observable<Obj> {
        return of(obj);
      }
    }
    route = <ActivatedRoute> {
      params : of()
    }
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [{ provide: DataService, useValue: dataService },
      { provide: StorageService, useValue: storageService },
      { provide: ActivatedRoute, useValue: route }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('upVote', () => {
    component.obj = obj;
    component.upVote('11116274');
    expect(component.obj.hits.find((row) => row.objectID === '11116274').points).toEqual(5772)
  });

  it('Hide', () => {
    component.obj = obj;
    component.data.push(6015);
    component.data.push(5771);
    component.label.push('16582136');
    component.label.push('11116274');
    component.lineChartData = [
      { data: component.data },
    ];
    component.lineChartLabels = component.label;
    component.hideRow('11116274');
    expect(component.obj.hits.length).toEqual(1);
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
