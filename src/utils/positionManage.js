
/**
 * WGS84坐标系转笛卡尔坐标系
 * @param point
 * @return {{x: *, y: *, z: *}}
 * @constructor
 */
export function WGS84_to_Cartesian3 (point) {
    var car33 = Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.height);
    var x = car33.x;
    var y = car33.y;
    var z = car33.z;
    return { x, y, z };
}

/**
 * 笛卡尔坐标系转WGS84坐标系
 * @param point
 * @return {{lat: *, lng: *, alt: *}}
 * @constructor
 */
export function Cartesian3_to_WGS84 (point) {
    var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var height = cartographic.height;
    return { latitude, longitude, height };
}

/**
 * 笛卡尔坐标系转WGS84坐标系返回数组形式
 * @param point
 * @return {[lng: *,lat: *,  alt: *]}
 * @constructor
 */
export function Cartesian3_to_WGS84_list (point) {
    var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var height = cartographic.height;
    return [longitude, latitude, height];
}

// wgs84经纬度转换高斯投影
export function WGS84_to_GAUSS (longitude, latitude) {
    // 带宽
    const ZONE_WITH = 3
    // 带号
    // 三度带计算公式 带号 = （经度 + 1.5度） /  带宽
    // 注意 3度带和6度带的 带号和中央经线的计算方式不同
    const PROJ_NO = 0
    // 中央经线（弧度制）
    // 三度带计算公式： 中央经线(弧度制) = 带号 * 带宽 * (π/180)
    // const longitude0 = (PROJ_NO * ZONE_WITH) * (Math.PI / 180)
    const longitude0 = 108 * (Math.PI / 180)
    // 长半径（84）
    const a = 6378137
    // 偏率（84）
    const f = 1 / 298.257222101

    let X0, Y0, xval, yval
    let e2, ee, NN, T, C, A, M

    // 经度转换为弧度
    longitude = longitude * (Math.PI / 180)
    // 纬度转换为弧度
    latitude = latitude * (Math.PI / 180)

    e2 = 2 * f - f * f
    ee = e2 * (1.0 - e2)
    NN = a / Math.sqrt(1.0 - e2 * Math.sin(latitude) * Math.sin(latitude))
    T = Math.tan(latitude) * Math.tan(latitude)
    C = ee * Math.cos(latitude) * Math.cos(latitude)
    A = (longitude - longitude0) * Math.cos(latitude)
    M =
        a *
        ((1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256) * latitude -
            ((3 * e2) / 8 + (3 * e2 * e2) / 32 + (45 * e2 * e2 * e2) / 1024) * Math.sin(2 * latitude) +
            ((15 * e2 * e2) / 256 + (45 * e2 * e2 * e2) / 1024) * Math.sin(4 * latitude) -
            ((35 * e2 * e2 * e2) / 3072) * Math.sin(6 * latitude))
    xval =
        NN * (A + ((1 - T + C) * A * A * A) / 6 + ((5 - 18 * T + T * T + 72 * C - 58 * ee) * A * A * A * A * A) / 120)
    yval =
        M +
        NN *
        Math.tan(latitude) *
        ((A * A) / 2 +
            ((5 - T + 9 * C + 4 * C * C) * A * A * A * A) / 24 +
            ((61 - 58 * T + T * T + 600 * C - 330 * ee) * A * A * A * A * A * A) / 720)
    X0 = 1000000 * PROJ_NO + 500000
    Y0 = 0
    xval = xval + X0
    yval = yval + Y0
    return {
        x: xval,
        y: yval
    }
}
// 根据经纬度计算距离
export function getDistance (lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000; //输出为公里
    return s
}

// 根据层级范围计算可见距离
export function getLevelDistance (value) {
    let levelList = {
        2: {
            height: 10123,
        },
        3: {
            height: 7123,
        },
        4: {
            height: 6321
        },
        5: {
            height: 5522
        },
        6: {
            height: 3436
        },
        7: {
            height: 539
        },
        8: {
            height: 305
        },
        9: {
            height: 180
        },
        10: {
            height: 133
        },
        11: {
            height: 100
        },
        12: {
            height: 76.5
        },
        13: {
            height: 58.2
        },
        14: {
            height: 23.5
        },
        15: {
            height: 9.6
        },
        16: {
            height: 4
        },
        17: {
            height: 2
        },
        18: {
            height: 1.7
        },
        19: {
            height: 1.5
        },
        20: {
            height: 0
        },
    }
    return levelList[value].height * 1000;
}