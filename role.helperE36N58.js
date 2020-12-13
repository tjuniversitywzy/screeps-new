//临时拆墙的
var helperE36N58 = {
    run : function (creep) {
        const room = Game.rooms['E36N58']
        if (!room){
            creep.moveTo(new RoomPosition(25,25,'E36N58'));
        }else {
            var target = Game.getObjectById('5fca13aa135450ea6063b7f5');
            if (creep.dismantle(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            };
        }
    }
}
module.exports = helperE36N58;