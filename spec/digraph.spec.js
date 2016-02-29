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
            expect(digraph.nodes['A']).not.toBe(undefined);
            expect(digraph.nodes['B']).not.toBe(undefined);
            expect(digraph.nodes['C']).not.toBe(undefined);
            expect(digraph.nodes['D']).not.toBe(undefined);
            expect(digraph.nodes['E']).not.toBe(undefined);
            expect(digraph.nodes['A'].routes['B'].weight).toBe('5');
            expect(digraph.nodes['B'].routes['C'].weight).toBe('4');
            expect(digraph.nodes['C'].routes['D'].weight).toBe('8');
            expect(digraph.nodes['D'].routes['C'].weight).toBe('8');
            expect(digraph.nodes['D'].routes['E'].weight).toBe('6');
            expect(digraph.nodes['A'].routes['D'].weight).toBe('5');
            expect(digraph.nodes['C'].routes['E'].weight).toBe('2');
            expect(digraph.nodes['E'].routes['B'].weight).toBe('3');
            expect(digraph.nodes['A'].routes['E'].weight).toBe('7');
            done();
        });
    });
    describe('makeNodes(data)', function(done) {
        it('Extracts nodes and routes from data and returns array of Nodes with their respective Routes', function(done) {
            var nodes = Digraph.makeNodes(testDataA);
            expect(Object.keys(nodes).length).toBe(5);
            expect(nodes['A'].routes['B'].weight).toBe('5');
            expect(nodes['B'].routes['C'].weight).toBe('4');
            expect(nodes['C'].routes['D'].weight).toBe('8');
            expect(nodes['D'].routes['C'].weight).toBe('8');
            expect(nodes['D'].routes['E'].weight).toBe('6');
            expect(nodes['A'].routes['D'].weight).toBe('5');
            expect(nodes['C'].routes['E'].weight).toBe('2');
            expect(nodes['E'].routes['B'].weight).toBe('3');
            expect(nodes['A'].routes['E'].weight).toBe('7');
            done();
        });
        it('Extracts nodes and routes from data and returns array of Nodes with their respective Routes, ignoring bogus data', function(done) {
            var nodes = Digraph.makeNodes(testDataBogus);
            expect(Object.keys(nodes).length).toBe(3);
            expect(nodes['A'].routes['B'].weight).toBe('5');
            expect(nodes['E'].routes['B'].weight).toBe('3');
            expect(nodes['A'].routes['E'].weight).toBe('7');
            done();
        });
    });
    describe('set(destination, weight)', function() {
        xit('Creates a Route between this Node and destination Node with said weight', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('get(destination)', function() {
        xit('Returns Route between this Node and destination Node', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('getAllNodes()', function() {
        xit('Returns all Node objs from this Digraph', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('getAllRoutes()', function() {
        xit('Returns all Route objs from this Digraph', function(done) {
            expect(true).toBe(false, 'test not implemented');
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
        xit('Calculates distance of a defined path', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('calcNumberOfPossibleTrips(path, stops)', function(done) {
        xit('Calculates number of possible trips with max stops', function(done) {
            expect(true).toBe(false, 'test not implemented');
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