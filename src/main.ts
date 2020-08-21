// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "@nativescript/angular/platform";

import {NativeScriptModule} from "@nativescript/angular/nativescript.module"
import { NgModule } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { NativeScriptRouterModule } from "@nativescript/angular/router";
import { appComponents, appRoutes } from "./app/app-routing.module";

import {HttpClientModule} from "@angular/common/http";
import { ProcessHTTPMsgService } from "./app/components/services/process-httpmsg.service";
import { ButtonService } from "./app/components/services/button.service";
import { baseURL } from "./app/components/shared/baseurl";
import * as pages from 'tns-core-modules/ui/page';

//import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';
//import { RadioButtonModule } from 'nativescript-radiobutton/angular';
import { EventData } from "tns-core-modules/data/observable";
//import { ListPicker } from "tns-core-modules/ui/list-picker";
//import { AppModule } from "./app/app.module";

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
//platformNativeScriptDynamic().bootstrapModule(AppModule);
@NgModule({
    declarations: [AppComponent, ...appComponents],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        HttpClientModule
        //Observable,
        //RadioButtonModule,
        //EventData,
        //ListPicker

    ],
    providers: [{provide: 'baseURL', useValue: baseURL},
    ButtonService,
    ProcessHTTPMsgService]
})
class AppComponentModule {}
const firebase = require("nativescript-plugin-firebase");
firebase.init({
        storageBucket: "gs://hri7238.appspot.com" // this is the appsport url copied in step 2
        // any other options follows here
    })
platformNativeScriptDynamic().bootstrapModule(AppComponentModule);