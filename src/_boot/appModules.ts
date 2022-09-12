import { restaurantModule, RestaurantRegistry } from "@/restaurants";

// eslint-disable-next-line @typescript-eslint/ban-types
type AppModulesConfig = {};

const appModules = [restaurantModule];

type AppModulesRegistry = RestaurantRegistry;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry };
