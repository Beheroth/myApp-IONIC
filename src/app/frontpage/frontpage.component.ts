import { Component, OnInit } from '@angular/core';

import { Scenario } from '../models/Scenario';
import { ScenarioService } from '../scenario.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-frontpage',
    templateUrl: './frontpage.component.html',
    styleUrls: ['../app.component.css']
})
export class FrontpageComponent implements OnInit {

    constructor(
        private scenarioService: ScenarioService, private messageService: MessageService
    ) { }

    scenarios : Scenario[];

    ngOnInit() {
        this.getScenarios();
    }


    getScenarios(): void {
        this.scenarioService.getScenarios().subscribe(scenarios => this.scenarios = scenarios);
    }


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


    delete(scenario : Scenario) : void {
        this.scenarioService.deleteScenario(scenario).subscribe(() => this.getScenarios());
    }

    private addToIndex(scenario:Scenario):void {
        this.scenarios.push(scenario);
    }
}
