import { Language } from "../domain/language.interface";

export class LanguageService {
    
        public languages: Language[] = [
        
            { id: 'English', value: 'English' },
            { id: 'Tamil', value: 'Tamil' }
        ];
    
        getLanguages() {
            return this.languages.slice();
        }
    
    }
    