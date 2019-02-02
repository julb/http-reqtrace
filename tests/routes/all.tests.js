const expect = require('chai').expect;

const { all } = require('../../src/routes/all');

let req = {
    params: {},
    body: {}
};

let res = {
    sendCalledWith: '',
    statusCalledWith: '',
    status: function(arg) {
        this.statusCalledWith = arg;
        return this;
    },
    send: function(arg) {
        this.sendCalledWith = arg;
    }
};

describe('All Route', function() {
    describe('All function', function() {
        it('Should respond with message OK', function() {
            all(req, res);
            expect(res.statusCalledWith).to.equal(200);
            expect(res.sendCalledWith.message).to.equal('OK');
            expect(res.sendCalledWith.statusCode).to.equal(200);
        });

        it('Should respond with 400 and message KO if NaN', function() {
            let newReq = req;
            newReq.params.statusCode = 'abcd';

            all(newReq, res);
            expect(res.statusCalledWith).to.equal(400);
            expect(res.sendCalledWith.statusCode).to.equal(400);
            expect(res.sendCalledWith.message).to.equal('KO');
        });

        it('Should respond with message KO and statusCode', function() {
            let newReq = req;
            newReq.params.statusCode = '500';

            all(newReq, res);
            expect(res.statusCalledWith).to.equal(500);
            expect(res.sendCalledWith.statusCode).to.equal(500);
            expect(res.sendCalledWith.message).to.equal('KO');
        });

        it('Should respond with 400 and message KO if out of bounds', function() {
            let newReq = req;
            newReq.params.statusCode = '100';
            all(newReq, res);
            expect(res.statusCalledWith).to.equal(400);
            expect(res.sendCalledWith.statusCode).to.equal(400);
            expect(res.sendCalledWith.message).to.equal('KO');


            newReq.params.statusCode = '600';
            all(newReq, res);
            expect(res.statusCalledWith).to.equal(400);
            expect(res.sendCalledWith.statusCode).to.equal(400);
            expect(res.sendCalledWith.message).to.equal('KO');
        });
    });
});
