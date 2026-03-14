import { NativeCubridAdapter } from "../adapters/native.js";
import { CubridClient } from "./client.js";
import { normalizeConfig } from "../internals/normalize-config.js";
import type { ClientOptions } from "../types/client.js";

export function createClient(options: ClientOptions): CubridClient {
  const config = normalizeConfig(options);
  const connectionFactory =
    options.connectionFactory ?? ((clientConfig) => new NativeCubridAdapter(clientConfig));

  return new CubridClient(config, connectionFactory);
}
