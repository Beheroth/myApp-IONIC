import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Scenario } from '../models/Scenario';
import { ScenarioService } from '../scenario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private scenarioService: ScenarioService,
        private location: Location
    ) { }

    @Input() scenario: Scenario;

    ngOnInit() {
        this.getScenario();
    }

    getScenario() : void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.scenarioService.getScenario(id).subscribe(scenario => this.scenario = scenario);
    }

    save() : void {
        this.scenarioService.updateScenario(this.scenario).subscribe();
    }

    delete() : void {
        this.scenarioService.deleteScenario(this.scenario).subscribe(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }

}
