/**
 * Calculate the cost of a body part array.
 */
export function getBodyCost(body: BodyPartConstant[]) {
  return _.sum(body.map((part) => BODYPART_COST[part]));
}
