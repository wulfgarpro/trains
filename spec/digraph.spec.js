var Digraph = require('./../lib/digraph'),
    utils = require('./../lib/utils');

describe('Digraph', function() {
    var testInputFile = __dirname + '/test_input.txt',
        testDataA = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7',
        testDataArrayA = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'],
        testDataBogus = 'AB 5,BdC4,C**D8,DC8@,D2E6,5,CE,EB3,AE7';

    describe('Digraph(nodes)', function() {
        it('Creates a digraph from nodes', function(done) {
            var digraph = new Digraph(testDataA);
            expect(digraph.nodes).not.toBe(undefined);
            expect(digraph.nodes.get('A')).not.toBe(undefined);
            expect(digraph.nodes.get('B')).not.toBe(undefined);
            expect(digraph.nodes.get('C')).not.toBe(undefined);
            expect(digraph.nodes.get('D')).not.toBe(undefined);
            expect(digraph.nodes.get('E')).not.toBe(undefined);
            expect(digraph.nodes.get('A').routes.get('B').weight).toBe(5);
            expect(digraph.nodes.get('B').routes.get('C').weight).toBe(4);
            expect(digraph.nodes.get('C').routes.get('D').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('C').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('E').weight).toBe(6);
            expect(digraph.nodes.get('A').routes.get('D').weight).toBe(5);
            expect(digraph.nodes.get('C').routes.get('E').weight).toBe(2);
            expect(digraph.nodes.get('E').routes.get('B').weight).toBe(3);
            expect(digraph.nodes.get('A').routes.get('E').weight).toBe(7);
            done();
        });
    });
    describe('makeNodes(data)', function(done) {
        it('Extracts nodes and routes from data and returns array of Nodes with their respective Routes', function(done) {
            var nodes = Digraph.makeNodes(testDataA);
            expect(nodes.size).toBe(5);
            expect(nodes.get('A').routes.get('B').weight).toBe(5);
            expect(nodes.get('B').routes.get('C').weight).toBe(4);
            expect(nodes.get('C').routes.get('D').weight).toBe(8);
            expect(nodes.get('D').routes.get('C').weight).toBe(8);
            expect(nodes.get('D').routes.get('E').weight).toBe(6);
            expect(nodes.get('A').routes.get('D').weight).toBe(5);
            expect(nodes.get('C').routes.get('E').weight).toBe(2);
            expect(nodes.get('E').routes.get('B').weight).toBe(3);
            expect(nodes.get('A').routes.get('E').weight).toBe(7);
            done();
        });
        it('Extracts nodes and routes from data and returns array of Nodes with their respective Routes, ignoring bogus data', function(done) {
            var nodes = Digraph.makeNodes(testDataBogus);
            expect(nodes.size).toBe(3);
            expect(nodes.get('A').routes.get('B').weight).toBe(5);
            expect(nodes.get('E').routes.get('B').weight).toBe(3);
            expect(nodes.get('A').routes.get('E').weight).toBe(7);
            done();
        });
    });
    describe('printNetworkMap()', function(done) {
        xit('Prints a valid network map from current digraph', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('calcDistance(path)', function(done) {
        it('Calculates distance of a defined path', function(done) {
            var digraph = new Digraph(testDataA);
            expect(digraph.nodes.get('A').routes.get('B').weight).toBe(5);
            expect(digraph.nodes.get('B').routes.get('C').weight).toBe(4);
            expect(digraph.nodes.get('C').routes.get('D').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('C').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('E').weight).toBe(6);
            expect(digraph.nodes.get('A').routes.get('D').weight).toBe(5);
            expect(digraph.nodes.get('C').routes.get('E').weight).toBe(2);
            expect(digraph.nodes.get('E').routes.get('B').weight).toBe(3);
            expect(digraph.nodes.get('A').routes.get('E').weight).toBe(7);
            expect(digraph.calcDistance('A-B-C')).toBe(5 + 4);
            expect(digraph.calcDistance('A-D')).toBe(5);
            expect(digraph.calcDistance('A-E-B-C-D')).toBe(7 + 3 + 4 + 8);
            done();
        });
        it('Throws Error if defined path doesn\'t exist', function(done) {
            var digraph = new Digraph(testDataA);
            expect(digraph.nodes.get('A').routes.get('B').weight).toBe(5);
            expect(digraph.nodes.get('B').routes.get('C').weight).toBe(4);
            expect(digraph.nodes.get('C').routes.get('D').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('C').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('E').weight).toBe(6);
            expect(digraph.nodes.get('A').routes.get('D').weight).toBe(5);
            expect(digraph.nodes.get('C').routes.get('E').weight).toBe(2);
            expect(digraph.nodes.get('E').routes.get('B').weight).toBe(3);
            expect(digraph.nodes.get('A').routes.get('E').weight).toBe(7);
            expect(function() {
                digraph.calcDistance('A-E-D');
            }).toThrow('NO SUCH ROUTE.');
            done();
        });
    });
    describe('calcNumberOfPossiblePaths(path, stops)', function(done) {
        it('Calculates number of possible trips with max stops', function(done) {
            var digraph = new Digraph(testDataA);
            expect(digraph.nodes.get('A').routes.get('B').weight).toBe(5);
            expect(digraph.nodes.get('B').routes.get('C').weight).toBe(4);
            expect(digraph.nodes.get('C').routes.get('D').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('C').weight).toBe(8);
            expect(digraph.nodes.get('D').routes.get('E').weight).toBe(6);
            expect(digraph.nodes.get('A').routes.get('D').weight).toBe(5);
            expect(digraph.nodes.get('C').routes.get('E').weight).toBe(2);
            expect(digraph.nodes.get('E').routes.get('B').weight).toBe(3);
            expect(digraph.nodes.get('A').routes.get('E').weight).toBe(7);
            expect(function() {
                digraph.calcDistance('A-E-D');
            }).toThrow('NO SUCH ROUTE.');
            expect(digraph.calcNumberOfPossiblePaths('C', 'C', 3).size).toBe(2);
            done();
        });
        xit('Calculates number of possible trips with exact stops', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('calcShortestRoute(path)', function(done) {
        xit('Calculates shortest possible route', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('calcRouteCount(path, cb)', function(done) {
        xit('Calculates number of unique routes with distance relationship', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
});