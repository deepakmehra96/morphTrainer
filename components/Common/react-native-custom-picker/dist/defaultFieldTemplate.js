"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var defaultFieldTemplate = function (_a) {
    var getLabel = _a.getLabel, defaultText = _a.defaultText, selectedItem = _a.selectedItem, clear = _a.clear, containerStyle = _a.containerStyle, textStyle = _a.textStyle, clearImage = _a.clearImage;
    return (React.createElement(react_native_1.View, { style: [
            {
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            containerStyle
        ] },
        React.createElement(react_native_1.Text, { style: [textStyle,{fontSize: 12,paddingLeft: 15, marginTop:10,color:'black'}] }, (selectedItem && getLabel(selectedItem)) || defaultText),
        selectedItem && (React.createElement(react_native_1.TouchableOpacity, { style: {
                width: 40,
                height: 40,
                padding: 12
            } }))));
};
exports.default = defaultFieldTemplate;
//# sourceMappingURL=defaultFieldTemplate.js.map