import { Component, NgZone} from '@angular/core';
import { storage } from "nativescript-plugin-firebase";
import { File, knownFolders} from "tns-core-modules/file-system";
import { Progress } from "tns-core-modules/ui/progress";
@Component({
    selector: "progressbar-page",
    templateUrl: "progressbar-page.html",
	styleUrls : ["./progressbar-page.css"]

})


export class progressbarpage{
    message='';
	path="";
    Completion="";
    percent:number;
    check=false;
    constructor(private zone:NgZone){}
    public ngOnInit() :void {
        this.percent=0;
        this.path= knownFolders.currentApp().path+"/images/crime.jpg";
     }


    uploadFile() {
        this.check=true;
        var metadata = {
            contentType: "Image",
            contentLanguage: "fr",
            customMetadata: {
              "foo": "bar",
               "foo2": "bar2"
            }
          };
        const appPath = knownFolders.currentApp().path;
        // The path to he file  we want to upload (this one is in `app/images`)
        const logoPath = appPath+"//images//test.jpg"
        storage.uploadFile({

            bucket:  "gs://hri7238.appspot.com",
            remoteFullPath: 'uploads/images/firebase-storage.png',
            localFile: File.fromPath(logoPath),

            localFullPath: logoPath,

            onProgress: status => {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                if(status.percentageCompleted.valueOf()==100){
                   alert("Upload Completed Succesfully");
                }
                this.zone.run(()=>{
                    this.percent=status.percentageCompleted.valueOf();
                }
                )
                console.log("Percentage complete: " + status.percentageCompleted);
            },metadata
        }).then(uploadedFile => {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            this.message = "File uploaded: " + JSON.stringify(uploadedFile);
        }).catch(err => {
            alert("There was a problem uploading")
            console.log(err);
        })
        this.check=false;
    }
}
