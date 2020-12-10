//负责把container的能量搬运到：1.另一个container 2.spawns 3.
var roleCarrier1 = {
    run: function (creep) {
        var container1 = Game.getObjectById('5fd0d52e83f4c657b6dbc698');//左边的
        var container2 = Game.getObjectById('5fce552fb8260bcfedbbe9c6');//下边的
        //要将container1 2 的能量运往extension、spawn、还有container3
        var container3 = Game.getObjectById('5fce7bcbf0ce50b8f199afff');//一个目标container
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });//存储单位
        // console.log(creep.carrying && creep.store[RESOURCE_ENERGY] == 0);
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.carrying = false;
            creep.say("开始寻找能源");
        }else if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0){
            creep.memory.carrying = true;
            creep.say("开始运送能源");
        }

        if (!creep.memory.carrying){
            if (container1.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(container1,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container1);
                }
            }else if (container2.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(container2,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container2);
                }
            }else {
                creep.moveTo(Game.flags.Flag1);
            }
        }else{
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else if (creep.transfer(container3,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(container3);
            }else if (creep.transfer(container3,RESOURCE_ENERGY) == ERR_FULL){
                creep.moveTo(Game.flags.FlagCarrier);
            }
        }

    }
}
module.exports = roleCarrier1;