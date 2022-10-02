import { titleCase } from './titleCase';

export function titleCaseMap(data: object[], key: string) {
    if (Array.isArray(data)) {
        let formatted = [];
        for (let property of data) {
            formatted = [...formatted, titleCase(property[key].name)]
        }
        return formatted;
    }
}