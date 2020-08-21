import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
    selector: "weather-api",
    templateUrl: "weather-api.html",
})


export class weatherapi implements OnInit{
    private appId : string;
    public city : string;
    private weather : any;
    public temp=0;
    public tempf=0;
    public pressure=0;
    public humidity=0;
    public wind=0;
    public constructor(private route: ActivatedRoute, private http: HttpClient){ 
        //this.city="Hyderabad";
        this.route.params.subscribe((params) => {
            this.city = params["name"];
        });
        this.appId = "4dfb4bef912677f2a9b2582c690b35d3";
    }
    ngOnInit(): void {
            this.getWeather();
        }

        public getWeather() {
            let params = new HttpParams({
                fromObject: {
                    "q" : this.city,
                    "appid": this.appId
                }
            });
            this.http.get("https://api.openweathermap.org/data/2.5/weather", { params: params })
                .subscribe(result => {
                    this.weather = result;
                    this.tempf= Number((Number(this.weather.main.temp)-273).toFixed(2));
                    this.temp=Number((((this.tempf*9)/5)+32).toFixed(2));
                    this.humidity=this.weather.main.humidity;
                    this.pressure=this.weather.main.pressure;
                    this.wind=this.weather.wind.speed;
                }, error => {
                    console.error(error);
                });
        }
}
