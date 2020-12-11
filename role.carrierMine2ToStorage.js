//负责把container的能量搬运到中心storage
var Mine2ToStorage = {
    run: function (creep) {
        var container2 = Game.getObjectById('5fce552fb8260bcfedbbe9c6');//下边的
        var storage = Game.getObjectById('5fd3221dd535200770e51e33');//一个目标storage
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.carrying = false;
            creep.say("GoMBottom");
        }else if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0){
            creep.memory.carrying = true;
            creep.say("MBotToSto.");
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
            if (creep.transfer(storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(storage);
            }else if (creep.transfer(storage,RESOURCE_ENERGY) == ERR_FULL){
                creep.moveTo(23,11);
            }
        }

    }
}
module.exports = Mine2ToStorage;