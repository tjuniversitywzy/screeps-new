//负责把container的能量搬运到：1.另一个container 2.spawns 3.
var roleCarrier = {
    run: function (creep) {
        var container1 = Game.getObjectById('5fce552fb8260bcfedbbe9c6');
        var container2 = Game.getObjectById('5fce7bcbf0ce50b8f199afff');//用于upgrader的容器
        if(creep.memory.give && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.give = false;
            creep.say('🔄 dropDown');
        }
        if(!creep.memory.give && creep.store.getFreeCapacity() == 0) {
            creep.memory.give = true;
            creep.say('⚡ carry');
        }

        if(creep.memory.give){
            creep.moveTo(container2);

        }else{
            creep.moveTo(Game.flags.CarrierFlag);
            // creep.moveTo(container1);
        }
    }
}
module.exports = roleCarrier;