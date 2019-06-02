import { Component, OnInit } from '@angular/core';

import { Scenario } from '../models/Scenario';
import { ScenarioService } from '../scenario.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-new-scenario',
  templateUrl: './new-scenario.component.html',
  styleUrls: ['../app.component.css'],
})
export class NewScenarioComponent implements OnInit {

    constructor(
      private scenarioService: ScenarioService, private messageService: MessageService
    ) { }

    ngOnInit() {}

    add(name : string, gm : string ): void {
        name = name.trim();
        gm = gm.trim();
        if (!name || !gm) {
            return;
        }
        let scenario = { 'name': name, 'gM': gm, 'description' : null, 'mycharacters': null } as Scenario;
        this.scenarioService.addScenario(scenario).subscribe(scenario => {
            this.getScenarios();
        });
    }
}
