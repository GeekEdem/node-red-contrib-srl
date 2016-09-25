## node-red-contrib-srl
Node-Red implementation of SRL for JS

## Input
> Node-red property field name, where text what need to parse by SRL.

## Output 1
> Result after regex placed in the msg.payload ```{ type: Array }```, each element: 
```{ "value": String, "startIndex": Number }```

## Output 2
> Return all object, that was passed to input of node