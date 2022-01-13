import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from 'src/material/material.module';
import { CityWeatherComponent } from './city-weather/city-weather.component';

@NgModule({
  declarations: [			
    AppComponent,
      WeatherComponent,
      NavComponent,
      CityWeatherComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [CityWeatherComponent]
})
export class AppModule { }
