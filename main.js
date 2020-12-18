
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvester1 = require('role.harvester1');
var roleHarvester2 = require('role.harvester2');
var defender = require('role.defender');
var Mine1ToStorage = require('role.carrierMine1ToStorage');
var Mine2ToStorage = require('role.carrierMine2ToStorage');
var StorageToUpgrader = require('role.carrierStorageToUpgrader');
var wallRepairer = require('role.wallRepairer');
var dismantler = require('role.helperE36N58');//临时拆墙的人
var builderInE36N58 = require('role.builderInE36N58');
var carrierInE36N58 = require('role.carrierE36N58');
var harvesterInE36N58 = require('role.harvesterE36N58');
var claimerInE36N58 = require('role.claimerE36N58');

module.exports.loop = function () {

    //塔，修复墙壁
    var tower = Game.getObjectById('5fd339d698c2cb1d46dbe49f');
    var attackerTower = Game.getObjectById('5fd4d4b793ad71613d187582');
    var linkMB = Game.getObjectById('5fd60ed64f5d0610fb24de61');
    console.log(linkMB.cooldown);
    if (linkMB){
        if(linkMB.store.getFreeCapacity(RESOURCE_ENERGY) < 300) {
            linkMB.transferEnergy(Game.getObjectById('5fd622db3ae53676641b6442'));
        }
    }
    if(tower){
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure){
                return structure.hits < structure.hitsMax && structure.structureType == 'road';
            }
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }

    //塔，自动攻击
    if(attackerTower) {
        var closestHostile = attackerTower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            attackerTower.attack(closestHostile);
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
    var builderE36N58 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'builderInE36N58';
    })
    var carrierE36N58 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'carrierE36N58';
    })
    var harvesterE36N58 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'harvesterE36N58';
    })
    var claimerE36N58 = _.filter(Game.creeps,function (creep) {
        return creep.memory.role == 'claimerE36N58';
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

    if (builder.length < 1){
        var name = 'builder'+Game.time;
        console.log('create new builder'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],name,{
            memory: {role: 'builder'}
        });
    }
    if (upGrader.length < 3){
        var name = 'upgrader'+Game.time;
        console.log('create new '+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],name,{
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
    if (wallRepair.length < 2){
        var name = 'wallRepair'+Game.time;
        console.log('create new wallRepairer'+name);
        Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],name,{
            memory: {role: 'wallRepairer'}
        });
    }
    // if (builderE36N58.length < 1){
    //     var name = 'builderE36N58'+Game.time;
    //     console.log('create new '+name);
    //     Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],name,{
    //         memory: {role: 'builderInE36N58'}
    //     });
    // }
    // if (harvesterE36N58.length < 1){
    //     var name = 'harvesterE36N58'+Game.time;
    //     console.log('create new '+name);
    //     Game.spawns['Earth'].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],name,{
    //         memory: {role: 'harvesterE36N58'}
    //     });
    // }
    // if (carrierE36N58.length < 1){
    //     var name = 'carrierE36N58'+Game.time;
    //     console.log('create new '+name);
    //     Game.spawns['Earth'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],name,{
    //         memory: {role: 'carrierE36N58'}
    //     });
    // }


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
        }else if (creep.memory.role == 'dismantle'){
            dismantler.run(creep);
        }else if (creep.memory.role == 'builderInE36N58'){
            builderInE36N58.run(creep);
        }else if (creep.memory.role == 'carrierE36N58'){
            // carrierInE36N58.run(creep);
        }else if (creep.memory.role == 'harvesterE36N58'){
            harvesterInE36N58.run(creep);
        }else if (creep.memory.role == 'claimerE36N58'){
            claimerInE36N58.run(creep);
        }else if (creep.memory.role == 'helperE36N58'){
            dismantler.run(creep);
        }
    }
}
