import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "nativescript-plugin-firebase";
@Component({
    selector: "uploaddata-page",
    templateUrl: "uploaddata-page.html",
    styleUrls: ["./current-challenge.component.css"],
})


export class uploaddatapage{
    name_details="";
    pass_details="";
    add_details="";
    public constructor(private router: Router){


    }
    uploadFile(){
        //console.log("succesfully stores Mr/MS. "+this.name_details);
        console.log("100%");
        console.log(this.name_details+"   "+this.pass_details+"  "+this.add_details);
        let data={
            "name":this.name_details,
            "password":this.pass_details,
            "email":this.add_details
        }
        console.log(JSON.stringify(data));

        const c1 = firebase.firestore.collection("users");
        c1.add(data);
        alert("Done!");

    }
}
