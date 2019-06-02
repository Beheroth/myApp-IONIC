import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Scenario } from './models/Scenario';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class ScenarioService {

    private scenariosUrl = "http://127.0.0.1:8000/api/scenario";

    constructor(
        private messageService : MessageService,
        private http: HttpClient) { }

    getScenarios() : Observable<Scenario[]>{
        return this.http.get<Scenario[]>(this.scenariosUrl + '/',  {responseType: 'json'}).pipe(tap(), catchError(this.handleError('getScenarios', [])));
    }

    getScenario( id : number ): Observable<Scenario> {
        const url = `${this.scenariosUrl}/${id}`;
        return this.http.get<Scenario>(url, {responseType: 'json'}).pipe(
            tap(
                //_ => this.log(`fetched scenario id=${id}`)
            ), catchError(this.handleError<Scenario>(`getScenario id=${id}`))
        );
    }

    updateScenario(scenario : Scenario): Observable<any> {
        const url = `${this.scenariosUrl}/${scenario.id}/edit`;
        return this.http.put(url, scenario, httpOptions).pipe(
            tap(
                //_ => this.log(`update scenario id=${scenario.id}`)
            ), catchError(this.handleError<any>(`updateScenario id=${scenario.id}`))
        );
    }

    addScenario(scenario : Scenario): Observable<Scenario> {
        const url = `${this.scenariosUrl}/new`;
        return this.http.post<Scenario>(url, scenario, httpOptions).pipe(
            tap(
                //(rscenario : Scenario) => this.log(`added scenario w/ id=${rscenario.id}`)
            ), catchError(this.handleError<Scenario>('addScenario'))
        );
    }

    deleteScenario (scenario : Scenario): Observable<any> {
        const url = `${this.scenariosUrl}/${scenario.id}`;
        return this.http.delete<Scenario>(url, httpOptions).pipe(
            tap(
                //_ => this.log(`deleted scenario id=${scenario.id}`)
            ), catchError(this.handleError<Scenario>('deleteScenario'))
        );
    }

    private log(message: string) {
        this.messageService.add(`ScenarioService: ${message}`);
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
