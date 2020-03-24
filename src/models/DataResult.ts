export default interface DataResult {
    'Province/State': string;
    'Country/Region': string;
    'Lat': number;
    'Long': number;

    [index: string]: number | string;
}
