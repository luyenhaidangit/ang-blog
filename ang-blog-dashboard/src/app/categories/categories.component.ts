import { Component } from '@angular/core';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent{
  constructor(){}

  ngOnInit(): void{

  }

  onSubmit(formData:any){
    let categoryData = {
      category : formData.value.category
    }

    // this.afs.collection("categories").add(categoryData).then(docRef=>{
    //   console.log(docRef);
    // })
    // .catch(err=>{
    //   console.log(err);
    // })
    
    console.log(categoryData);
  }
}
