tailwind.config = {
    theme: {
        spacing: Array.from({length: 1000}).reduce((map, _, index) => {
            map[index] = `${index}px`;
            return map;
        }, {}),
        extend: {}
    }
}

const baseUrl = 'your.video.website';
