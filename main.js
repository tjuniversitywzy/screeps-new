var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCarrier1 = require('role.carrier1');
var roleCarrier2 = require('role.carrier2');
var roleHarvester1 = require('role.harvester1');
var roleHarvester2 = require('role.harvester2');

module.exports.loop = function () {

    //塔，修复墙壁
    var tower = Game.getObjectById('a29d89d66e9bcd7d8c683865');
    if(tower){
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }

    //塔，自动攻击

    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }


    var builder = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'builder';
    })
    var upGrader = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'upgrader';
    })
    var harvester1 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'harvester1';
    })
    var harvester2 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'harvester2';
    })
    var carrier1 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'carrier1';
    })
    var carrier2 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'carrier2';
    })

    //如果harvester数量小于2，重新创建一个harvester
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (harvester1.length < 1){
        var name = 'harvester1';
        // console.log('create'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],name,{
            memory: {role: 'harvester1'}
        });
    }

    if (harvester2.length < 1){
        var name = 'harvester2';
        // console.log('create'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE],name,{
            memory: {role: 'harvester2'}
        });
    }
    if (carrier1.length < 2){
        var name = 'carrierOne'+Game.time;
        console.log('create new grader'+name);
        Game.spawns['Earth'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],name,{
            memory: {role: 'carrier1'}
        });
    }
    if (carrier2.length < 2){
        var name = 'carrierTwo'+Game.time;
        console.log('create new grader'+name);
        Game.spawns['Earth'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],name,{
            memory: {role: 'carrier2'}
        });
    }

    if (builder.length < 1){
        var name = 'builder'+Game.time;
        console.log('create new builder'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],name,{
            memory: {role: 'builder'}
        });
    }
    if (upGrader.length < 4){
        var name = 'upgrader'+Game.time;
        console.log('create new grader'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],name,{
            memory: {role: 'upgrader'}
        });
    }


    if(Game.spawns['Earth'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Earth'].spawning.name];
        Game.spawns['Earth'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Earth'].pos.x + 1,
            Game.spawns['Earth'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    //每个creep执行动作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == "harvester"){
            roleHarvester.run(creep);
        }else if(creep.memory.role == "upgrader"){
            roleUpgrader.run(creep);
        }else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }else if (creep.memory.role == 'carrier' || creep.memory.role == 'carrier1'){
            roleCarrier1.run(creep);
        }else if(creep.memory.role == 'harvester1'){
            roleHarvester1.run(creep);
        }else if(creep.memory.role == 'harvester2'){
            roleHarvester2.run(creep);
        }else if (creep.memory.role == 'carrier2'){
            roleCarrier2.run(creep);
        }

    }
}
