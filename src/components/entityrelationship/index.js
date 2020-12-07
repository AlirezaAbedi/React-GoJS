// App.js
import React, { Component } from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './App.css';

class EntityRelationship extends Component {
    state = {
        diagramItems: [],
        relationDiagramItems: []
    }

    colors = {
        'red': '#be4b15',
        'green': '#52ce60',
        'blue': '#6ea5f8',
        'lightred': '#fd8852',
        'lightblue': '#afd4fe',
        'lightgreen': '#b9e986',
        'pink': '#faadc1',
        'purple': '#d689ff',
        'orange': '#fdb400',
    }

    componentDidMount() {

        var diagramItems = [
            {
                key: "Products",
                items: [{ id: "1-1", name: "ProductID", isDeleted: true, iskey: true, figure: "Decision", color: "pink" },
                { id: "1-2", name: "ProductName", isDeleted: false, iskey: false, figure: "Hexagon", color: this.colors.blue },
                { id: "1-3", name: "SupplierID", isDeleted: false, iskey: false, figure: "Decision", color: "purple" }]
            },
            {
                key: "Suppliers",
                items: [{ id: "2-1", name: "SupplierID", isDeleted: true, iskey: true, figure: "Decision", color: this.colors.red },
                { id: "2-2", name: "CompanyName", isDeleted: false, iskey: false, figure: "Hexagon", color: this.colors.blue },
                { id: "2-3", name: "ContactName", isDeleted: false, iskey: false, figure: "Hexagon", color: this.colors.blue },
                { id: "2-4", name: "Address", isDeleted: false, iskey: false, figure: "Hexagon", color: this.colors.blue }]
            },
            {
                key: "Categories",
                items: [{ id: "3-1", name: "CategoryID", isDeleted: false, iskey: true, figure: "Decision", color: this.colors.red },
                { id: "3-2", name: "CategoryName", isDeleted: false, iskey: false, figure: "Hexagon", color: this.colors.blue },
                { id: "3-3", name: "Description", isDeleted: false, iskey: false, figure: "Hexagon", color: this.colors.blue },
                { id: "3-4", name: "Picture", isDeleted: true, iskey: false, figure: "TriangleUp", color: this.colors.pink }]
            },
            {
                key: "Order Details",
                items: [{ id: "4-1", name: "OrderID", isDeleted: false, iskey: true, figure: "Decision", color: this.colors.red },
                { id: "4-2", name: "ProductID", isDeleted: false, iskey: true, figure: "Decision", color: this.colors.red },
                { id: "4-3", name: "UnitPrice", isDeleted: true, iskey: false, figure: "Circle", color: this.colors.green },
                { id: "4-4", name: "Quantity", isDeleted: true, iskey: false, figure: "Circle", color: this.colors.green },
                { id: "4-5", name: "Discount", isDeleted: false, iskey: false, figure: "Circle", color: this.colors.green },
                { id: "4-6", name: "Discount", isDeleted: false, iskey: false, figure: "Circle", color: this.colors.green },

                ]
            },
        ];

        var relationItems = [
            { from: "Products", to: "Suppliers", text: "0..N", toText: "1", fromField: "SupplierID", toField: "SupplierID", isDeleted: false },
            { from: "Products", to: "Categories", text: "0..N", toText: "1", fromField: "SupplierID", toField: "CategoryID", isDeleted: false },
            { from: "Order Details", to: "Products", text: "0..N", toText: "1", fromField: "ProductID", toField: "ProductID", isDeleted: true }
        ];

        this.setState({
            diagramItems: diagramItems,
            relationDiagramItems: relationItems
        })
    }

    render() {
        var { diagramItems, relationDiagramItems } = this.state;
        return (
            <div>
                <ReactDiagram class="diagram-cover"
                    initDiagram={initDiagram}
                    divClassName='diagram-component'
                    nodeDataArray={diagramItems}
                    linkDataArray={relationDiagramItems}
                //onModelChange={handleModelChange}
                />

            </div>

        );
    }
}

function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

    var itemTempl =
        $(go.Panel, "Horizontal",
            $(go.Shape,
                { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
                new go.Binding("figure", "figure"),
                new go.Binding("fill", "color"),
                new go.Binding("stroke", "color")),
            $(go.TextBlock,
                {
                    stroke: "#333333",
                    font: "bold 14px sans-serif"
                },
                new go.Binding("text", "name"))
        );
    const diagram =
        $(go.Diagram,
            {
                'allowHorizontalScroll': true,
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                model: $(go.GraphLinksModel,
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    })
            });


    // define a simple Node template
    diagram.nodeTemplate =
        $(go.Node, "Auto",  // the whole node panel
            {
                selectionAdorned: true,
                resizable: true,
                layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                isShadowed: true,
                shadowOffset: new go.Point(3, 3),
                shadowColor: "#C5C1AA"
            },
            new go.Binding("location", "location").makeTwoWay(),
            // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
            // clear out any desiredSize set by the ResizingTool.
            new go.Binding("desiredSize", "visible", function (v) { return new go.Size(NaN, NaN); }).ofObject("LIST"),
            // define the node's outer shape, which will surround the Table
            $(go.Shape, "RoundedRectangle",
                { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
            $(go.Panel, "Table",
                { margin: 8, stretch: go.GraphObject.Fill },
                $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
                // the table header
                $(go.TextBlock,
                    {
                        row: 0, alignment: go.Spot.Center,
                        margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                        font: "bold 16px sans-serif"
                    },
                    new go.Binding("text", "key")),
                // the collapse/expand button
                $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
                    { row: 0, alignment: go.Spot.TopRight }),
                // the list of Panels, each showing an attribute
                $(go.Panel, "Vertical",
                    {
                        name: "LIST",
                        row: 1,
                        padding: 3,
                        alignment: go.Spot.TopLeft,
                        defaultAlignment: go.Spot.Left,
                        stretch: go.GraphObject.Horizontal,
                        itemTemplate: itemTempl
                    },
                    new go.Binding("itemArray", "items"))
            )  // end Table Panel
        );

    return diagram;
}

export default EntityRelationship;