//负责把container的能量搬运到：1.另一个container 2.spawns 3.
var roleStorageToUpgrader = {
    run: function (creep) {
        var storage = Game.getObjectById('5fd3221dd535200770e51e33');//左边的
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });//存储单位
        var towers = [Game.getObjectById('5fd4d4b793ad71613d187582'),Game.getObjectById('5fd339d698c2cb1d46dbe49f')];
        var neededEnergyTower = _.filter(towers,function (tower) {
            return tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        })
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.carrying = false;
            creep.say("开始寻找能源");
        }else if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0){
            creep.memory.carrying = true;
            creep.say("开始运送能源");
        }

        if (!creep.memory.carrying){
            if (storage.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage);
                }
            }else {
                creep.moveTo(24,12);
            }
        }else{
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if (neededEnergyTower.length > 0){
                if(creep.transfer(neededEnergyTower[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(neededEnergyTower[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else {
                creep.moveTo(24,12);
            }
        }

    }
}
module.exports = roleStorageToUpgrader;