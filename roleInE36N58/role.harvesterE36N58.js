//以后havester就只是采集了，5个work部件两个move
//
var harvesterE36N58 = {//负责去E36N58
    run: function(creep) {
        const room = Game.rooms['E36N58']
        var sourceE36N58 = Game.getObjectById('5bbcaf089099fc012e63a030');
        if (!room){
            creep.moveTo(new RoomPosition(25,25,'E36N58'));
        }else {
            if (creep.pos.x != 40 || creep.pos.y != 6){
                creep.moveTo(40,6);
            }else{
                creep.harvest(sourceE36N58);
            }
        }
    }
}
module.exports = harvesterE36N58;