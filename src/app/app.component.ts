import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly configurationService: ConfigurationService,
    ) {

  }

  ngOnInit() {
    this.configurationService.load();
  }

}
