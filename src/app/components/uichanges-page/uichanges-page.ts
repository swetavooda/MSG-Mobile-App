import { Component,OnInit ,Inject} from '@angular/core';
import { ButtonService } from '../services/button.service';
import { Button } from '../shared/button';
import {TextField } from 'tns-core-modules/ui/text-field';
import { EventData } from "tns-core-modules/data/observable";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { camerapage } from "../camera-page/camera-page";
//import { RadioButtonModule } from 'tns-core-modules/ui/core/view'

@Component({
    selector: "uichanges-page",
    templateUrl: "uichanges-page.html",
    styleUrls:["./uichanges-page.css"],
    moduleId: module.id,
})

export class uichangespage{

    public static numberOfButtons: number;
    buttons: Button[];
    errMess: string;
    public myImage="";
    public crimetypes: Array<String> = ["suicide","cybercrime"];
    constructor(private buttonService: ButtonService,
        @Inject('baseURL') private baseURL, private cameraPage: camerapage) {
            
              }

              public onSelectedCrimeType(args: EventData,) {
                  const picker = <ListPicker>args.object;
                  this.buttonService.getButtons(this.crimetypes[picker.selectedIndex])
                      .subscribe(buttons => this.buttons = buttons,
                        errmess => this.errMess = <any>errmess);
                  console.log(`index: ${picker.selectedIndex}; item" ${this.crimetypes[picker.selectedIndex]}`);
              }
              public onTap()
              {
                  this.cameraPage.openCam();
              }

    
}

