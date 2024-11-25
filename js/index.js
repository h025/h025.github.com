tailwind.config = {
    theme: {
        spacing: Array.from({length: 1000}).reduce((map, _, index) => {
            map[index] = `${index}px`;
            return map;
        }, {}),
        extend: {}
    }
}

const baseUrl = 'http://137.175.55.201:8081/';
