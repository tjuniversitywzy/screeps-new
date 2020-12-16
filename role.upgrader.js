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
        var linkR = Game.getObjectById('5fd622db3ae53676641b6442');//升级室旁边的link
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 收集能量');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ 升级控制器');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if (container3.store[RESOURCE_ENERGY] > 0) {
                if (creep.withdraw(linkR, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linkR);
                }
            }else {
                creep.moveTo(Game.flags.FlagUpGrader);
            }
        }
    }
}

module.exports = roleUpgrader;