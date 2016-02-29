var Route = require('./../lib/route'),
    Node = require('./../lib/node');

describe('Route', function() {
    describe('Route(desintation, weight)', function() {
        it('Creates a Route with end-point destination Node and weight', function(done) {
            var destination = new Node('A');
            var weight = 5;
            var route = new Route(destination, weight);
            expect(route.destination).not.toBe(undefined);
            expect(route.destination).toBe(destination);
            expect(route.weight).toBe(weight);
            done();
        });
    });
    describe('set(desintation, weight)', function() {
        it('Sets end-point destination Node and weight for this Route', function(done) {
            var destination = new Node('A');
            var weight = 5;
            var route = new Route(destination, weight);
            expect(route.destination).not.toBe(undefined);
            expect(route.destination).toBe(destination);
            expect(route.weight).toBe(weight);
            var newDestination = new Node('B');
            var newWeight = 9;
            route.set(newDestination, newWeight);
            expect(route.destination).not.toBe(undefined);
            expect(route.destination).toBe(newDestination);
            expect(route.weight).toBe(newWeight);
            done();
        });
    });
});