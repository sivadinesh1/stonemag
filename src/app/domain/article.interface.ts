import { Language } from "../domain/language.interface";
import { Tag } from "../domain/tag.interface";
import { Category } from "../domain/category.interface";

export interface Article {
    id ? : any;
    title ? : string;
    rtitle ? : string;
    language ? : string; 
    coverimg ? : string;
    description ? : string;
    readtime ? : string;
    body ? : any;
    tag ? : Tag;
    category ? : Category;
    h2 ? : string;
    username ? : string;
    magname ? : string; 
    issueid ? : string;
    
   
  }