import { minerLogic } from "../roles/miner";

import { expect, mock, test } from "bun:test";
import { mockInstanceOf } from "screeps-jest";

test("miner", () => {
  const moveTo = mock();
  const harvest = mock();

  const mockMiner = mockInstanceOf<Creep>({
    store: { energy: 0, getCapacity: () => 0 },
    pos: { findClosestByRange: () => null, getRangeTo: () => 0 },
    moveTo,
    harvest,
    say: mock(),
  });

  minerLogic(mockMiner);
  expect(moveTo).not.toHaveBeenCalled();
  expect(harvest).not.toHaveBeenCalled();
});
