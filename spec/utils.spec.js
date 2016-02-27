var utils = require('./../lib/utils');

describe('Utils', function(done) {
    var testDataA = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7',
        testDataB = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7,AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7';

    describe('readFile(inputFile)', function(done) {
        it('Reads data from inputFile and returns data as string', function(done) {
            var data = utils.readFile(__dirname + '/test_input.txt');
            expect(data).toBe(testDataA);
            done();
        });
        it('Reads data from inputFile with multiple lines and returns data as one string', function(done) {
            var data = utils.readFile(__dirname + '/test_input_multiline.txt');
            expect(data).toBe(testDataB);
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