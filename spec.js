const should = require('should');
const SHA256 = require("crypto-js/sha256");
const {Block, Blockchain} = require('./Blockchain.js');

describe('파트 1', () => {
  describe('Block Class 테스트', () => {
    describe('Constructor', () => {
      it('5개의 프로퍼티와 함께 생성돼야 합니다: index, previousHash, timestamp, data, hash', () => {
        let block = new Block();
        block.should.have.property('index');
        block.should.have.property('previousHash');
        block.should.have.property('timestamp');
        block.should.have.property('data');
        block.should.have.property('hash');
      })
    })
    describe('calculateHash', () => {
      it('', () => {

      })
    })
  })
  describe('Blockchain Class 테스트', () => {
    it('', () => {

    })
    describe('Constructor', () => {
      it('1개의 프로퍼티와 함께 생성돼야 합니다: chain', () => {
        let bitcoin = new Blockchain();
        bitcoin.should.have.property('chain');
      })
      it('Blockchain의 chain 프로퍼티는 배열이어야 합니다.', () => {
        let bitcoin = new Blockchain();
        bitcoin.chain.should.be.a.Array();
      })
    })
    it('createGenesisBlock 메소드는 Block의 인스턴스를 반환해야 합니다.', () => {
      let bitcoin = new Blockchain();
      (bitcoin.createGenesisBlock() instanceof Block).should.be.true();
    })
    it('Blockchain 인스턴스를 생성했을 때 chain의 첫 번째 원소는 Block의 인스턴스여야 합니다.', () => {
      let bitcoin = new Blockchain();
      (bitcoin.chain[0] instanceof Block).should.be.true();
    })
    it('getLatestBlock 메소드는 chain의 마지막 원소를 반환해야 합니다.', () => {
      let bitcoin = new Blockchain();
      (JSON.stringify(bitcoin.chain[bitcoin.chain.length - 1]) === JSON.stringify(bitcoin.getLatestBlock())).should.be.true();
    })
    describe('addBlock', () => {
      it('인자로 받은 Block을 chain에 추가해야 합니다.', () => {
        let bitcoin = new Blockchain();
        let block = new Block(1, "20/07/2017", { amount: 4 });
        bitcoin.addBlock(block);
        (bitcoin.getLatestBlock() === block).should.be.true();
      })
      it('새로운 Block을 추가했을 때 그 Block의 previousHash는 바로 전 Block의 hash와 같아야 합니다.', () => {
        let bitcoin = new Blockchain();
        let latestBlock1 = bitcoin.getLatestBlock();
        let block = new Block(1, "20/07/2017", { amount: 4 });
        bitcoin.addBlock(block);
        let latestBlock2 = bitcoin.getLatestBlock();
        (latestBlock2.previousHash === latestBlock1.hash).should.be.true();
      })
      it('새로운 Block을 추가할 때 그 Block의 hash를 새로 업데이트 하고 나서 추가해야 합니다.', () => {
        let bitcoin = new Blockchain();
        let block = new Block(1, "20/07/2017", { amount: 4 });
        let beforeAdd = block.hash;
        bitcoin.addBlock(block);
        (beforeAdd !== bitcoin.getLatestBlock().hash).should.be.true();
      })
    })
    describe('isChainValid', () => {
      it('블록체인이 정상일 때는 true를 반환해야 합니다.', () => {
        let bitcoin = new Blockchain();
        bitcoin.addBlock(new Block(1, "05/01/2018", { amount: 4 }));
        bitcoin.addBlock(new Block(2, "10/02/2018", { amount: 8 }));
        bitcoin.isChainValid().should.be.true();
      })
      it('블록의 data가 조작됐을 때 false를 반환해야 합니다.', () => {
        let bitcoin = new Blockchain();
        bitcoin.addBlock(new Block(1, "05/01/2018", { amount: 4 }));
        bitcoin.addBlock(new Block(2, "10/02/2018", { amount: 8 }));
        bitcoin.chain[1].data = { amount: 1000 };
        bitcoin.isChainValid().should.be.false();
      })
      it('블록의 data 조작 후 해당 블록의 hash를 업데이트 해도 false를 반환해야 합니다.', () => {
        let bitcoin = new Blockchain();
        bitcoin.addBlock(new Block(1, "05/01/2018", { amount: 4 }));
        bitcoin.addBlock(new Block(2, "10/02/2018", { amount: 8 }));
        bitcoin.chain[1].data = { amount: 1000 };
        bitcoin.chain[1].hash = bitcoin.chain[1].calculateHash();
        bitcoin.isChainValid().should.be.false();
      })
    })
  })
})