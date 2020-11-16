import EventBus from "../../event-bus";
import Memory from "../../memory";
import DivTimer from "./div";

describe("initialize", () => {
    test("should create new instance of DIV timer without crashing", () => {
        const eventBus = new EventBus();
        const timer = new DivTimer(eventBus, new Memory(eventBus));
        expect(timer).toBeDefined();
    });
});