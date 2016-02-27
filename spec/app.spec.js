var App = require('./../app');

describe('App', function(done) {
    var app,
        testInputFile = __dirname + '/test_input.txt',
        testInputMultilineFile = __dirname + '/test_input_multiline.txt';

    beforeEach(function() {
        app = new App(testInputFile);
    });
    afterEach(function() {
        app = null;
    });

    describe('App(inputFile)', function() {
        it('Calls to read in input file', function(done) {
            spyOn(app, 'readInputFile');
            app.constructor.call(app, testInputFile);
            expect(app.readInputFile).toHaveBeenCalled();
            done();
        });
        it('Doesn\'t call to read in input file if no input file specified', function(done) {
            spyOn(app, 'readInputFile');
            app.constructor.call(app);
            expect(app.readInputFile).not.toHaveBeenCalled();
            done();
        });
        it('Calls to make nodes and routes', function(done) {
            spyOn(app, 'makeNodesAndRoutes');
            app.constructor.call(app, testInputFile);
            expect(app.makeNodesAndRoutes).toHaveBeenCalled();
            done();
        });
        it('Doesn\'t call to make nodes and routes if no input file specified', function(done) {
            spyOn(app, 'makeNodesAndRoutes');
            app.constructor.call(app);
            expect(app.makeNodesAndRoutes).not.toHaveBeenCalled();
            done();
        });
        it('Calls to build digraph', function(done) {
            spyOn(app, 'buildDigraph');
            app.constructor.call(app, testInputFile);
            expect(app.buildDigraph).toHaveBeenCalled();
            done();
        });
        it('Doesn\'t call to build digraph if no input file specified', function(done) {
            spyOn(app, 'buildDigraph');
            app.constructor.call(app);
            expect(app.buildDigraph).not.toHaveBeenCalled();
            done();
        });
    });
    describe('readInputFile(inputFile)', function(done) {
        it('Reads in inputFile and returns data as string', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('makeNodesAndRoutes(data)', function(done) {
        xit('Extracts nodes and routes from data and returns array', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
        xit('Ignores non-comma seperated input data', function(done) {
            expect(true).toBe(false, 'test not implemented');
            done();
        });
    });
    describe('buildDigraph(nodesAndRoutes)', function(done) {
        xit('Builds valid digraph from nodesAndRoutes array', function(done) {
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