//以后havester就只是采集了，5个work部件两个move

var builderInE36N58 = {//负责去E36N58建造
    run: function(creep) {
        var storage = Game.getObjectById('5fd3221dd535200770e51e33');//E37N58的存储器
        const roomE36N58 = Game.rooms['E36N58'];
        const roomE37N58 = Game.rooms['E37N58'];
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 收集能源');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build & repair');
        }

        if(creep.memory.building) {
            // creep.say("111");
            if (!roomE36N58){
                creep.moveTo(new RoomPosition(49,12,'E36N58'));
            }else {
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
                        return rampart.hits/rampart.hitsMax < 0.05;
                    });
                var neededRepairRoad = creep.room.find(FIND_STRUCTURES,{
                    filter: function(structure){
                        return structure.hits < structure.hitsMax && structure.structureType == 'road';
                    }
                });//
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
                }
            }
        } else {
            if (!roomE37N58){
                creep.moveTo(new RoomPosition(25,25,'E37N58'));
            }else{
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
    }
}
module.exports = builderInE36N58;
