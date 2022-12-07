import { CarImage } from "./carImage";

export interface CarDetailDto{
   carId:number;
   carName:string; 
   categoryName:string;
   brandName:string;
   colorName:string;
   unitsInStock:number;
   unitPrice:number;
   imagePaths:CarImage[];
}