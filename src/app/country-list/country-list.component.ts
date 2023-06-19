import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
import { Country } from '../models/country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchValue: string = '';
  continents: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedContinent: string = '';

  constructor(private countryService: CountryService, private router: Router) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.filteredCountries = countries;  // init with all countries
    });
  }

  onSearchChange(event: any): void {
    const searchValue = event.target.value;
    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase()) &&
      (this.selectedContinent ? country.region.includes(this.selectedContinent) : true)
    );
  }


  onContinentChange(): void {
    if (this.selectedContinent) {
      this.filteredCountries = this.countries.filter(country =>
        country.region.includes(this.selectedContinent)
      );
    } else {
      this.filteredCountries = this.countries;
    }
  }

  goToCountryDetail(countryName: string): void {
    this.router.navigate(['/country', countryName]);
  }
}
