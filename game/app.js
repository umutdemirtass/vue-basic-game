new Vue({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_on : false,
        logs : []
    },
    methods: {
        start_game : function(){
            this.game_on = true;
        },
        attack : function(){
            var score = Math.ceil(Math.random()*10);
            this.monster_heal-=score;
            this.add_to_log({turn : "p", text : "PLAYER ATTACK ("+ score +")"});
            this.monster_attack();
        },
        monster_attack : function(){
            var score = Math.ceil(Math.random()*14);
            this.add_to_log({turn : "m", text : "MONSTER ATTACK ("+ score +")"});
            this.player_heal-=score;
        },
        special_attack : function(){
            var score = Math.ceil(Math.random()*20);
            this.monster_heal-=score;
            this.add_to_log({turn : "p", text : "SPECIAL PLAYER ATTACK ("+ score +")"});
            this.monster_attack();
        },
        heal_up : function(){
            var score = Math.ceil(Math.random()*16);
            this.player_heal+=score;
            this.add_to_log({turn : "p", text : "HEAL UP ("+ score +")"});
            this.monster_attack();
        },
        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({turn : "p", text : " YOU GIVE UP!!!! ("+ score +")"});

        },
        add_to_log : function(log){
            this.logs.push(log);
        }
    },
    watch :{
       player_heal : function(value){
        if (value <= 0) {
            this.player_heal = 0;
            if (confirm("YOU LOST THE GAME. Do you want to play again ?")) {
                this.player_heal = 100;
                this.monster_heal = 100;
                this.logs=[]
            }
        }
        else if (value >= 100) {
            this.player_heal = 100;
        }
       },
       monster_heal : function(value){
        if (value <= 0) {
            this.monster_heal = 0;
            if (confirm("YOU WIN. Do you want to play game again ?")) {
                this.player_heal = 100;
                this.monster_heal = 100;
                this.logs=[]
            }
        }
        
       }
    }
});