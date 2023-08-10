const chai = require('chai');
const chaiHttp = require('chai-http')
const expect = chai.expect;
const server = require('../src/index')
const should = chai.should();

chai.use(chaiHttp);

describe('check files data', ()=>{

    it('checking status api files', (done)=>{
        chai.request(server).get('/files/data').end((err,res)=>{
            res.should.have.status(200);
            done();
        })
    })

    it('checking array', (done)=>{
        chai.request(server).get('/files/data').end((err,res)=>{
            res.body.should.be.a('array');
            done();
        })
    })

    it('checking length array', (done)=>{
        chai.request(server).get('/files/data').end((err,res)=>{
            const expected = 3;
            expect(expected).to.be.equal(res.body.length)
            done();
        })
    })

    it('checking a file that doesnt exist', (done)=>{
        chai.request(server).get('/files/data?fileName=test48.csv').end((err,res)=>{
            res.should.have.status(404);
            done();
        })
    })

})

