/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
//建造者、修理工
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build & repair');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);//建造物
            var neededRepairContainers = creep.room.find(FIND_STRUCTURES,{
                filter: function(structure){
                    return structure.hits < structure.hitsMax && structure.structureType == 'container';
                }
            });//
            var neededRepairRoad = creep.room.find(FIND_STRUCTURES,{
                filter: function(structure){
                    return structure.hits < structure.hitsMax && structure.structureType == 'road';
                }
            });//

            // console.log(neededRepairBuildings.length);
            // creep.moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#ffffff'}});
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else if (neededRepairContainers.length){
                if (creep.repair(neededRepairContainers[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(neededRepairContainers[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }else if (neededRepairRoad.length){
                if (creep.repair(neededRepairRoad[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(neededRepairRoad[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            } else{
                creep.moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;