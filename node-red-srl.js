'use strict';

const SRL = require('srl');

module.exports = function(RED) {
    function SimpleRegex(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.fieldType = config.fieldType;
        node.field = config.field;
        node.on('input', function(msg) {
            var text = RED.util.evaluateNodeProperty(node.field, node.fieldType, node, msg);
            if(text.length > 0) {
                // Create variable to contain result after regex 
                var result = {};
                result._msgid = RED.util.generateId();
                result.payload = [];
                try {
                    const query = new SRL(config.query);
                    if (query.isMatching(text)) {
                        var res = query.getMatches(text);
                        res.forEach(function(entrance) {
                            result.payload.push({'value': entrance[0], startIndex: entrance.index});
                        });
                    }
                    node.send([result, msg]);
                } catch (e) {
                    node.error(e);
                }
            } else {
                node.error("Empty parse field");
            }
        });
    }

    RED.nodes.registerType("SRL-Query", SimpleRegex);
};