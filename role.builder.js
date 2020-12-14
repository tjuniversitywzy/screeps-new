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
            var neededRepairContainers = creep.room.find(FIND_STRUCTURES,{
                filter: function(structure){
                    return structure.hits < structure.hitsMax && structure.structureType == 'container';
                }
            });//
            var neededRepairRampart = creep.room.find(FIND_STRUCTURES,{
                filter: function(structure){
                    return structure.structureType == 'rampart';
                }
            });//
            var urgencyRampart = _.filter(neededRepairRampart,
                function (rampart) {
                    return rampart.hits < 301;
                });

            var nomalRampart = _.filter(neededRepairRampart,
                function (rampart) {
                    return rampart.hits/rampart.hitsMax < 0.1;
                });
            var neededRepairRoad = creep.room.find(FIND_STRUCTURES,{
                filter: function(structure){
                    return structure.hits < structure.hitsMax && structure.structureType == 'road';
                }
            });//

            // creep.moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#ffffff'}});
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (urgencyRampart.length){
                if (creep.repair(urgencyRampart[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(urgencyRampart[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }else if (neededRepairContainers.length){
                if (creep.repair(neededRepairContainers[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(neededRepairContainers[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }else if (nomalRampart.length){
                if (creep.repair(nomalRampart[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(nomalRampart[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            } else if (neededRepairRoad.length){
                if (creep.repair(neededRepairRoad[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(neededRepairRoad[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            } else{
                creep.moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            // var tombSources = creep.room.find(FIND_TOMBSTONES);

            var dropedSources = creep.room.find(FIND_DROPPED_RESOURCES,{
                filter: function(resource){
                    return resource.amount > 150;
                }});//捡起来掉落的资源
            var sources = creep.room.find(FIND_SOURCES);
            // if (tombSources.length){//这里需要改
            //     if (tombSources[0].store.getUsedCapacity() > 50 && creep.withdraw(tombSources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            //         creep.moveTo(tombSources[0]);
            //     }
            // } else
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