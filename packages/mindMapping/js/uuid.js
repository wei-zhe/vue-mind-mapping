// 生成不唯一的id值
export default class {
    constructor() {

    }
    
    maxFromBits  (bits) {
      return Math.pow(2, bits);
    }

    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    randomUI06 () {
      var limitUI06 = this.maxFromBits(6);
      return this.getRandomInt(0, limitUI06-1);
    }
    
    randomUI08 () {
      var limitUI08 = this.maxFromBits(8);
      return this.getRandomInt(0, limitUI08-1);
    }
    
    randomUI12 () {
      var limitUI12 = this.maxFromBits(12);
      return this.getRandomInt(0, limitUI12-1);
    }
    
    randomUI16 () {
      var limitUI16 = this.maxFromBits(16);
      return this.getRandomInt(0, limitUI16-1);
    }
    
    randomUI32 () {
      var limitUI32 = this.maxFromBits(32);
      return this.getRandomInt(0, limitUI32-1);
    }
    
    randomUI48 () {
      return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
    }

    paddedString (string, length, z) {
      string = String(string);
      z = (!z) ? '0' : z;
      var i = length - string.length;
      for (; i > 0; i >>>= 1, z += z) {
        if (i & 1) {
          string = z + string;
        }
      }
      return string;
    }

    fromParts (timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
      var hex = this.paddedString(timeLow.toString(16), 8)
                 + '_'
                 + this.paddedString(timeMid.toString(16), 4)
                 + '_'
                 + this.paddedString(timeHiAndVersion.toString(16), 4)
                 + '_'
                 + this.paddedString(clockSeqHiAndReserved.toString(16), 2)
                 + this.paddedString(clockSeqLow.toString(16), 2)
                 + '_'
                 + this.paddedString(node.toString(16), 12);
      return hex;
    }

    generate () {
      return this.fromParts(
        this.randomUI32(),
        this.randomUI16(),
        0x4000 | this.randomUI12(),
        0x80   | this.randomUI06(),
        this.randomUI08(),
        this.randomUI48()
      );
    }

    validate (uuid) {
      var testPattern = /^[0-9a-f]{8}_[0-9a-f]{4}_4[0-9a-f]{3}_[89ab][0-9a-f]{3}_[0-9a-f]{12}$/i;
      return testPattern.test(uuid);
    }
}