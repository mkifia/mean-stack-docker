import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {fakeAsync} from "@angular/core/testing";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app works!';

    // Link to our api, pointing to localhost
    API = 'http://localhost:3000';

    // Declare empty list of people
    people: any[] = [];
    user;
    person;
    updateAction: boolean;
    showPerson: boolean;

    constructor(private http: HttpClient) {}

    // Angular 2+ Life Cycle event when component has been initialized
    ngOnInit() {
        this.getAllPeople();
        this.initUser();
    }

    initUser() {
        this.user = {
            name: null,
            age: null
        };

        this.showPerson = false;
    }

    // Add one person to the API
    addPerson(user) {
        this.http.post(`${this.API}/users`, user)
            .subscribe(() => {
                this.getAllPeople();
                this.initUser();
            }, (error: any) => { console.log(error); });
    }

    // Get all users from the API
    getAllPeople() {
        this.http.get(`${this.API}/users`)
            .subscribe((people: any ) => {
                this.people = people;
            }, (error: any) => { console.log(error); });
    }

    getPerson(user) {
        this.http.get(`${this.API}/users/${user._id}`)
            .subscribe((person) => {
                this.person = person;
                this.showPerson = true;
            }, (error: any) => { console.log(error); });
    }


    DeletePerson(user) {
        this.http.delete(`${this.API}/users/${user._id}`)
            .subscribe(() => {
                this.getAllPeople();
            }, (error: any) => { console.log(error); });
    }

    updateBtn(user) {
        this.user = {
            _id: user._id,
            name: user.name,
            age: user.age
        };

        this.updateAction = true;
    }

    UpdatePerson() {

        this.http.put(`${this.API}/users/${this.user._id}`, {name: this.user.name, age: this.user.age})
            .subscribe(() => {
                this.initUser();
                this.getAllPeople();
            }, (error: any) => { console.log(error); });
    }
}
