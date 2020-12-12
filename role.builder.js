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
        var storage = Game.getObjectById('5fd3221dd535200770e51e33');//存储器
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 收集能源');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build & repair');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);//建造物
            var neededRepairContainersAndRampart = creep.room.find(FIND_STRUCTURES,{
                filter: function(structure){
                    return structure.hits < structure.hitsMax && (structure.structureType == 'container' || structure.structureType == 'rampart');
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
            }else if (neededRepairContainersAndRampart.length){
                if (creep.repair(neededRepairContainersAndRampart[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(neededRepairContainersAndRampart[0], {visualizePathStyle: {stroke: '#ffffff'}})
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
            var dropedSources = creep.room.find(FIND_DROPPED_RESOURCES);//捡起来掉落的资源
            var sources = creep.room.find(FIND_SOURCES);
            if (dropedSources.length){
                if (creep.pickup(dropedSources[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(dropedSources[0]);
                }//先捡起来掉落的资源
            }
            else if (storage.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage);
                }
            }
            else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;