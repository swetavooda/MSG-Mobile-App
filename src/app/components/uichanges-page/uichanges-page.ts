import { Component,OnInit ,Inject} from '@angular/core';
import { ButtonService } from '../services/button.service';
import { Button } from '../shared/button';
import {TextField } from 'tns-core-modules/ui/text-field';
import { EventData } from "tns-core-modules/data/observable";
import { ListPicker } from "tns-core-modules/ui/list-picker";

//import { RadioButtonModule } from 'tns-core-modules/ui/core/view'

@Component({
    selector: "uichanges-page",
    templateUrl: "uichanges-page.html",
    moduleId: module.id,
})
/* export class ListPickerUsageComponent extends ButtonService{
    buttons: Button[];
    errMess: string;
    public years: Array<String> = ["suicide","cyber crime"];

    public onSelectedCrimeType(args: EventData,) {
        const picker = <ListPicker>args.object;
        this.buttonService.getButtons(picker)
            .subscribe(buttons => this.buttons = buttons,
              errmess => this.errMess = <any>errmess);
        console.log(`index: ${picker.selectedIndex}; item" ${this.years[picker.selectedIndex]}`);
    }
} */
export class uichangespage{
    
    public static numberOfButtons: number;
    buttons: Button[];
    errMess: string;
    public myImage="";
    public crimetypes: Array<String> = ["suicide","cybercrime"];
    constructor(private buttonService: ButtonService,
        @Inject('baseURL') private baseURL) {
            /* console.log("constructor");
            this.buttonService.getButtons()
            .subscribe(buttons => this.buttons = buttons,
              errmess => this.errMess = <any>errmess);

              console.log(this.buttons); */
              }                          
          
              public onSelectedCrimeType(args: EventData,) {
                  const picker = <ListPicker>args.object;
                  this.buttonService.getButtons(this.crimetypes[picker.selectedIndex])
                      .subscribe(buttons => this.buttons = buttons,
                        errmess => this.errMess = <any>errmess);
                  console.log(`index: ${picker.selectedIndex}; item" ${this.crimetypes[picker.selectedIndex]}`);
              }
    
    /* refresh(String:case)
    {
        this.buttonService.getButtons(case)
            .subscribe(buttons => this.buttons = buttons,
              errmess => this.errMess = <any>errmess);
        
    } 
 */
}

