export default class DataResult {
    'Province/State': string;
    'Country/Region': string;
    'Lat': number;
    'Long': number;

    [index: string]: number | string;
}
