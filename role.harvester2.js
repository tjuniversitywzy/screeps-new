//以后havester就只是采集了，5个work部件两个move
//
var harvester2 = {//负责去container1，坐标13，13
    run: function(creep) {
        var source2 = Game.getObjectById('5bbcaf189099fc012e63a282');
        if (creep.pos.x != 25 || creep.pos.y != 23){
            creep.moveTo(25,23);
        }else{
            creep.harvest(source2);
        }
    }
}
module.exports = harvester2;