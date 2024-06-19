const NUM_ITEMS = 6;

function getColor(index: number) {
    const multiplier = 255 / (NUM_ITEMS - 1);
    const colorVal = index * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
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
