//E36N58的占领者
var claimerE36N58 = {
    run : function (creep) {
        const room = Game.rooms['E36N58']
        if (!room || creep.room.name != 'E36N58'){
            creep.moveTo(new RoomPosition(25,25,'E36N58'));
        }else {
            if (creep.reserveController(room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(room.controller)
            }
        }
    }
}
module.exports = claimerE36N58;