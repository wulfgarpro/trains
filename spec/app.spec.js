var Digraph = require('./../lib/digraph'),
    App = require('./../app'),
    util = require('util');

describe('App', function(done) {
    var app,
        testInputFile = __dirname + '/files/test_input.txt',
        testInputMultilineFile = __dirname + '/files/test_input_multiline.txt',
        testBogusInputFile = __dirname + '/bogus.txt',
        testDataA = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7',
        testDataB = 'AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7,AB5,BC4,CD8,DC8,DE6,AD5,CE2,EB3,AE7';

    beforeEach(function() {
        app = new App(testInputFile);
    });
    afterEach(function() {
        app = null;
    });

    describe('App(inputFile)', function() {
        it('Calls to read in inputFile', function(done) {
            spyOn(App, 'readInputFile');
            app.constructor.call(app, testInputFile);
            expect(App.readInputFile).toHaveBeenCalled();
            done();
        });
        it('Doesn\'t call to read in input file if no inputFile specified', function(done) {
            spyOn(App, 'readInputFile');
            app.constructor.call(app);
            expect(App.readInputFile).not.toHaveBeenCalled();
            done();
        });
        it('Calls to build digraph', function(done) {
            spyOn(App, 'buildDigraph');
            app.constructor.call(app, testInputFile);
            expect(App.buildDigraph).toHaveBeenCalled();
            done();
        });
        it('Doesn\'t call to build digraph if no inputFile specified', function(done) {
            spyOn(App, 'buildDigraph');
            app.constructor.call(app);
            expect(App.buildDigraph).not.toHaveBeenCalled();
            done();
        });
    });
    describe('readInputFile(inputFile)', function(done) {
        it('Reads in inputFile and returns data as string', function(done) {
            var data = App.readInputFile(testInputFile);
            expect(data).toBe(testDataA);
            done();
        });
        it('Reads in inputFile with multiple lines and returns data as one string', function(done) {
            var data = App.readInputFile(testInputMultilineFile);
            expect(data).toBe(testDataB);
            done();
        });
        it('Throws Error if file doesn\'t exist', function(done) {
            expect(function() {
                App.readInputFile(testBogusInputFile);
            }).toThrow('No such file.');
            done();
        });
    });
    describe('buildDigraph(data)', function(done) {
        it('Builds valid digraph from data string', function(done) {
            var digraph = App.buildDigraph(testDataA);
            expect(digraph.nodes['A']).not.toBe(undefined);
            expect(digraph.nodes['B']).not.toBe(undefined);
            expect(digraph.nodes['C']).not.toBe(undefined);
            expect(digraph.nodes['D']).not.toBe(undefined);
            expect(digraph.nodes['E']).not.toBe(undefined);
            expect(digraph.nodes['A'].routes['B'].weight).toBe(5);
            expect(digraph.nodes['B'].routes['C'].weight).toBe(4);
            expect(digraph.nodes['C'].routes['D'].weight).toBe(8);
            expect(digraph.nodes['D'].routes['C'].weight).toBe(8);
            expect(digraph.nodes['D'].routes['E'].weight).toBe(6);
            expect(digraph.nodes['A'].routes['D'].weight).toBe(5);
            expect(digraph.nodes['C'].routes['E'].weight).toBe(2);
            expect(digraph.nodes['E'].routes['B'].weight).toBe(3);
            expect(digraph.nodes['A'].routes['E'].weight).toBe(7);
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
            var digraph = App.buildDigraph(testDataA);
            expect(digraph.nodes['A']).not.toBe(undefined);
            expect(digraph.nodes['B']).not.toBe(undefined);
            expect(digraph.nodes['C']).not.toBe(undefined);
            expect(digraph.nodes['D']).not.toBe(undefined);
            expect(digraph.nodes['E']).not.toBe(undefined);
            expect(digraph.nodes['A'].routes['B'].weight).toBe(5);
            expect(digraph.nodes['B'].routes['C'].weight).toBe(4);
            expect(digraph.nodes['C'].routes['D'].weight).toBe(8);
            expect(digraph.nodes['D'].routes['C'].weight).toBe(8);
            expect(digraph.nodes['D'].routes['E'].weight).toBe(6);
            expect(digraph.nodes['A'].routes['D'].weight).toBe(5);
            expect(digraph.nodes['C'].routes['E'].weight).toBe(2);
            expect(digraph.nodes['E'].routes['B'].weight).toBe(3);
            expect(digraph.nodes['A'].routes['E'].weight).toBe(7);
            expect(app.calcDistance('A-B-C')).toBe(5 + 4);
            expect(app.calcDistance('A-D')).toBe(5);
            expect(app.calcDistance('A-E-B-C-D')).toBe(7 + 3 + 4 + 8);
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
    describe('thoughtWorks()', function(done) {
        xit('Runs through all requisite tests outlined in ThoughtWorks email', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
});