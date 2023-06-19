import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Country } from './models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountryByName(countryName: string): Observable<Country> {
    console.log(`Fetching country: ${countryName}`);
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${countryName}`).pipe(
      map((countries: Country[]) => {
        const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());
        if (country) {
          return country;
        } else {
          throw new Error(`Country not found: ${countryName}`);
        }
      })
    );
  }


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
  }
}
