import { NodeCubridAdapter } from "../adapters/node-cubrid.js";
import { CubridClient } from "./client.js";
import { normalizeConfig } from "../internals/normalize-config.js";
import type { ClientOptions } from "../types/client.js";

export function createClient(options: ClientOptions): CubridClient {
  const config = normalizeConfig(options);
  const connectionFactory =
    options.connectionFactory ?? ((clientConfig) => new NodeCubridAdapter(clientConfig));

  return new CubridClient(config, connectionFactory);
}
