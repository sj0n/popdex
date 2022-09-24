export function titleCase(data) {
    let tempTitle = data.includes('-') ? data.split('-') : data;
    if(Array.isArray(tempTitle)) {
        tempTitle = tempTitle.map((title) => {
            return `${title.charAt(0).toUpperCase()}${title.substr(1)}`
        })

        return tempTitle.join(' ');
    }

    return `${tempTitle.charAt(0).toUpperCase()}${tempTitle.substr(1)}`;
    
}