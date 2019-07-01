export class SortModel {

    property: string;         // Sort by column name
    direction: string;     // Ascending / descending

    constructor() { 
        this.property = "";
        this.direction = "desc";
     }
}