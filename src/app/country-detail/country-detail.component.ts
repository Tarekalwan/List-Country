import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country: Country | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryName = params.get('name');
      if (countryName) {
        this.countryService.getCountryByName(countryName).subscribe((country: Country) => {
          this.country = country;
          this.isLoading = false;
        });
      }
    });
  }
}
