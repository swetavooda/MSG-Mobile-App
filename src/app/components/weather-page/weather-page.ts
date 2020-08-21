import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { TextView } from "tns-core-modules/ui/text-view";
import { EventData } from "tns-core-modules/data/observable";
@Component({
    selector: "weather-page",
    templateUrl: "weather-page.html",
})


export class weatherpage{
    name= "";
    onTextChange(args: EventData) {
        const tv = args.object as TextView;
        this.name=tv.text;
    }
    public constructor(private router: Router){
    }
    public onTap(){
        this.router.navigate(["weatherapi",this.name]);
    }
}
