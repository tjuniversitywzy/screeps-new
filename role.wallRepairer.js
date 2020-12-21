/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
//建造者、修理工
var roleWallRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 收集能源');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 repairWall');
        }

        if(creep.memory.building) {

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
                    return rampart.hits/rampart.hitsMax < 0.15;
                });
            var neededRepairWalls = [Game.getObjectById('5fd4752d1908a31a9f7a3c95'),
                Game.getObjectById('5fd475315482f6d42c27e253'),
                Game.getObjectById('5fd475a4dda0ff20aa506ddd'),
                Game.getObjectById('5fd475ce453ff5460c64ea4d'),
                Game.getObjectById('5fd4753c8354bd1d47063f66'),
                Game.getObjectById('5fd4754801793240ce369862'),
                Game.getObjectById('5fd4758ebbe14ae4fa5021c2'),
                Game.getObjectById('5fd4757f080d8c0e28d9f4ff'),
                Game.getObjectById('5fd47578e985fa959c8cffb6'),
                Game.getObjectById('5fd47574f730aa68e0cf0a54'),
                Game.getObjectById('5fd475707c25771b7fef5e32'),
                //新增
                Game.getObjectById('5fc9cd6d8265acd80ed5bd6e'),
                Game.getObjectById('5fc9b49f0ebbfabe62e526f7'),
                Game.getObjectById('5fc9b4acf758396fcd5d463e'),
                Game.getObjectById('5fc9b4a9953e9243e11f1a2d'),
                Game.getObjectById('5fc9b4b2d9cf943ac3a4d11b'),
                Game.getObjectById('5fc9b4bed1f58fbaac04f3ae'),
                Game.getObjectById('5fc9b4bbca67bad920e1db7e'),
                Game.getObjectById('5fc9cd93ca67bafa31e1e342'),
                Game.getObjectById('5fc9a26973fae9851b60fb74'),
                Game.getObjectById('5fc9b4e1135450c31d639b27'),
                Game.getObjectById('5fc9b4e43e753491d2cf36e7'),
                Game.getObjectById('5fc9b4ebab39dc39a7a16374'),
                Game.getObjectById('5fc9b4f1ef3852710f744c0c'),
            ]
            var firstRepaired = _.filter(neededRepairWalls,function (wall) {
                return wall.hits/wall.hitsMax < 0.005;
            });
            // console.log(neededRepairBuildings.length);
            // creep.moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#ffffff'}});
            if (urgencyRampart.length){
                if (creep.repair(urgencyRampart[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(urgencyRampart[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            } else if (firstRepaired.length){
                if (creep.repair(firstRepaired[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(firstRepaired[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }else  if (nomalRampart.length){
                if (creep.repair(nomalRampart[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(nomalRampart[0], {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
            else{
                creep.moveTo(Game.flags.Flag2, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {

            var storage = Game.getObjectById('5fd3221dd535200770e51e33');//存储器
            var dropedSources = creep.room.find(FIND_DROPPED_RESOURCES,{
                filter: function(resource){
                    return resource.amount > 150;
                }});//捡起来掉落的资源
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

module.exports = roleWallRepairer;