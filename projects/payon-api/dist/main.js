"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const setup_module_1 = require("./setup.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(setup_module_1.SetupModule);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map