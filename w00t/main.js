var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // this is to clear memory - remove dead creeps.
    for (let name in Memory.creeps) {
      if (Game.creeps[name] == undefined) {
        delete Memory.creeps[name];
      }
    }

    // for every creep name in the Game

    // TODO: Need to change this to be an if logic to only run harvester if it's a harvester role, etc.
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
        roleUpgrader.run(creep);
    }

    // need to set limits for the amount of harvesters
    var maxNumHarvesters = 10;
    // this is a new one for me, you basically just go into the screeps memory spaces and grab the role that we set
    // upon creep creation
    // This is also really just to count the amount and spit it to console.
    var numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    console.log(numOfHarvesters);

    // here we go, creating creeps. We want to create harvesters first,
    // then when we run out of those at 10, we'll create upgraders.
    if (numOfHarvesters < maxNumHarvesters) {
      var name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined,
        {role: 'harvester'});
    } else {
      var name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined,
        {role: 'upgrader'});
    }


    // this is like a weird double negate thing, dude on YT did this because he
    // couldn't figure out how to compare strings. We can just do a .len func here or something.
    if (!(name < 0)) {
      console.log("Spawned new creep: " + name);
    }
}
