let getRandomValue = (max, min)=> {
  return Math.floor(Math.random() * (max-min)) + min;
}
const app = Vue.createApp({
  
  data(){
    return {
      playerHealth  : 100,
      monsterHealth : 100,
      currentRound  : 0,
      winner        : null,
      enteredActionValue : '',
      logMessages   : []
    };
  },
  computed: {
    monsterHealthBarStyles() {
      return {width: this.monsterHealth + '%'};
    },
    playerHealthBarStyles() {
      return {width: this.playerHealth + '%'};
    },
    disableSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'Its a draw';
    } else if (value <= 0){
        this.winner = 'monster';
    }
      
    },
    monsterHealth(value) {
      if(value <= 0 && this.playerHealth <= 0) {
        this.winner = 'Its a draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  methods: {
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner       = null;
      this.logMessages  = [];
    },
    attackMonsterHealth() {
      this.currentRound++
     let attackValue = getRandomValue(12,5);
     this.monsterHealth -= attackValue;
     this.addLogMesage('player', 'attack', this.attackValue)
     this.attackPlayerHealth();
    },
    attackPlayerHealth() {
      let attackValue = getRandomValue(15,7);
      this.playerHealth -= attackValue;
      this.addLogMesage('monster', 'attack', this.attackValue);
    },
    specialAttack() {
      this.currentRound++
      let attackValue = getRandomValue(25,10);
      this.monsterHealth -= attackValue;
      this.addLogMesage('monster', 'special-attack', this.attackValue);
      this.attackPlayerHealth();
    },
    healPlayer() {
      this.currentRound++;
      let healValue = getRandomValue(20,8);
      if(this.playerHealth + healValue > 100){
        playerHealth = 100;
      }else {
      this.playerHealth += healValue;
      }
      this.addLogMesage('player', 'heal', this.healValue);
      this.attackPlayerHealth();
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMesage(who, what, value) {
      this.logMessages.unshift({
        actionBy   : who,
        actionType : what,
        actionValue: value
      });
    }
  },
});

app.mount('#game');