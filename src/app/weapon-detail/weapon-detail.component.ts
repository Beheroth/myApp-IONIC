import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Weapon } from '../models/Weapon';
import { WeaponService } from '../weapon.service';

@Component({
    selector: 'app-weapon-detail',
    templateUrl: './weapon-detail.component.html',
    styleUrls: ['../app.component.css']
})
export class WeaponDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private weaponService: WeaponService,
        private location: Location
    ) { }

    @Input() weapon: Weapon;

    ngOnInit(): void {
        this.getWeapon();
    }

    getWeapon(): void {
        //get the id from the URL path
        const id = +this.route.snapshot.paramMap.get('id');
        this.weaponService.getWeapon(id).subscribe(weapon => this.weapon = weapon);
    }

    save() : void {
        this.weaponService.updateWeapon(this.weapon).subscribe(() =>  this.goBack());
    }

    delete() : void {
        this.weaponService.deleteWeapon(this.weapon).subscribe(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
