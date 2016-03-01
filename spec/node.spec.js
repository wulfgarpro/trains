var Route = require('./../lib/route'),
    Node = require('./../lib/node');

describe('Node', function() {
    describe('Node(name)', function() {
        it('Creates a Node with name and empty Route map', function(done) {
            var node = new Node('A');
            expect(node.name).not.toBe(undefined);
            expect(node.name).toBe('A');
            expect(node.routes).not.toBe(undefined);
            expect(node.routes).toEqual({});
            done();
        });
    });
    describe('set(route)', function() {
        it('Adds Route to this Node', function(done) {
            var node = new Node('A');
            var destination = new Node('B');
            var route = new Route(destination, 5);
            node.set(route);
            expect(node.routes.get('B')).not.toBe(undefined);
            expect(node.routes.get('B').weight).toBe(5);
            done();
        });
        it('Overrides duplicate Route to this Node', function(done) {
            var node = new Node('A');
            var destination = new Node('B');
            var route = new Route(destination, 5);
            node.set(route);
            expect(node.routes.get('B')).not.toBe(undefined);
            expect(node.routes.get('B').weight).toBe(5);
            var node = new Node('A');
            var destination = new Node('B');
            var route = new Route(destination, 9);
            node.set(route);
            expect(node.routes.get('B')).not.toBe(undefined);
            expect(node.routes.get('B').weight).toBe(9);
            done();
        });
    });
    describe('get(node)', function() {
        it('Gets Route to destination Node from this Node', function(done) {
            var node = new Node('A');
            var destination = new Node('B');
            var route = new Route(destination, 9);
            node.set(route);
            expect(node.routes.get('B')).not.toBe(undefined);
            expect(node.routes.get('B').weight).toBe(9);
            var found = node.get(destination);
            expect(found).not.toBe(undefined);
            expect(found.destination.name).toBe('B');
            expect(found.weight).toBe(9);
            done();
        });
    });
    describe('del(route)', function() {
        it('Deletes Route to destination Node from this Node', function(done) {
            var node = new Node('A');
            var destination = new Node('B');
            var route = new Route(destination, 9);
            node.set(route);
            expect(node.routes.get('B')).not.toBe(undefined);
            expect(node.routes.get('B').weight).toBe(9);
            node.del(destination);
            expect(node.routes.get('B')).toBe(undefined);
            done();
        });
        it('Fails silently if no such destination Node route from this Node exists', function(done) {
            var node = new Node('A');
            var destination = new Node('B');
            expect(node.routes.get('B')).toBe(undefined);
            node.del(destination);
            expect(node.routes.get('B')).toBe(undefined);
            done();
        });
    });
});