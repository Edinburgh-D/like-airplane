<template>
    <div id="cesiumContainer">

        <div class="list">
            <div class="histroy" v-for="(item, index) in dataList" :key="index" @click="changeDate(item.id)">
                {{ item.year }}
            </div>
        </div>
        <div class="split" @click="splitScreen">分屏</div>
        <div id="slider"></div>
    </div>
</template>
<script>
import { Cartesian3_to_WGS84 } from '../utils/positionManage';
var viewer;
var handler
export default {
    name: 'Container',
    mounted () {
        this.init()
    },
    data () {
        return {
            dataList: [{
                year: '2022/10/12',
                id: '44988'
            }, {
                year: '2022/09/21',
                id: '47471'
            }, {
                year: '2022/08/10',
                id: '17825'
            }, {
                year: '2022/08/31',
                id: '45441'
            }, {
                year: '2022/07/21',
                id: '13851'
            }, {
                year: '2016/06/13',
                id: '11509'
            }, {
                year: '2022/04/06',
                id: '48232'
            }, {
                year: '2014/04/30',
                id: '19819',
            },],
            toSplit: false,
        }
    },
    methods: {
        splitScreen () {
            this.toSplit = true

        },
        //分屏功能
        splitScreen () {


            var layerLeft = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                url: 'https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/6354/{TileMatrix}/{TileRow}/{TileCol}',
                layer: 'china',
                style: 'default',
                tileMatrixSetID: 'default028mm',
                format: 'image/png',

            }))

            // layerLeft.splitDirection = Cesium.ImagerySplitDirection.LEFT;
            // let slider = document.getElementById("slider");


            // viewer.scene.imagerySplitPosition =
            //     slider.offsetLeft / slider.parentElement.offsetWidth;
            // handler = new Cesium.ScreenSpaceEventHandler(slider);
            // let moveActive = false
            // handler.setInputAction(() => {
            //     moveActive = true;
            // }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
            // handler.setInputAction(() => {
            //     moveActive = true;
            // }, Cesium.ScreenSpaceEventType.PINCH_START)
            // function move (movement) {
            //     if (!moveActive) {
            //         return;
            //     }
            //     const relativeOffset = movement.endPosition.x;
            //     const splitPosition =
            //         (slider.offsetLeft + relativeOffset) /
            //         slider.parentElement.offsetWidth;
            //     slider.style.left = `${100.0 * splitPosition}%`;
            //     viewer.scene.imagerySplitPosition = splitPosition;
            // }

            // handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            // handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

            // handler.setInputAction(function () {
            //     moveActive = false;
            // }, Cesium.ScreenSpaceEventType.LEFT_UP);
            // handler.setInputAction(function () {
            //     moveActive = false;
            // }, Cesium.ScreenSpaceEventType.PINCH_END);

        },
        changeDate (id) {
            console.log(id)
            let url = 'https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/' + id + '/{TileMatrix}/{TileRow}/{TileCol}'
            viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                // url: 'https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/44988/{TileMatrix}/{TileRow}/{TileCol}',
                url: url,
                layer: 'china',
                style: 'default',
                tileMatrixSetID: 'default028mm',//请求标识符
                format: "image/png",

                //尝试加入时间
                //    times: times
                // defaultBrightness: 0.1,
                // defaultAlpha: 0.1,
            }))
        },
        init () {
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMWI5NmU3OC05MTNhLTQ5NjktOWY3OC02OTcyOWFjNGZlYzgiLCJpZCI6NjM3MjgsImlhdCI6MTYyODQ5MTgwMn0.MJBuV2ZZvZi-jPuGMBfwlJdUqo6wzWnm8mPwfpSTv5E'
            viewer = new Cesium.Viewer('cesiumContainer', {
                // terrainProvider: Cesium.createWorldTerrain(),
                animation: false,  //是否显示动画控件
                baseLayerPicker: false, //是否显示图层选择控件
                geocoder: false, //是否显示地名查找控件
                homeButton: false,
                timeline: false, //是否显示时间线控件
                sceneModePicker: false, //是否显示投影方式控件
                navigationHelpButton: false, //是否显示帮助信息控件
                infoBox: false,  //是否显示点击要素之后显示的信息
                imageryProvider: new Cesium.ArcGisMapServerImageryProvider({

                    url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
                })
            });
            const times = Cesium.TimeIntervalCollection.fromIso8601({
                iso8601: '2019-07-30/2022-06-16/P1D',
                dataCallback: function dataCallback (interval, index) {
                    return {
                        Time: Cesium.JulianDate.toIso8601(interval.start)
                    };
                }
            });
            // viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            //     // url: 'https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/44988/{TileMatrix}/{TileRow}/{TileCol}',
            //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
            //     layer: 'china',
            //     style: 'default',
            //     tileMatrixSetID: 'default028mm',//请求标识符
            //     format: "image/png",

            //     //尝试加入时间
            //     //    times: times
            //     // defaultBrightness: 0.1,
            //     // defaultAlpha: 0.1,
            // }))
            // this.layer = window.xViewer.imageryLayers.addImageryProvider();
            // Add Cesium OSM Buildings, a global 3D buildings layer.
            // const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
            // // Fly the camera to San Francisco at the given lo ngitude, latitude, and height.
            // // 摄像机飞到某处
            // viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(110.34417892557927, 34.48176767462731, 1000.0),
            //     orientation: {
            //         // direction: new Cesium.Cartesian3(0.8982074415844437, -0.4393530288745287, 0.013867512433959908),
            //         // up: new Cesium.Cartesian3(0.12793638617798253, 0.29147314437764565, 0.9479850669701113),
            //         heading: Cesium.Math.toRadians(20.0),
            //         pitch: Cesium.Math.toRadians(-35.0),
            //     },
            //     // complete: function () {
            //     //     setTimeout(function () {
            //     //         viewer.camera.flyTo({
            //     //             destination: new Cesium.Cartesian3(-2304817.2435183465, -3639113.128132953, 4688495.013644141),
            //     //             orientation: {
            //     //                 direction: new Cesium.Cartesian3(0.3760550186878076, 0.9007147395506565, 0.21747547189489164),
            //     //                 up: new Cesium.Cartesian3(-0.20364591529594356, -0.14862471084230877, 0.9676978022659334),
            //     //             },
            //     //             easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
            //     //             duration: 5
            //     //         });
            //     //     }, 1000);
            //     // },
            // });
            // var terrain = new Cesium.createWorldTerrain({
            //     requestWaterMask: true,
            //     requestVertexNormals: true
            // });
            // viewer.terrainProvider = terrain;//加入世界地形图
            // var center = Cesium.Cartesian3.fromRadians(2.4213211833389243, 0.6171926869414084, 3626.0426275055174);
            // var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
            // viewer.scene.camera.lookAtTransform(transform, new Cesium.HeadingPitchRange(0, -Math.PI / 4, 2900));
            // //屏幕操作事件句柄
            // var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
            // handler.setInputAction(function (event) {
            //     var pickedPosition = viewer.scene.pickPosition(event.position);
            //     if (Cesium.defined(pickedPosition)) {

            //     }
            //     let positon = Cartesian3_to_WGS84(pickedPosition)
            //     //this.dataList.push(positon)
            //     console.log('所选的位置是', positon);
            //     viewer.entities.add({
            //         description: `Location: (${positon.longitude}, ${positon.latitude}, ${positon.height})`,
            //         position: pickedPosition,
            //         point: { pixelSize: 10, color: Cesium.Color.RED }
            //     });
            // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



            // var promise = Cesium.IonResource.fromAssetId(698962).then(function (
            //     resource
            // ) {
            //     return viewer.entities.add({
            //         model: { uri: resource },
            //     });
            // });
        },
    }
}
</script>
<style lang="scss" scoped>
#cesiumContainer {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.test {
    width: 200px;
    height: 200px;
    position: absolute;
    background-color: blue;
    z-index: 1;
}

.cesium-widget-credits {
    display: none !important;
    /*去除Cesium默认版权信息*/
}

.list {
    width: 100px;
    height: auto;
    position: fixed;
    top: 10px;
    left: 10px;
    background: #eee;
    z-index: 10;
    display: flex;
    gap: 5px;
    flex-direction: column;

    .item {
        cursor: pointer;
    }
}

.split {
    width: 50px;
    position: fixed;
    top: 10px;
    left: 115px;
    z-index: 10;
    background: #eee;
    height: 20px;
}

#slider {
    position: absolute;
    left: 50%;
    top: 0px;
    background-color: #d3d3d3;
    width: 5px;
    height: 100%;
    z-index: 9999;
}
</style>