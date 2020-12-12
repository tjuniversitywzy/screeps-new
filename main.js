
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvester1 = require('role.harvester1');
var roleHarvester2 = require('role.harvester2');
var defender = require('role.defender');
var Mine1ToStorage = require('role.carrierMine1ToStorage');
var Mine2ToStorage = require('role.carrierMine2ToStorage');
var StorageToUpgrader = require('role.carrierStorageToUpgrader');
var wallRepairer = require('role.wallRepairer');

module.exports.loop = function () {

    //塔，修复墙壁
    var tower = Game.getObjectById('5fd339d698c2cb1d46dbe49f');
    // if(tower){
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //     filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }
    // }

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
    //新增逻辑
    var carrierStorageToUpgrader = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'StorageToUpgrader';
    })
    var carrierMine1ToStorage = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'Mine1ToStorage';
    })
    var carrierMine2ToStorage = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'Mine2ToStorage';
    })
    var wallRepair = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'wallRepairer';
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

    if (builder.length < 2){
        var name = 'builder'+Game.time;
        console.log('create new builder'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],name,{
            memory: {role: 'builder'}
        });
    }
    if (upGrader.length < 2){
        var name = 'upgrader'+Game.time;
        console.log('create new '+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],name,{
            memory: {role: 'upgrader'}
        });//800
    }
    if (carrierMine1ToStorage.length < 1){
        var name = 'carrierMine1ToStorage'+Game.time;
        console.log('create new '+name);
        Game.spawns['Earth'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],name,{
            memory: {role: 'Mine1ToStorage'}
        });
    }
    if (carrierMine2ToStorage.length < 1){
        var name = 'carrierMine2ToStorage'+Game.time;
        console.log('create new '+name);
        Game.spawns['Earth'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],name,{
            memory: {role: 'Mine2ToStorage'}
        });
    }
    if (carrierStorageToUpgrader.length < 1){
        var name = 'carrierStorageToUpgrader'+Game.time;
        console.log('create new grader'+name);
        Game.spawns['Earth'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],name,{
            memory: {role: 'StorageToUpgrader'}
        });
    }
    if (wallRepair.length < 1){
        var name = 'wallRepair'+Game.time;
        console.log('create new wallRepairer'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],name,{
            memory: {role: 'wallRepairer'}
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
        if(creep.memory.role == "upgrader"){
            roleUpgrader.run(creep);
        }else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }else if(creep.memory.role == 'harvester1'){
            roleHarvester1.run(creep);
        }else if(creep.memory.role == 'harvester2'){
            roleHarvester2.run(creep);
        }else if (creep.memory.role == 'defender'){
            defender.run(creep);
        }else if (creep.memory.role == 'Mine1ToStorage'){
            Mine1ToStorage.run(creep);
        }else if (creep.memory.role == 'Mine2ToStorage'){
            Mine2ToStorage.run(creep);
        }else if (creep.memory.role == 'StorageToUpgrader'){
            StorageToUpgrader.run(creep);
        }else if (creep.memory.role == 'wallRepairer'){
            wallRepairer.run(creep);
        }
    }
}
