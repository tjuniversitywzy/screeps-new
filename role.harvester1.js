//以后havester就只是采集了，5个work部件两个move,内部只有两个harvester
var harvester1 = {
    run: function(creep) {
        Game.creeps
        if (creep.harvest() == ERR_NOT_IN_RANGE){
            creep.moveTo()
        }
    }
}