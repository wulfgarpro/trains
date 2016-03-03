var Digraph = require('./../lib/digraph'),
    App = require('./../app');

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
        it('Calls to get a digraph', function(done) {
            spyOn(App, 'digraphFactory');
            app.constructor.call(app, testInputFile);
            expect(App.digraphFactory).toHaveBeenCalled();
            done();
        });
        it('Doesn\'t call to get a digraph if no inputFile specified', function(done) {
            spyOn(App, 'digraphFactory');
            app.constructor.call(app);
            expect(App.digraphFactory).not.toHaveBeenCalled();
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
    });
    describe('digraphFactory(data)', function(done) {
        it('Builds valid digraph from data string', function(done) {
            var digraph = App.digraphFactory(testDataA);
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
    describe('calcDistance(path)', function(done) {
        it('Calculates distance of a defined path', function(done) {
            expect(app.calcDistance('A-B-C')).toBe(5 + 4);
            expect(app.calcDistance('A-D')).toBe(5);
            expect(app.calcDistance('A-E-B-C-D')).toBe(7 + 3 + 4 + 8);
            done();
        });
    });
    describe('calcNumberOfPossibleRoutesWithStops(path, relation, stops)', function(done) {
        it('Calculates number of possible routes with max stops', function(done) {
            expect(app.calcNumberOfPossibleRoutesWithStops('C-C', '<=', 3)).toBe(2);
            expect(app.calcNumberOfPossibleRoutesWithStops('A-B', '<=', 3)).toBe(3);
            expect(app.calcNumberOfPossibleRoutesWithStops('A-E', '<=', 3)).toBe(4);
            done();
        });
        it('Calculates number of possible routes with exact stops', function(done) {
            expect(app.calcNumberOfPossibleRoutesWithStops('C-C', '==', 3)).toBe(1);
            expect(app.calcNumberOfPossibleRoutesWithStops('A-B', '==', 3)).toBe(1);
            expect(app.calcNumberOfPossibleRoutesWithStops('A-C', '==', 4)).toBe(3);
            done();
        });
    });
    describe('calcShortestRoute(path)', function(done) {
        it('Calculates shortest possible route', function(done) {
            expect(app.calcShortestRoute('A-C')).toBe(9);
            expect(app.calcShortestRoute('B-B')).toBe(9);
            done();
        });
    });
    describe('calcNumberOfPossibleRoutesWithDistance(path, relation, distance)', function(done) {
        it('Calculates number of possible trips with less-than distance', function(done) {
            expect(app.calcNumberOfPossibleRoutesWithDistance('C-C', '<', 30)).toEqual(7);
            done();
        });
        it('Calculates number of possible trips with exact distance', function(done) {
            expect(app.calcNumberOfPossibleRoutesWithDistance('C-C', '==', 30)).toEqual(2);
            done();
        });
    });
});