import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public constructor(private router:Router){}
    ngOnInit(): void {}

    public QRScanner(){
        this.router.navigate(["qrscanner"]);
    }

    public getweather(){
        this.router.navigate(["weather"]);
    }

    public camera(){
        this.router.navigate(["camera"]);
    }

    public UIChanges(){
        this.router.navigate(["uichanges"]);
    }

    public upload(){
        this.router.navigate(["uploaddata"]);
    }

    public progressbar(){
        this.router.navigate(["progressbar"]);
    }
}
