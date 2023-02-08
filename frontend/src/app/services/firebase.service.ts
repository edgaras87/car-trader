import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult, Reference } from '@angular/fire/compat/storage/interfaces';
import { firstValueFrom, from, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage) { }



  uploadOne(id: string, file: File) {
    const storageRef = this.storage.ref('/images/' + id);
    let fileRef = storageRef.child(file.name);
    return from(fileRef.put(file)).pipe(
      switchMap(() => fileRef.getDownloadURL()),
      map(url => {return {name:file.name, url:url}})
    );
  }

  async uploadMany(id: string, files: File[]) {
    const storageRef = this.storage.ref('/images/' + id);

    return await Promise.all(files.map(async (file:File) => {
      let fileRef = storageRef.child(file.name);
      return await fileRef.put(file)
    }))
  }




  async listAll(id: string) {
    const storageRef = this.storage.ref('images/' + id.toString());
    let itemList = await firstValueFrom(storageRef.listAll())
    // needs check
    //if (!itemList) return []
    let images = itemList?.items.map(async item => { return { name: item.name, url: await item.getDownloadURL() } })
    return await Promise.all(images)


  }

  deleteFile(id: string, name: string) {
    const storageRef = this.storage.ref('images/' + id);
    const childRef = storageRef.child(name);
    return childRef.delete();
  }


  deleteAllFolder(id: string) {

    const storageRef = this.storage.ref('images/' + id);
    return storageRef.listAll().pipe(
      map((dir: ListResult) => dir.items.forEach((fileRef: Reference) => this.deleteFile(id, fileRef.name)))
    );
  }


}

