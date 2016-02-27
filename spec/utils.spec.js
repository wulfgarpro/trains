var utils = require('./../lib/utils');

describe('Utils', function(done) {
    describe('readFile(inputFile)', function(done) {
        it('Reads data from inputFile', function(done) {
            var data = utils.readFile(__dirname + '/test_input.txt');
            expect(data).toBe('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
            done();
        });
        it('Returns empty string if file is empty', function(done) {
            var data = utils.readFile(__dirname + '/test_input_empty.txt');
            expect(data).toBe('');
            done();
        });
        it('Throws Error if file doesn\'t exist', function(done) {
            expect(function() {
                utils.readFile(__dirname + '/bogus.txt');
            }).toThrow('No such file.');
            done();
        });
    });
    describe('parseStrRoutes(line)', function(done) {
        xit('Parses line and extracts string route', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
});