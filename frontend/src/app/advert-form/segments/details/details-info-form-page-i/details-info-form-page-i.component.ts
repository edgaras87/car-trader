import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SegmentsDirections } from 'src/app/enums/types/directions';
import { Advert } from 'src/app/interfaces/advert';
import { AdvertService } from 'src/app/services/advert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-info-form-page-i',
  templateUrl: './details-info-form-page-i.component.html',
  styleUrls: ['./details-info-form-page-i.component.scss']
})
export class DetailsInfoFormPageIComponent implements OnInit, OnDestroy {


  @Output() changeStep: EventEmitter<SegmentsDirections> = new EventEmitter<SegmentsDirections>();



  @Input() mainForm?: FormGroup;

  acceptableImageformats = ['.jpg', '.png'];
  private saved: boolean = false;



  constructor(
    private firebaseService: FirebaseService,
    private advertService: AdvertService,
    private scrollService: ScrollService,

  ) { }

  ngOnDestroy(): void {

    const advert:Advert = this.mainForm?.value;
    if (!this.saved && advert) this.advertService.update(advert).subscribe();

  }


  ngOnInit(): void {
    this.scrollService.scrollToTheTop();
    this.reloadImagesFromFirebase();
  }


  get images(): FormControl {
    return this.mainForm?.get('detailsInfo')?.get('images') as FormControl;
  }

  get id() {
    return this.mainForm?.value.id;
  }


  private reloadImagesFromFirebase() {

    if (this.id) {
      this.firebaseService.listAll(this.id).then(result => {

        const newImages = result.map(img => {
          img.url = img.url.replace('https://firebasestorage.googleapis.com', environment.imagekit.urlEndpoint);
          return img;
        });

        this.images.setValue(newImages)

      });



    }
  }

  private filterImageByAcceptableFormats(files: FileList) {
    return Array.from(files).filter(file => this.acceptableImageformats.includes(file.name.substring(file.name.length - 4, file.name.length)))
  }


  onSelectFile(event: Event) {


    if (this.id) {
      const input = event.target as HTMLInputElement;
      if (!input.files || input.files.length == 0) return

      let imageList = this.filterImageByAcceptableFormats(input.files);

      if (input.files.length == 1) {

        this.firebaseService.uploadOne(this.id, input.files[0]).subscribe(image => {
          let newImages = (this.images.value as { name: string, url: string }[]);
          newImages.push(image);
          this.images.setValue(newImages)
        }
        )


      }
      else {

        this.firebaseService.uploadMany(this.id, imageList).then(_ => {
          this.reloadImagesFromFirebase()
        });
      }
    }

  }

  removeImage(index: number) {

    if (this.id) {
      this.firebaseService.deleteFile(this.id, this.images.value[index].name).subscribe(_ => {
        const images = this.images.value;
        images.splice(index, 1);
        this.images.setValue(images);
      });

    }

  }







  onChangeStep(direction: SegmentsDirections) {

    const advert:Advert = this.mainForm?.value;

    if (advert)
    this.advertService.update(advert).subscribe(() => {
      this.saved = true;
      this.changeStep.emit(direction);
    });

  }





}
