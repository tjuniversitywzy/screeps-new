//负责把container的能量搬运到：1.另一个container 2.spawns 3.
var carrier = {
    run:function (creep) {
        var container1 = Game.getObjectById('5fce1dbbb3e4dc80cb7b8200');
        var container2 = Game.getObjectById('5fce1debb3e4dc09327b8201');

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
            creep.moveTo(container1);
        }
    }
}