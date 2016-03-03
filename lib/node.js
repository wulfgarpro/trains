/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 James Fraser
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Route = require('./route');

/**
 * Node constructor
 *
 * @param {string} name
 *        A string representing node name
 *        e.g. 'A'
 */
var Node = function(name) {
    this.name = '';
    this.routes = new Map();

    if (name)
        this.name = name;
};

/**
 * Adds a route for this node
 *
 * @param {object} route
 *        The route to add
 */
Node.prototype.set = function(route) {
    if (route) {
        if (route.destination && route.weight) {
            var destinationName = route.destination.name;
            this.routes.set(destinationName, route);
        }
    }
};

/**
 * Returns route from this node to destination
 *
 * @param  {object} destination
 *         The destination node
 * @return {object}
 *         The route to destination
 */
Node.prototype.get = function(destination) {
    if (destination) {
        if (destination.name) {
            return this.routes.get(destination.name);
        }
    }
};

/**
 * Removes route to destination
 *
 * @param  {object} destination
 *         The destination node to delete route to
 */
Node.prototype.del = function(destination) {
    if (destination) {
        if (destination.name) {
            this.routes.delete(destination.name);
        }
    }
};

module.exports = Node;