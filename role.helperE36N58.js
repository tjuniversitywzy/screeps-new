//临时拆墙的
var helperE36N58 = {
    run : function (creep) {
        const room = Game.rooms['E36N58']
        if (!room || creep.room.name != 'E36N58'){
            creep.moveTo(new RoomPosition(48,9,'E36N58'));
        }else {
            var target = Game.getObjectById('5fca13a7de1a22593e614228');
            if (creep.dismantle(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            };
        }
    }
}
module.exports = helperE36N58;