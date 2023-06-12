import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountryByName(countryName: string): Observable<Country> {
    console.log(`Fetching country: ${countryName}`);
    return this.http.get<Country>(`https://restcountries.com/v3.1/name/${countryName}`);
  }


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
  }
}
