const NUM_ITEMS = 6;

function getColor(index: number) {
    const colors = [
        '#EAD3FF', '#DA22FF',
        '#D8AAFF', '#C822FF',
        '#C682FF', '#B622FF',
        '#B45AFF', '#A422FF',
        '#A232FF', '#9222FF',
        '#902AFF', '#8222FF'
    ];

    return colors[index % colors.length];
}

export type Item = {
    key: string;
    label: string;
    height: number;
    width: number;
    backgroundColor: string;
};

export const initialData: Item[] = [...Array(NUM_ITEMS)].map((_, index) => ({
    key: `item-${index}`,
    label: String(index),
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor: getColor(index),
}));
