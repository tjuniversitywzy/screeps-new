//负责把container的能量搬运到中心storage
var Mine1ToStorage = {
    run: function (creep) {
        var container1 = Game.getObjectById('5fda1133d0970b7de3a73951');//左边的
        var storage = Game.getObjectById('5fd3221dd535200770e51e33');//一个目标storage
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.carrying = false;
            creep.say("GoMLeft");
        }else if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0){
            creep.memory.carrying = true;
            creep.say("MLeftToSto.");
        }

        if (!creep.memory.carrying){
            if (container1.store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw(container1,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(container1);
                }
            }else {
                creep.moveTo(13,12);
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
module.exports = Mine1ToStorage;