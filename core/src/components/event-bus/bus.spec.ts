import Bus from "./bus";
import { RedrawSpriteEvent } from "./events/REDRAW_SPRITE";
import { UnmapBiosEvent } from "./events/UNMAP_BIOS";
import { EVENT_TYPES } from "./types";

describe("initialize", () => {
    test("should create new instance of bus without crashing", () => {
        const bus = new Bus();
        expect(bus).toBeDefined();
    });
})

describe("emit", () => {
    test("adding single handler to emit should invoke callback without payload", () => {
        const bus = new Bus();
        const testEvent = new UnmapBiosEvent();
        const mockCallback = jest.fn(data => data);

        bus.addHandler({
            type: EVENT_TYPES.UNAMP_BIOS,
            callback: mockCallback
        });

        bus.emit(testEvent);

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toMatchObject({});
    })

    test("adding mulitple handler to emit should invoke callback multiple without payload", () => {
        const bus = new Bus();
        const testEvent = new UnmapBiosEvent();
        const mockCallback = jest.fn(data => data);
        const secondMockCallback = jest.fn(data => data);

        bus.addHandler({
            type: EVENT_TYPES.UNAMP_BIOS,
            callback: mockCallback
        });

        bus.addHandler({
            type: EVENT_TYPES.UNAMP_BIOS,
            callback: secondMockCallback
        })

        bus.emit(testEvent);

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toMatchObject({});
        expect(secondMockCallback.mock.calls.length).toBe(1);
        expect(secondMockCallback.mock.calls[0][0]).toMatchObject({});
    })

    test("adding single handler to emit should invoke callback with payload", () => {
        const bus = new Bus();
        const testEvent = new RedrawSpriteEvent(10, 20);
        const mockCallback = jest.fn(data => data);


        bus.addHandler({
            type: EVENT_TYPES.REDRAW_SPRITE,
            callback: mockCallback
        });

        bus.emit(testEvent);

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toMatchObject({ x: 10, y: 20});
    })

    test("emiting event for one type of event should not call different type handlers", () => {
        const bus = new Bus();
        const redrawSpriteEventCallback = jest.fn(data => data);

        const unmapBiosEvent = new UnmapBiosEvent();
        const unmapBiosEventCallback = jest.fn(data => data);


        bus.addHandler({
            type: EVENT_TYPES.REDRAW_SPRITE,
            callback: redrawSpriteEventCallback
        });

        bus.addHandler({
            type: EVENT_TYPES.UNAMP_BIOS,
            callback: unmapBiosEventCallback
        });

        bus.emit(unmapBiosEvent);

        expect(redrawSpriteEventCallback.mock.calls.length).toBe(0);
        expect(unmapBiosEventCallback.mock.calls.length).toBe(1);
        expect(unmapBiosEventCallback.mock.calls[0][0]).toMatchObject({});
    })
})