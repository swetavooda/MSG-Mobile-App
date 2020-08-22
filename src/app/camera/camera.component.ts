import { Component,OnInit ,Inject} from '@angular/core';
import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset';
//import { Observable } from 'rxjs';
//import { map, catchError } from 'rxjs/operators';
//import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { ButtonService } from '../services/button.service';
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders} from "tns-core-modules/file-system";
import { Button } from '../shared/button';
//import { baseURL } from '../shared/baseurl';
@Component({
    selector: 'app-camera',
    moduleId: module.id,
    templateUrl: './camera.component.html'
    //styleUrls: ['./camera.component.css']
  })
  export class CameraComponent{

    public static numberOfButtons: number;
    buttons: Button[];
    errMess: string;
    public myImage="";

    public saveToGallery: boolean = false;
    public allowsEditing: boolean = false;
    public keepAspectRatio: boolean = true;
    public width: number = 320;
    public height: number = 240;
    public cameraImage: ImageAsset;
    public actualWidth: number;
    public actualHeight: number;
    public scale: number = 1;
    public labelText: string;
    constructor(private buttonService: ButtonService,
        @Inject('baseURL') private baseURL) {this.buttonService.getButtons()
            .subscribe(buttons => this.buttons = buttons,
              errmess => this.errMess = <any>errmess);
              }

    openCam(args) {
        var milliseconds = (new Date).getTime();
        var that=this;
        requestPermissions().then(
            () => {
                takePicture({ width: this.width, height: this.height, keepAspectRatio: this.keepAspectRatio, saveToGallery: this.saveToGallery, allowsEditing: this.allowsEditing })
                    .then((imageAsset: any) => {
                        this.cameraImage = imageAsset;
                        const source = new ImageSource();
                        source.fromAsset(imageAsset)
                            .then((imageSource: ImageSource) => {
                                const folderPath: string = knownFolders.documents().path;
                                const fileName = milliseconds+".png";
                                const filePath = path.join(folderPath, fileName);
                                const saved: boolean = imageSource.saveToFile(filePath, "png");

                                that.myImage=filePath;
                                if (saved) {

                                    console.log("Image saved successfully!");
                                }
                            })
                            .catch((e) => {
                                console.log("Error: ");
                                console.log(e);
                            });
                        let that = this;
                        imageAsset.getImageAsync(function (nativeImage, ex) {
                            if (ex instanceof Error) {
                                throw ex;
                            } else if (typeof ex === "string") {
                                throw new Error(ex);
                            }

                            if (imageAsset.android) {
                                // get the current density of the screen (dpi) and divide it by the default one to get the scale
                                that.scale = nativeImage.getDensity() / android.util.DisplayMetrics.DENSITY_DEFAULT;
                                that.actualWidth = nativeImage.getWidth();
                                that.actualHeight = nativeImage.getHeight();
                            } else {
                                that.scale = nativeImage.scale;
                                that.actualWidth = nativeImage.size.width * that.scale;
                                that.actualHeight = nativeImage.size.height * that.scale;
                            }
                            that.labelText = `Displayed Size: ${that.actualWidth}x${that.actualHeight} with scale ${that.scale}\n` +
                                `Image Size: ${Math.round(that.actualWidth / that.scale)}x${Math.round(that.actualHeight / that.scale)}`;

                            console.log(`${that.labelText}`);
                        });
                    }, (error) => {
                        console.log("Error: " + error);
                    });
            },
            () => alert('permissions rejected')
        );
    }

    openMe()
    {

        this.buttonService.getButtons()
      .subscribe(buttons => this.buttons = buttons,
        errmess => this.errMess = <any>errmess);

    }

}
