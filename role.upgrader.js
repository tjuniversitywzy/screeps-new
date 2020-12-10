/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var container3 = Game.getObjectById('5fce7bcbf0ce50b8f199afff');//一个目标container
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (container3.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(container3, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container3);
                }
            }else {
                creep.moveTo(Game.flags.FlagUpGrader);
            }
        }
    }
}

module.exports = roleUpgrader;