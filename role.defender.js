var defender = {//负责去container1，坐标13，13
    run: function(creep) {
        var hostiles = Game.rooms['E37N58'].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            // Game.notify(`User ${username} spotted in room ${roomName}`);
            if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(hostiles[0]);
            }
        }
    }
}
module.exports = defender;