//以后havester就只是采集了，5个work部件两个move
//
var harvester1 = {//负责去container1，坐标13，13
    run: function(creep) {
        var source1 = Game.getObjectById('5bbcaf189099fc012e63a281');
        if (creep.pos.x != 13 || creep.pos.y != 13){
            creep.moveTo(13,13);
        }else{
            creep.harvest(source1);
        }
    }
}
module.exports = harvester1;