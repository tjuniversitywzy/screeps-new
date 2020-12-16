//负责把container的能量搬运到中心storage
var Mine2ToStorage = {
    run: function (creep) {
        var container2 = Game.getObjectById('5fce552fb8260bcfedbbe9c6');//下边的
        var link = Game.getObjectById('5fd60ed64f5d0610fb24de61');//一个矿旁边的link
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.carrying = false;
            creep.say("取能量");
        }else if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0){
            creep.memory.carrying = true;
            creep.say("转移到link");
        }

        if (!creep.memory.carrying){
            if (container2.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(container2,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container2);
                }
            }else {
                creep.moveTo(24,22);
            }
        }else{
            if (creep.transfer(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(link);
            }else if (creep.transfer(link,RESOURCE_ENERGY) == ERR_FULL){
                creep.moveTo(24,22);
            }
        }

    }
}
module.exports = Mine2ToStorage;