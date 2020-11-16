import EventBus from "../../event-bus";
import Memory from "../../memory";
import TimaTimer from "./tima";

describe("initialize", () => {
    test("should create new instance of TIMA timer without crashing", () => {
        const eventBus = new EventBus();
        const timer = new TimaTimer(eventBus, new Memory(eventBus));
        expect(timer).toBeDefined();
    });
});