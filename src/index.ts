import { MINER_BODY, minerLogic } from "./roles/miner";

/**
 * Main loop for our bot. This is called every tick.
 */
export function loop() {
  console.log("The time is now", Game.time);

  const myRooms = _.filter(
    Game.rooms,
    (r) => r.controller && r.controller.level > 0 && r.controller.my,
  );

  for (const room of myRooms) {
    processRoom(room);
  }

  for (const creep of Object.values(Game.creeps)) {
    processCreep(creep);
  }
}

/**
 * Handle the logic for one of our owned rooms
 * Perform tasks such as spawning new creeps
 */
function processRoom(room: Room) {
  const miners = _.filter(
    Object.values(Game.creeps),
    (creep) => creep.memory.role === "miner",
  );
  if (miners.length < 1) {
    const spawn = room.find(FIND_MY_SPAWNS)[0];
    if (spawn) {
      spawn.spawnCreep(MINER_BODY, `miner-${Game.time}`, {
        memory: { role: "miner" },
      });
    }
  }
}

/**
 * Handle the logic for an individual creep
 */
function processCreep(creep: Creep) {
  if (creep.memory.role === "miner") {
    minerLogic(creep);
  }
}

