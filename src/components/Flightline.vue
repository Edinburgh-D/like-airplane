<template>
    <div id="cesiumContainer"><button id="toggle-building"  @click="clickBuilding()">Toggle new building</button></div>
    
</template>
<script>
let viewer, start, positionProperty, stop, entity ,newBuildingTileset;
export default {
    name: 'Container',
    mounted() {
        this.init()
    },
    data() {
        return {

        }
    },
    methods: {
        init() {
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMWI5NmU3OC05MTNhLTQ5NjktOWY3OC02OTcyOWFjNGZlYzgiLCJpZCI6NjM3MjgsImlhdCI6MTYyODQ5MTgwMn0.MJBuV2ZZvZi-jPuGMBfwlJdUqo6wzWnm8mPwfpSTv5E'
            viewer = new Cesium.Viewer('cesiumContainer', {
                terrainProvider: Cesium.createWorldTerrain()
            });
            // 添加osm格式建筑
            //  const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildings());

            const buildingsTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
            // const buildingsTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
            // // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
            // viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
            // });
            this.addBuildingGeoJSON()
            buildingsTileset.style = new Cesium.Cesium3DTileStyle({
                // Create a style rule to control each building's "show" property.
                show: {
                    conditions: [
                        // Any building that has this elementId will have `show = false`.
                        ['${elementId} === 532245203', false],
                        ['${elementId} === 332469316', false],
                        ['${elementId} === 332469317', false],
                        ['${elementId} === 235368665', false],
                        ['${elementId} === 530288180', false],
                        ['${elementId} === 530288179', false],
                        // If a building does not have one of these elementIds, set `show = true`.
                        [true, true]
                    ]
                },
                // Set the default color style for this particular 3D Tileset.
                // For any building that has a `cesium#color` property, use that color, otherwise make it white.
                color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
            });
            //this.addBuilding()
             newBuildingTileset = viewer.scene.primitives.add(
                new Cesium.Cesium3DTileset({
                    url: Cesium.IonResource.fromAssetId(753136)
                })
            );
            // Move the camera to the new building.
            viewer.flyTo(newBuildingTileset);
            // document.querySelector('#toggle-building').onclick = function () {
                
            // };
            // buildingsTileset.style = new Cesium.Cesium3DTileStyle({
            //     // Create a style rule to control each building's "show" property.
            //     show: {
            //         conditions: [
            //             // Any building that has this elementId will have `show = false`.
            //             ['${elementId} === 332469316', false],
            //             ['${elementId} === 332469317', false],
            //             ['${elementId} === 235368665', false],
            //             ['${elementId} === 530288180', false],
            //             ['${elementId} === 530288179', false],
            //             // If a building does not have one of these elementIds, set `show = true`.
            //             [true, true]
            //         ]
            //     },
            //     // Set the default color style for this particular 3D Tileset.
            //     // For any building that has a `cesium#color` property, use that color, otherwise make it white.
            //     color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
            // });
            // 飞行中的各种点数据
            // const newBuildingTileset = viewer.scene.primitives.add(
            //     new Cesium.Cesium3DTileset({
            //         url: Cesium.IonResource.fromAssetId(753136)
            //     })
            // );
            // // Move the camera to the new building.
            // viewer.flyTo(newBuildingTileset);
        },
        async addBuildingGeoJSON() {
            // Load the GeoJSON file from Cesium ion.
            const geoJSONURL = await Cesium.IonResource.fromAssetId(749678);
            // Create the geometry from the GeoJSON, and clamp it to the ground.
            const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
            // Add it to the scene.
            const dataSource = await viewer.dataSources.add(geoJSON);
            // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
            // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
            for (const entity of dataSource.entities.values) {
                entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
            }
            // Move the camera so that the polygon is in view.
            viewer.flyTo(dataSource);
        },
        async addBuilding() {

        },
        clickBuilding(){
            console.log(newBuildingTileset)
    newBuildingTileset.show = !newBuildingTileset.show;
        }
    }
}
</script>
<style lang="scss" scoped>
#cesiumContainer {
    width: 100%;
}
#cesiumContainer {
    width: 100%;
    height: 100%;
}
.test {
    width: 200px;
    height: 200px;
    position: absolute;
    background-color: blue;
    z-index: 1;
}
.cesium-widget-credits {
    display: none !important; /*去除Cesium默认版权信息*/
}
 #toggle-building { z-index: 1; position: fixed; top: 5px; left: 5px; }
</style>