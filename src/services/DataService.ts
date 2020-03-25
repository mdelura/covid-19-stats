import Axios from 'axios';
import parse from 'csv-parse/lib/sync';
import DataResult from '../models/DataResult';

const dataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

const getData = async (): Promise<DataResult[] | undefined> => {
    const response = await Axios.get(dataUrl);

    if (response.statusText !== 'OK') return;

    return parse(response.data, { columns: true }) as DataResult[];
};

export default {
    getDataResults: getData
};
