import { SortModel } from './SortModel';

export class PageSortModel {  
    content: any[];         // Data

    first: boolean;         // Is first page
    last: boolean;          // Is last page

    totalElements: number;  // Number of all elements
    totalPages: number;     // Number of total pages
    size: number;           // Elements per page
    number: number;         // Index of page
    elementsOnPage: number; // Number of elements on current page

    sort: SortModel = new SortModel();

    constructor() { 
        this.sort = new SortModel();
     }

    public static setParams(pageIndex: number, count: number, sortColumn: string, sortOrder: string): PageSortModel{
        
        let retVal: PageSortModel = new PageSortModel();
        

        retVal.number = pageIndex;
        retVal.size = count;
        retVal.sort.property = sortColumn;
        retVal.sort.direction = sortOrder;

        // Reset, do not send to server
        retVal.elementsOnPage = 0;
        retVal.content = null;
        retVal.first = false;
        retVal.last = false;
        retVal.totalElements = 0;
        retVal.totalPages = 0;

        return retVal;
    }

    // Default request for patient
    public static defaultPatient(): PageSortModel{
        return PageSortModel.setParams(0, 5, "", "desc");
    }

    // Default request for izvrseneIntervencije
    public static defaultInterventions(): PageSortModel{
        return PageSortModel.setParams(0, 5, "", "desc");
    }
}