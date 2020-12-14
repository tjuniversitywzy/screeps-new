var defenderE36N58 = {//负责去container1，坐标13，13
    run: function(creep) {
        var roomE36N58 = Game.rooms['E36N58'];
        if (!roomE36N58 || creep.room.name != 'E36N58'){
            creep.moveTo(new RoomPosition(48,10,'E36N58'));
        }else {
            var hostiles = creep.findInRange(FIND_HOSTILE_CREEPS,5);
            if(hostiles.length > 0) {
                var username = hostiles[0].owner.username;
                // Game.notify(`User ${username} spotted in room ${roomName}`);
                if(creep.pos.isNearTo(hostiles[0])){
                    creep.attack(hostiles[0]);
                }else {
                    if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(hostiles[0]);
                    }
                }
            }else {
                if (creep.hits < creep.hitsMax){
                    creep.heal(creep);
                }else {
                    creep.moveTo(42,4);
                }
            }
        }


    }
}
module.exports = defenderE36N58;