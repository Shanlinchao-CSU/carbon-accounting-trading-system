<template>
    <div style="width: 100%; height: 100%" id="test_container"></div>
</template>

<script>
import Renderer from "@/renderer/renderer";
import * as echarts from "echarts";
import data from "@/assets/js/data";
export default {
    mounted() {
        var data_ = {
            nodes: [
                {
                    id: "0",
                    name: "Sakura",
                    symbolSize: 50,
                    x: 0,
                    y: 0,
                    value: 0,
                    category: 0,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "1",
                    name: "Shmily",
                    symbolSize: 50,
                    x: -154,
                    y: -391,
                    value: 0,
                    category: 1,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "2",
                    name: "水木",
                    symbolSize: 50,
                    x: -366,
                    y: 78,
                    value: 0,
                    category: 1,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "3",
                    name: "锦满",
                    symbolSize: 50,
                    x: 410,
                    y: -63,
                    value: 0,
                    category: 1,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "4",
                    name: "myra_xiangyuff",
                    symbolSize: 50,
                    x: -512,
                    y: -103,
                    value: 0,
                    category: 1,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "5",
                    name: "dyh",
                    symbolSize: 50,
                    x: -219,
                    y: -5,
                    value: 0,
                    category: 1,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "6",
                    name: "KrieN",
                    symbolSize: 50,
                    x: 491,
                    y: 365,
                    value: 0,
                    category: 2,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "7",
                    name: "其他",
                    symbolSize: 50,
                    x: 50,
                    y: -20,
                    value: 0,
                    category: 2,
                    label: {
                        show: true,
                    },
                },
                {
                    id: "8",
                    name: "抹茶",
                    symbolSize: 50,
                    x: -176,
                    y: 367,
                    value: 0,
                    category: 1,
                    label: {
                        show: true,
                    },
                },
            ],
            links: [
                {
                    source: "0",
                    target: "1",
                    data: "Sakura和Shmily是朋友",
                },
                {
                    source: "0",
                    target: "2",
                    data: "Sakura和水木是朋友",
                },
                {
                    source: "0",
                    target: "3",
                    data: "Sakura和锦满是朋友",
                },
                {
                    source: "0",
                    target: "4",
                    data: "Sakura和myra_xiangyuff是朋友",
                },
                {
                    source: "0",
                    target: "5",
                    data: "Sakura和dyh是朋友",
                },
                {
                    source: "0",
                    target: "6",
                    data: "朋友的朋友",
                },
                {
                    source: "0",
                    target: "7",
                    data: "感谢所有付出的人",
                },
                {
                    source: "1",
                    target: "8",
                    data: "Shmily和抹茶是朋友",
                },
            ],
            categories: [
                {
                    name: "主实体",
                },
                {
                    name: "朋友",
                },
                {
                    name: "其他",
                },
            ],
        };
        console.log(data.default_map);
        let a = new Renderer(document.getElementById("test_container"), data.default_map, "map");
        a.render();
        // var dom = document.getElementById("test_container");
        // var myChart = echarts.init(dom, null, {
        //     renderer: "canvas",
        //     useDirtyRect: false,
        // });
        // var app = {};
        // var ROOT_PATH = "https://echarts.apache.org/examples";
        // var option;

        // myChart.showLoading();
        // a(data);
        // function a(graph) {
        //     myChart.hideLoading();
        //     graph.nodes.forEach(function (node) {
        //         // node.symbolSize = 5;
        //     });
        //     option = {
        //         title: {
        //             text: "Les Miserables",
        //             subtext: "Default layout",
        //             top: "bottom",
        //             left: "right",
        //         },
        //         tooltip: {},
        //         legend: [
        //             {
        //                 // selectedMode: 'single',
        //                 data: graph.categories.map(function (a) {
        //                     return a.name;
        //                 }),
        //             },
        //         ],
        //         series: [
        //             {
        //                 name: "Les Miserables",
        //                 type: "graph",
        //                 layout: "force",
        //                 draggable: true,
        //                 data: graph.nodes,
        //                 links: graph.links,
        //                 categories: graph.categories,
        //                 roam: true,
        //                 label: {
        //                     position: "right",
        //                 },
        //                 force: {
        //                     repulsion: 3000,
        //                 },
        //             },
        //         ],
        //     };
        //     myChart.setOption(option);
        // }

        // if (option && typeof option === "object") {
        //     myChart.setOption(option);
        // }

        // window.addEventListener("resize", myChart.resize);
    },
};
</script>

<style></style>
