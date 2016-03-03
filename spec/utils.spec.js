var utils = require('./../lib/utils');

describe('Utils', function(done) {
    var testDataA = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7',
        testDataArrayA = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'],
        testDataB = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7,AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7',
        testDataArrayB = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7', 'AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'],
        testDataBogus = 'AB 5,BdC4,C**D8,DC8@,D2E6,5,CE,EB3,AE7',
        testDataArrayBogus = ['AB5', 'EB3', 'AE7'];

    describe('readFile(inputFile)', function(done) {
        it('Reads data from inputFile and returns data as string', function(done) {
            var data = utils.readFile(__dirname + '/files/test_input.txt');
            expect(data).toBe(testDataA);
            done();
        });
        it('Reads data from inputFile with multiple lines and returns data as one string', function(done) {
            var data = utils.readFile(__dirname + '/files/test_input_multiline.txt');
            expect(data).toBe(testDataB);
            done();
        });
        it('Returns empty string if file is empty', function(done) {
            var data = utils.readFile(__dirname + '/files/test_input_empty.txt');
            expect(data).toBe('');
            done();
        });
        it('Throws Error if file doesn\'t exist', function(done) {
            expect(function() {
                utils.readFile(__dirname + '/files/bogus.txt');
            }).toThrow('No such file.');
            done();
        });
    });
    describe('parseRoutes(data)', function(done) {
        it('Parses data and extracts routes, returning array of string routes', function(done) {
            var routes = utils.parseRoutes(testDataA);
            expect(routes.length).toBe(9);
            expect(typeof routes[0]).toBe('string');
            expect(typeof routes[1]).toBe('string');
            expect(typeof routes[2]).toBe('string');
            expect(typeof routes[3]).toBe('string');
            expect(typeof routes[4]).toBe('string');
            expect(typeof routes[5]).toBe('string');
            expect(typeof routes[6]).toBe('string');
            expect(typeof routes[7]).toBe('string');
            expect(typeof routes[8]).toBe('string');
            expect(routes[0]).toBe(testDataArrayA[0]);
            expect(routes[1]).toBe(testDataArrayA[1]);
            expect(routes[2]).toBe(testDataArrayA[2]);
            expect(routes[3]).toBe(testDataArrayA[3]);
            expect(routes[4]).toBe(testDataArrayA[4]);
            expect(routes[5]).toBe(testDataArrayA[5]);
            expect(routes[6]).toBe(testDataArrayA[6]);
            expect(routes[7]).toBe(testDataArrayA[7]);
            expect(routes[8]).toBe(testDataArrayA[8]);
            done();
        });
        it('Parses data and extracts routes, removing bogus routes, returning array of string routes', function(done) {
            var routes = utils.parseRoutes(testDataBogus);
            expect(routes.length).toBe(3);
            expect(typeof routes[0]).toBe('string');
            expect(typeof routes[1]).toBe('string');
            expect(typeof routes[2]).toBe('string');
            expect(routes[0]).toBe(testDataArrayBogus[0]);
            expect(routes[1]).toBe(testDataArrayBogus[1]);
            expect(routes[2]).toBe(testDataArrayBogus[2]);
            done();
        });
    });
    describe('tokeniseNodes(path)', function(done) {
        it('Extracts nodes from path tokenised by "-"', function(done) {
            var nodes = utils.tokeniseNodes('A-C');
            expect(nodes.length).toBe(2);
            expect(typeof nodes[0]).toBe('string');
            expect(typeof nodes[1]).toBe('string');
            expect(nodes[0]).toBe('A');
            expect(nodes[1]).toBe('C');
            done();
        });
    });
});