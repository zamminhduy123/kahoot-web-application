"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const connect_1 = __importDefault(require("./db/connect"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const not_found_mdw_1 = __importDefault(require("./middlewares/not-found.mdw"));
const handle_errors_mdw_1 = __importDefault(require("./middlewares/handle-errors.mdw"));
const socket_controller_1 = __importDefault(require("./controllers/socket.controller"));
const Kahoot_class_1 = __importDefault(require("./classes/Kahoot.class"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["*", "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: false,
    },
});
const PORT = process.env.PORT || 5000;
const kahoot = new Kahoot_class_1.default();
app.use((0, cors_1.default)({
    origin: ["*", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: false,
}));
app.use(express_1.default.json());
app.use("/api/v1/", routes_1.default);
app.use(not_found_mdw_1.default);
app.use(handle_errors_mdw_1.default);
io.on("connection", (socket) => {
    console.log("User connected!", socket.id);
    (0, socket_controller_1.default)(io, socket, kahoot);
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_1.default)(process.env.MONGO_URI);
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`);
    });
});
start();
//# sourceMappingURL=app.js.map