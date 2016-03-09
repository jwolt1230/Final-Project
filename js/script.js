 // This script demonstrates some simple things one can do with leaflet.js


var map = L.map('map').setView([40.7080529,-74.0111793], 15);

var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);
    L.Control.geocoder().addTo(map);

// create global variables we can use for layer controls
var constructionGeoJSON; 

// use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map using the plotDataset function
//Adding pluto data
$.getJSON( "data/LMConstructionWGS.geojson", function( data ) {
    // ensure jQuery has pulled all data out of the geojson file
    var projects = data;
    /*console.log(projects);*/
    
    var projectStyle = function (feature){
        var type = feature.properties.ProjectTyp;
        var fillColor = null;
        if (type == "Residential") {
            fillColor = "yellow";
        }

        if (type == "Office") {
            fillColor = "blue";
        }

        if (type == "Hotel") {
            fillColor = "orange";
        }

        if (type == "Hotel/Residential") {
            fillColor = "pink";
        }

        if (type == "Commercial/Residential") {
            fillColor = "brown";
        }

        if (type == "Commercial") {
            fillColor = "red";
        }

        if (type == "Transportation") {
            fillColor = "purple";
        }

        var style = {
            weight: 1,
            opacity: .75,
            color: 'gray',
            fillOpacity: .65,
            fillColor: fillColor
        };

        return style;
    }

    var projectTypeClick = function (feature, layer) {
        // let's bind some feature properties to a pop up
        layer.bindPopup("<h4>Project Details</h4> " + "<strong>Project Name:</strong> " + feature.properties.ProjectNam + "<br/><strong>Type: </strong>" + feature.properties.ProjectTyp + "<br/><strong># Stories: </strong>" + feature.properties.Stories + "<br/><strong># Units: </strong>" + feature.properties.NoUnits + "<br/><strong>Completion Date: </strong>" + feature.properties.TCO_Date);
    }

    constructionGeoJSON = L.geoJson(projects, {
        style: projectStyle,
        onEachFeature: projectTypeClick
    }).addTo(map);

    // create layer controls
    createLayerControls(); 

});


function createLayerControls(){

    // add in layer controls
    var baseMaps = {
        "CartoDB": CartoDBTiles,
    };

    var overlayMaps = {
        "Construction Projects": constructionGeoJSON,
    };

    // add control
    L.control.layers(baseMaps, overlayMaps).addTo(map);

}

// create a container for the legend and set the location
var legend = L.control({position: 'bottomleft'});

// using a function, create a div element for the combined legend/filter and return that div
legend.onAdd = function (map) {

    // a method in Leaflet for creating new divs and setting classes
    var div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<h4><p>Legend</p></4>';
            div.innerHTML +=
            '<i style="background: yellow"> </i>Residential<br>' +
            '<i style="background: orange"> </i>Hotel<br>' +
            '<i style="background: pink"> </i>Hotel/Residential<br>' +
            '<i style="background: red"> </i>Commercial<br>' +
            '<i style="background: brown"> </i>Commercial/Residential<br>' +
            '<i style="background: blue"> </i>Office<br>' +
            '<i style="background: purple"> </i>Transportation' +
            '<h5><p>Project Type</p></h5>' +
            '<input id ="Res" type="checkbox" checked="checked">Residential<br>' +
            '<input id ="Hotel" type="checkbox" checked="checked">Hotel<br>' +
            '<input id ="Hotel_Res" type="checkbox" checked="checked">Hotel/Residential<br>' +
            '<input id ="Commercial" type="checkbox" checked="checked">Commercial<br>' +
            '<input id ="Comm_Res" type="checkbox" checked="checked">Commercial/Residential<br>' +
            '<input id ="Office" type="checkbox" checked="checked">Office<br>' +
            '<input id ="Transportation" type="checkbox" checked="checked">Transportation<br>'

    return div;
};

// add the legend to the map 
legend.addTo(map);

//filter check on and off

$( "#Res" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Residential') {    
                layer.setStyle({
                    fillColor :'yellow', 
                    color: 'gray', 
                    weight: 1,
                    opacity: .75}) 
            }   
        })

    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Residential') {    
            layer.setStyle({fillColor :'none', color: 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }

});

$( "#Hotel" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Hotel') {    
                layer.setStyle({
                    fillColor :'orange',
                    color: 'gray',
                    weight: 1,
                    opacity: .75}) 
            }   
        })
    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Hotel') {    
            layer.setStyle({fillColor :'none', color : 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }

});

$( "#Hotel_Res" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Hotel/Residential') {    
                layer.setStyle({
                    fillColor :'pink',
                    color: 'gray', 
                    weight: 1,
                    opacity: .75}) 
            }   
        })
    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Hotel/Residential') {    
            layer.setStyle({fillColor :'none', color: 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }

});

$( "#Commercial" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Commercial') {    
                layer.setStyle({
                    fillColor :'red', 
                    color: 'gray', 
                    weight: 1,
                    opacity: .75}) 
            }   
        })
    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Commercial') {    
            layer.setStyle({fillColor :'none', color: 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }

});

$( "#Comm_Res" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Commercial/Residential') {    
                layer.setStyle({
                    fillColor :'brown',
                    color: 'gray', 
                    weight: 1,
                    opacity: .75}) 
            }   
        })
    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Commercial/Residential') {    
            layer.setStyle({fillColor :'none', color: 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }

});

$( "#Office" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Office') {    
                layer.setStyle({
                    fillColor :'blue',
                    color: 'gray', 
                    weight: 1,
                    opacity: .75}) 
            }   
        })
    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Office') {    
            layer.setStyle({fillColor :'none', color: 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }

});

$( "#Transportation" ).change(function() {
    var checked = $(this).prop( "checked" );
    console.log(checked);
    if (checked) {
        constructionGeoJSON.eachLayer(function (layer) {  
            if(layer.feature.properties.ProjectTyp == 'Transportation') {    
                layer.setStyle({
                    fillColor :'purple',
                    color: 'gray', 
                    weight: 1,
                    opacity: .75}) 
            }   
        })
    ;} else {
        constructionGeoJSON.eachLayer(function (layer) {  
        if(layer.feature.properties.ProjectTyp == 'Transportation') {    
            layer.setStyle({fillColor :'none', color: 'none'}) 
            console.log(layer.feature.properties.ProjectTyp);
            }   
        });
    }
});
