import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Weapon } from './models/Weapon';
import { WEAPONS } from './mock-weapons';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class WeaponService {

    private weaponsUrl = "http://127.0.0.1:8000/api/weapon";

    constructor(
        private messageService : MessageService,
        private http: HttpClient) { }

    mockGetWeapons(): Observable< Weapon[] > {
        this.messageService.add('WeaponService: fetched weapons');
        return of(WEAPONS);
    }

    mockGetWeapon(id: number): Observable<Weapon> {
        this.messageService.add(`WeaponService: fetched weapon id=${id}`);
        return of(WEAPONS.find(weapon => weapon.id === id));
    }

    getWeapons() : Observable< Weapon[] > {
        return this.http.get<Weapon[]>(this.weaponsUrl + '/',  {responseType: 'json'}).pipe(
            tap(
                //_=> this.log('fetched weapons')
            ), catchError(this.handleError('getWeapons', []))
        );
    }

    getWeapon( id : number ): Observable<Weapon> {
        const url = `${this.weaponsUrl}/${id}`;
        return this.http.get<Weapon>(url, {responseType: 'json'}).pipe(
            tap(
                //_ => this.log(`fetched weapon id=${id}`)
            ), catchError(this.handleError<Weapon>(`getWeapon id=${id}`))
        );
    }

    updateWeapon(weapon : Weapon): Observable<any> {
        const url = `${this.weaponsUrl}/${weapon.id}/edit`;
        return this.http.put(url, weapon, httpOptions).pipe(
            tap(
                //_ => this.log(`update weapon id=${weapon.id}`)
            ), catchError(this.handleError<any>(`updateWeapon id=${weapon.id}`))
        );
    }

    addWeapon(weapon : Weapon): Observable<Weapon> {
        const url = `${this.weaponsUrl}/new`;
        return this.http.post<Weapon>(url, weapon, httpOptions).pipe(
            tap(
                //(rweapon : Weapon) => this.log(`added weapon w/ id=${rweapon.id}`)
            ), catchError(this.handleError<Weapon>('addWeapon'))
        );
    }

    deleteWeapon (weapon : Weapon): Observable<any> {
        const url = `${this.weaponsUrl}/${weapon.id}`;
        return this.http.delete<Weapon>(url, httpOptions).pipe(
            tap(
                //_ => this.log(`deleted weapon id=${weapon.id}`)
            ), catchError(this.handleError<Weapon>('deleteWeapon'))
        );
    }

    private log(message: string) {
        this.messageService.add(`WeaponService: ${message}`);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
