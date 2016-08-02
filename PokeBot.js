(function() {
    'use strict';
        
    function BasePokeBot() {
        this.pokemons = [];
    }

    BasePokeBot.prototype.throwPokeballToCatchAPokemon = function(pokemon) {
        if (Math.random() > 0.5) {
            this.pokemons.push(pokemon);

            return pokemon;
        }

        return null;
    };

    BasePokeBot.prototype.pokedex = [ // справочник существующих покемонов
        {
            kind: 'Бульбазавр',
            type: ['Grase', 'Poison'],
            maxCombatPower: 160,
            maxHealthPoints: 100,
            abilities: ['quickAttack', 'normalAttack'],
            evolve: 'Ивизавр'
        },
        {
            kind: 'Ивизавр',
            type: ['Grase', 'Poison'],
            maxCombatPower: 260,
            maxHealthPoints: 200,
            abilities: ['normalAttack', 'heavyAttack'],
            evolve: 'Венозавр'
        },
        {
            kind: 'Венозавр',
            type: ['Grase', 'Poison'],
            maxCombatPower: 360,
            maxHealthPoints: 300,
            abilities: ['heavyAttack', 'superAttack']
        },
        {
            kind: 'Чермандер',
            type: ['Ground', 'Fire'],
            maxCombatPower: 160,
            maxHealthPoints: 100,
            abilities: ['quickAttack', 'normalAttack'],
            evolve: 'Чермелион'
        },
        {
            kind: 'Чермелион',
            type: ['Ground', 'Fire'],
            maxCombatPower: 260,
            maxHealthPoints: 200,
            abilities: ['normalAttack', 'heavyAttack'],
            evolve: 'Чаризард'
        },
        {
            kind: 'Чаризард',
            type: ['Ground', 'Fire'],
            maxCombatPower: 360,
            maxHealthPoints: 300,
            abilities: ['heavyAttack', 'superAttack']
        },
        {
            kind: 'Пичу',
            type: ['Air', 'Electric'],
            maxCombatPower: 160,
            maxHealthPoints: 100,
            abilities: ['quickAttack', 'normalAttack'],
            evolve: 'Пикачу'
        },
        {
            kind: 'Пикачу',
            type: ['Air', 'Electric'],
            maxCombatPower: 260,
            maxHealthPoints: 200,
            abilities: ['normalAttack', 'heavyAttack'],
            evolve: 'Райчу'
        },
        {
            kind: 'Райчу',
            type: ['Air', 'Electric'],
            maxCombatPower: 360,
            maxHealthPoints: 300,
            abilities: ['heavyAttack', 'superAttack']
        }
    ];

    BasePokeBot.prototype.extend = function(child) {
        var f = function () { };
        f.prototype = BasePokeBot.prototype;
        child.prototype = new f();
        child.prototype.constructor = child;
        child.superclass = BasePokeBot.prototype;
        return new child();
    };
    
    BasePokeBot.prototype.find = function (list, conditions) {
        throw 'Must be implemented by child object';
    };

    BasePokeBot.prototype.evolve = function (pokemon) {
        throw 'Must be implemented by child object';
    };

    BasePokeBot.prototype.compare = function () {
        throw 'Must be implemented by child object';
    };
    
    window.BasePokeBot = new BasePokeBot();
})();

//Новый бот ловли покемонов.
function PokeBotF(){
      this.findPokes = [];
      this.conditions = null;
      this.find = function (list, conditions){
        if(this.conditions && isEquals(this.conditions, conditions)){
          return this.findPokes;
        }
        
        this.conditions = conditions;
        this.findPokes = [];
        if(Array.isArray(list) && conditions){
          for(var i = 0; i < list.length; i++){
            if(isEquals(conditions, list[i])){
              this.findPokes.push(list[i]);
            }
          }
        }
        
        return this.findPokes;
      };
      
      this.evolve = function (pokemon) {
        if(pokemon && pokemon.evolve){
          for(var i = 0; i < this.pokedex.length; i++){
            if(this.pokedex[i].kind == pokemon.evolve){
              pokemon = clonePoke(pokemon);
              pokemon.kind = this.pokedex[i].kind;
              pokemon.evolve = this.pokedex[i].evolve;
              return pokemon;
            }
          }
        }
        
        return null;
      };
      
      this.compare = function (){
        if(arguments.length <= 1){
          return true;
        }
        
        var i = 0;
        var pokeCount = arguments.length; 
        do {
          var poke1 = arguments[i];
          i += 1;
          var poke2 = arguments[i];
          if(!isEquals(poke1, poke2)){
            return false;
          }
        } while (i < pokeCount - 1);

        return true;
      };
      
      function clonePoke(pokemon){
        var newPoke = null;
        if(pokemon){
          newPoke = {};
          for (var prop in pokemon) {
            newPoke[prop] = pokemon[prop];
          }
        }
        
        return newPoke;
      }
      
      function isEquals (obj1, obj2) {
        var self = this;
        if (obj1 && obj2) {
          for (var prop in obj1) {
            if(prop.toUpperCase() == 'ID' ||
              prop.toUpperCase() == 'NAME'){
              continue;  
            }
            
            if (!obj2.hasOwnProperty(prop)){
              return false;
            }
            
            if(!obj1[prop] && obj2[prop] ||
              obj1[prop] && !obj2[prop]){
              return false;
            }
              
            if(Array.isArray(obj1[prop])){
              if(!Array.isArray(obj2[prop])){
                return false;
              }
              
              var collection1 = obj1[prop];
              var collection2 = obj2[prop];
              
              if(collection1.length != collection2.length){
                return false;
              }
              
              for(var i = 0; i < collection1.length; i++){
                if(collection1[i] != collection2[i]){
                  return false;
                }
              }
            }
            else if(obj1[prop] != obj2[prop]){
              return false;
            }
          }
          
          return true;
        }
        
        return false;
      }
};

var PokeBot = window.BasePokeBot.extend(PokeBotF);
debugger;
var condition = {type: ['Grase', 'Poison']};
var findPokesOne = PokeBot.find(PokeBot.pokedex, condition);
var findPokesTwo = PokeBot.find(PokeBot.pokedex, condition);
alert(findPokesOne === findPokesTwo);
var newPoke = PokeBot.evolve({
            kind: 'Пичу',
            type: ['Air', 'Electric'],
            maxCombatPower: 160,
            maxHealthPoints: 100,
            abilities: ['quickAttack', 'normalAttack'],
            evolve: 'Пикачу'
        }); 

alert(PokeBot.compare({
    id: 1,
    name: '1',
    kind: 'Бульбазавр', // вид 
    type: ['Grase', 'Poison'], // тип
    maxCombatPower: 160, // максимум очки сражения
    maxHealthPoints: 100, // максимум очки жизни
    abilities: ['quickAttack', 'normalAttack'], // способности
    evolve: 'Ивизавр', // следующая эволюция
},{
    id: 2,
    name: '2',
    kind: 'Бульбазавр', // вид 
    type: ['Grase', 'Poison'], // тип
    maxCombatPower: 160, // максимум очки сражения
    maxHealthPoints: 100, // максимум очки жизни
    abilities: ['quickAttack', 'normalAttack'], // способности
    evolve: 'Ивизавр', // следующая эволюция
}));












