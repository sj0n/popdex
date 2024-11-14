import { titleCase } from './titleCase';

interface DataItem {
    [index: string]: {
        [index: string]: any
    };
}

export function titleCaseMap(data: DataItem[], key: string) {
    if (Array.isArray(data)) {
        let formatted: string[] = [];
        for (let property of data) {
            formatted = [...formatted, titleCase(property[key].name)]
        }
        return formatted;
    }
}