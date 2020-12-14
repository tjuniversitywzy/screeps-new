//负责从E36N58搬运到E37N58的container左
var E36N58ToE37N58Container_L = {
    run: function (creep) {
        var containerE36N58 = Game.getObjectById('5fd72ff93094fc1034c184dd');
        var containerE37N58_L = Game.getObjectById('5fd0d52e83f4c657b6dbc698');//左边的
        const roomE36N58 = Game.rooms['E36N58']
        const roomE37N58 = Game.rooms['E37N58']
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.carrying = false;
            creep.say("GoE36N58");
        }else if (!creep.memory.carrying && creep.store.getFreeCapacity() == 0){
            creep.memory.carrying = true;
            creep.say("GoE37N58");
        }

        if (!creep.memory.carrying){
            if (!roomE36N58 || creep.room.name != 'E36N58'){
                creep.moveTo(new RoomPosition(48,10,'E36N58'));
            }else {
                if (containerE36N58.store[RESOURCE_ENERGY] > 0){
                    if (creep.withdraw(containerE36N58,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(containerE36N58);
                    }
                }else {
                    creep.moveTo(41,6);
                }
            }
        }else{
            if (!roomE37N58 || creep.room.name != 'E37N58'){
                creep.moveTo(new RoomPosition(25,25,'E37N58'));
            }else {
                if (creep.transfer(containerE37N58_L,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containerE37N58_L);
                }else{
                    creep.moveTo(13,14);
                }
            }

        }

    }
}
module.exports = E36N58ToE37N58Container_L;