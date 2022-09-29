export function titleCase(data: any): string {
    let tempTitle = data.includes('-') ? data.split('-') : data;
    if(Array.isArray(tempTitle)) {
        tempTitle = tempTitle.map((title) => {
            return `${title.charAt(0).toUpperCase()}${title.substring(1)}`
        })
        return tempTitle.join(' ');
    }
    return `${tempTitle.charAt(0).toUpperCase()}${tempTitle.substring(1)}`;
}