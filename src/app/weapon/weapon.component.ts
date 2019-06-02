import { Component, OnInit } from '@angular/core';

import { Weapon } from '../models/Weapon';
import { WeaponService } from '../weapon.service';


@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['../app.component.css']
})
export class WeaponComponent implements OnInit {
    constructor(private weaponService: WeaponService) { }

    weapons : Weapon[];

    ngOnInit() {
        this.getWeapons();
    }

    getWeapons(): void {
        this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
    }

    add(name : string, damage : string ): void {
        name = name.trim();
        damage = damage.trim();
        if (!name || !damage) {
            return;
        }
        let weapon = { 'name': name, 'damage': Number(damage), 'fKMycharacter' : null } as Weapon;
        this.weaponService.addWeapon(weapon).subscribe(weapon => {
            this.getWeapons();
            if (weapon instanceof Weapon) {
                this.addToIndex(weapon);
            }
        });
    }

    delete(weapon:Weapon):void {
        this.weaponService.deleteWeapon(weapon).subscribe(() => this.getWeapons());
    }

    private addToIndex(weapon:Weapon):void {
        this.weapons.push(weapon);
    }
}
