import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Scenario } from '../models/Scenario';
import { ScenarioService } from '../scenario.service';

@Component({
  selector: 'app-newScenario',
  templateUrl: './newScenario.component.html',
  styleUrls: ['../app.component.css']
})
export class newScenarioComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private scenarioService: ScenarioService,
        private location: Location
    ) { }


    add(name : string, gm : string ): void {
        name = name.trim();
        gm = gm.trim();
        if (!name || !gm) {
            return;
        }
        let scenario = { 'name': name, 'gM': gm, 'description' : null, 'mycharacters': null } as Scenario;
        this.scenarioService.addScenario(scenario).subscribe(scenario => {
            this.getScenarios();
            if (scenario instanceof Scenario) {
                this.addToIndex(scenario);
            }
        });
    }

}
