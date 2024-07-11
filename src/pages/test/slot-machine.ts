interface ISlotMachine {
    slots: Array<string>;
    slotItems: Array<string>;
}

const SLOT_ITEMS = [
    "🍭",
    "❌",
    "⛄️",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵",
    "🤡",
    "🦖",
    "🍎",
    "😂",
    "🖕"
];

function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
}

function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(`${value} is not defined`)
    }
}

// Hardcoded to 3 slots
class SlotMachine {
    slots: Array<string>;
    slotItems: Array<string>;

    constructor(slots = ["😻", "🦖", "😂"], slotItems = SLOT_ITEMS) {
        this.slots = slots
        this.slotItems = slotItems
    }

    addBox(container: HTMLElement, text: string) {
        const box = document.createElement('div')
        box.classList.add('box');
        box.style.width = container.clientWidth + 'px'
        box.style.height = container.clientHeight + 'px'
        box.textContent = text
        return box
    }

    initiate() {
        let i = 0;
        const slots: NodeListOf<HTMLDivElement> = document.querySelectorAll('.slot') as NodeListOf<HTMLDivElement>
        for (const door of slots) {
            const boxes: HTMLDivElement | null = door.querySelector('.boxes')
            assertIsDefined(boxes)
            const boxesClone: HTMLDivElement | null = boxes.cloneNode(false) as HTMLDivElement
            assertIsDefined(boxesClone)
            const slotpool = ["❓"];
            slotpool.push(...shuffle(this.slotItems));
            slotpool.push(this.slots[i]);
            slotpool.reverse()

            for (let slotitem of slotpool) {
                const box = this.addBox(door, slotitem)
                boxesClone?.appendChild(box)
            }
            boxesClone.style.transitionDuration = `2s`
            boxesClone.style.transform = `translateY(-${door.clientHeight * (slotpool.length - 1)}px`
            door.replaceChild(boxesClone, boxes);

            i++;
        }
    }


    async start() {
        console.log('yay')
        console.dir(this)
        this.initiate()
        const slots = document.querySelectorAll('.slot')
        for (const door of slots) {
            const boxes: HTMLDivElement | null = door.querySelector('.boxes')
            assertIsDefined(boxes)
            const duration = parseInt(boxes.style.transitionDuration)
            boxes.style.transform = 'translateY(0)'
            await new Promise((resolve) => setTimeout(resolve, duration * 100))
        }
    }
}

export default SlotMachine
// document.getElementById("play").addEventListener("click", () =>{
//   slotMachine.start()
// });
