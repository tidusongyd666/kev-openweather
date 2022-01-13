import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { CityWeatherComponent } from '../city-weather/city-weather.component';
import { ApiError, City, Country, PagedCities, PagedCountries, weather } from '../interface';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { AutoUnsubscribeService } from '../services/auto-unsubscribe.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [AutoUnsubscribeService],
})
export class WeatherComponent implements OnInit {
  cities : City[] = [];
  selectedCity: FormControl;
  countires : Country[] = [];
  selectedCountry: FormControl;

  isLoading = false;
  errorCountry: string = '';
  errorCity: string = '';

  form : FormGroup;
  constructor(
    @Self() private unsub: AutoUnsubscribeService,
    private api:ApiService, 
    private fb:FormBuilder,
    private dialog:MatDialog) { 
    this.selectedCountry = new FormControl('', Validators.required);
    this.selectedCity = new FormControl('', Validators.required);
    this.form = fb.group({
      selectedCountry:['',Validators.required],
      selectedCity:['',Validators.required],
      unlimited: [{ value: false, disabled: false }]
    })
    
  }
 //country
  ngOnInit() {
    this.unsub.subs = this.selectedCountry.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorCountry = "";
        this.countires = [];
        this.isLoading = true;
      }),
      switchMap(value => this.api.getSearchEntitiesSimple('countries', new HttpParams().set('search', value))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    ).subscribe((data : PagedCountries) => {
      if (data.count <= 0) {
        this.errorCountry = 'No result found';
        this.countires = [];
      } else {
        this.errorCountry = "";
        this.countires = data.countries;
      }
    });
    //city
    this.unsub.subs = this.selectedCity.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorCity = "";
        this.cities = [];
        this.isLoading = true;
      }),
      switchMap(value => this.api.getSearchEntitiesSimple('cities', new HttpParams().set('search', value))
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    ).subscribe((data : PagedCities) => {
      if (data.count <= 0) {
        this.errorCity = 'No result found';
        this.cities = [];
      } else {
        this.errorCity = "";
        this.cities = data.cities;
      }
    });
  }

  onSelectedCountry(country : string) { 
    this.form.patchValue({
      selectedCountry: country
    });
  }

  onSelectedCity(city : string) { 
    this.form.patchValue({
      selectedCity : city
    });
  }

  submit(){
    const country = this.form.get('selectedCountry')?.value;
    const city = this.form.get('selectedCity')?.value;
    const unlimited = this.form.get('unlimited')?.value;
    let info : string;
    this.unsub.subs = this.api.getWeather(country,city,unlimited).subscribe(res=>{
      info = (res as weather).description || '';
      this.dialog.open(CityWeatherComponent, {
        data: { info: info || '', country: country || '', city: city || ''}
    });
    },
    err => {
      if (err.status == 401) {
        // unauthorized
        info = (err.error as ApiError).userMessage;

      } else if (err.status == 429) {
        // limit reached
        info = err.error;
      } 
      else if (err.status == 400) {
        // bad request
        info = (err.error as ApiError).userMessage;
      }
      else {
        // unknown
        info = (err.error as ApiError).userMessage;
        console.error(err.error);
      }
      this.dialog.open(CityWeatherComponent, {
        data: { info: info || '', country: country || '', city: city || ''}
    });
    })
  }


}
